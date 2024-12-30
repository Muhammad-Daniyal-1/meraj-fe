import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // If the user is not logged in and tries to access protected routes, redirect to login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is logged in and tries to access login, redirect to dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify the paths to apply the middleware to
export const config = {
  matcher: ["/dashboard/:path*", "/"], // Protect dashboard and redirect login
};
