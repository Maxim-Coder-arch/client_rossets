import { getCollection } from "@/lib/mongodb/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collection = await getCollection("decors");

    const decors = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ decors });
  } catch (error) {
    console.error("GET decors error:", error);

    return NextResponse.json(
      { error: "Ошибка получения декоров" },
      { status: 500 }
    );
  }
}
