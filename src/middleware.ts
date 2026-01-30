import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authCookieNames = [
  "__Secure-next-auth.session-token",
  "next-auth.session-token",
];

function hasAuthCookie(request: NextRequest) {
  return authCookieNames.some((name) => request.cookies.get(name)?.value);
}

export default function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (!hasAuthCookie(request)) {
    const loginUrl = new URL("/admin/login", request.nextUrl.origin);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
