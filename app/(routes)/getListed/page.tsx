"use client";
import Breadcrumbs from "@/components/BreadCrumbs";
import Header from "@/components/Header";
import React, { useState } from "react";
import TagInput from "@/components/TagInput";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import CategorizedTagInput from "@/components/CategorizedTagInput";

const PACKAGES = [
  {
    id: "package1",
    name: "3.5km",
    monthlyPrice: 150,
    setupFee: 300,
    description: "Be First. Be Local",
  },
  {
    id: "package2",
    name: "7.5km",
    monthlyPrice: 200,
    setupFee: 350,
    description: "Local Visibility Boost",
  },
  {
    id: "package3",
    name: "12.5km",
    monthlyPrice: 250,
    setupFee: 400,
    description: "Domination Package",
  },
];

const BUSINESS_CATEGORIES = [
  "Healthcare",
  "Retail",
  "Professional Services",
  "Technology",
  "Hospitality",
  "Education",
  "Manufacturing",
  "Construction",
  "Finance",
  "Real Estate",
  "Transport",
  "Entertainment",
  "Food & Beverage",
  "Agriculture",
  "Arts & Culture",
  "Tourism",
  "Non-Profit",
  "Consulting",
  "Marketing",
  "E-commerce",
  "Logistics",
  "Legal Services",
  "Fitness & Wellness",
  "Automotive",
  "Home Services",
  "Cleaning Services",
  "Event Planning",
  "Pet Services",
  "Beauty & Personal Care",
  "Sports & Recreation",
  "Media & Publishing",
  "Telecommunications",
  "Security Services",
  "Environmental Services",
  "Government",
  "Utilities",
];

