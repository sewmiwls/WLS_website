import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import React from "react";
import Link from "next/link";
import { PrismaClient } from "@/app/generated/prisma";
import CaseStudiesGrid from "./_components/CaseStudiesGrid";

const prisma = new PrismaClient();

const CaseStudies = async () => {
  // Fetch all published case studies from database
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      client: true,
      title: true,
      subtitle: true,
      primaryMetricValue: true,
      primaryMetricLabel: true,
      tags: true,
      website: true,
      overviewChallenge: true,
    },
  });

  const sampleCaseStudies = caseStudies.map((study) => ({
    slug: study.slug,
    title: study.title,
    client: study.client,
    primaryMetric: {
      value: study.primaryMetricValue,
      label: study.primaryMetricLabel,
    },
    description: study.overviewChallenge || study.subtitle,
    tags: study.tags,
    website: study.website,
  }));

  return (
    <div className="min-h-screen mt-[80px] md:mt-[100px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Header visible={true} />

      {/* Main Content */}
      <div className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs />
          </div>

          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Our</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped businesses like yours achieve remarkable
              growth through data-driven digital marketing strategies and proven
              methodologies.
            </p>
          </div>

          {/* Case Studies Grid */}
          <CaseStudiesGrid caseStudies={sampleCaseStudies} />

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h2>

              <p className="text-slate-300 mb-6">
                Join the ranks of successful businesses that have transformed
                their digital presence with our proven strategies.
              </p>

              <Link
                href="/getListed"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10">
                  Start Your Transformation
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;