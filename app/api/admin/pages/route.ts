import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// GET all pages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const where = published === "true" ? { published: true } : {};

    const pages = await prisma.page.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        childPages: true,
        parentPage: true,
      },
    });

    return NextResponse.json(pages, { status: 200 });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

// POST create new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.slug || !body.title) {
      return NextResponse.json(
        { error: "Slug and title are required" },
        { status: 400 }
      );
    }

    // Ensure content is not empty
    const content = body.content || "";

    const page = await prisma.page.create({
      data: {
        slug: body.slug,
        title: body.title,
        metaDescription: body.metaDescription || null,
        metaKeywords: body.metaKeywords || [],
        published: body.published || false,
        content: content,
        layout: body.layout || "default",
        showInNav: body.showInNav || false,
        navOrder: body.navOrder || 0,
        parentPageId: body.parentPageId || null,
        featuredImage: body.featuredImage || null,
        customCss: body.customCss || null,
        customJs: body.customJs || null,
        createdBy: body.createdBy || null,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error: any) {
    console.error("Error creating page:", error);
    console.error("Error details:", error.message);
    if (error.code) {
      console.error("Error code:", error.code);
    }
    return NextResponse.json(
      { 
        error: "Failed to create page",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

// PUT update page
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const page = await prisma.page.update({
      where: { id },
      data: {
        slug: data.slug,
        title: data.title,
        metaDescription: data.metaDescription || null,
        metaKeywords: data.metaKeywords || [],
        published: data.published,
        content: data.content || "",
        layout: data.layout || "default",
        showInNav: data.showInNav,
        navOrder: data.navOrder || 0,
        parentPageId: data.parentPageId || null,
        featuredImage: data.featuredImage || null,
        customCss: data.customCss || null,
        customJs: data.customJs || null,
      },
    });

    return NextResponse.json(page, { status: 200 });
  } catch (error: any) {
    console.error("Error updating page:", error);
    console.error("Error details:", error.message);
    return NextResponse.json(
      { 
        error: "Failed to update page",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

// DELETE page
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Page deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
