"use client";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Loader from "@/components/Loader";
// import FadeInOnScroll from "@/components/ScrollComponent";
import ScrollIndicator from "@/components/ScrollIndicator";
import ServiceCardsGrid from "@/components/ServiceCardsGrid";
import Testimonial from "@/components/Testimonials/Testimonial";
import { Quote } from "lucide-react";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [showHeader, setShowHeader] = useState(false);

  const testimonials = [
    {
      id: "manu-tyres",
      title: "Top in Google Search",
      description:
        "Before working with Where Local Search, our business was not showing up where it needed to on Google. Over time, they helped improve our visibility for the services our customers actually search for, and we started seeing much stronger rankings across key terms. We’ve had more calls, more enquiries, and a much better presence online than before.",
      author: "Manu Tyres",
      date: "5/7/2025",
      imageUrl: "",
    },
    {
      id: "aqua-pet",
      title: "More Customers Finding Us Online",
      description:
        "Where Local Search helped us strengthen our online presence in a way that actually made a difference to the business. We started appearing more consistently in search results, and that led to more enquiries from customers who were already looking for what we offer. Their team was easy to work with, clear in communication, and focused on results.",
      author: "Aqua Pet",
      date: "20/9/2025",
      imageUrl: "",
    },
    {
      id: "menswear-warehouse",
      title: "More Customers Visiting Our Store",
      description:
        "Since working with Where Local Search, we’ve noticed more people finding us online and coming into the store on a regular basis. Our visibility improved, more customers started discovering our products, and the overall impact on in-store traffic has been very positive. It’s been a valuable step forward for our business.",
      author: "Menswear Warehouse",
      date: "18/11/2025",
      imageUrl: "",
    },
    {
      id: "kesec",
      title: "Stronger Local Visibility",
      description:
        "Where Local Search helped us build a much stronger online presence and improve how our business appears in local search. We began getting better visibility for the services we wanted to be known for, and that translated into more genuine customer enquiries. They made the whole process straightforward and results-focused.",
      author: "KESEC",
      date: "12/2/2026",
      imageUrl: "",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      setShowHeader(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 min-h-screen max-w-full items-center justify-center">
      <Header visible={showHeader} />
      <HeroSection />
      {/* <FadeInOnScroll children={<ServiceCardsGrid />} /> */}
      <ServiceCardsGrid />

      {/* testimonial section */}
      <div className="relative max-w-full min-h-[70vh] px-6 py-20 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
            <Quote className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl font-poppins md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
            See What Our Clients Say
          </h2>

          <p className="text-xl font-poppins text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We value our clients&apos; feedback and strive to provide the best
            service possible. Here are some of the testimonials from our
            satisfied clients.
          </p>
        </div>

        <Carousel
          mobileItemsPerView={1}
          desktopItemsPerView={3}
          gap={16} // Changed from "1rem" to number (16px)
          autoPlay={true}
          autoPlayInterval={4000}
          showDots={true}
          showArrows={true}
          className="max-w-full overflow-hidden" // Removed grid classes as they conflict with carousel's flex layout
        >
          {testimonials.map((item) => (
            <Testimonial
              key={item.id}
              imagesrc={item.imageUrl}
              title={item.title}
              description={item.description}
              date={item.date}
              author={item.author}
            />
          ))}
        </Carousel>
      </div>

      {/* scroll indicator stick to the bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <ScrollIndicator />
      </div>
    </div>
  );
};

export default Home;