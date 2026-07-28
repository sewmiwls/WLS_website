import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uref = searchParams.get("uref");

  if (!uref) {
    return new NextResponse("Order reference required", { status: 400 });
  }

  try {
    // Static order data (Database removed)
    const orderData = {
      uref,
      firstName: "John",
      lastName: "Doe",
      businessName: "Demo Business",
      email: "john@example.com",
      phone: "+61 400 000 000",
      selectedPackage: "Starter Package",
      setupAmount: 0,
      monthlyAmount: 0,
      totalAmount: 0,
      paymentMethod: "Direct Debit",
      paymentReference: "N/A",
      createdAt: new Date(),
      paymentDate: null,
    };

    return NextResponse.json(orderData);
  } catch (error) {
    console.error("Error fetching order details:", error);

    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}