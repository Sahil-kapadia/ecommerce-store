import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, receipt } = await req.json();

    if (!amount) {
      return NextResponse.json(
        { message: "Amount is required" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // ✅ paise
      currency: "INR",
      receipt,
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json(
      { message: "Order creation failed" },
      { status: 500 }
    );
  }
}
