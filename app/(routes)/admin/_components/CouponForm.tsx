"use client";
import React, { memo, useState } from "react";

const CreateCouponForm = () => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState<number | null>(null);
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [active, setActive] = useState<boolean>(true);
  const [appliesTo, setAppliesTo] = useState<"monthly" | "setup" | "both">(
    "setup"
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          description,
          type,
          discount: Number(discount),
          appliesTo,
          active,
        }),
      });
      if (!res.ok) throw new Error("Failed to create coupon");
      setSuccess("Coupon created successfully!");
      setCode("");
      setDiscount(0);
      setDescription("");
      setType("percent");
      setAppliesTo("setup");
      setActive(true);
    } catch (err: any) {
      setError(err.message || "Error creating coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto font-poppins bg-slate-900/70 border border-slate-700/60 rounded-xl p-8 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-slate-300 mb-1 font-medium">
            Coupon Code
          </label>
          <input
            aria-label="Coupon Code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            placeholder="E.g. WELCOME10"
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1 font-medium">
            Description
          </label>
          <input
            aria-label="Coupon Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="E.g. 10% off for new users"
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-gray-500 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1 font-medium">
            Applies To
          </label>
          <select
            aria-label="Coupon Applies To"
            value={appliesTo}
            onChange={(e) =>
              setAppliesTo(e.target.value as "monthly" | "setup" | "both")
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="setup">Setup Fee</option>
            <option value="monthly">Monthly Fee</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-300 mb-1 font-medium">
            Discount Type
          </label>
          <select
            aria-label="Coupon Discount Type"
            value={type}
            onChange={(e) => setType(e.target.value as "percent" | "fixed")}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="percent">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
        <div>
          <label className="block text-slate-300 mb-1 font-medium">
            Discount Value
          </label>
          <div className="relative">
            <input
              aria-label="Discount Value"
              type="number"
              value={discount ?? ""}
              onChange={(e) => setDiscount(Number(e.target.value))}
              min={1}
              max={type === "percent" ? 100 : undefined}
              required
              placeholder={type === "percent" ? "e.g. 10" : "e.g. 20"}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {type === "percent" ? "%" : "$"}
            </span>
          </div>
        </div>
        <div className="flex items-center mt-6 md:mt-0">
          <input
            aria-label="Coupon Active"
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500 transition"
            id="coupon-active"
          />
          <label
            htmlFor="coupon-active"
            className="ml-2 text-slate-300 font-medium cursor-pointer"
          >
            Active
          </label>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              <span>Creating...</span>
            </span>
          ) : (
            "Create Coupon"
          )}
        </button>
        {success && (
          <span className="text-green-400 font-medium animate-pulse">
            {success}
          </span>
        )}
        {error && <span className="text-red-400 font-medium">{error}</span>}
      </div>
    </form>
  );
};

export default memo(CreateCouponForm);
