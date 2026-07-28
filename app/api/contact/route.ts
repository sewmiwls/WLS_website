import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Database save removed
    const contact = {
      id: Date.now().toString(),
      ...validatedData,
      status: "NEW",
      createdAt: new Date(),
    };

    await sendEmailNotification(contact);

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        id: contact.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    return NextResponse.json({
      contacts: [],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0,
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(contact: any) {
  console.log("New contact submission:", contact);
}