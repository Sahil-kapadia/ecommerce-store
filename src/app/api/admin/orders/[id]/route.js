import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { cookies } from "next/headers";

export async function PATCH(req, { params }) {
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

    const { id } = await params;

    // Validate ID format
    if (!id || id.length !== 24 || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid order ID format" },
        { status: 400 }
      );
    }

    const { orderStatus } = await req.json();

    // Validate orderStatus
    const validStatuses = ["pending", "shipped", "delivered"];
    if (!orderStatus || !validStatuses.includes(orderStatus)) {
      return NextResponse.json(
        { message: "Invalid order status. Must be: pending, shipped, or delivered" },
        { status: 400 }
      );
    }

    // Update order
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("PATCH order error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}