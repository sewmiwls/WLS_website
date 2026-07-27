import React from 'react';
import Link from 'next/link';

interface CaseStudyCardProps {
  slug: string;
  title: string;
  client: string;
  primaryMetric: {
    value: string;
    label: string;
  };
  description: string;
  tags: string[];
  website?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  slug,
  client,
  primaryMetric,
  description,
  tags,
  website
}) => {
  return (
    <Link href={`/caseStudies/${slug}`}>
      <div className="group relative bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all duration-300 cursor-pointer backdrop-blur-sm hover:bg-slate-900/70 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
        
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 rounded-xl transition-all duration-300 -z-10 blur-xl"></div>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
              {client}
            </h3>
            {website && (
              <p className="text-sm text-slate-400 mt-1">{website}</p>
            )}
          </div>
          
          {/* Arrow Icon */}
          <div className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        </div>

        {/* Primary Metric */}
        <div className="mb-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            {primaryMetric.value}
          </div>
          <p className="text-slate-300 text-sm font-medium">
            {primaryMetric.label}
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-slate-800/60 text-slate-300 text-xs rounded-md border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </Link>
  );
};

// Example usage with sample data
/** 
const CaseStudyCardExample = () => {
  const sampleCaseStudy = {
    slug: 'uniformsready',
    title: 'Fashion Ecommerce Growth',
    client: 'Uniformsready',
    primaryMetric: {
      value: '235.86%',
      label: 'Increase in Organic Keywords'
    },
    description: 'See how we grew this Fashion Ecom Brand\'s organic presence from skeptical beginnings to remarkable results in just 1 year without any link building.',
    tags: ['E-commerce', 'SEO', 'Content Strategy', 'Fashion'],
    website: 'www.uniformsready.com.au'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="max-w-md mx-auto">
        <CaseStudyCard {...sampleCaseStudy} />
      </div>
    </div>
  );
};
*/

export default CaseStudyCard;