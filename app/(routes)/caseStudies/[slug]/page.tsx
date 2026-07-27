import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

interface CaseStudyData {
  slug: string;
  client: string;
  website: string;
  title: string;
  subtitle: string;
  primaryMetric: {
    value: string;
    label: string;
  };
  timeline: string;
  tags: string[];
  overview: {
    challenge: string;
    solution: string;
    results: string;
  };
  sections: {
    client: {
      description: string[];
      goals: string[];
    };
    plan: {
      description: string[];
      approach: string[];
    };
    execution: {
      description: string;
      strategies: Array<{
        title: string;
        description: string;
      }>;
    };
    results: {
      description: string;
      metrics: Array<{
        value: string;
        label: string;
        description?: string;
      }>;
      beforeAfter?: {
        before: string;
        beforeImg: string | null;
        after: string;
        afterImg: string | null;
      };
    };
  };
}

// Fetch case study data from database
const getCaseStudyData = async (slug: string): Promise<CaseStudyData | null> => {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug, published: true },
    });

    if (!caseStudy) return null;

    // Transform database format to component format
    return {
      slug: caseStudy.slug,
      client: caseStudy.client,
      website: caseStudy.website,
      title: caseStudy.title,
      subtitle: caseStudy.subtitle,
      primaryMetric: {
        value: caseStudy.primaryMetricValue,
        label: caseStudy.primaryMetricLabel,
      },
      timeline: caseStudy.timeline,
      tags: caseStudy.tags,
      overview: {
        challenge: caseStudy.overviewChallenge,
        solution: caseStudy.overviewSolution,
        results: caseStudy.overviewResults,
      },
      sections: {
        client: {
          description: caseStudy.clientDescription,
          goals: caseStudy.clientGoals,
        },
        plan: {
          description: caseStudy.planDescription,
          approach: caseStudy.planApproach,
        },
        execution: {
          description: caseStudy.executionDescription,
          strategies: caseStudy.executionStrategies as Array<{
            title: string;
            description: string;
          }>,
        },
        results: {
          description: caseStudy.resultsDescription,
          metrics: caseStudy.resultsMetrics as Array<{
            value: string;
            label: string;
            description?: string;
          }>,
          beforeAfter:
            caseStudy.beforeText || caseStudy.afterText
              ? {
                  before: caseStudy.beforeText || "",
                  beforeImg: caseStudy.beforeImageUrl || null,
                  after: caseStudy.afterText || "",
                  afterImg: caseStudy.afterImageUrl || null,
                }
              : undefined,
        },
      },
    };
  } catch (error) {
    console.error("Error fetching case study:", error);
    return null;
  }
};