const AUSTRALIAN_STATES = [
  { code: "VIC", name: "Victoria" },
  { code: "NSW", name: "New South Wales" },
  { code: "QLD", name: "Queensland" },
  { code: "WA", name: "Western Australia" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" },
];

const GetListed = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    businessName: string;
    entityType: "ABN" | "ACN"; // ABN or ACN
    entity: string; // ABN or ACN number
    email: string;
    phone: string;
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    businessOrPerson: string;
    selectedPackage: string | null;
    requirements: string;
    businessCategories: string[];
    termsAccepted: boolean;
    privacyAccepted: boolean;
    salesperson?: string; // optional salesperson name
  }>({
    // Personal Details
    firstName: "",
    lastName: "",
    businessName: "",
    entityType: "ABN", // Default to ABN
    entity: "", // ABN or ACN
    email: "",
    phone: "",
    address: "",
    suburb: "",
    state: "VIC",
    postcode: "",
    businessOrPerson: "1", // 1 for person, 2 for business

    // Package Selection
    selectedPackage: null,

    // Business Requirements
    requirements: "",
    businessCategories: [],

    // Agreement
    termsAccepted: false,
    privacyAccepted: false,

    // Optional
    salesperson: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Select Package", icon: CreditCard },
    { number: 3, title: "Requirements", icon: FileText },
    { number: 4, title: "Confirmation", icon: CheckCircle },
  ];

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
          newErrors.lastName = "Last name is required";
        if (!formData.businessName.trim())
          newErrors.businessName = "Business name is required";
        if (!formData.entity.trim())
          newErrors.entity = `Please enter a valid ${formData.entityType} number`;
        // abn is 11 digits, acn is 9 digits
        if (
          formData.entityType === "ABN" &&
          !/^\d{11}$/.test(formData.entity.replace(/\s/g, ""))
        ) {
          newErrors.entity = "ABN must be 11 digits";
        }
        if (
          formData.entityType === "ACN" &&
          !/^\d{9}$/.test(formData.entity.replace(/\s/g, ""))
        ) {
          newErrors.entity = "ACN must be 9 digits";
        }
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        if (!formData.phone.trim()) newErrors.phone = "Phone is required";
        if (!/^(\+61|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ""))) {
          newErrors.phone = "Please enter a valid Australian phone number";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.suburb.trim()) newErrors.suburb = "Suburb is required";
        if (!formData.postcode.trim())
          newErrors.postcode = "Postcode is required";
        if (!/^\d{4}$/.test(formData.postcode))
          newErrors.postcode = "Postcode must be 4 digits";
        break;

      case 2:
        if (!formData.selectedPackage)
          newErrors.selectedPackage = "Please select a package";
        break;

      case 3:
        if (!formData.requirements.trim())
          newErrors.requirements = "Please describe your requirements";
        if (formData.businessCategories.length === 0) {
          newErrors.businessCategories =
            "Please select at least one business category";
        }
        break;

      case 4:
        if (!formData.termsAccepted)
          newErrors.termsAccepted = "You must accept the terms and conditions";
        if (!formData.privacyAccepted)
          newErrors.privacyAccepted = "You must accept the privacy policy";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const generateUniqueRef = () => {
    const businessName = formData?.businessName;
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${businessName}-DDR-${timestamp}-${random}`;
  };

  // const calculateTotalAmount = (pkg: {
  //   id?: string;
  //   name?: string;
  //   monthlyPrice: any;
  //   setupFee: any;
  //   description?: string;
  // }) => {
  //   const monthly = pkg.monthlyPrice * 1.1; // Add GST 10%
  //   const setup = pkg.setupFee * 1.1; // Add GST 10%
  //   return {
  //     monthly: monthly.toFixed(2),
  //     setup: setup.toFixed(2),
  //     total: (monthly + setup).toFixed(2),
  //   };
  // };

  type Coupon = {
    code: string;
    description: string;
    discountType: "percent" | "fixed";
    discountValue: number; // percent (e.g. 10 for 10%) or fixed amount (e.g. 50)
    appliesTo: "monthly" | "setup" | "both";
    active: boolean;
  };

  // Admin-defined coupons
  const [COUPONS, setCOUPONS] = useState<Coupon[]>([]);

  React.useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch("/api/admin/coupons");
        if (res.ok) {
          const data = await res.json();
          setCOUPONS(data);
        }
      } catch (err) {
        // Optionally handle error
        setCOUPONS([]);
      }
    };
    fetchCoupons();
  }, []);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = () => {
    const found = COUPONS.find(
      (c) =>
        c.code.toLowerCase() === couponCode.trim().toLowerCase() && c.active
    );
    if (found) {
      setAppliedCoupon(found);
      setCouponError(null);
    } else {
      setAppliedCoupon(null);
      setCouponError("Invalid or expired coupon code.");
    }
  };

  const calculateTotalAmount = (
    pkg: {
      id?: string;
      name?: string;
      monthlyPrice: number;
      setupFee: number;
      description?: string;
    },
    coupon?: Coupon | null
  ) => {
    let monthly = pkg.monthlyPrice;
    let setup = pkg.setupFee;

    if (coupon && coupon.active) {
      if (coupon.appliesTo === "monthly" || coupon.appliesTo === "both") {
        if (coupon.discountType === "percent") {
          monthly = monthly - (monthly * coupon.discountValue) / 100;
        } else {
          monthly = Math.max(0, monthly - coupon.discountValue);
        }
      }
      if (coupon.appliesTo === "setup" || coupon.appliesTo === "both") {
        if (coupon.discountType === "percent") {
          setup = setup - (setup * coupon.discountValue) / 100;
        } else {
          setup = Math.max(0, setup - coupon.discountValue);
        }
      }
    }

    monthly = monthly * 1.1; // Add GST 10%
    setup = setup * 1.1; // Add GST 10%

    return {
      monthly: monthly.toFixed(2),
      setup: setup.toFixed(2),
      total: (monthly + setup).toFixed(2),
    };
  };

  const getNextWorkingDay = (date = new Date()): Date => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    // 0 = Sunday, 6 = Saturday
    while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    return nextDay;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    setIsSubmitting(true);

    try {
      const selectedPkg = PACKAGES.find(
        (p) => p.id === formData.selectedPackage
      );

      if (!selectedPkg) {
        setErrors({ submit: "Please select a valid package." });
        setIsSubmitting(false);
        return;
      }

      // Generate unique reference ONCE
      const uniqueRef = generateUniqueRef();
      const totals = calculateTotalAmount(selectedPkg, appliedCoupon);

      console.log("Submitting form data:", {
        uref: uniqueRef,
        formData,
        totals,
      });

      // Send all form data to the route api/presubmit as POST before going to ezidebit
      await fetch("/api/presubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uref: uniqueRef, // Use the same reference
          formData,
          totals,
        }),
      });

      // Submit form via POST to Ezidebit
      const form = document.createElement("form");
      form.method = "POST";
      form.action =
        "https://secure.ezidebit.com.au/webddr/Request.aspx?a=7126D855B640623980DD74C33DB6319F";

      const formFields = {
        uRefLabel: "Invoice Number",
        uRef: uniqueRef, // Use the same reference here too
        fName: formData.firstName,
        lName: formData.lastName,
        email: formData.email,
        mobile: formData.phone.replace(/\s/g, ""),
        addr: formData.address,
        suburb: formData.suburb,
        state: formData.state,
        pCode: formData.postcode,
        businessOrPerson: formData.businessOrPerson,
        oAmount: parseFloat(totals.setup) === 0 ? "1.00" : totals.setup,
        oDate: 1,
        rAmount: parseFloat(totals.monthly) === 0 ? "1.00" : totals.monthly,
        rDate: 1,
        aFreq: "4",
        freq: "4",
        aDur: "1",
        dur: "1",
        callback: "https://wherelocalsearch.com.au/api/ezidebit",
        cMethod: "POST",
        ed: 1,
      };

      Object.entries(formFields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value.toString();
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-12">
      {/* Horizontal layout for md and above */}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.number
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg"
                  : "border-slate-600 text-slate-400 bg-slate-800/50"
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-6 h-6" />
              ) : (
                <step.icon className="w-6 h-6" />
              )}
            </div>
            <div className="text-center ml-3 mr-6">
              <div
                className={`text-sm font-medium ${
                  currentStep >= step.number ? "text-white" : "text-slate-400"
                }`}
              >
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-slate-700"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Vertical layout for small screens */}
      <div className="flex flex-col items-start justify-start space-y-6 md:hidden px-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.number
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg"
                  : "border-slate-600 text-slate-400 bg-slate-800/50"
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <div>
              <div
                className={`text-base font-medium ${
                  currentStep >= step.number ? "text-white" : "text-slate-400"
                }`}
              >
                {step.title}
              </div>
              <div className="text-sm text-slate-500">
                {/* Optional graphic icon/emoji for visual aid */}
                {step.number === 1}
                {step.number === 2}
                {step.number === 3}
                {/* Add custom icons per step */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Basic Details</h2>
        <p className="text-slate-300">
          Let&apos;s start with your basic information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.firstName
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.lastName
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Business Name *
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => handleInputChange("businessName", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.businessName
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            placeholder="Enter the name of your business"
          />
          {errors.businessname && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.businessname}
            </p>
          )}
        </div>

        {/* abn or acn number */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Entity Type * (ABN or ACN)
          </label>
          <select
            value={formData.entityType}
            onChange={(e) =>
              handleInputChange("entityType", e.target.value as "ABN" | "ACN")
            }
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 hover:border-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-300"
            aria-label="Entity Type"
          >
            <option value="ABN">ABN</option>
            <option value="ACN">ACN</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            {formData.entityType} Number *
          </label>
          <input
            type="text"
            value={formData.entity}
            onChange={(e) => handleInputChange("entity", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.entity
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            maxLength={formData.entityType === "ABN" ? 11 : 9}
            placeholder="11 111 111 111"
          />
          {errors.entity && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.abn}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.email
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.phone
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            placeholder="0400 123 456"
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Address *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
            errors.address
              ? "border-red-500"
              : "border-slate-600 hover:border-slate-500"
          }`}
          placeholder="123 Main Street"
        />
        {errors.address && (
          <p className="text-red-400 text-sm mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.address}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Suburb *
          </label>
          <input
            type="text"
            value={formData.suburb}
            onChange={(e) => handleInputChange("suburb", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.suburb
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            placeholder="Suburb"
          />
          {errors.suburb && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.suburb}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            State *
          </label>
          <select
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 hover:border-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-300"
            aria-label="State"
          >
            {AUSTRALIAN_STATES.map((state) => (
              <option
                key={state.code}
                value={state.code}
                className="bg-slate-800"
              >
                {state.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Postcode *
          </label>
          <input
            type="text"
            value={formData.postcode}
            onChange={(e) => handleInputChange("postcode", e.target.value)}
            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
              errors.postcode
                ? "border-red-500"
                : "border-slate-600 hover:border-slate-500"
            }`}
            placeholder="4000"
            maxLength={4}
          />
          {errors.postcode && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.postcode}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderPackageSelection = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Select Your Package
        </h2>
        <p className="text-slate-300">
          Choose the perfect plan for your business needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PACKAGES.map((pkg) => {
          const totals = calculateTotalAmount(pkg, appliedCoupon);
          const isSelected = formData.selectedPackage === pkg.id;

          return (
            <div
              key={pkg.id}
              onClick={() => handleInputChange("selectedPackage", pkg.id)}
              className={`relative p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-2xl backdrop-blur-sm ${
                isSelected
                  ? "border-blue-500 bg-gradient-to-br from-blue-600/20 to-purple-600/20 shadow-lg shadow-blue-500/25"
                  : "border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-800/50"
              }`}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {pkg.name}
                </h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    ${totals.monthly}/month
                  </div>
                  <div className="text-sm text-slate-400">
                    (${pkg.monthlyPrice}/month + GST)
                  </div>
                  <div className="text-xl font-semibold text-white">
                    ${totals.setup} setup fee
                  </div>
                  <div className="text-sm text-slate-400">
                    (${pkg.setupFee} + GST)
                  </div>
                  <div className="text-lg font-bold text-white mt-4">
                    Total: ${totals.total}
                  </div>
                  {appliedCoupon && (
                    <div className="text-green-400 text-sm mt-2">
                      Coupon applied: {appliedCoupon.code} -{" "}
                      {appliedCoupon.description}
                    </div>
                  )}
                </div>

                {isSelected && (
                  <div className="flex items-center justify-center text-blue-400 font-semibold">
                    <Check className="w-5 h-5 mr-2" />
                    Selected
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-md mx-auto mt-8">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Have a coupon code?
        </label>
        <div className="flex">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300"
            placeholder="Enter coupon code"
            disabled={!!appliedCoupon}
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={!!appliedCoupon || !couponCode.trim()}
            className={`px-5 py-3 rounded-r-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold transition-all duration-300 ${
              appliedCoupon || !couponCode.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            {appliedCoupon ? "Applied" : "Apply"}
          </button>
        </div>
        {couponError && (
          <p className="text-red-400 text-sm mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {couponError}
          </p>
        )}
        {appliedCoupon && (
          <button
            type="button"
            onClick={() => {
              setAppliedCoupon(null);
              setCouponCode("");
              setCouponError(null);
            }}
            className="mt-2 text-xs text-blue-400 underline hover:text-blue-300"
          >
            Remove coupon
          </button>
        )}
        {/* // optional: input salesperson name if available */}
        <div className="mt-4 text-slate-400 text-sm">
          <label>
            <span className="font-medium">Name of Sales Representative</span>{" "}
            (optional - only applicable if referred by a specific person)
          </label>
          <input
            type="text"
            value={formData.salesperson}
            onChange={(e) => handleInputChange("salesperson", e.target.value)}
            className="w-full mt-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300"
            placeholder="e.g. John Doe, Google, Referral"
          />
        </div>
      </div>

      {/* view more details */}
      <div className="text-center mt-6">
        <p className="text-slate-300 text-sm">
          Need more details?{" "}
          <a
            href="/packages"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            View all packages
          </a>
        </p>
      </div>

      {errors.selectedPackage && (
        <p className="text-red-400 text-sm text-center flex items-center justify-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errors.selectedPackage}
        </p>
      )}
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Business Requirements
        </h2>
        <p className="text-slate-300">
          Tell us about your specific needs and goals
        </p>
      </div>

      <div>
        <label className="block text-md font-medium text-slate-300 mb-3">
          Describe Your Requirements *
        </label>
        <textarea
          value={formData.requirements}
          onChange={(e) => handleInputChange("requirements", e.target.value)}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400 transition-all duration-300 ${
            errors.requirements
              ? "border-red-500"
              : "border-slate-600 hover:border-slate-500"
          }`}
          rows={5}
          placeholder="Please describe your specific business requirements and how we can help you..."
        />
        {errors.requirements && (
          <p className="text-red-400 text-sm mt-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.requirements}
          </p>
        )}
      </div>

      <div>
        <label className="block text-md font-medium text-slate-300 mb-4">
          Business Categories *
        </label>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Enter up to 5 category tags that describe your business
          </label>
          <CategorizedTagInput
            value={formData.businessCategories}
            onChange={(tags) => handleInputChange("businessCategories", tags)}
            suggestions={BUSINESS_CATEGORIES}
            maxTags={5}
            placeholder="Type and press Enter…"
          />
        </div>
        {errors.businessCategories && (
          <p className="text-red-400 text-sm mt-3 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.businessCategories}
          </p>
        )}
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const selectedPkg = PACKAGES.find((p) => p.id === formData.selectedPackage);
    const totals = selectedPkg
      ? calculateTotalAmount(selectedPkg, appliedCoupon)
      : null;

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Order Confirmation
          </h2>
          <p className="text-slate-300">
            Please review your details before proceeding
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-400" />
            Customer Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
            <div>
              <span className="text-slate-400">Name:</span>
              <span className="text-white font-medium ml-2">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Email:</span>
              <span className="text-white font-medium ml-2">
                {formData.email}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Phone:</span>
              <span className="text-white font-medium ml-2">
                {formData.phone}
              </span>
            </div>
            <div>
              <span className="text-slate-400">Address:</span>
              <span className="text-white font-medium ml-2">
                {formData.address}, {formData.suburb}, {formData.state}{" "}
                {formData.postcode}
              </span>
            </div>
          </div>
        </div>

        {selectedPkg && totals && (
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/50 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-blue-400" />
              Package Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">{selectedPkg.name}</span>
                <span className="font-semibold text-white">
                  ${totals.monthly}/month
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Setup Fee</span>
                <span className="font-semibold text-white">
                  ${totals.setup}
                </span>
              </div>
              <div className="border-t border-slate-600 pt-4 mt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-white">First Payment Total</span>
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    $
                    {(
                      parseFloat(totals.monthly) + parseFloat(totals.setup)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-slate-400 text-right mt-1">
                  Then ${totals.monthly}/month recurring
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-400" />
            Business Categories
          </h3>
          <div className="flex flex-wrap gap-3">
            {formData.businessCategories.map((category) => (
              <span
                key={category}
                className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 px-4 py-2 rounded-full text-sm text-white"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-white mb-4">
            Requirements
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {formData.requirements}
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-start p-4 bg-slate-800/30 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition-all duration-300">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) =>
                handleInputChange("termsAccepted", e.target.checked)
              }
              className="mr-4 mt-1 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-300">
              I accept the{" "}
              <a
                href="/terms#terms"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Terms and Conditions
              </a>{" "}
              *
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-400 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.termsAccepted}
            </p>
          )}

          <label className="flex items-start p-4 bg-slate-800/30 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition-all duration-300">
            <input
              type="checkbox"
              checked={formData.privacyAccepted}
              onChange={(e) =>
                handleInputChange("privacyAccepted", e.target.checked)
              }
              className="mr-4 mt-1 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-300">
              I accept the{" "}
              <a
                href="/terms#privacy"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Privacy Policy
              </a>{" "}
              *
            </span>
          </label>
          {errors.privacyAccepted && (
            <p className="text-red-400 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.privacyAccepted}
            </p>
          )}
        </div>
        {/* <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center px-6 py-3 bg-slate-800/50 text-white rounded-xl hover:bg-slate-800/70 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ml-auto"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          )}
        </div> */}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-5xl mx-auto mt-[80px] md:mt-[100px]">
        <Header visible={true} />
        <Breadcrumbs />
        {renderStepIndicator()}
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-xl">
          {currentStep === 1 && renderPersonalDetails()}
          {currentStep === 2 && renderPackageSelection()}
          {currentStep === 3 && renderRequirements()}
          {currentStep === 4 && renderConfirmation()}

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            {currentStep > 1 && (
              <button
                onClick={handlePrevious}
                className="flex items-center px-6 py-3 bg-slate-800/50 text-white rounded-xl hover:bg-slate-800/70 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ml-auto"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetListed;

/**
 * https://secure.ezidebit.com.au/webddr/Request.aspx?a=7126D855B640623980DD74C33DB6319F&aDur=1&afreq=4
 * https://secure.ezidebit.com.au/webddr/Request.aspx?a=7126D855B640623980DD74C33DB6319F&aDur=1&afreq=4
 * https://secure.ezidebit.com.au/webddr/Request.aspx?a=7126D855B640623980DD74C33DB6319F
 */
