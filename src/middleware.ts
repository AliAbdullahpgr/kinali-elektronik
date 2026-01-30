import { NextResponse } from "next/server";

import { auth } from "~/server/auth";

export default auth((req) => {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  if (!req.auth?.user) {
    const loginUrl = new URL("/admin/login", req.nextUrl.origin);
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
