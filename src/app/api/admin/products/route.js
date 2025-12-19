import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    await connectDB();

    const product = await Product.create({
      name,
      price,
      description,
      imageUrl: uploadResult.secure_url,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
