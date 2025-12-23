import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { amount, receipt } = await req.json();

    console.log("Creating Razorpay order:", { amount, receipt });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);

    console.log("Razorpay order created:", order.id);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { message: "Failed to create Razorpay order", error: error.message },
      { status: 500 }
    );
  }
}