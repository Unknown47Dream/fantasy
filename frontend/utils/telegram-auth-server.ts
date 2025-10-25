/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from "crypto";
import { NextRequest } from "next/server";

interface ParsedInitData {
  user?: {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    allows_write_to_pm?: boolean;
    photo_url?: string;
  };
  auth_date: number;
  hash: string;
  query_id?: string;
  chat_instance?: string;
  chat_type?: string;
  start_param?: string;
}

export function parseInitData(initData: string): ParsedInitData {
  const params = new URLSearchParams(initData);
  const data: any = {};

  for (const [key, value] of params.entries()) {
    if (key === "user") {
      data.user = JSON.parse(value);
    } else if (key === "auth_date") {
      data.auth_date = parseInt(value);
    } else {
      data[key] = value;
    }
  }

  return data as ParsedInitData;
}

export function validateInitData(initData: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");

  if (!hash) return false;

  // Remove hash from params
  params.delete("hash");

  // Create data check string
  const dataCheckString = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  // Calculate secret key
  const botToken = process.env.TELEGRAM_BOT_TOKEN!;
  const secret = crypto.createHmac("sha256", "WebAppData").update(botToken).digest();

  // Calculate hash
  const calculatedHash = crypto.createHmac("sha256", secret).update(dataCheckString).digest("hex");

  return calculatedHash === hash;
}

export async function authenticateRequest(req: NextRequest) {
  const initData = req.headers.get("X-Telegram-Init-Data");

  if (!initData) {
    return {
      success: false,
      error: "No authentication data provided",
      user: null,
    };
  }

  // Validate signature
  if (!validateInitData(initData)) {
    return {
      success: false,
      error: "Invalid authentication signature",
      user: null,
    };
  }

  // Parse data
  const parsedData = parseInitData(initData);

  // Check auth_date (optional - for preventing old data reuse)
  const MAX_AUTH_AGE = 86400; // 24 hours in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  if (currentTime - parsedData.auth_date > MAX_AUTH_AGE) {
    return {
      success: false,
      error: "Authentication data expired",
      user: null,
    };
  }

  // Get user from database
  if (!parsedData.user) {
    return {
      success: false,
      error: "No user data in authentication",
      user: null,
    };
  }

  const telegramId = parsedData.user.id.toString();
  const [dbUser] = await db.select().from(users).where(eq(users.telegramId, telegramId)).limit(1);

  if (!dbUser) {
    return {
      success: false,
      error: "User not found in database",
      user: null,
    };
  }

  return {
    success: true,
    user: dbUser,
    telegramUser: parsedData.user,
  };
}
