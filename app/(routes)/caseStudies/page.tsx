import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import React from "react";
import Link from "next/link";
import CaseStudiesGrid from "./_components/CaseStudiesGrid";

const sampleCaseStudies = [
  {
    slug: "google-business-profile",
    title: "Google Business Profile Growth",
    client: "ABC Plumbing",
    primaryMetric: {
      value: "+250%",
      label: "More Leads",
    },
    description:
      "We helped ABC Plumbing increase local visibility and generate more qualified leads using Local SEO.",
    tags: ["SEO", "Google Maps", "Local SEO"],
    website: "https://example.com",
  },
  {
    slug: "local-seo-success",
    title: "Local SEO Success",
    client: "Melbourne Dental",
    primaryMetric: {
      value: "+180%",
      label: "Organic Traffic",
    },
    description:
      "Complete Local SEO optimisation that dramatically increased website traffic and enquiries.",
    tags: ["SEO", "Google", "Marketing"],
    website: "https://example.com",
  },
  {
    slug: "maps-ranking",
    title: "Google Maps Ranking",
    client: "Sydney Electricians",
    primaryMetric: {
      value: "#1",
      label: "Google Maps",
    },
    description:
      "Ranked on the first position in Google Maps for multiple high-value keywords.",
    tags: ["Maps", "SEO"],
    website: "https://example.com",
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen mt-[80px] md:mt-[100px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Header visible={true} />

      <div className="pt-20 pb-20">
        <div className="container mx-auto px-6">

          <div className="mb-8">
            <Breadcrumbs />
          </div>

          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover how we've helped businesses achieve outstanding growth
              through Local SEO and Google Business Profile optimisation.
            </p>
          </div>

          <CaseStudiesGrid caseStudies={sampleCaseStudies} />

          <div className="text-center mt-20">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h2>

              <p className="text-slate-300 mb-6">
                Let's grow your business with proven Local SEO strategies.
              </p>

              <Link
                href="/contact"
                className="inline-flex px-8 py-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CaseStudies;