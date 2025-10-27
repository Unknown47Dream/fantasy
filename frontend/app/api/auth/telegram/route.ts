import { NextRequest, NextResponse } from "next/server";
import { validate, parse } from "@telegram-apps/init-data-node";

export async function POST(req: NextRequest) {
  const BOT_TOKEN = process.env.NEXT_PUBLIC_BOT_TOKEN;
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }
  const authHeader = req.headers.get("Authorization");
  const [authType, initDataRaw] = authHeader?.split(" ") || [];
  if (authType !== "tma" || !initDataRaw) {
    return NextResponse.json(
      { error: "Unauthorized: Missing or incorrect init data" },
      { status: 401 }
    );
  }
  try {
    validate(initDataRaw, BOT_TOKEN, {
      expiresIn: 24 * 60 * 60,
    });
    const initData = parse(initDataRaw);
    const user = initData.user;
    if (!user) {
      return NextResponse.json({ error: "User data not found in init data" }, { status: 401 });
    }
    return NextResponse.json({ message: "Authentication successful", user: user });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
