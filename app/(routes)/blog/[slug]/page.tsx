"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Sparkles,
  Award,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import { getBlogBySlug } from "@/data/blogs";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 15 Async Params Unwrap
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  // Fetch article using helper from data/blogs.ts
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <main className="min-h-screen bg-[#030712] text-white font-sans pt-32 pb-20 text-center">
        <Header visible={true} />
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-slate-400 mb-6">
            The blog post you are looking for does not exist.
          </p>
          <Link
            href="/blog"
            className="px-6 py-3 bg-[#0066FF] rounded-xl font-bold text-white inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-white font-sans pb-20 relative overflow-hidden">
      {/* Header Bar */}
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

      <div className="container mx-auto px-4 max-w-4xl pt-28 sm:pt-32 relative z-10">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>

        {/* Post Title Header */}
        <div className="space-y-4 mb-10 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#00C2FF] text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{blog.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400 pt-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#00C2FF]" /> {blog.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#00C2FF]" /> {blog.readingTime}
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-4 h-4 text-emerald-400" /> By {blog.author}
            </span>
          </div>
        </div>

        {/* Featured Image if exists */}
        {blog.featuredImage && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-auto max-h-[500px] object-cover"
              onError={(e) => {
                e.currentTarget.src = "/gbp-infographic.jpg";
              }}
            />
          </div>
        )}

        {/* Article Content Render */}
        <article
          className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed space-y-6 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:border-l-4 [&_h2]:border-[#00C2FF] [&_h2]:pl-4 [&_h2]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_li]:text-slate-300"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Bottom Call to Action Banner */}
        <section className="pt-12">
          <div className="bg-gradient-to-r from-[#070D1B] via-[#0A1628] to-[#070D1B] border border-[#00C2FF]/30 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00C2FF]">
              Partner With Where Local Search
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Dominate Your Local Market?
            </h3>

            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              If you're looking to dominate local search results and attract more local customers across Melbourne or anywhere in Australia, Where Local Search is here to help.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/getlisted"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0066FF] to-[#00C2FF] rounded-xl font-bold text-sm text-white shadow-lg shadow-[#0066FF]/25 hover:opacity-90 transition-opacity"
              >
                Get Listed Now
              </a>

              <a
                href="tel:+61402200018"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/[0.04] border border-white/10 rounded-xl font-semibold text-sm text-slate-200 hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00C2FF]" />
                <span>Call +61 402 200 018</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}