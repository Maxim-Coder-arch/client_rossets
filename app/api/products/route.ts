import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const seriesId = searchParams.get("seriesId");
    
    const collection = await getCollection("products");
    
    let query = {};
    if (seriesId) {
      query = { seriesId };
    }
    
    const products = await collection.find(query).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const collection = await getCollection("products");
    
    const newProduct = {
      ...body,
      createdAt: new Date(),
    };
    
    const result = await collection.insertOne(newProduct);
    
    return NextResponse.json(
      { message: "Розетка добавлена", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}