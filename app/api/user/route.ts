import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Temporary in-memory users
let users: any[] = [];

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// GET - Get all users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("username");

    const filteredUsers = name
      ? users.filter((user) =>
          user.name.toLowerCase().includes(name.toLowerCase())
        )
      : users;

    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 }
      );
    }

    // Check duplicate email
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    users.push(newUser);

    return NextResponse.json(newUser, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}