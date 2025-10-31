import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized - Admin token required" }, { status: 401 });
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        email,
        password,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const data = response.data;
    return NextResponse.json(
      {
        success: true,
        admin: {
          id: data.admin.id,
          email: data.admin.email,
          role: data.admin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data?.message || "Registration failed" },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
