import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uref = searchParams.get("uref");

  if (!uref) {
    return new NextResponse("Order reference required", { status: 400 });
  }

  try {
    // Fetch both pending submission and payment data
    const pendingSubmission = await prisma.pendingSubmission.findUnique({
      where: { uref },
      include: {
        Payment: true,
      },
    });

    if (!pendingSubmission) {
      return new NextResponse("Order not found", { status: 404 });
    }

    // Parse the totals JSON from pending submission
    const totals =
      typeof pendingSubmission.totals === "string"
        ? JSON.parse(pendingSubmission.totals)
        : pendingSubmission.totals;

    // Prepare order data
    const orderData = {
      uref: pendingSubmission.uref,
      firstName: pendingSubmission.firstName,
      lastName: pendingSubmission.lastName,
      businessName: pendingSubmission.businessName,
      email: pendingSubmission.email,
      phone: pendingSubmission.phone,
      selectedPackage: pendingSubmission.selectedPackage,
      setupAmount: totals.setup,
      monthlyAmount: totals.monthly,
      totalAmount: totals.total,
      paymentMethod: pendingSubmission.Payment?.method || "Direct Debit",
      paymentReference: pendingSubmission.Payment?.cref || "",
      createdAt: pendingSubmission.createdAt,
      paymentDate: pendingSubmission.Payment?.createdAt || null,
    };

    return NextResponse.json(orderData);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
