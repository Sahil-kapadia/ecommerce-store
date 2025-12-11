import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const { items, total } = await req.json();

    await connectDB();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Razorpay order options
    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    // Save order in DB as pending
    const newOrder = await Order.create({
      items,
      total,
      currency: "INR",
      razorpayOrderId: order.id,
      status: "pending",
      customerEmail: null, // until NextAuth is added
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: newOrder._id,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
