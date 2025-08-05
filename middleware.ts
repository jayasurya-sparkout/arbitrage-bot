import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the 'userLoggedIn' cookie exists to determine login status
  const loggedInCookie = request.cookies.get("userLoggedIn")?.value;


  // Clone and modify the request headers to include the nonce
  const requestHeaders = new Headers(request.headers);

  // Create the Next.js response object with updated request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const pathname = request.nextUrl.pathname;

  // Allow / only if it's the homepage
  const allowedPaths = ["/login"];

  // If not logged in and trying to access a restricted route, redirect to homepage/login
  if (!loggedInCookie && !(allowedPaths.includes(pathname))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in and visiting homepage ("/"), redirect to the main dashboard
  else if (loggedInCookie && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  // Allow request to proceed normally for other valid cases
  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};