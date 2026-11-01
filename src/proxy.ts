import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/create-event",
  "/manage-events",
  "/joined-events",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check whether the requested route is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check Better Auth session cookie
  const sessionCookie = getSessionCookie(request);

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !sessionCookie) {
    const loginURL = new URL("/login", request.url);

    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-event/:path*",
    "/manage-events/:path*",
    "/joined-events/:path*",
  ],
};