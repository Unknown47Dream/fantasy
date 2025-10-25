import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // if (!req.nextUrl.pathname.startsWith("/api")) {
  //   return NextResponse.next();
  // }
  // if (req.nextUrl.pathname === "/api/telegram-webhook") {
  //   const token = req.headers.get("X-Telegram-Bot-Api-Secret-Token");
  //   if (token === process.env.TELEGRAM_WEBHOOK_SECRET_TOKEN) {
  //     return NextResponse.next();
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
