import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, socialLink, comment, product } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Имя обязательно" },
        { status: 400 }
      );
    }

    if (!contact || !contact.trim()) {
      return NextResponse.json(
        { error: "Почта или телефон обязательны" },
        { status: 400 }
      );
    }

    if (!product || !product._id) {
      return NextResponse.json(
        { error: "Информация о товаре отсутствует" },
        { status: 400 }
      );
    }

    const collection = await getCollection("bid_with_goods");

    const newBid = {
      name: name.trim(),
      contact: contact.trim(),
      socialLink: socialLink?.trim() || "",
      comment: comment?.trim() || "",
      product: {
        _id: product._id,
        seriesNumber: product.seriesNumber,
        rossetSeries: product.rossetSeries,
        rossetDiameter: product.rossetDiameter,
        numberOfTails: product.numberOfTails,
        tailLength: product.tailLength,
        price: product.price,
        image: product.image,
      },
      status: "new",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBid);

    return NextResponse.json(
      { 
        message: "Заявка на товар успешно отправлена", 
        id: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка при сохранении заявки на товар:", error);
    return NextResponse.json(
      { error: "Ошибка сервера. Попробуйте позже." },
      { status: 500 }
    );
  }
}