import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ❌ NEVER touch API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Protect admin pages (not APIs)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const auth = req.cookies.get("admin-auth");

    if (!auth) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}
