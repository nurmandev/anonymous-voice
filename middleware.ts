import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { UserInfo } from "@/services/auth.service";

export function middleware(request: NextRequest) {
  // Get auth state from localStorage
  const authToken = localStorage.getItem("authToken");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userStr = localStorage.getItem("user");
  const user: UserInfo | null = userStr ? JSON.parse(userStr) : null;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const returnTo = request.nextUrl.pathname;

  // Handle unauthenticated users
  if (!isAuthenticated && !isAuthPage) {
    const loginUrl = new URL("/login", request.url);
    if (!isAuthPage && returnTo !== "/login") {
      loginUrl.searchParams.set("returnTo", returnTo);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Handle authenticated users trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    const returnToPath = request.nextUrl.searchParams.get("returnTo");
    const redirectUrl = new URL(returnToPath || "/", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle role-based dashboard routing
  if (isDashboard && user?.role === "admin") {
    const url = request.nextUrl.clone();
    if (!url.searchParams.has("role")) {
      url.searchParams.set("role", "admin");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|login|signup).*)",
    "/profile/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/bookings/:path*",
  ],
};
