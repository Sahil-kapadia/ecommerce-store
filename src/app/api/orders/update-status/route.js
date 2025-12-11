import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const { dbOrderId, razorpayPaymentId } = await req.json();

    await connectDB();

    await Order.findByIdAndUpdate(dbOrderId, {
      status: "paid",
      razorpayPaymentId,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
