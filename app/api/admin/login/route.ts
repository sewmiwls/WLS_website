import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Environment variables වලින් හෝ hardcoded credentials ගන්න
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (username !== adminUsername) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Password එක plain text එකක් එක්ක compare කිරීම හෝ Direct Compare කිරීම
    let isValid = false;

    if (adminPasswordHash) {
      // Hashed password එකක් තියෙනවා නම් bcrypt මගින් check කිරීම
      isValid = await bcrypt.compare(password, adminPasswordHash);
    } else {
      // Direct hardcoded password එකක් test කිරීමට අවශ්‍ය නම් (Optional)
      isValid = password === (process.env.ADMIN_PASSWORD || "admin123");
    }

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}