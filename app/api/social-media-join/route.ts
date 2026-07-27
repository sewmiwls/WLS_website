import { NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbypIgu37iu5EaR7T39yDptuLBTsFwzZ3kppQNjqvPuG140z5MsVUi2Cm_HO6Xt20hOk/exec";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: body.firstName || "",
        lastName: body.lastName || "",
        mobileNumber: body.mobileNumber || "",
        email: body.email || "",
        businessName: body.businessName || "",
        abnNumber: body.abnNumber || "",
        businessAddress: body.businessAddress || "",
        businessPhoneNumber: body.businessPhoneNumber || "",
        message: body.message || "",
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to save data to Google Sheet.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully.",
    });
  } catch (error) {
    console.error("Social Media Join Form Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}