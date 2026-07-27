// scripts/create-missing-submissions.js
import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function createMissingPendingSubmissions() {
  try {
    console.log("Starting to create missing pending submissions...");

    // Get all payments that have a uref
    const payments = await prisma.payment.findMany({
      where: {
        uref: { not: null },
      },
    });

    console.log(`Found ${payments.length} payments with uref`);

    for (const payment of payments) {
      if (!payment.uref) continue;

      // Check if pending submission already exists
      const existingSubmission = await prisma.pendingSubmission.findUnique({
        where: { uref: "DDR-1751355836531-678" },
      });

      if (!existingSubmission) {
        console.log(`Creating pending submission for uref: ${payment.uref}`);

        await prisma.pendingSubmission.create({
          data: {
            uref: payment.uref,
            firstName: "Ahamed",
            lastName: "Mustak",
            businessName: "Where Local Search",
            entityType: "ABN",
            entity: "11111111111",
            email: "mustak.vic@gmail.com",
            phone: "0402200018",
            address: "123 hiho",
            suburb: "Caroline Springs",
            state: "VIC",
            postcode: "3023",
            businessOrPerson: "1",
            selectedPackage: "package1",
            requirements: "Migrated from existing payment",
            businessCategories: ["Service", "Local Search Optimization", "SEO"],
            termsAccepted: true,
            privacyAccepted: true,
            totals: {
                setup: 1.10,
                monthly: 1.10,
                total: 2.20,
            },
          },
        });
      } else {
        console.log(
          `Pending submission already exists for uref: ${payment.uref}`
        );
      }
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createMissingPendingSubmissions();
