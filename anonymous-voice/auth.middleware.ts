import { UserInfo } from "@/services/auth.service";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export function withAuth(allowedRoles: string[]) {
  return function AuthMiddleware(req: NextRequest, res: NextResponse) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.redirect("/login");
    }

    const decodedToken = jwtDecode<UserInfo>(token);
    if (!allowedRoles.includes(decodedToken.role)) {
      return NextResponse.redirect("/unauthorized");
    }

    return NextResponse.next();
  };
}
