"use client";

import React, { useState, useEffect, memo } from "react";
import { Mail, Phone } from "lucide-react";
import InteractiveGlobe from "./InteractiveGlobe";

interface HeroSectionProps {
  className?: string;
}

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

const FloatingCard: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => {
  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite ${delay}s, fadeInUp 1s ease-out ${delay}s both`,
      }}
    >
      {children}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

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
      `}</style>
    </div>
  );
};

const GradientText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <span
    className={`bg-gradient-to-r from-[#F2F8FF] via-[#4DA3FF] to-[#00C2FF] bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

const QuickContactPanel: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-[#0066FF]/25 bg-[#071A33]/75 p-4 shadow-xl shadow-black/20 backdrop-blur-sm ${className}`}
    >
      <div className="mb-4">
        <p className="text-sm uppercase tracking-wider text-[#00C2FF]">
          Need Help?
        </p>
        <h3 className="text-lg font-bold text-white">Talk to our team</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
        <a
          href="tel:0342240040"
          aria-label="Call Where Local Search"
          className="group flex items-center gap-3 rounded-xl border border-[#0066FF]/20 bg-[#020B1C]/60 p-3 hover:border-[#00C2FF]/60 hover:bg-[#0B1F3F] transition-all duration-300"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00C2FF] shadow-lg shadow-[#0066FF]/20 group-hover:scale-110 transition-transform duration-300">
            <Phone className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Call Us
            </p>
            <p className="text-base font-semibold text-white group-hover:text-[#00C2FF] transition-colors">
              +61 402 200 018
            </p>
          </div>
        </a>

        <a
          href="mailto:wherelocalsearch@gmail.com"
          aria-label="Email Where Local Search"
          className="group flex items-center gap-3 rounded-xl border border-[#0066FF]/20 bg-[#020B1C]/60 p-3 hover:border-[#00C2FF]/60 hover:bg-[#0B1F3F] transition-all duration-300"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00C2FF] shadow-lg shadow-[#0066FF]/20 group-hover:scale-110 transition-transform duration-300">
            <Mail className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Email Us
            </p>
            <p className="text-xs xl:text-sm font-semibold text-white group-hover:text-[#00C2FF] transition-colors whitespace-nowrap">
              wherelocalsearch@gmail.com
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full bg-gradient-to-br from-[#071A33] via-[#0B1F3F] to-[#071A33] overflow-hidden ${className}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/10 via-[#0B1F3F]/10 to-[#00C2FF]/10"></div>

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 102, 255, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 194, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "gridMove 20s linear infinite",
          }}
        ></div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#0066FF]/10 rounded-full blur-3xl animate-pulse"></div>

        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#4DA3FF]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <FloatingCard delay={0.2}>
              <div className="inline-flex items-center px-4 py-2 bg-[#0066FF]/10 border border-[#0066FF]/25 rounded-full text-[#F2F8FF] text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 bg-[#00C2FF] rounded-full mr-2 animate-pulse"></span>
                Trusted by 10,000+ businesses worldwide
              </div>
            </FloatingCard>

            <FloatingCard delay={0.4}>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Dominate</span>
                <br />
                <GradientText>Local Search</GradientText>
                <br />
                <span className="text-white">& Google Maps</span>
              </h1>
            </FloatingCard>

            <FloatingCard delay={0.6}>
              <p className="text-xl font-poppins text-slate-300 leading-relaxed max-w-lg">
                Our marketing experts leverage data-driven strategies to enhance
                your local search visibility, ensuring your business stands out
                in Google Maps and local search results. Experience a
                significant boost in online presence and customer engagement
                with our tailored solutions.
              </p>
            </FloatingCard>

            <FloatingCard delay={0.8}>
              <div>
                {/* Main CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => (window.location.href = "/getListed")}
                    className="group relative px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#0052CC] rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0066FF]/25"
                  >
                    <span className="relative z-10">
                      Boost Your Visibility Now
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-[#0052CC] to-[#00C2FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Mobile / Tablet Contact Panel */}
                <QuickContactPanel className="mt-6 lg:hidden" />
              </div>
            </FloatingCard>

            {/* Stats */}
            <FloatingCard delay={1.0}>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter end={847} suffix="%" />
                  </div>

                  <p className="text-slate-400 text-sm">
                    Avg. Visibility Increase
                  </p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter end={24} suffix="h" />
                  </div>

                  <p className="text-slate-400 text-sm">Average Setup Time</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    <AnimatedCounter end={99} suffix="%" />
                  </div>

                  <p className="text-slate-400 text-sm">Client Satisfaction</p>
                </div>
              </div>
            </FloatingCard>
          </div>

          {/* Right Content - Globe */}
          <FloatingCard delay={1.2} className="relative">
            <div className="relative">
              {/* Globe Container */}
              <div className="aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 via-[#4DA3FF]/20 to-[#00C2FF]/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 h-full">
                  <InteractiveGlobe
                    pins={[
                      {
                        lat: 40.7128,
                        lng: -74.006,
                        label: "New York",
                        glowIntensity: 1.2,
                      },
                      {
                        lat: 51.5074,
                        lng: -0.1278,
                        label: "London",
                        glowIntensity: 1.0,
                      },
                      {
                        lat: 35.6762,
                        lng: 139.6503,
                        label: "Tokyo",
                        glowIntensity: 1.1,
                      },
                      {
                        lat: -33.8688,
                        lng: 151.2093,
                        label: "Sydney",
                        glowIntensity: 0.9,
                      },
                      {
                        lat: 37.7749,
                        lng: -122.4194,
                        label: "San Francisco",
                        glowIntensity: 1.3,
                      },
                      {
                        lat: 48.8566,
                        lng: 2.3522,
                        label: "Paris",
                        glowIntensity: 1.0,
                      },
                      {
                        lat: 55.7558,
                        lng: 37.6176,
                        label: "Moscow",
                        glowIntensity: 0.8,
                      },
                      {
                        lat: -23.5505,
                        lng: -46.6333,
                        label: "São Paulo",
                        glowIntensity: 1.1,
                      },
                    ]}
                    autoRotate={true}
                  />
                </div>
              </div>

              {/* Floating Info Cards */}
              <div className="absolute -top-4 -left-4 bg-[#071A33]/80 backdrop-blur-sm border border-[#0066FF]/25 rounded-lg p-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#00C2FF] rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">Live Tracking</span>
                </div>

                <p className="text-slate-300 text-xs mt-1">
                  Monitoring 50k+ locations
                </p>
              </div>

              {/* AI Optimization moved to top-right */}
              <div className="absolute top-8 right-4 bg-[#071A33]/80 backdrop-blur-sm border border-[#0066FF]/25 rounded-lg p-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#4DA3FF] rounded-full animate-pulse"></div>

                  <span className="text-white font-medium">
                    AI Optimization
                  </span>
                </div>

                <p className="text-slate-300 text-xs mt-1">
                  Real-time adjustments
                </p>
              </div>

              <div className="absolute top-1/2 -left-8 bg-[#071A33]/80 backdrop-blur-sm border border-[#0066FF]/25 rounded-lg p-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#0066FF] rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">Global Reach</span>
                </div>

                <p className="text-slate-300 text-xs mt-1">180+ countries</p>
              </div>

              {/* Desktop Contact Panel - Right Side Marked Area */}
              <QuickContactPanel className="hidden lg:block mt-8 max-w-xl ml-auto" />
            </div>
          </FloatingCard>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </section>
  );
};

export default memo(HeroSection);