import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function GET() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user-auth");

  if (!userCookie) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();

  const userId = userCookie.value;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return NextResponse.json({ message: "Invalid user" }, { status: 400 });
  }

  const orders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(orders);
}
