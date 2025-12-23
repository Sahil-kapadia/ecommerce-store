import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("admin-auth");

    if (!authCookie || authCookie.value !== "true") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch all orders, sorted by newest first
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}