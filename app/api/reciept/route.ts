import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Dummy function to generate a PDF Buffer (replace with real PDF generation)
async function generateReceiptPdf(orderData: any): Promise<Buffer> {
  // In production, use a library like pdfkit or @react-pdf/renderer
  // Here, just return a simple PDF header for demonstration
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

  // Fetch order data from your database or service here
  // For example, you might fetch from a database using Prisma:
  const orderData = await prisma.pendingSubmission.findUnique({
    where: { uref },
    include: { Payment: true },
  });

  // Generate PDF buffer
  const pdfBuffer = await generateReceiptPdf(orderData);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="receipt-${uref}.pdf"`,
    },
  });
}
