"use client";

import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";

interface TestimonialProps {
  imagesrc?: string;
  title?: string;
  description?: string | null;
  date?: string;
  author?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  imagesrc,
  title,
  description,
  date,
  author,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const authorInitial = author?.charAt(0).toUpperCase() || "W";
  const shouldShowImage = Boolean(imagesrc) && !imageFailed;

  useEffect(() => {
    setImageFailed(false);
  }, [imagesrc]);

  return (
    <div className="relative h-full transition-all duration-500 ease-out hover:scale-[1.02] hover:-translate-y-2 group cursor-pointer">
      {/* Card Container */}
      <div className="relative h-full min-h-[520px] bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden group-hover:border-blue-400/40 group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-500 ease-out">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-cyan-500/10 group-hover:from-blue-500/20 group-hover:via-sky-500/20 group-hover:to-cyan-500/20 transition-all duration-500" />

        {/* Card Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Quote Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
            <Quote className="w-6 h-6 text-white" />
          </div>

          {/* Title */}
          {title && (
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300">
              {title}
            </h3>
          )}

          {/* Description */}
          <p className="text-slate-300 mb-8 leading-relaxed flex-grow group-hover:text-slate-200 transition-colors duration-300">
            {description}
          </p>

          {/* Author Section */}
          <div className="flex items-center gap-4 mt-auto pt-5 border-t border-slate-700/50">
            {shouldShowImage ? (
              <img
                src={imagesrc}
                alt={author ? `${author} testimonial` : "Testimonial"}
                onError={() => setImageFailed(true)}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-600 group-hover:border-blue-400/60 group-hover:scale-105 transition-all duration-300"
              />
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 border-2 border-blue-400/40 text-white font-bold group-hover:scale-105 transition-all duration-300">
                {authorInitial}
              </div>
            )}

            <div className="min-w-0">
              {author && (
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors duration-300">
                  {author}
                </p>
              )}

              {date && (
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  {date}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;