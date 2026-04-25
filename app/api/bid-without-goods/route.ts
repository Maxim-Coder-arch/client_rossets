import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, socialLink, comment } = body;

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

    const collection = await getCollection("bid_without_goods");

    const newBid = {
      name: name.trim(),
      contact: contact.trim(),
      socialLink: socialLink?.trim() || "",
      comment: comment?.trim() || "",
      status: "new",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBid);

    return NextResponse.json(
      { 
        message: "Заявка успешно отправлена", 
        id: result.insertedId 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка при сохранении заявки:", error);
    return NextResponse.json(
      { error: "Ошибка сервера. Попробуйте позже." },
      { status: 500 }
    );
  }
}