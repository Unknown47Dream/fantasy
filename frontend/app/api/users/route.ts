import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const take = searchParams.get("take");
    const queryParams = new URLSearchParams();
    if (page) queryParams.append("page", page);
    if (take) queryParams.append("take", take);
    const queryString = queryParams.toString();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/users${
      queryString ? `?${queryString}` : ""
    }`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Backend request error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || "Failed to fetch users" },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to communicate with backend server" },
      { status: 500 }
    );
  }
}
