import { hashPassword, isPasswordValid } from "@/components/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

// Temporary admin user (memory only)
let adminUser = {
  id: "1",
  name: "admin",
  password: await hashPassword("admin123"), // Default password
};

export async function POST(request: NextRequest) {
  try {
    const { name, oldPassword, newPassword } = await request.json();

    if (!name || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Name, Old and New Passwords are required" },
        { status: 400 }
      );
    }

    // Check old password
    if (!(await isPasswordValid(oldPassword, adminUser.password))) {
      return NextResponse.json(
        { message: "Invalid old password" },
        { status: 401 }
      );
    }

    // Update in memory
    adminUser = {
      ...adminUser,
      name,
      password: await hashPassword(newPassword),
    };

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