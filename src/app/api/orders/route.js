import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      products,
    } = body;

    // 1️⃣ Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // 2️⃣ Connect DB
    await connectDB();

    // 3️⃣ Normalize cart → DB structure
    const normalizedProducts = products.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
    }));

    // 4️⃣ Save order
    const order = await Order.create({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount,
      products: normalizedProducts,
      paymentStatus: "paid",
    });

    // 5️⃣ Respond ONLY after save success
    return NextResponse.json(
      { message: "Order saved successfully", order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order save error:", error);
    return NextResponse.json(
      { message: "Order save failed" },
      { status: 500 }
    );
  }
}
