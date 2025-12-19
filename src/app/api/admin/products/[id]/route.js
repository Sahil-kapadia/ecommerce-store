import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await connectDB();
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
