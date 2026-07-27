import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import { getServiceBySlug, services } from "@/data/services";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const ServiceDetailPage = async ({ params }: ServicePageProps) => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const isSocialMediaService = service.slug === "social-media-management";

  const primaryCtaHref = isSocialMediaService
    ? "/social-media-join"
    : "/contact";

  const primaryCtaLabel = isSocialMediaService
    ? "Join Now"
    : service.ctaButtonLabel;

  const formatItem = (item: string) => {
    const parts = item.split(" — ");

    if (parts.length === 1) {
      return <span>{item}</span>;
    }

    return (
      <>
        <span className="font-semibold text-white">{parts[0]}</span>
        <span className="text-slate-300"> — {parts.slice(1).join(" — ")}</span>
      </>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_#1e3a8a33,_transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)] text-white">
      <Header visible />

      <main className="pt-[130px] pb-20">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <Breadcrumbs />
          </div>

          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-slate-300 hover:text-[#00C2FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Hero Section */}
{isSocialMediaService ? (
  <section className="relative mb-10 h-[520px] overflow-hidden rounded-[2rem] border border-[#0066FF]/20 bg-[#020B1C] shadow-2xl shadow-blue-950/40">
    <video
      src="/videos/social-media.mp4"
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />

    <div className="pointer-events-none absolute inset-0 bg-[#020617]/20" />
  </section>
) : (
  <section className="relative overflow-hidden rounded-[2rem] border border-[#0066FF]/20 bg-white/[0.05] shadow-2xl shadow-blue-950/40 backdrop-blur-xl mb-10">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/15 via-transparent to-[#00C2FF]/10" />
    <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#00C2FF]/10 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#0066FF]/10 blur-3xl" />

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 p-8 md:p-12">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-200 mb-6">
          <Sparkles className="w-4 h-4 text-[#00C2FF]" />
          {service.eyebrow}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          {service.title}
        </h1>

        <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl">
          {service.subtitle}
        </p>
      </div>

      {/* Hero Summary Card */}
      <div className="rounded-2xl border border-white/10 bg-[#020B1C]/60 p-6 backdrop-blur-md shadow-xl">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00C2FF]">
          <Target className="h-6 w-6 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Service Highlights
        </h2>

        <div className="space-y-3">
          {service.benefits.slice(0, 5).map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#00C2FF]" />
              <span className="text-slate-300">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)}

          {/* Intro Section */}
          <section className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-8 mb-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl">
              <p className="text-sm uppercase tracking-wider text-[#00C2FF] mb-3">
                Overview
              </p>

              <h2 className="text-3xl font-bold text-white mb-4">
                Built for local business growth
              </h2>

              <p className="text-slate-400 leading-relaxed">
                This service is designed to help businesses improve visibility,
                build trust, attract better enquiries, and strengthen their
                digital presence.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl space-y-4">
              {service.intro.map((paragraph, index) => (
                <p key={index} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Main Content Sections */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {service.sections.map((section, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl hover:border-[#00C2FF]/30 transition-all duration-300"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00C2FF] text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    {section.title}
                  </h2>
                </div>

                {section.body && (
                  <p className="text-slate-300 leading-relaxed mb-5">
                    {section.body}
                  </p>
                )}

                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 rounded-xl border border-white/5 bg-[#071A33]/50 p-3 text-slate-300 leading-relaxed"
                      >
                        <CheckCircle className="w-5 h-5 text-[#00C2FF] flex-shrink-0 mt-0.5" />
                        <span>{formatItem(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          {/* Benefits */}
          <section className="rounded-[2rem] border border-[#0066FF]/20 bg-white/[0.05] p-8 shadow-2xl shadow-blue-950/30 backdrop-blur-xl mb-10">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm uppercase tracking-wider text-[#00C2FF] mb-3">
                Benefits
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What your business can gain
              </h2>

              <p className="text-slate-400 leading-relaxed">
                Our services are focused on practical outcomes that support
                stronger visibility, better customer trust, and more business
                opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-white/10 bg-[#071A33]/70 p-5 hover:border-[#00C2FF]/40 hover:bg-[#0B1F3F] transition-all duration-300"
                >
                  <CheckCircle className="mb-4 h-6 w-6 text-[#00C2FF] group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white">
                    {benefit}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 mb-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl">
              <p className="text-sm uppercase tracking-wider text-[#00C2FF] mb-3">
                Why Choose Us
              </p>

              <h2 className="text-3xl font-bold text-white">
                Where Local Search
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md shadow-xl">
              <p className="text-slate-300 text-lg leading-relaxed">
                {service.whyChooseUs}
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="relative overflow-hidden rounded-[2rem] border border-[#0066FF]/25 bg-gradient-to-br from-[#0066FF]/20 to-[#00C2FF]/10 p-8 md:p-10 shadow-2xl shadow-blue-950/40 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,194,255,0.18),_transparent_40%)]" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {service.ctaTitle}
              </h2>

              <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                {service.ctaText}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={primaryCtaHref}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] px-8 py-4 font-bold text-white shadow-xl shadow-[#0066FF]/20 hover:shadow-2xl hover:shadow-[#00C2FF]/25 hover:scale-105 transition-all"
                >
                  {primaryCtaLabel}
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="tel:+61402200018"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-[#071A33]/70 px-8 py-4 font-bold text-white hover:border-[#00C2FF]/50 hover:text-[#00C2FF] transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>

                <a
                  href="mailto:wherelocalsearch@gmail.com"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-[#071A33]/70 px-8 py-4 font-bold text-white hover:border-[#00C2FF]/50 hover:text-[#00C2FF] transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetailPage;