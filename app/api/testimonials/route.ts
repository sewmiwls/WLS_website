import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// For App Router (app/api/testimonials/route.ts)
export async function GET() {
  try {
    const testimonials = await prisma.post.findMany();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const { name, content, authorId } = await request.json();
//     if (!name || !authorId) {
//       return NextResponse.json(
//         { error: "Name and authorId are required." },
//         { status: 400 }
//       );
//     }

//     const newTestimonial = await prisma.post.create({
//       data: {
//         title: name,
//         content: content,
//         published: true,
//         author: {
//           connect: { id: authorId },
//         },
//       },
//     });
//     return NextResponse.json(newTestimonial);
//   } catch (error) {
//     console.error("Error creating testimonial:", error);
//     return NextResponse.json(
//       { error: "Failed to create testimonial" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const { name, content, authorId } = await request.json();

    if (!name || !authorId) {
      return NextResponse.json(
        { error: "Name and authorId are required." },
        { status: 400 }
      );
    }

    const newTestimonial = await prisma.post.create({
      data: {
        title: name,
        content: content || null,
        published: true,
        author: {
          connect: { id: authorId },
        },
      },
    });

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

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
