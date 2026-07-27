"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Download,
  ArrowRight,
  Home,
  Mail,
  Loader2,
} from "lucide-react";
import Header from "@/components/Header";

const PaymentComplete = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const uref = urlParams.get("uref");

        if (!uref) {
          setError("Invalid order reference");
          setLoading(false);
          return;
        }

        // Fetch order details
        const response = await fetch(`/api/order-details?uref=${uref}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const data = await response.json();
        setOrderData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const handleDownloadReceipt = () => {
    if (!orderData) return;

    const logoUrl =
      "https://www.wherelocalsearch.com.au/images/Where-Local-Search-0201.webp"; 

    const printContent = `
    <html>
      <head>
        <title>Receipt - ${orderData.uref}</title>
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #0f172a;
            color: #f8fafc;
            padding: 40px;
          }
          .receipt {
            max-width: 700px;
            margin: auto;
            background-color: #1e293b;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 0 20px rgba(0,0,0,0.3);
          }
          .logo {
            display: block;
            max-width: 180px;
            margin: 0 auto 20px auto;
          }
          h1 {
            text-align: center;
            font-size: 28px;
            margin-bottom: 10px;
            color: #22c55e;
          }
          p {
            text-align: center;
            margin: 0 0 20px;
            color: #cbd5e1;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #334155;
          }
          .label {
            font-weight: 600;
            text-align: left;
            color: #94a3b8;
            width: 40%;
          }
          .value {
            text-align: right;
            color: #f8fafc;
            font-family: monospace;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <img src="${logoUrl}" alt="Company Logo" class="logo" />
          <h1>Payment Receipt</h1>
          <p>Thank you for your purchase, ${orderData.firstName} ${
      orderData.lastName
    }</p>

          <table>
            <tr><td class="label">Order ID:</td><td class="value">${
              orderData.uref
            }</td></tr>
            <tr><td class="label">Name:</td><td class="value">${
              orderData.firstName
            } ${orderData.lastName}</td></tr>
            <tr><td class="label">Email:</td><td class="value">${
              orderData.email
            }</td></tr>
            <tr><td class="label">Business:</td><td class="value">${
              orderData.businessName || ""
            }</td></tr>
            <tr><td class="label">Service:</td><td class="value">${
              orderData.selectedPackage || "Local Search Marketing Package"
            }</td></tr>
            <tr><td class="label">Setup Fee:</td><td class="value">$${
              orderData.setupAmount || "0"
            }</td></tr>
            <tr><td class="label">Monthly Fee:</td><td class="value">$${
              orderData.monthlyAmount || "0"
            }</td></tr>
            <tr><td class="label">Total Amount:</td><td class="value">$${
              orderData.totalAmount || "0"
            }</td></tr>
            <tr><td class="label">Payment Method:</td><td class="value">${
              orderData.paymentMethod || "Direct Debit"
            }</td></tr>
            <tr><td class="label">Status:</td><td class="value" style="color: #22c55e;">Confirmed</td></tr>
          </table>

          <div class="footer">
            Receipt generated on ${new Date().toLocaleString()}
          </div>
        </div>

        <script>
          window.onload = () => {
            window.print();
          };
        </script>
      </body>
    </html>
  `;

    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen md:mt-[100px] mt-[80px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
        <Header visible={true} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
            <Loader2 className="w-10 h-10 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-300">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  md:mt-[100px] mt-[80px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
        <Header visible={true} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
            <div className="text-red-400 mb-4">Error: {error}</div>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  md:mt-[100px] mt-[80px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <Header visible={true} />
      {/* Background Effects */}
      <div className="absolute top-[100px] inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Thank you for your purchase, {orderData?.firstName}!
          </p>
          <p className="text-slate-400 mb-8">
            Your order has been processed and you&apos;ll receive a confirmation
            email at {orderData?.email} shortly.
          </p>

          {/* Order Details */}
          <div className="bg-slate-700/30 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-white mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="text-white font-mono">#{orderData?.uref}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-white">
                  {orderData?.selectedPackage ||
                    "Local Search Marketing Package"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Business:</span>
                <span className="text-white">
                  {orderData?.businessName ||
                    `${orderData?.firstName} ${orderData?.lastName}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Setup Fee:</span>
                <span className="text-white">
                  ${orderData?.setupAmount || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Fee:</span>
                <span className="text-white">
                  ${orderData?.monthlyAmount || "0"}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-600 pt-2">
                <span className="text-slate-400">Total Amount:</span>
                <span className="text-white font-semibold">
                  ${orderData?.totalAmount || "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Method:</span>
                <span className="text-white">
                  {orderData?.paymentMethod || "Direct Debit"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="flex items-center text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleDownloadReceipt}
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-200"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Receipt
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/")}
              className="flex items-center justify-center px-6 py-3 border-2 border-slate-600 rounded-lg font-semibold text-white hover:border-blue-400 hover:text-blue-400 transition-all duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>

          {/* Next Steps */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white mb-4">
              What happens next?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <p className="text-white font-medium">Confirmation Email</p>
                  <p className="text-slate-400 text-sm">
                    You'll receive a detailed confirmation at {orderData?.email}{" "}
                    within 5 minutes
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <p className="text-white font-medium">Account Setup</p>
                  <p className="text-slate-400 text-sm">
                    Our team will contact you at {orderData?.phone} within 24
                    hours to begin setup
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <p className="text-white font-medium">Campaign Launch</p>
                  <p className="text-slate-400 text-sm">
                    Your local search optimization will begin within 48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-3">
              Need help or have questions?
            </p>
            <button className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplete;
