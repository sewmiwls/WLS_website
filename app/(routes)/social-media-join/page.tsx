"use client";

import Header from "@/components/Header";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Send,
  Share2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface SocialMediaJoinFormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  businessName: string;
  abnNumber: string;
  businessAddress: string;
  businessPhoneNumber: string;
  message: string;
}

const SocialMediaJoinPage = () => {
  const [formData, setFormData] = useState<SocialMediaJoinFormData>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    businessName: "",
    abnNumber: "",
    businessAddress: "",
    businessPhoneNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/social-media-join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          businessName: formData.businessName,
          abnNumber: formData.abnNumber,
          businessAddress: formData.businessAddress,
          businessPhoneNumber: formData.businessPhoneNumber,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");

      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        businessName: "",
        abnNumber: "",
        businessAddress: "",
        businessPhoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Social Media Join Form Error:", error);
      setSubmitStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top_left,_#1e3a8a33,_transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_45%,#111827_100%)] text-white font-poppins">
      <Header visible />

      <main className="pt-[130px] pb-20">
        <div className="container mx-auto px-6">
          <Link
            href="/services/social-media-management"
            className="mb-8 inline-flex items-center gap-2 text-slate-300 hover:text-[#00C2FF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Social Media Management
          </Link>

          <section className="mb-10 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-200">
              <Share2 className="h-4 w-4 text-[#00C2FF]" />
              Social Media Management
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
              Join Our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-[#00C2FF] bg-clip-text text-transparent">
                Social Media Program
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Complete the form below and our team will contact you to discuss
              your social media management requirements.
            </p>
          </section>

          <section className="mx-auto max-w-5xl rounded-[2rem] border border-[#0066FF]/20 bg-white/[0.05] p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-xl md:p-10">
            {submitStatus === "success" && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <p className="text-green-300">
                  Thank you! Your request has been submitted successfully.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-300">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobileNumber"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Mobile Number *
                  </label>
                  <input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    required
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your mobile number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessName"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Business Name *
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter your business name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="abnNumber"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    ABN Number *
                  </label>
                  <input
                    id="abnNumber"
                    name="abnNumber"
                    type="text"
                    required
                    value={formData.abnNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your ABN number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessPhoneNumber"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Business Phone Number *
                  </label>
                  <input
                    id="businessPhoneNumber"
                    name="businessPhoneNumber"
                    type="tel"
                    required
                    value={formData.businessPhoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your business phone number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="businessAddress"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Business Address *
                  </label>
                  <input
                    id="businessAddress"
                    name="businessAddress"
                    type="text"
                    required
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your business address"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your business and social media requirements..."
                  className="w-full resize-vertical rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-400 transition-colors focus:border-[#0066FF] focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052CC] px-6 py-4 font-bold text-white shadow-xl shadow-[#0066FF]/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl hover:shadow-[#00C2FF]/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Submit Join Request
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SocialMediaJoinPage;