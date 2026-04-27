import { getCollection } from "@/lib/mongodb/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collection = await getCollection("series");

    const series = await collection
      .find({})
      .sort({ seriesId: 1 })
      .toArray();

    return NextResponse.json({ series });
  } catch {
    return NextResponse.json(
      { error: "Ошибка получения серий" },
      { status: 500 }
    );
  }
}