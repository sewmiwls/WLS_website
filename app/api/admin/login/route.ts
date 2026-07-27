import { hashPassword, isPasswordValid } from "@/components/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    // Fetch admin user from the API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://www.wherelocalsearch.com.au";
    const userRes = await fetch(`${baseUrl}/api/user?username=${username}`);
    if (!userRes.ok) {
      return NextResponse.json(
        { message: "Admin user not found" },
        { status: 404 }
      );
    }

    // yourSuperSecretKey
    const adminUser = await userRes.json();
    const ADMIN_PASSWORD = adminUser[0]?.password;

    if (
      password === process.env.ADMIN_PASSWORD ||
      (await isPasswordValid(password, ADMIN_PASSWORD))
    ) {
      const response = NextResponse.json({ message: "Login successful" });

      response.cookies.set("admin_token", "valid", {
        httpOnly: false, // Remove httpOnly
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
      // Save user id in a cookie
      response.cookies.set("admin_name", adminUser[0]?.name?.toString() || "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });

      return response;
    }

    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}