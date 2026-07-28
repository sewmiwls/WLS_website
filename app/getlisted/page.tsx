"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  ExternalLink,
  CheckCircle2,
  CreditCard,
  Headphones,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Header from "@/components/Header";

export default function GetListedPage() {
  // 🔗 METHANATA OYAGE EZIDEBIT DIRECT DEBIT FORM LINK EKA DANNA
  const ezidebitFormUrl =
  process.env.NEXT_PUBLIC_EZIDEBIT_URL ||
  "https://secure.ezidebit.com.au/webddr/Request.aspx?a=7126D855B640623980DD74C33DB6319F&aDur=1&afreq=4";

  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen w-full bg-[#030712] text-white font-sans pb-20 relative overflow-hidden">
      
      {/* Navigation Bar Header */}
      <Header visible={true} />

      {/* Background Glows */}
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

      <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-24 sm:pt-28">
        
        {/* Back Link */}
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs sm:text-sm font-semibold text-emerald-400 backdrop-blur-xl">
            <Lock className="w-4 h-4" />
            <span>256-Bit Bank-Grade SSL Encryption</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Complete Your <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-[#00C2FF] bg-clip-text text-transparent">
              Direct Debit Registration
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Please complete the secure <strong>Ezidebit Electronic Direct Debit Request</strong> form below to activate your Local SEO & Google Maps optimization service.
          </p>
        </div>

        {/* Main Grid: Form Embed + Trust Sidebar */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Ezidebit Embedded iFrame Container */}
          <div className="lg:col-span-8 bg-[#070D1B] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative min-h-[650px] flex flex-col">
            
            {/* Header Status Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <CreditCard className="w-4 h-4 text-[#00C2FF]" />
                <span>Electronic Direct Debit Request</span>
              </div>
              
              <a
                href={ezidebitFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#00C2FF] hover:underline font-bold"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-x-0 top-32 flex flex-col items-center justify-center gap-3 z-10">
                <div className="w-8 h-8 border-2 border-[#00C2FF] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-slate-400 font-medium">Loading Secure Ezidebit Portal...</p>
              </div>
            )}

            {/* Embedded iFrame */}
            <iframe
              src={ezidebitFormUrl}
              title="Ezidebit Direct Debit Request"
              onLoad={() => setIsLoading(false)}
              className="w-full h-[600px] border-0 rounded-xl bg-white"
              allow="payment"
            />

            {/* Fallback Note */}
            <p className="text-xs text-slate-400 text-center mt-4">
              Having trouble loading the form?{" "}
              <a href={ezidebitFormUrl} target="_blank" rel="noopener noreferrer" className="text-[#00C2FF] underline font-medium">
                Click here to open the Ezidebit form directly.
              </a>
            </p>
          </div>

          {/* RIGHT: Guarantee & Security Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Trust Benefits Card */}
            <div className="bg-[#070D1B] border border-white/10 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <ShieldCheck className="w-5 h-5 text-[#00C2FF]" /> Why Ezidebit?
              </h3>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">PCI-DSS Level 1 Compliant:</strong> Highest level of payment security globally.</span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Automated Invoicing:</strong> Hassle-free automatic monthly recurring payments.</span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Cancel Anytime:</strong> Transparent billing with no hidden exit lock-ins.</span>
                </li>
              </ul>
            </div>

            {/* Need Help / Support Card */}
            <div className="bg-gradient-to-br from-[#070D1B] to-[#0A1628] border border-[#00C2FF]/30 rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#00C2FF] flex items-center gap-2">
                <Headphones className="w-5 h-5" /> Need Assistance?
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed">
                If you have questions about setting up your direct debit, our team is standing by to help.
              </p>

              <div className="space-y-3 pt-2 text-sm">
                <a
                  href="tel:+61402200018"
                  className="flex items-center gap-3 text-white hover:text-[#00C2FF] font-semibold transition-colors bg-white/[0.04] p-3 rounded-xl border border-white/5"
                >
                  <Phone className="w-4 h-4 text-[#00C2FF]" />
                  <span>+61 402 200 018</span>
                </a>

                <a
                  href="mailto:wherelocalsearch@gmail.com"
                  className="flex items-center gap-3 text-white hover:text-[#00C2FF] font-semibold transition-colors bg-white/[0.04] p-3 rounded-xl border border-white/5 truncate"
                >
                  <Mail className="w-4 h-4 text-[#00C2FF] shrink-0" />
                  <span className="truncate">wherelocalsearch@gmail.com</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}