import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma"; // Adjust path as needed

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const submissions = await prisma.pendingSubmission.findMany({
      include: {
        Payment: true, // Include related payments if needed
      },
    });
    return NextResponse.json(submissions);
  } catch (error: any) {
    console.error("[GET_SUBMISSIONS_ERROR]", error); // ⬅ Full error log here

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch submissions",
        error: error?.message ?? "Unknown error",
        fullError: error.toString(), // ⬅ Full error object for debugging
      },
      { status: 500 }
    );
  }
}

/**
 * [{"id":"cmck835zr0000090wdx0m5n3u","uref":"","cref":"53394654","fname":"Ahamed","lname":"Mustak","email":"mustak.vic@gmail.com","mobile":"0402200018","addr":"123 hiho","addr2":null,"suburb":"Caroline springs","state":"VIC","pcode":"3023","rdate":"02/07/2025","ramount":"1.10","freq":"4","odate":"02/07/2025","oamount":"1.10","numpayments":null,"totalamount":"2.20","method":"1","createdAt":"2025-07-01T07:45:06.326Z"}]
 */
