import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user-id")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      products,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { message: "Missing payment info" },
        { status: 400 }
      );
    }

    // ✅ Verify Razorpay signature
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

    await connectDB();

    const normalizedProducts = products.map((p) => ({
      productId: p._id,
      name: p.name,
      price: p.price,
      quantity: p.qty,
    }));

    const order = await Order.create({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount,
      products: normalizedProducts,
      userId,
      orderStatus: "pending",
      paymentStatus: "paid",
    });

    return NextResponse.json(
      { success: true, orderId: order._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order save error:", error);
    return NextResponse.json(
      { message: "Order failed" },
      { status: 500 }
    );
  }
}
