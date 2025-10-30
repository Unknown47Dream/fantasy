import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized: Missing Authorization header" },
      { status: 401 }
    );
  }
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
      headers: {
        Authorization: authHeader,
      },
    });
    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Backend request error:", error);
    return NextResponse.json(
      { error: "Failed to communicate with backend server" },
      { status: 500 }
    );
  }
}
