import { NextRequest, NextResponse } from "next/server";
import { AUTH_VERIFY_PATH, SERVER_USER_SERVICE_API_URL } from "@/lib/constants";

/**
 * Routes that are publicly accessible — no auth required.
 * Everything else is protected.
 */
const PUBLIC_PATHS = ["/auth"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

export default async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  // Always allow public paths and Next.js internals through.
  if (
    isPublicPath(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // ── 1. Check for the auth cookie ──────────────────────────────────────────
  const authToken = req.cookies.get(
    process.env.NEXT_AUTH_COOKIE_NAME ?? "",
  )?.value;

  console.log('cookie_name', process.env.NEXT_AUTH_COOKIE_NAME, process.env.SERVER_USER_SERVICE_API_URL, process.env.AUTH_VERIFY_PATH);
  console.log("authToken", authToken);
  if (!authToken) {
    return redirectToAuth(req);
  }

  // ── 2. Verify the token with NestJS ───────────────────────────────────────
  console.log(SERVER_USER_SERVICE_API_URL, AUTH_VERIFY_PATH);
  try {
    const verifyResponse = await fetch(
      `${SERVER_USER_SERVICE_API_URL}${AUTH_VERIFY_PATH}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
          Cookie: req.headers.get("cookie") ?? "",
        },
        body: JSON.stringify({ token: authToken }),
      },
    );
    console.log(verifyResponse);
    if (!verifyResponse.ok) {
      return redirectToAuth(req);
    }
  } catch (err) {
    // NestJS is unreachable — fail closed and redirect to /auth.
    console.error("[middleware] Auth verification failed:", err);
    return redirectToAuth(req);
  }

  // ── 3. Token is valid — let the request through ───────────────────────────
  return NextResponse.next();
}

function redirectToAuth(req: NextRequest): NextResponse {
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/auth";
  // Preserve the original destination so you can redirect back after login.
  loginUrl.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  /*
   * Match all routes except:
   *  - _next/static  (static assets)
   *  - _next/image   (image optimisation)
   *  - favicon.ico
   *  - public files with an extension (e.g. .png, .svg, .ico)
   */
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
