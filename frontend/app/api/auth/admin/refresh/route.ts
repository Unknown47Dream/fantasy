import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token found" }, { status: 401 });
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
      refreshToken,
    });
    const data = response.data;
    const { access_token } = data;
    cookieStore.set("auth_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Refresh error:", error);
    if (axios.isAxiosError(error)) {
      // Refresh token invalid or expired - clear cookies
      const cookieStore = await cookies();
      cookieStore.delete("auth_token");
      cookieStore.delete("refresh_token");
      return NextResponse.json(
        { error: error.response?.data?.message || "Refresh token invalid" },
        { status: error.response?.status || 401 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
