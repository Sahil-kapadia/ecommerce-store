import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ success: true });

    // simple auth cookie
    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      path: "/",
    });

    return res;
  }

  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}
