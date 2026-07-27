import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import MapWithRadius from "@/components/Maps/Maps";
import { MapPin, SlidersHorizontal, TrendingUp } from "lucide-react";
import React from "react";

const Packages = () => {
  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_#1e3a8a33,_transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)] text-white">
      <Header visible />

      <main className="pt-[130px] pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Breadcrumbs />
          </div>

          {/* Page Header */}
          <section className="mb-12 text-center">
            <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-200 mb-6">
              Google Maps Optimizers
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Local Search Area
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed">
              Enter a postal code and select a radius to preview your local map
              coverage area. This helps businesses understand their target
              service location before choosing a package.
            </p>
          </section>

          {/* Small Info Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
                <MapPin className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-semibold mb-2">Find Your Area</h3>

              <p className="text-slate-400">
                Enter an Australian postcode to locate the correct target
                service area for your business.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-500/10 text-cyan-300">
                <SlidersHorizontal className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Choose Coverage Radius
              </h3>

              <p className="text-slate-400">
                Select 3.5 km, 7.5 km, or 12.5 km based on your campaign reach
                and local visibility goals.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
                <TrendingUp className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Plan Local Growth
              </h3>

              <p className="text-slate-400">
                Preview your coverage area before selecting a package and
                planning your Google Maps optimization strategy.
              </p>
            </div>
          </section>

          {/* Map Section */}
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 md:p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
            <MapWithRadius />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Packages;