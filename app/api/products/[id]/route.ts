import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collection = await getCollection("products");
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Неверный ID" }, { status: 400 });
    }
    
    const product = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!product) {
      return NextResponse.json({ error: "Розетка не найдена" }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}