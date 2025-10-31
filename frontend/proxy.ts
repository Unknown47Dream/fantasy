import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * JWT validation helper function
 * @param token - JWT token to validate
 * @returns boolean indicating if token is valid
 */
function isValidJWT(token: string): boolean {
  if (!token) return false;

  try {
    // Basic JWT structure validation (header.payload.signature)
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if token is expired
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("JWT validation error:", error);
    return false;
  }
}

/**
 * Next.js proxy function for authentication checking
 * Only monitors /console routes and redirects unauthenticated users to /console/login
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only process /console routes (excluding /console/login)
  if (!pathname.startsWith("/console") || pathname.startsWith("/console/login")) {
    return NextResponse.next();
  }

  // Check for valid JWT token
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  // Check if JWT token exists and is valid
  if (!authToken || !isValidJWT(authToken)) {
    // Redirect to login page with return URL
    const loginUrl = new URL("/console/login", request.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the proxy should run on
export const config = {
  matcher: [
    /*
     * Only match /console routes
     */
    "/console/:path*",
  ],
};
