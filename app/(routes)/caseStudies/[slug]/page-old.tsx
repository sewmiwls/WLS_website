import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

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

// Hard-coded case study data
const getCaseStudyData = (slug: string): CaseStudyData | null => {
  const caseStudies: Record<string, CaseStudyData> = {
    uniformsready: {
      slug: "uniformsready",
      client: "Uniformsready",
      website: "www.uniformsready.com.au",
      title: "Fashion Ecommerce Growth",
      subtitle: "235.86% Increase in Organic Keywords",
      primaryMetric: {
        value: "235.86%",
        label: "Increase in Organic Keywords",
      },
      timeline: "12 months",
      tags: ["E-commerce", "SEO", "Content Strategy", "Fashion"],
      overview: {
        challenge:
          "Uniforms Ready had great products and retail presence but no digital traction.",
        solution:
          "Implemented enterprise SEO and content strategy without link building.",
        results:
          "Achieved 235.86% increase in organic keywords in just 1 year.",
      },
      sections: {
        client: {
          description: [
            "Uniforms Ready is a men's fashion brand based out of Melbourne Vic.",
            "Uniforms Ready came to us wanting to increase the sales from their e-commerce.",
            "They already had a great product and presence in some retail outlets, but no traction in the digital world.",
          ],
          goals: [
            "Increase e-commerce sales",
            "Build digital presence",
            "Improve search visibility",
          ],
        },
        plan: {
          description: [
            'Uniforms Ready was hesitant to start a full SEO program because of the general skepticism of search engine optimization that is prevalent in our industry today. So, we decided to work with them on one Enterprise SEO service first, before we added on other services like Outreach Link Building to "test the waters".',
          ],
          approach: [
            "Start with Enterprise SEO service only",
            "Prove ROI before expanding services",
            "Focus on on-page optimization first",
          ],
        },
        execution: {
          description:
            "Our execution focused on three key areas to maximize impact without link building.",
          strategies: [
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
        },
        results: {
          description:
            "In just 1 year we achieved remarkable results without any link building.",
          metrics: [
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
          beforeAfter: {
            before: "Limited organic visibility with minimal keyword rankings",
            beforeImg: "/images/before.png.webp",
            after:
              "Strong organic presence with 235.86% increase in keyword performance",
            afterImg: "/images/after.png.webp",
          },
        },
      },
    },
    svtowings: {
      slug: "svtowings",
      client: "SV Towings Darwin",
      website: "http://www.svtowing.com.au/",
      title: "Customer Calls Growth",
      subtitle: "33% Increase in New Customer Calls",
      primaryMetric: {
        value: "33%",
        label: "Increase in New Customer Calls",
      },
      timeline: "12 months",
      tags: ["Lead Generation", "Content Marketing", "Tech"],
      overview: {
        challenge:
          "Uniforms Ready had great products and retail presence but no digital traction.",
        solution:
          "Implemented enterprise SEO and content strategy without link building.",
        results:
          "Achieved 235.86% increase in organic keywords in just 1 year.",
      },
      sections: {
        client: {
          description: [
            "SV Towing is a highly reviewed and sought after towing services in Darwin Northern Territory.",
            "They came to us after they had received a new website but noticed that no one could find their website online.",
            "The goal was to rank them on top of the WLS for keywords like 'Towing Services in Darwin' and 'Car removals in NT', as well as dozens of other keywords that would generate new customers for their business.",
            "One of their concerns about work with a new company was that the old company did not share any SEO reports or had any transparency about the work they were “doing”.",
          ],
          goals: [
            "Increase customer retention",
            "Build digital presence",
            "Improve search visibility",
          ],
        },
        plan: {
          description: [
            "Fix technical SEO issues that were found on the website that was holding his website back from its full potential.",
            "At the time of our initial engagement, there was a laundry list of errors inside of their Google Search Console as well as on their website.",
            "We needed to fix these things ASAP if they wanted a fighting chance at ranking.",
            "Optimize their Google Map Listing. They had duplicate listings for their office that was confusing google on which one to show, as a result, they showed in the Map Pack very rarely. We needed to combine the duplicate listing and optimize it to show up for more search keywords.",
            "Build a local SEO campaign to get SV Towing ranking higher on the WLS for not only their main keywords but also some specialty ones they requested like “Cash for cars”. We needed to take a more long term approach to how their website was structured. By doing so it allowed us to rank for numerous keywords, with less link building resulting in a much lower cost for the client.",
          ],
          approach: [
            // "Fix critical technical SEO issues and Google Search Console errors",
            "Consolidate and optimize Google Maps listing to improve local visibility",
            "Implement comprehensive local SEO campaign focusing on multiple keywords",
            "Restructure website architecture for better keyword coverage",
            // "Target specialty keywords like 'Cash for cars' with minimal link building",
          ],
        },
        execution: {
          description:
            "Our execution focused on three key areas to maximize impact without link building.",
          strategies: [
            {
              title: "Technical SEO",
              description:
                "To get the process started, our SEO team conducted a Technical and Quality Audit to find out where the weaknesses were on the website. Oh boy, we found a lot ?",
            },
            {
              title: "Analytics Set Up ",
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
                "Once the foundational links were in place it was time to start a more aggressive outreach link building campaign to build more authority in their market. Because of the new structure, it allowed us to power-up what we call “Hub Pages”, cutting link costs for the client dramatically.",
            },
          ],
        },
        results: {
          description:
            "Through our comprehensive SEO and local optimization strategy, we achieved significant improvements across all key metrics.",
          metrics: [
            {
              value: "100%",
              label: "Keywords on Page One",
              description:
                "Achieved page one rankings for all desired keywords",
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
          beforeAfter: {
            before:
              "Limited visibility in local search and minimal Map Pack presence",
            beforeImg: null,
            after:
              "Dominant local presence with increased engagement and calls",
            afterImg: "/images/SV-Towing-Insight.webp",
          },
        },
      },
    },
  };

  return caseStudies[slug] || null;
};

const CaseStudyPage: React.FC<{ params: Promise<{ slug: string }> }> = async ({
  params,
}) => {
  // Await the params Promise
  const { slug } = await params;
  const caseStudy = getCaseStudyData(slug);

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
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">The Client</h2>
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8">
                <div className="space-y-4 mb-6 font-poppins">
                  {caseStudy.sections.client.description.map(
                    (paragraph, index) => (
                      <p key={index} className="text-slate-300 leading-relaxed">
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
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
              </div>
            </section>

            {/* The Plan */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">The Plan</h2>
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl font-poppins p-8">
                {/* <p className="text-slate-300 leading-relaxed mb-6">
                  {caseStudy.sections.plan.description.map}
                </p> */}
                {/* <ul className="space-y-2 font-poppins"> */}
                {caseStudy.sections.plan.description.map((plan, index) => (
                  <p
                    key={index}
                    className="text-slate-300 leading-relaxed mb-6"
                  >
                    {plan}
                  </p>
                ))}
                {/* </ul> */}
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
              </div>
            </section>

            {/* The Execution */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">
                The Execution
              </h2>
              <div className="space-y-6 font-poppins">
                <p className="text-slate-300 leading-relaxed text-center">
                  {caseStudy.sections.execution.description}
                </p>
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

            {/* The Results */}
            <section>
              <h2 className="text-3xl font-bold text-white mb-8">
                The Results
              </h2>
              <div className="space-y-8 font-poppins">
                <p className="text-slate-300 leading-relaxed text-center">
                  {caseStudy.sections.results.description}
                </p>

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
                          src={caseStudy.sections.results.beforeAfter.beforeImg}
                          className="w-full object-contain"
                          alt={"Before"}
                          width={500}
                          height={300}
                          objectFit="contain"
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
                          src={caseStudy.sections.results.beforeAfter.afterImg}
                          className="w-full object-contain"
                          alt={"After"}
                          width={500}
                          height={300}
                          objectFit="contain"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
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
