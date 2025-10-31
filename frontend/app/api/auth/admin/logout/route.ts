import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (refreshToken) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
          refreshToken,
        });
      } catch {}
    }
    cookieStore.delete("auth_token");
    cookieStore.delete("refresh_token");
    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
