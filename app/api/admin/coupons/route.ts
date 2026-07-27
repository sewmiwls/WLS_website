import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { message: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, description, type, discount, appliesTo, active } =
      await request.json();

    if (!code || !discount || !type || !appliesTo || !active) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Creating coupon with data:", {
      code,
      description,
      type,
      discount,
      appliesTo,
      active,
    });

    const newCoupon = await prisma.coupon.create({
      data: {
        code,
        description,
        discountType: type,
        discountValue: discount,
        appliesTo,
        active,
      },
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json(
      { message: "Failed to create coupon" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, active } = await request.json();

    if (!id || typeof active !== "boolean") {
      return NextResponse.json(
        { message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: { active },
    });

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.error("Error updating coupon status:", error);
    return NextResponse.json(
      { message: "Failed to update coupon status" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { message: "Missing coupon id" },
        { status: 400 }
      );
    }

    await prisma.coupon.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json(
      { message: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}