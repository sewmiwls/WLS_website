import { NextRequest, NextResponse } from "next/server";

// Temporary in-memory coupons
let coupons = [
  {
    id: "1",
    code: "WELCOME10",
    description: "10% Off",
    discountType: "percentage",
    discountValue: 10,
    appliesTo: "all",
    active: true,
    createdAt: new Date(),
  },
];

// GET
export async function GET() {
  try {
    return NextResponse.json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);

    return NextResponse.json(
      { message: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(request: NextRequest) {
  try {
    const {
      code,
      description,
      type,
      discount,
      appliesTo,
      active,
    } = await request.json();

    if (
      !code ||
      discount === undefined ||
      !type ||
      !appliesTo ||
      active === undefined
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCoupon = {
      id: Date.now().toString(),
      code,
      description,
      discountType: type,
      discountValue: discount,
      appliesTo,
      active,
      createdAt: new Date(),
    };

    coupons.unshift(newCoupon);

    return NextResponse.json(newCoupon, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating coupon:", error);

    return NextResponse.json(
      { message: "Failed to create coupon" },
      { status: 500 }
    );
  }
}

// PATCH
export async function PATCH(request: NextRequest) {
  try {
    const { id, active } = await request.json();

    const index = coupons.findIndex((c) => c.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Coupon not found" },
        { status: 404 }
      );
    }

    coupons[index].active = active;

    return NextResponse.json(coupons[index]);
  } catch (error) {
    console.error("Error updating coupon:", error);

    return NextResponse.json(
      { message: "Failed to update coupon" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    coupons = coupons.filter((coupon) => coupon.id !== id);

    return NextResponse.json({
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting coupon:", error);

    return NextResponse.json(
      { message: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}