import { NextRequest, NextResponse } from "next/server";

// Dummy function to generate a PDF Buffer
async function generateReceiptPdf(orderData: any): Promise<Buffer> {
  const pdfHeader =
    "%PDF-1.4\n%âãÏÓ\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<<>>\n%%EOF";

  return Buffer.from(pdfHeader, "utf-8");
}

export async function GET(req: NextRequest) {
  const uref = req.nextUrl.searchParams.get("uref");

  if (!uref) {
    return NextResponse.json(
      { error: "Missing order reference" },
      { status: 400 }
    );
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
    };

    const pdfBuffer = await generateReceiptPdf(orderData);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${uref}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating receipt:", error);

    return NextResponse.json(
      { error: "Failed to generate receipt" },
      { status: 500 }
    );
  }
}