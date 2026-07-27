"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Globe,
  TrendingUp,
  Cloud,
  LockKeyhole,
  Award,
  Share2,
} from "lucide-react";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  gradient: string;
  hoverGradient: string;
  href?: string;
}

interface ServiceCardsGridProps {
  title?: string;
  subtitle?: string;
  services?: ServiceCard[];
}

const defaultServices: ServiceCard[] = [
  {
    id: "google-maps-ranking",
    title: "Google Maps Ranking Services",
    description:
      "Improve your visibility in Google Maps and get found by more nearby customers searching for your services.",
    icon: <MapPin className="w-8 h-8" />,
    features: [
      "Google Business Profile",
      "Local Citations",
      "Review Strategy",
      "Competitor Analysis",
    ],
    gradient: "from-[#0052CC] to-[#4DA3FF]",
    hoverGradient: "from-[#071A33] to-[#0066FF]",
    href: "/services/google-maps-ranking",
  },
  {
    id: "local-seo",
    title: "Local SEO Services",
    description:
      "Help your business rank higher in local search results and connect with customers in your service area.",
    icon: <Search className="w-8 h-8" />,
    features: [
      "Keyword Research",
      "On-Page SEO",
      "Technical SEO",
      "Service Area Pages",
    ],
    gradient: "from-[#0066FF] to-[#00C2FF]",
    hoverGradient: "from-[#0052CC] to-[#00C2FF]",
    href: "/services/local-seo",
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description:
      "Build a strong online presence with professional content, consistent posting, and better customer engagement.",
    icon: <Share2 className="w-8 h-8" />,
    features: [
      "Content Creation",
      "Graphic Design",
      "Post Scheduling",
      "Community Engagement",
    ],
    gradient: "from-[#00C2FF] to-[#0066FF]",
    hoverGradient: "from-[#4DA3FF] to-[#0052CC]",
    href: "/services/social-media-management",
  },
  {
    id: "web-design-development",
    title: "Web Design & Development",
    description:
      "Create a modern, mobile-friendly website designed to build trust, improve user experience, and generate leads.",
    icon: <Globe className="w-8 h-8" />,
    features: [
      "Custom Design",
      "Mobile Responsive",
      "SEO-Friendly",
      "Lead Capture",
    ],
    gradient: "from-[#4DA3FF] to-[#0052CC]",
    hoverGradient: "from-[#00C2FF] to-[#0066FF]",
    href: "/services/web-design-development",
  },
  {
    id: "cybersecurity-solutions",
    title: "Cybersecurity Solutions",
    description:
      "Protect your business from online threats with practical security reviews, monitoring, and risk reduction support.",
    icon: <LockKeyhole className="w-8 h-8" />,
    features: [
      "Security Reviews",
      "Monitoring",
      "Malware Detection",
      "Backup Planning",
    ],
    gradient: "from-[#071A33] to-[#0066FF]",
    hoverGradient: "from-[#0B1F3F] to-[#00C2FF]",
    href: "/services/cybersecurity-solutions",
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    description:
      "Modern cloud solutions that improve flexibility, collaboration, scalability, and secure access to business data.",
    icon: <Cloud className="w-8 h-8" />,
    features: [
      "Cloud Migration",
      "Cloud Storage",
      "Business Backup",
      "Remote Access",
    ],
    gradient: "from-[#4DA3FF] to-[#0052CC]",
    hoverGradient: "from-[#00C2FF] to-[#0066FF]",
    href: "/services/cloud-solutions",
  },
];

const ServiceCardsGrid: React.FC<ServiceCardsGridProps> = ({
  title = "Our Premium Services",
  subtitle = "Comprehensive local search solutions designed to grow your business",
  services = defaultServices,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleLearnMore = (href?: string) => {
    if (!href) return;
    window.location.href = href;
  };

  return (
    <section
      id="services"
      className="w-full py-20 px-4 bg-gradient-to-br from-[#071A33] via-[#0B1F3F] to-[#071A33] relative overflow-hidden scroll-mt-28"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Soft blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/10 via-[#0B1F3F]/10 to-[#00C2FF]/10"></div>

        {/* Animated grid */}
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
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0066FF]/20 to-[#00C2FF]/20 border border-[#0066FF]/30 mb-6">
            <Award className="w-4 h-4 text-[#00C2FF]" />
            <span className="text-sm font-medium text-[#F2F8FF]">
              Premium Services
            </span>
          </div>

          <h2 className="text-4xl font-poppins md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-[#F2F8FF] to-[#00C2FF] bg-clip-text text-transparent mb-6 leading-tight">
            {title}
          </h2>

          <p className="text-xl font-poppins text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative transition-all duration-700 ease-out transform-gpu ${
                hoveredCard === service.id
                  ? "scale-105 -translate-y-2 rotate-1"
                  : hoveredCard && hoveredCard !== service.id
                  ? "scale-95 opacity-75"
                  : "hover:scale-105 hover:-translate-y-2"
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className="relative h-full bg-[#071A33]/60 backdrop-blur-sm border border-[#0066FF]/20 rounded-2xl overflow-hidden group-hover:border-[#00C2FF]/50 transition-all duration-500">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    hoveredCard === service.id
                      ? service.hoverGradient
                      : service.gradient
                  } opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/25 group-hover:animate-shine" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-[#0066FF]/20`}
                  >
                    <div className="text-white">{service.icon}</div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#00C2FF] group-hover:bg-clip-text transition-all duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Key Features
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-all duration-500"
                          style={{
                            transitionDelay: `${featureIndex * 100 + 200}ms`,
                          }}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <button
                      type="button"
                      onClick={() => handleLearnMore(service.href)}
                      className={`w-full py-3 px-6 rounded-xl bg-gradient-to-r ${service.gradient} text-white font-semibold shadow-lg shadow-[#0066FF]/20 hover:shadow-xl hover:shadow-[#00C2FF]/20 transition-all duration-300 transform hover:scale-105`}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-300 font-poppins mb-8 text-lg">
            Ready to transform your local presence?
          </p>

          <button
            type="button"
            onClick={() => (window.location.href = "/getListed")}
            className="inline-flex font-poppins items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white font-bold rounded-2xl shadow-xl shadow-[#0066FF]/20 hover:shadow-2xl hover:shadow-[#00C2FF]/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span>Get Started Today</span>
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .animate-shine {
          animation: shine 1s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ServiceCardsGrid;