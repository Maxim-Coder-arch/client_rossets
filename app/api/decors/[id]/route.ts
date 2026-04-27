import { getCollection } from "@/lib/mongodb/db";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET /api/decors/[id] — получить один декор по ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const collection = await getCollection("decors");

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Неверный ID" },
        { status: 400 }
      );
    }

    const decor = await collection.findOne({ _id: new ObjectId(id) });

    if (!decor) {
      return NextResponse.json(
        { error: "Декор не найден" },
        { status: 404 }
      );
    }

    return NextResponse.json({ decor });
  } catch (error) {
    console.error("GET decor by id error:", error);

    return NextResponse.json(
      { error: "Ошибка получения декора" },
      { status: 500 }
    );
  }
}