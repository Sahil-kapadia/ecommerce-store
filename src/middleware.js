import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Allow ALL API routes (including admin APIs)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // ✅ Protect admin PAGES (not APIs) - except login page
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const auth = req.cookies.get("admin-auth");

    if (!auth || auth.value !== "true") {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};