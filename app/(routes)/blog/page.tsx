"use client";

import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import { blogs } from "@/data/blogs"; // blogs array එක නිවැරදිව import කිරීම

export default function BlogListPage() {
  return (
    <main className="min-h-screen bg-[#030712] text-white font-sans pb-20 relative overflow-hidden">
      <Header visible={true} />

      {/* Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#0066FF]/20 via-[#00C2FF]/10 to-transparent rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl pt-28 sm:pt-32 relative z-10">
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full text-xs font-semibold text-[#00C2FF] backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Local SEO Insights & Guides</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Where Local Search <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00C2FF] bg-clip-text text-transparent">
              Blog & Resources
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Learn proven Local SEO strategies, Google Maps ranking techniques, and Google Business Profile tips to help your business grow online.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="group bg-[#070D1B] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00C2FF]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative w-full h-48 overflow-hidden bg-slate-900">
                  <img
                    src={post.featuredImage || "/gbp-infographic.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#030712]/80 backdrop-blur-md border border-white/10 text-[#00C2FF] text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00C2FF] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pt-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00C2FF]" />
                    {post.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#00C2FF]" />
                    {post.readingTime}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#00C2FF] hover:text-white transition-colors group-hover:translate-x-1 transition-transform"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}