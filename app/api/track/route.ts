import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { visitorId, sessionId, page, referrer, userAgent, timestamp } = body;

    if (!visitorId || !page) {
      return NextResponse.json({ error: "Недостаточно данных" }, { status: 400 });
    }

    const collection = await getCollection("tracking");

    await collection.insertOne({
      visitorId,
      sessionId,
      page,
      referrer,
      userAgent,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      createdAt: new Date(),
    });

    const visitorsCollection = await getCollection("visitors");
    await visitorsCollection.updateOne(
      { visitorId },
      {
        $set: {
          lastSeen: new Date(),
          userAgent,
        },
        $setOnInsert: {
          firstSeen: new Date(),
        },
        $inc: { visitCount: 1 },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "day";
    const collection = await getCollection("tracking");
    const visitorsCollection = await getCollection("visitors");

    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case "day":
        startDate.setDate(now.getDate() - 1);
        break;
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 1);
    }

    const uniqueVisitors = await collection.distinct("visitorId", {
      timestamp: { $gte: startDate },
    });

    const pageViews = await collection.countDocuments({
      timestamp: { $gte: startDate },
    });

    const topPages = await collection.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: "$page", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]).toArray();

    const totalVisitors = await visitorsCollection.countDocuments();

    return NextResponse.json({
      period,
      uniqueVisitors: uniqueVisitors.length,
      pageViews,
      topPages,
      totalVisitors,
    });
  } catch (error) {
    console.error("Get stats error:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}