import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      products,
      userId,
    } = await req.json();

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { message: "Missing payment information" },
        { status: 400 }
      );
    }

    if (!amount || !products || products.length === 0) {
      return NextResponse.json(
        { message: "Missing order details" },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
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

    // Connect to database
    await connectDB();

    // Normalize products
    const normalizedProducts = products.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
    }));

    // Create order
    const order = await Order.create({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount,
      products: normalizedProducts,
      userId: userId || null,
      orderStatus: "pending",
      paymentStatus: "paid",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order saved successfully",
        orderId: order._id.toString(),
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order save error:", error);
    return NextResponse.json(
      { message: "Order save failed", error: error.message },
      { status: 500 }
    );
  }
}