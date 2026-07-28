import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory testimonials
let testimonials = [
  {
    id: "1",
    title: "Excellent Service",
    content: "Very professional and highly recommended.",
    published: true,
    authorId: "system",
  },
  {
    id: "2",
    title: "Great Experience",
    content: "The team was friendly and helpful.",
    published: true,
    authorId: "system",
  },
];

// GET - Get all testimonials
export async function GET() {
  try {
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}

// POST - Add new testimonial
export async function POST(request: NextRequest) {
  try {
    const { name, content, authorId } = await request.json();

    if (!name || !authorId) {
      return NextResponse.json(
        { error: "Name and authorId are required." },
        { status: 400 }
      );
    }

    const newTestimonial = {
      id: Date.now().toString(),
      title: name,
      content: content || "",
      published: true,
      authorId,
    };

    testimonials.push(newTestimonial);

    return NextResponse.json({
      message: "Testimonial created successfully.",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}

// DELETE - Delete testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    testimonials = testimonials.filter((item) => item.id !== id);

    return NextResponse.json({
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}