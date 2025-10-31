import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Get me error:", error);
    if (axios.isAxiosError(error)) {
      // Token is invalid, clear cookie
      const cookieStore = await cookies();
      cookieStore.delete("auth_token");
      return NextResponse.json(
        { error: error.response?.data?.message || "Unauthorized" },
        { status: error.response?.status || 401 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
