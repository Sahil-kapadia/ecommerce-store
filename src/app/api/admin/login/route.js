import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { password } = await req.json();

    // Validate input
    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    // Check password
    if (password === process.env.ADMIN_PASSWORD) {
      const res = NextResponse.json({ success: true });

      // Set secure auth cookie
      res.cookies.set("admin-auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return res;
    }

    // Invalid password
    return NextResponse.json(
      { message: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}