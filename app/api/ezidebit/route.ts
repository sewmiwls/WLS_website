import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma"; // Adjust path as needed

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const get = (key: string) => form.get(key)?.toString() || null;

  const data = {
    uref: get("uref") ?? "",
    cref: get("cref") ?? "",
    fname: get("fname") ?? "",
    lname: get("lname") ?? "",
    email: get("email") ?? "",
    mobile: get("mobile") ?? "",
    addr: get("addr") ?? "",
    addr2: get("addr2") ?? "",
    suburb: get("suburb") ?? "",
    state: get("state") ?? "",
    pcode: get("pcode") ?? "",
    rdate: get("rdate") ?? "",
    ramount: get("ramount") ?? "",
    freq: get("freq") ?? "",
    odate: get("odate") ?? "",
    oamount: get("oamount") ?? "",
    numpayments: get("numpayments") ?? "",
    totalamount: get("totalamount") ?? "",
    method: get("method") ?? "",
  };

  try {
    await prisma.payment.create({ data });

    const pendingSubmission = await prisma.pendingSubmission.findUnique({
      where: { uref: data.uref },
    });

    if (!pendingSubmission) {
      console.error("No pending submission found for uref:", data.uref);
      return new NextResponse("Invalid payment reference", { status: 400 });
    }

    // Build the URL to redirect to
    const redirectUrl = `/getListed/success?uref=${data.uref}&amount=${
      data.totalamount || "0"
    }&method=${data.method || ""}&cref=${data.cref || ""}`;

    // Return an HTML page with meta refresh and JS redirect
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="refresh" content="0; url=${redirectUrl}" />
        <script>window.location.href = "${redirectUrl}";</script>
        <title>Redirecting...</title>
      </head>
      <body>
        <p>Redirecting to <a href="${redirectUrl}">success page</a>...</p>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (err) {
    console.error("Error saving payment:", err);
    return new NextResponse("Failed to save payment", { status: 500 });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     console.log("Fetching payments and submissions...");

//     // 1. Get all payments with their pre-submissions (if they exist)
//     const payments = await prisma.payment.findMany({
//       include: {
//         preSubmission: true,
//       },
//     });

//     console.log(`Found ${payments.length} payments`);

//     // 2. Get all pending submissions that DON'T have a payment
//     // Note: Make sure the field name matches your schema exactly
//     const pendingSubmissions = await prisma.pendingSubmission.findMany({
//       where: {
//         Payment: null, // This should match your schema field name exactly
//       },
//     });

//     console.log(`Found ${pendingSubmissions.length} pending submissions`);

//     // 3. Transform the data
//     const paidRecords = payments.map((payment) => {
//       if (payment.preSubmission) {
//         // Payment with pre-submission data
//         return {
//           id: payment.id,
//           uref: payment.uref,
//           status: "paid",
//           paymentData: payment,
//           submissionData: payment.preSubmission,
//           // Combine key fields for easier access
//           firstName: payment.preSubmission.firstName,
//           lastName: payment.preSubmission.lastName,
//           email: payment.preSubmission.email,
//           businessName: payment.preSubmission.businessName,
//           totalAmount: payment.totalamount || payment.oamount,
//           createdAt: payment.createdAt,
//         };
//       } else {
//         // Payment without pre-submission (legacy data)
//         return {
//           id: payment.id,
//           uref: payment.uref,
//           status: "paid_legacy",
//           paymentData: payment,
//           submissionData: null,
//           // Use payment data as fallback
//           firstName: payment.fname,
//           lastName: payment.lname,
//           email: payment.email,
//           businessName: "N/A",
//           totalAmount: payment.totalamount || payment.oamount,
//           createdAt: payment.createdAt,
//         };
//       }
//     });

//     const pendingRecords = pendingSubmissions.map((submission) => ({
//       id: submission.id,
//       uref: submission.uref,
//       status: "pending",
//       paymentData: null,
//       submissionData: submission,
//       // Use submission data
//       firstName: submission.firstName,
//       lastName: submission.lastName,
//       email: submission.email,
//       businessName: submission.businessName,
//       totalAmount:
//         typeof submission.totals === "object" &&
//         submission.totals !== null &&
//         "total" in submission.totals
//           ? (submission.totals as { total?: string | number })?.total ?? "0"
//           : "0",
//       createdAt: submission.createdAt,
//     }));

//     // 4. Combine and sort by creation date
//     const allRecords = [...paidRecords, ...pendingRecords].sort(
//       (a, b) =>
//         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     );

//     console.log(`Returning ${allRecords.length} total records`);

//     return NextResponse.json({
//       success: true,
//       data: allRecords,
//       summary: {
//         total: allRecords.length,
//         paid: paidRecords.length,
//         pending: pendingRecords.length,
//       },
//     });
//   } catch (err) {
//     console.error("Error fetching combined payment records:", err);
//     const errorMessage =
//       err && typeof err === "object" && "message" in err
//         ? (err as { message: string }).message
//         : String(err);
//     console.error("Error details:", errorMessage);

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to fetch payments",
//         details: errorMessage,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching payments and submissions...");

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const skip = (page - 1) * pageSize;

    // 1. Get total counts first
    const totalPayments = await prisma.payment.count();
    const totalPendingSubmissions = await prisma.pendingSubmission.count({
      where: { Payment: null },
    });

    // 2. Get all records and combine them first
    const allPayments = await prisma.payment.findMany({
      include: { preSubmission: true },
    });

    const allPendingSubmissions = await prisma.pendingSubmission.findMany({
      where: { Payment: null },
    });

    // 3. Transform the data
    const paidRecords = allPayments.map((payment) => {
      if (payment.preSubmission) {
        return {
          id: payment.id,
          uref: payment.uref,
          status: "paid",
          paymentData: payment,
          submissionData: payment.preSubmission,
          firstName: payment.preSubmission.firstName,
          lastName: payment.preSubmission.lastName,
          email: payment.preSubmission.email,
          businessName: payment.preSubmission.businessName,
          totalAmount: payment.totalamount || payment.oamount,
          createdAt: payment.createdAt,
        };
      } else {
        return {
          id: payment.id,
          uref: payment.uref,
          status: "paid_legacy",
          paymentData: payment,
          submissionData: null,
          firstName: payment.fname,
          lastName: payment.lname,
          email: payment.email,
          businessName: "N/A",
          totalAmount: payment.totalamount || payment.oamount,
          createdAt: payment.createdAt,
        };
      }
    });

    const pendingRecords = allPendingSubmissions.map((submission) => ({
      id: submission.id,
      uref: submission.uref,
      status: "pending",
      paymentData: null,
      submissionData: submission,
      firstName: submission.firstName,
      lastName: submission.lastName,
      email: submission.email,
      businessName: submission.businessName,
      totalAmount:
        typeof submission.totals === "object" &&
        submission.totals !== null &&
        "total" in submission.totals
          ? (submission.totals as { total?: string | number })?.total ?? "0"
          : "0",
      createdAt: submission.createdAt,
    }));

    // 4. Combine and sort ALL records
    const allRecords = [...paidRecords, ...pendingRecords].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // 5. Apply pagination to the combined, sorted result
    const totalRecords = allRecords.length;
    const paginatedRecords = allRecords.slice(skip, skip + pageSize);

    console.log(
      `Returning ${paginatedRecords.length} of ${totalRecords} total records`
    );

    return NextResponse.json({
      success: true,
      data: paginatedRecords,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalRecords: totalRecords,
        totalPages: Math.ceil(totalRecords / pageSize),
        hasNextPage: page < Math.ceil(totalRecords / pageSize),
        hasPreviousPage: page > 1,
      },
      summary: {
        total: totalRecords,
        paid: paidRecords.length,
        pending: pendingRecords.length,
      },
    });
  } catch (err) {
    console.error("Error fetching combined payment records:", err);
    const errorMessage =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : String(err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch payments",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
