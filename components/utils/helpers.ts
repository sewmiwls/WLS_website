import { hashPassword, isPasswordValid } from "@/components/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory admin user
let adminUser = {
  id: "1",
  name: "admin",
  password: "",
};

// Initialize password once
async function initializeAdmin() {
  if (!adminUser.password) {
    adminUser.password = await hashPassword("admin123");
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeAdmin();

    const { name, oldPassword, newPassword } = await request.json();

    if (!name || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Name, Old and New Passwords are required" },
        { status: 400 }
      );
    }

    const validPassword = await isPasswordValid(
      oldPassword,
      adminUser.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid old password" },
        { status: 401 }
      );
    }

    adminUser.name = name;
    adminUser.password = await hashPassword(newPassword);

    return NextResponse.json(
      {
        message: "Password changed successfully.",
        user: {
          id: adminUser.id,
          name: adminUser.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password:", error);

    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}