import { hashPassword, isPasswordValid } from "@/components/utils/helpers";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, oldPassword, newPassword } = await request.json();
    if (!name || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Name, Old and New Passwords are required" },
        { status: 400 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://www.wherelocalsearch.com.au";
    const userRes = await fetch(`${baseUrl}/api/user?username=admin`);
    if (!userRes.ok) {
      return NextResponse.json(
        { message: "Admin user not found" },
        { status: 404 }
      );
    }

    const adminUser = await userRes.json();
    const ADMIN_PASSWORD = adminUser[0]?.password;

    if (
      oldPassword !== process.env.ADMIN_PASSWORD &&
      !(await isPasswordValid(oldPassword, ADMIN_PASSWORD))
    ) {
      return NextResponse.json(
        { message: "Invalid old password" },
        { status: 401 }
      );
    }

    const editUser = await prisma.user.update({
      where: { name: "admin" },
      data: {
        name,
        password: await hashPassword(newPassword), // Assuming newPassword is already hashed
      },
    });

    return NextResponse.json(editUser, { status: 201 });
  } catch (error) {
    console.error("Error changin password for user:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
