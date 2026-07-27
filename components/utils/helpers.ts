import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function isPasswordValid(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Helper to set user id in session cookie after login.
 * Call this function after successful login.
 */
export function setUserSessionCookie(response: NextResponse, userId: string) {
  response.cookies.set("admin_id", userId, {
    httpOnly: false, // Set to true for better security
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60,
  });
}
