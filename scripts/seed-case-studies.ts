import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function seedCaseStudies() {
  console.log("Seeding case studies...");

  // Uniformsready case study
  await prisma.caseStudy.upsert({
    where: { slug: "uniformsready" },
    update: {},
    create: {
      slug: "uniformsready",
      published: true,
      client: "Uniformsready",
      website: "www.uniformsready.com.au",
      title: "Fashion Ecommerce Growth",
      subtitle: "235.86% Increase in Organic Keywords",
      primaryMetricValue: "235.86%",
      primaryMetricLabel: "Increase in Organic Keywords",
      timeline: "12 months",
      tags: ["E-commerce", "SEO", "Content Strategy", "Fashion"],
      overviewChallenge:
        "Uniforms Ready had great products and retail presence but no digital traction.",
      overviewSolution:
        "Implemented enterprise SEO and content strategy without link building.",
      overviewResults:
        "Achieved 235.86% increase in organic keywords in just 1 year.",
      clientDescription: [
        "Uniforms Ready is a men's fashion brand based out of Melbourne Vic.",
        "Uniforms Ready came to us wanting to increase the sales from their e-commerce.",
        "They already had a great product and presence in some retail outlets, but no traction in the digital world.",
      ],
      clientGoals: [
        "Increase e-commerce sales",
        "Build digital presence",
        "Improve search visibility",
      ],
      planDescription: [
        'Uniforms Ready was hesitant to start a full SEO program because of the general skepticism of search engine optimization that is prevalent in our industry today. So, we decided to work with them on one Enterprise SEO service first, before we added on other services like Outreach Link Building to "test the waters".',
      ],
      planApproach: [
        "Start with Enterprise SEO service only",
        "Prove ROI before expanding services",
        "Focus on on-page optimization first",
      ],
      executionDescription:
        "Our execution focused on three key areas to maximize impact without link building.",
      executionStrategies: [
        {
          title: "E-commerce On Page Optimization",
          description:
            "We worked with the product team to optimize the URLs & product information for 120+ products.",
        },
        {
          title: "Content Strategy",
          description:
            "In-depth research & analysis of competitors to identify how they bring in traffic using content marketing and reverse engineer it so we can outrank them and bring the traffic to our website instead of theirs.",
        },
        {
          title: "Content Creation",
          description:
            "We worked hand-in-hand with their content team to help train & guide them on how to write the content we discovered in our Content Strategy so that it would index & show up for as many possible relevant search terms.",
        },
      ],
      resultsDescription:
        "In just 1 year we achieved remarkable results without any link building.",
      resultsMetrics: [
        {
          value: "235.86%",
          label: "Increase in Organic Keywords",
          description:
            "Primary metric showing dramatic improvement in search visibility",
        },
        {
          value: "120+",
          label: "Products Optimized",
          description: "Complete optimization of product catalog",
        },
        {
          value: "12",
          label: "Months Timeline",
          description: "Achieved results in just one year",
        },
      ],
      beforeText: "Limited organic visibility with minimal keyword rankings",
      beforeImageUrl: "/images/before.png.webp",
      afterText:
        "Strong organic presence with 235.86% increase in keyword performance",
      afterImageUrl: "/images/after.png.webp",
      createdBy: "admin",
    },
  });

  // SV Towings case study
  await prisma.caseStudy.upsert({
    where: { slug: "svtowings" },
    update: {},
    create: {
      slug: "svtowings",
      published: true,
      client: "SV Towings Darwin",
      website: "http://www.svtowing.com.au/",
      title: "Customer Calls Growth",
      subtitle: "33% Increase in New Customer Calls",
      primaryMetricValue: "33%",
      primaryMetricLabel: "Increase in New Customer Calls",
      timeline: "12 months",
      tags: ["Lead Generation", "Content Marketing", "Tech"],
      overviewChallenge:
        "SV Towing had a new website but no one could find it online, resulting in limited customer acquisition.",
      overviewSolution:
        "Implemented comprehensive technical SEO fixes, local optimization, and map pack strategies.",
      overviewResults:
        "Achieved 100% page one rankings and 33% increase in customer calls through Google My Business.",
      clientDescription: [
        "SV Towing is a highly reviewed and sought after towing services in Darwin Northern Territory.",
        "They came to us after they had received a new website but noticed that no one could find their website online.",
        "The goal was to rank them on top of the WLS for keywords like 'Towing Services in Darwin' and 'Car removals in NT', as well as dozens of other keywords that would generate new customers for their business.",
        "One of their concerns about work with a new company was that the old company did not share any SEO reports or had any transparency about the work they were doing.",
      ],
      clientGoals: [
        "Increase customer retention",
        "Build digital presence",
        "Improve search visibility",
      ],
      planDescription: [
        "Fix technical SEO issues that were found on the website that was holding his website back from its full potential.",
        "At the time of our initial engagement, there was a laundry list of errors inside of their Google Search Console as well as on their website.",
        "We needed to fix these things ASAP if they wanted a fighting chance at ranking.",
        "Optimize their Google Map Listing. They had duplicate listings for their office that was confusing google on which one to show, as a result, they showed in the Map Pack very rarely. We needed to combine the duplicate listing and optimize it to show up for more search keywords.",
        "Build a local SEO campaign to get SV Towing ranking higher on the WLS for not only their main keywords but also some specialty ones they requested like 'Cash for cars'. We needed to take a more long term approach to how their website was structured. By doing so it allowed us to rank for numerous keywords, with less link building resulting in a much lower cost for the client.",
      ],
      planApproach: [
        "Consolidate and optimize Google Maps listing to improve local visibility",
        "Implement comprehensive local SEO campaign focusing on multiple keywords",
        "Restructure website architecture for better keyword coverage",
      ],
      executionDescription:
        "Our execution focused on four key areas to maximize impact and drive measurable results.",
      executionStrategies: [
        {
          title: "Technical SEO",
          description:
            "To get the process started, our SEO team conducted a Technical and Quality Audit to find out where the weaknesses were on the website.",
        },
        {
          title: "Analytics Set Up",
          description:
            "We set up Custom Events with the use of Google Tags to track conversions as well as helped SV Towings calculate the Value Per Lead or VPL. This helped us understand how website visitors were interacting with the website. We could see where people were coming in, dropping off and or converting to a lead.",
        },
        {
          title: "Map Pack Optimization",
          description:
            "Supplement their organic SEO rankings with Google 03 Map pack optimization.",
        },
        {
          title: "Outreach Link Building",
          description:
            "Once the foundational links were in place it was time to start a more aggressive outreach link building campaign to build more authority in their market. Because of the new structure, it allowed us to power-up what we call 'Hub Pages', cutting link costs for the client dramatically.",
        },
      ],
      resultsDescription:
        "Through our comprehensive SEO and local optimization strategy, we achieved significant improvements across all key metrics.",
      resultsMetrics: [
        {
          value: "100%",
          label: "Keywords on Page One",
          description: "Achieved page one rankings for all desired keywords",
        },
        {
          value: "72%",
          label: "Maps Engagement Increase",
          description: "Dramatic increase in Google Maps listing traffic",
        },
        {
          value: "33%",
          label: "More Phone Calls",
          description: "Weekly increase in calls from Google My Business",
        },
      ],
      beforeText:
        "Limited visibility in local search and minimal Map Pack presence",
      beforeImageUrl: null,
      afterText: "Dominant local presence with increased engagement and calls",
      afterImageUrl: "/images/SV-Towing-Insight.webp",
      createdBy: "admin",
    },
  });

  console.log("Case studies seeded successfully!");
}

seedCaseStudies()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