const CaseStudyPage: React.FC<{ params: Promise<{ slug: string }> }> = async ({
  params,
}) => {
  // Await the params Promise
  const { slug } = await params;
  const caseStudy = await getCaseStudyData(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen mt-[80px] md:mt-[100px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Header visible={true} />

      <div className="pt-20 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumbs />

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Case Study
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">{caseStudy.client}</span>
            </h1>

            <p className="text-xl text-slate-300 mb-6">{caseStudy.subtitle}</p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {caseStudy.tags.map((tag) => (
                <span
                  key={`tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-3 py-1 bg-slate-800/60 text-slate-300 text-sm rounded-full border border-slate-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key Metric */}
            <div className="bg-slate-900/50 font-poppins border border-slate-800 rounded-2xl p-8 backdrop-blur-sm mb-12">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                {caseStudy.primaryMetric.value}
              </div>
              <p className="text-slate-300 text-lg font-medium">
                {caseStudy.primaryMetric.label}
              </p>
              <div className="flex justify-center items-center gap-8 mt-6 text-sm text-slate-400">
                <div>
                  <span className="font-medium">Timeline:</span>{" "}
                  {caseStudy.timeline}
                </div>
                <div>
                  <span className="font-medium">Website:</span>{" "}
                  {caseStudy.website}
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-16">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">Overview</h2>
              <div className="grid md:grid-cols-3 gap-6 font-poppins">
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">
                    Challenge
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {caseStudy.overview.challenge}
                  </p>
                </div>
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">
                    Solution
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {caseStudy.overview.solution}
                  </p>
                </div>
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                    Results
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {caseStudy.overview.results}
                  </p>
                </div>
              </div>
            </section>

            {/* The Client */}
            {caseStudy.sections.client.description.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">
                  The Client
                </h2>
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8">
                  <div className="space-y-4 mb-6 font-poppins">
                    {caseStudy.sections.client.description.map(
                      (paragraph, index) => (
                        <p
                          key={index}
                          className="text-slate-300 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      )
                    )}
                  </div>
                  {caseStudy.sections.client.goals.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Goals
                      </h4>
                      <ul className="space-y-2 font-poppins">
                        {caseStudy.sections.client.goals.map((goal, index) => (
                          <li
                            key={index}
                            className="flex items-center text-slate-300"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* The Plan */}
            {caseStudy.sections.plan.description.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">The Plan</h2>
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl font-poppins p-8">
                  {caseStudy.sections.plan.description.map((plan, index) => (
                    <p
                      key={index}
                      className="text-slate-300 leading-relaxed mb-6"
                    >
                      {plan}
                    </p>
                  ))}
                  {caseStudy.sections.plan.approach.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">
                        Approach
                      </h4>
                      <ul className="space-y-2">
                        {caseStudy.sections.plan.approach.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center text-slate-300"
                          >
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* The Execution */}
            {caseStudy.sections.execution.strategies.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">
                  The Execution
                </h2>
                <div className="space-y-6 font-poppins">
                  {caseStudy.sections.execution.description && (
                    <p className="text-slate-300 leading-relaxed text-center">
                      {caseStudy.sections.execution.description}
                    </p>
                  )}
                  <div className="grid gap-6">
                    {caseStudy.sections.execution.strategies.map(
                      (strategy, index) => (
                        <div
                          key={index}
                          className="bg-slate-900/30 border border-slate-800 rounded-xl p-6"
                        >
                          <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                            {strategy.title}
                          </h4>
                          <p className="text-slate-300 leading-relaxed">
                            {strategy.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* The Results */}
            {caseStudy.sections.results.metrics.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">
                  The Results
                </h2>
                <div className="space-y-8 font-poppins">
                  {caseStudy.sections.results.description && (
                    <p className="text-slate-300 leading-relaxed text-center">
                      {caseStudy.sections.results.description}
                    </p>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    {caseStudy.sections.results.metrics.map((metric, index) => (
                      <div
                        key={index}
                        className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 text-center"
                      >
                        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                          {metric.value}
                        </div>
                        <p className="text-slate-300 font-medium mb-2">
                          {metric.label}
                        </p>
                        {metric.description && (
                          <p className="text-slate-400 text-sm">
                            {metric.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {caseStudy.sections.results.beforeAfter && (
                    <div className="grid md:grid-cols-1 gap-6 font-poppins">
                      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-red-400 mb-3">
                          Before
                        </h4>
                        <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                          {caseStudy.sections.results.beforeAfter.before}
                        </p>
                        {caseStudy.sections.results.beforeAfter.beforeImg && (
                          <Image
                            src={
                              caseStudy.sections.results.beforeAfter.beforeImg
                            }
                            className="w-full object-contain"
                            alt={"Before"}
                            width={500}
                            height={300}
                          />
                        )}
                      </div>
                      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-green-400 mb-3">
                          After
                        </h4>
                        <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                          {caseStudy.sections.results.beforeAfter.after}
                        </p>
                        {caseStudy.sections.results.beforeAfter.afterImg && (
                          <Image
                            src={
                              caseStudy.sections.results.beforeAfter.afterImg
                            }
                            className="w-full object-contain"
                            alt={"After"}
                            width={500}
                            height={300}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready for Similar Results?
              </h2>
              <p className="text-slate-300 mb-6">
                Let&apos;s discuss how we can help your business achieve
                remarkable growth like {caseStudy.client}.
              </p>
              <a
                href="/getListed"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
