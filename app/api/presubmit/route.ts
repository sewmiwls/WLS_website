import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma"; // Adjust path as needed
import { z } from "zod";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const submissionSchema = z.object({
  uref: z.string(),
  formData: z.object({
    firstName: z.string(),
    lastName: z.string(),
    businessName: z.string(),
    entityType: z.enum(["ABN", "ACN"]),
    entity: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    suburb: z.string(),
    state: z.string(),
    postcode: z.string(),
    businessOrPerson: z.string(),
    selectedPackage: z.string().nullable(),
    requirements: z.string(),
    businessCategories: z.array(z.string()),
    termsAccepted: z.boolean(),
    privacyAccepted: z.boolean(),
    salesperson: z.string().optional(),
  }),
  totals: z.object({
    setup: z.string(),
    monthly: z.string(),
    total: z.string(),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uref, formData, totals } = submissionSchema.parse(body);

    // 1. Create database entry
    await prisma.pendingSubmission.create({
      data: {
        uref,
        firstName: formData.firstName,
        lastName: formData.lastName,
        businessName: formData.businessName,
        entityType: formData.entityType,
        entity: formData.entity,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        suburb: formData.suburb,
        state: formData.state,
        postcode: formData.postcode,
        businessOrPerson: formData.businessOrPerson,
        selectedPackage: formData.selectedPackage,
        requirements: formData.requirements,
        businessCategories: formData.businessCategories,
        termsAccepted: formData.termsAccepted,
        privacyAccepted: formData.privacyAccepted,
        salesperson: formData.salesperson || null,
        totals,
      },
    });

    console.log("Database entry created successfully");

    // 2. Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing email environment variables");
      return NextResponse.json({
        success: true,
        warning: "Database saved but email not configured",
      });
    }

    // 3. Create transporter with better error handling
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true, // Enable debug logs
      logger: true, // Enable logger
    });

    // 4. Verify transporter configuration
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return NextResponse.json({
        success: true,
        warning: "Database saved but email configuration failed",
        error: (verifyError as Error).message,
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@wherelocalsearch.com.au, cathy@wherelocalsearch.com.au, mustak.vic@gmail.com",
      subject: "New Client Confirmation",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Arial', sans-serif;
            }
          </style>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
            <div style="background-color: #f4a8a8; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #ffffff; font-size: 28px; text-align: center; margin-bottom: 30px; font-family: 'Playfair Display', serif;">✨ New Booking ✨</h2>
              <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
                <div style="margin-bottom: 15px;">
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">UREF:</strong> <span style="float: right;">${uref}</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Name:</strong> <span style="float: right;">${
                    formData.firstName
                  } ${formData.lastName}</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Business Name:</strong> <span style="float: right;">${
                    formData.businessName
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Entity Type:</strong> <span style="float: right;">${
                    formData.entityType
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Entity:</strong> <span style="float: right;">${
                    formData.entity
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Email:</strong> <span style="float: right;">${
                    formData.email
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Phone:</strong> <span style="float: right;">${
                    formData.phone
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Address:</strong> <span style="float: right;">${
                    formData.address
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Suburb:</strong> <span style="float: right;">${
                    formData.suburb
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">State:</strong> <span style="float: right;">${
                    formData.state
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Postcode:</strong> <span style="float: right;">${
                    formData.postcode
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Business/Person:</strong> <span style="float: right;">${
                    formData.businessOrPerson
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Selected Package:</strong> <span style="float: right;">${
                    formData.selectedPackage || "N/A"
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Requirements:</strong> <span style="float: right;">${
                    formData.requirements
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Business Categories:</strong> <span style="float: right;">${formData.businessCategories.join(
                    ", "
                  )}</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Terms Accepted:</strong> <span style="float: right;">${
                    formData.termsAccepted ? "Yes" : "No"
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Privacy Accepted:</strong> <span style="float: right;">${
                    formData.privacyAccepted ? "Yes" : "No"
                  }</span></p>
                  ${
                    formData.salesperson
                      ? `<p style="font-size: 16px; color: #666; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 8px;"><strong style="color: #f4a8a8;">Salesperson:</strong> <span style="float: right;">${formData.salesperson}</span></p>`
                      : ""
                  }
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #f4a8a8;">
                  <h3 style="color: #f4a8a8; margin-bottom: 10px;">Totals</h3>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px;"><strong>Setup:</strong> <span style="float: right;">${
                    totals.setup
                  }</span></p>
                  <p style="font-size: 16px; color: #666; margin-bottom: 8px;"><strong>Monthly:</strong> <span style="float: right;">${
                    totals.monthly
                  }</span></p>
                  <p style="font-size: 18px; color: #f4a8a8; font-weight: bold;"><strong>Total:</strong> <span style="float: right;">${
                    totals.total
                  }</span></p>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 5. Send email with specific error handling
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return NextResponse.json({
        success: true,
        message: "Database entry created and email sent successfully",
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return NextResponse.json({
        success: true,
        warning: "Database entry created but email failed to send",
        emailError: (emailError as Error).message,
      });
    }
  } catch (error: any) {
    console.error("Error in /api/presubmit:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

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
