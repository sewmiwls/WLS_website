import Loader from "@/components/Loader";
import React, { memo, useEffect, useState } from "react";

const PaymentsList = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [paymentsPage, setPaymentsPage] = useState<number>(1);
  const pageSize = 5; // You can let the user choose this too
  const [totalPaymentsCount, setTotalPaymentsCount] = useState(0);
  const [totalPaymentPages, setTotalPaymentPages] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/ezidebit?page=${paymentsPage}&pageSize=${pageSize}`
      );
      const data = await res.json();
      setPayments(data.data || []);
      setTotalPaymentsCount(data.pagination?.totalRecords || 0);
      setTotalPaymentPages(data.pagination?.totalPages || 0);
      setLoading(false);
    };
    fetchPayments();
  }, [paymentsPage, pageSize]);

  const toggleDetails = (uref: string) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(uref)) newSet.delete(uref);
      else newSet.add(uref);
      return newSet;
    });
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-white text-xl font-bold mb-4">Payments</h2>

      {loading && <Loader className="h-8 w-8 mx-auto my-4 text-slate-400" />}
      {!loading && payments.length === 0 && (
        <div className="text-center text-slate-400">No users found.</div>
      )}

      {!loading && payments.length > 0 && (
        <ul className="divide-y divide-slate-700">
          {payments.map((p) => {
            const isExpanded = expanded.has(p.uref);
            const payment = p.paymentData;
            const submission = p.submissionData;

            return (
              <li
                key={p.uref}
                className="p-4 border font-poppins border-slate-800 bg-slate-900/60 rounded-xl shadow-md hover:bg-slate-900/80 transition-colors duration-200 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Left Side - Summary Info */}
                  <div className="space-y-1">
                    <p className="text-white font-medium text-base">
                      {p.firstName} {p.lastName}
                      <span className="ml-2 text-sm text-slate-400 font-normal">
                        {p.email}
                      </span>
                    </p>
                    <div className="text-sm text-slate-400 font-mono space-y-0.5">
                      <p>Payment Ref: {p.uref || "N/A"}</p>
                      {p.businessName && <p>Business: {p.businessName}</p>}
                    </div>
                  </div>

                  {/* Right Side - Status, Amount, Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <span
                      className={`text-xs font-semibold rounded-full px-3 py-1 border-2 ${
                        p.status === "paid"
                          ? "text-green-400 border-green-400"
                          : "text-yellow-400 border-yellow-400"
                      }`}
                    >
                      {p.status === "paid" ? "Paid" : "Pending"}
                    </span>
                    <span className="text-purple-300 font-semibold text-lg">
                      ${p.totalAmount}
                    </span>
                    <button
                      onClick={() => toggleDetails(p.uref)}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </button>
                  </div>
                </div>

                {/* Expanded Info */}
                {isExpanded && (
                  <div className="mt-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300 space-y-6">
                    {submission && (
                      <div>
                        <h4 className="text-white font-semibold text-base mb-2">
                          Submission Info
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                          <p>
                            <span className="text-slate-400">Entity:</span>{" "}
                            {submission.entityType} - {submission.entity}
                          </p>
                          <p>
                            <span className="text-slate-400">Package:</span>{" "}
                            <span className="font-mono">
                              {submission.selectedPackage}
                            </span>
                          </p>
                          <p>
                            <span className="text-slate-400">Name:</span>{" "}
                            {submission.firstName} {submission.lastName}
                          </p>
                          <p>
                            <span className="text-slate-400">Business:</span>{" "}
                            <span className="font-mono">
                              {submission.businessName}
                            </span>
                          </p>
                          <p>
                            <span className="text-slate-400">Email:</span>{" "}
                            <span className="font-mono">
                              {submission.email}
                            </span>
                          </p>
                          <p>
                            <span className="text-slate-400">Phone:</span>{" "}
                            <span className="font-mono">
                              {submission.phone}
                            </span>
                          </p>
                          <p className="sm:col-span-2">
                            <span className="text-slate-400">Address:</span>{" "}
                            <span className="font-mono">
                              {submission.address}, {submission.suburb},{" "}
                              {submission.state} {submission.postcode}
                            </span>
                          </p>
                          <p>
                            <span className="text-slate-400">Setup Fee:</span> $
                            {submission.totals.setup}
                          </p>
                          <p>
                            <span className="text-slate-400">Monthly Fee:</span>{" "}
                            ${submission.totals.monthly}
                          </p>
                          <p className="sm:col-span-2">
                            <span className="text-slate-400">
                              Requirements:
                            </span>{" "}
                            {submission.requirements}
                          </p>
                          <p className="sm:col-span-2">
                            <span className="text-slate-400">Categories:</span>{" "}
                            {submission.businessCategories.join(", ")}
                          </p>
                          <p>
                            <span className="text-slate-400">
                              Sales Personnel:
                            </span>{" "}
                            {submission.salesperson || "N/A"}
                          </p>
                        </div>
                      </div>
                    )}

                    {payment && (
                      <div>
                        <h4 className="text-white font-semibold text-base mb-2">
                          Payment Info
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                          <p>
                            <span className="text-slate-400">Method:</span>{" "}
                            {payment.method}
                          </p>
                          <p>
                            <span className="text-slate-400">
                              Setup Amount:
                            </span>{" "}
                            ${payment.oamount}
                          </p>
                          <p>
                            <span className="text-slate-400">
                              Recurring Amount:
                            </span>{" "}
                            ${payment.ramount}
                          </p>
                          <p>
                            <span className="text-slate-400">Start Date:</span>{" "}
                            {payment.odate}
                          </p>
                          <p>
                            <span className="text-slate-400">
                              Recurring Date:
                            </span>{" "}
                            {payment.rdate}
                          </p>
                          <p>
                            <span className="text-slate-400">Frequency:</span>{" "}
                            {payment.freq}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      {!loading && payments.length > 0 && (
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            type="button"
            onClick={() => setPaymentsPage((prev) => Math.max(prev - 1, 1))}
            disabled={paymentsPage <= 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2 text-white">
            <span>Page</span>
            <span className="font-semibold">{paymentsPage}</span>
            <span>of</span>
            <span className="font-semibold">{totalPaymentPages}</span>
          </div>

          <button
            type="button"
            onClick={() => setPaymentsPage((prev) => prev + 1)}
            disabled={paymentsPage >= totalPaymentPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(PaymentsList);
