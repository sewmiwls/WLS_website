import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import React from "react";
import Link from "next/link";

interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  primaryMetric: {
    value: string;
    label: string;
  };
  description: string;
  tags: string[];
  date?: string;
}

const sampleCaseStudies: CaseStudy[] = [
  {
    slug: "manu-tyres",
    title: "Top in Google Search",
    client: "Manu Tyres",
    primaryMetric: {
      value: "Top Rank",
      label: "Google Search",
    },
    description:
      "Before working with Where Local Search, our business was not showing up where it needed to on Google. Over time, they helped improve our visibility for the services our customers actually search for, and we started seeing much stronger rankings across key terms. We’ve had more calls, more enquiries, and a much better presence online than before.",
    tags: ["Local SEO", "Rankings"],
    date: "5/7/2025",
  },
  {
    slug: "aqua-pet",
    title: "More Customers Finding Us Online",
    client: "Aqua Pet",
    primaryMetric: {
      value: "+More",
      label: "Online Enquiries",
    },
    description:
      "Where Local Search helped us strengthen our online presence in a way that actually made a difference to the business. We started appearing more consistently in search results, and that led to more enquiries from customers who were already looking for what we offer. Their team was easy to work with, clear in communication, and focused on results.",
    tags: ["Search Results", "Online Presence", "Lead Generation"],
    date: "20/9/2025",
  },
  {
    slug: "menswear-warehouse",
    title: "More Customers Visiting Our Store",
    client: "Menswear Warehouse",
    primaryMetric: {
      value: "+Traffic",
      label: "In-Store Growth",
    },
    description:
      "Since working with Where Local Search, we’ve noticed more people finding us online and coming into the store on a regular basis. Our visibility improved, more customers started discovering our products, and the overall impact on in-store traffic has been very positive. It’s been a valuable step forward for our business.",
    tags: ["In-Store Traffic", "Local Visibility", "Foot Traffic"],
    date: "18/11/2025",
  },
  {
    slug: "kesec",
    title: "Stronger Local Visibility",
    client: "KESEC",
    primaryMetric: {
      value: "Stronger",
      label: "Local Visibility",
    },
    description:
      "Where Local Search helped us build a much stronger online presence and improve how our business appears in local search. We began getting better visibility for the services we wanted to be known for, and that translated into more genuine customer enquiries. They made the whole process straightforward and results-focused.",
    tags: ["Local Search", "Brand Visibility", "Customer Enquiries"],
    date: "12/2/2026",
  },
];

const CaseStudies = () => {
  return (
    <div className="min-h-screen mt-[80px] md:mt-[100px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <Header visible={true} />

      <div className="pt-20 pb-20">
        <div className="container mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs />
          </div>

          {/* Page Header */}
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

          {/* Case Studies Grid (4 Cards) */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sampleCaseStudies.map((item, index) => {
              // 'Google Search' කියන Tag එක තියෙනවා නම් අයින් කිරීම
              const filteredTags = item.tags.filter(
                (tag) => tag.toLowerCase() !== "google search"
              );

              return (
                <div
                  key={index}
                  className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-xl"
                >
                  <div>
                    {/* Client Name */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {item.client}
                    </h3>

                    {/* Primary Metric */}
                    <div className="mt-4 mb-6">
                      <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {item.primaryMetric.value}
                      </div>
                      <div className="text-sm text-slate-400 font-medium">
                        {item.primaryMetric.label}
                      </div>
                    </div>

                    {/* Full Description (No line-clamp) */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Filtered Static Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/60">
                      {filteredTags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-block rounded-md bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-300 border border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                   
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Write Your Success Story?
              </h2>

              <p className="text-slate-300 mb-6">
                Let's grow your business with proven Local SEO strategies.
              </p>

              <Link
                href="/getlisted"
                className="inline-flex px-8 py-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
              >
                Start Your Transformation
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CaseStudies;