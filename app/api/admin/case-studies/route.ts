import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// GET all case studies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const where = published === "true" ? { published: true } : {};

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(caseStudies, { status: 200 });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

// POST create new case study
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const caseStudy = await prisma.caseStudy.create({
      data: {
        slug: body.slug,
        published: body.published || false,
        client: body.client,
        website: body.website,
        title: body.title,
        subtitle: body.subtitle,
        primaryMetricValue: body.primaryMetricValue,
        primaryMetricLabel: body.primaryMetricLabel,
        timeline: body.timeline,
        tags: body.tags || [],
        overviewChallenge: body.overviewChallenge,
        overviewSolution: body.overviewSolution,
        overviewResults: body.overviewResults,
        clientDescription: body.clientDescription || [],
        clientGoals: body.clientGoals || [],
        planDescription: body.planDescription || [],
        planApproach: body.planApproach || [],
        executionDescription: body.executionDescription,
        executionStrategies: body.executionStrategies || [],
        resultsDescription: body.resultsDescription,
        resultsMetrics: body.resultsMetrics || [],
        beforeText: body.beforeText,
        beforeImageUrl: body.beforeImageUrl,
        afterText: body.afterText,
        afterImageUrl: body.afterImageUrl,
        createdBy: body.createdBy,
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { error: "Failed to create case study" },
      { status: 500 }
    );
  }
}

// PUT update case study
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data: {
        slug: data.slug,
        published: data.published,
        client: data.client,
        website: data.website,
        title: data.title,
        subtitle: data.subtitle,
        primaryMetricValue: data.primaryMetricValue,
        primaryMetricLabel: data.primaryMetricLabel,
        timeline: data.timeline,
        tags: data.tags,
        overviewChallenge: data.overviewChallenge,
        overviewSolution: data.overviewSolution,
        overviewResults: data.overviewResults,
        clientDescription: data.clientDescription,
        clientGoals: data.clientGoals,
        planDescription: data.planDescription,
        planApproach: data.planApproach,
        executionDescription: data.executionDescription,
        executionStrategies: data.executionStrategies,
        resultsDescription: data.resultsDescription,
        resultsMetrics: data.resultsMetrics,
        beforeText: data.beforeText,
        beforeImageUrl: data.beforeImageUrl,
        afterText: data.afterText,
        afterImageUrl: data.afterImageUrl,
      },
    });

    return NextResponse.json(caseStudy, { status: 200 });
  } catch (error) {
    console.error("Error updating case study:", error);
    return NextResponse.json(
      { error: "Failed to update case study" },
      { status: 500 }
    );
  }
}

// DELETE case study
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await prisma.caseStudy.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Case study deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting case study:", error);
    return NextResponse.json(
      { error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
