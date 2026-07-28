"use client";

import React, { useState, useEffect, memo } from "react";
import {
  Phone,
  Mail,
  ArrowRight,
  MapPin,
  Search,
  Star,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Zap,
  Globe2,
  ShieldCheck,
  Building2,
  BarChart2
} from "lucide-react";

const AnimatedCounter: React.FC<{
  end: number;
  duration?: number;
  suffix?: string;
}> = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = 0;
    const animate = (currentTime: number) => {
      if (startTime === 0) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#030712] text-white font-sans overflow-hidden py-8 lg:py-16">
      
      {/* Background Lighting Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#0066FF]/15 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#00C2FF]/15 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Main 2-Column Responsive Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Main Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0066FF]/10 border border-[#0066FF]/30 rounded-full text-xs font-semibold text-[#00C2FF] backdrop-blur-xl">
              <span className="flex h-2 w-2 rounded-full bg-[#00C2FF] animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AI-Driven Local SEO Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Dominate <br />
              <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00C2FF] bg-clip-text text-transparent">
                Local Search
              </span> <br />
              & Google Maps
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-lg font-normal">
              Convert local search intent into phone calls and foot traffic. We optimize your Google Business Profile to claim the <strong className="text-cyan-300 font-semibold">Top #1 Map Pack Spot</strong>.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            
                <a
  href="/getlisted"
  className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#0066FF] via-[#0088FF] to-[#00C2FF] rounded-xl font-bold text-sm text-white shadow-lg shadow-[#0066FF]/25 hover:shadow-[#00C2FF]/40 hover:-translate-y-0.5 transition-all duration-300"
>
  <span>Boost Your Visibility Now</span>
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</a>
            

              
            </div>

            {/* Inline Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md">
              <div>
                <div className="text-2xl font-black text-white">
                  <AnimatedCounter end={847} suffix="%" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Avg. Traffic Boost</p>
              </div>

              <div>
                <div className="text-2xl font-black text-white">
                  <AnimatedCounter end={24} suffix="h" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Setup Turnaround</p>
              </div>

              <div>
                <div className="text-2xl font-black text-white">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Client Retention</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Modern Interactive Visual Showcase */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/20 to-[#00C2FF]/20 rounded-3xl blur-2xl pointer-events-none" />

            {/* Glass Container Card */}
            <div className="relative bg-[#070D1B]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
              
              {/* Top Header Mockup */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">google-maps-live-ranking</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Optimization
                </span>
              </div>

              {/* Search Result Box */}
              <div className="bg-[#020612] border border-white/10 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#00C2FF]" />
                  <span className="text-xs font-medium text-slate-200">"Best Service Near Me"</span>
                </div>
                <span className="text-[10px] bg-[#0066FF]/20 text-[#00C2FF] font-bold px-2 py-0.5 rounded border border-[#0066FF]/30">
                  #1 Google Map Pack
                </span>
              </div>

              {/* Business Listing Mock Result */}
              <div className="bg-gradient-to-br from-[#0c182e] to-[#070D1B] border border-[#00C2FF]/40 rounded-xl p-4 shadow-lg space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#00C2FF] text-black text-[10px] font-black px-1.5 py-0.5 rounded">
                        RANK #1
                      </span>
                      <h4 className="text-sm font-bold text-white">Your Business Name</h4>
                    </div>
                    <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00C2FF]" /> Verified Google Business Profile
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>5.0 (500+)</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400 text-[11px]">Local Map Pack Visibility</span>
                    <span className="text-[#00C2FF] font-bold text-[11px]">99.4%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#0066FF] to-[#00C2FF] h-full w-[99.4%]" />
                  </div>
                </div>
              </div>

              {/* 2x Micro Feature Badges */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#0066FF]/20 text-[#00C2FF] shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">+847% Leads</p>
                    <p className="text-[10px] text-slate-400">Direct Inquiries</p>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">24h Express</p>
                    <p className="text-[10px] text-slate-400">Rapid Setup</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM INTEGRATED CONTACT STRIP */}
        <div className="mt-10 bg-[#070D1B]/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00C2FF]">
                Direct Expert Support
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">Ready to outrank your competitors in local search?</h4>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="tel:+61402200018"
                className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#0066FF]/20 hover:border-[#00C2FF]/50 transition-all duration-300"
              >
                <Phone className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span className="text-xs font-bold text-white">+61 402 200 018</span>
              </a>

              <a
                href="mailto:wherelocalsearch@gmail.com"
                className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#0066FF]/20 hover:border-[#00C2FF]/50 transition-all duration-300"
              >
                <Mail className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span className="text-xs font-bold text-white">wherelocalsearch@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default memo(HeroSection);