"use client";
import React from "react";
import CaseStudyCard from "@/components/CaseStudies/CaseStudiesCard";

interface CaseStudyCardData {
  slug: string;
  title: string;
  client: string;
  primaryMetric: {
    value: string;
    label: string;
  };
  description: string;
  tags: string[];
  website: string;
}

const CaseStudiesGrid = ({
  caseStudies,
}: {
  caseStudies: CaseStudyCardData[];
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {caseStudies.map((caseStudy, index) => (
          <div
            key={caseStudy.slug}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CaseStudyCard {...caseStudy} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default CaseStudiesGrid;
