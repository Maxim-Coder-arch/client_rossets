import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

export async function GET() {
  try {
    const collection = await getCollection("reviews");
    const reviews = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();
    
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}