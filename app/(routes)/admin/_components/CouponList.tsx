import Loader from "@/components/Loader";
import React, { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState<boolean>();
  const [spinning, setSpinning] = useState<boolean>(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/coupons");
      if (!response.ok) throw new Error("Failed to fetch coupons");
      const data = await response.json();
      console.log(data);
      setCoupons(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <h2>Coupon List</h2>
      <div className="flex space-x-4 items-center mb-4">
        <p className="text-slate-400 text-sm mb-4">
          Manage your coupons here. You can create, edit, or delete coupons.
        </p>
        <button
          title="refresh"
          type="button"
          onClick={() => {
            setSpinning(true);
            fetchCoupons().finally(() =>
              setTimeout(() => setSpinning(false), 500)
            );
          }}
        >
          <RefreshCcw
            className={`text-slate-400 w-6 h-6 mb-4 duration-75 ${
              spinning ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {coupons.length === 0 ? (
            <li>No coupons found.</li>
          ) : (
            coupons.map((coupon: any) => (
              <li
                key={coupon.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <p className="text-white font-semibold">
                    {coupon.code}
                    <span className="ml-2 text-slate-400 text-sm">
                      {coupon.description}
                    </span>
                  </p>
                  <p className="text-slate-400 text-xs">
                    Applies to:{" "}
                    <span className="font-mono">
                      {coupon.appliesTo || "All products"}
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-green-400 font-bold text-lg">
                    {coupon.discountType === "percent"
                      ? `${coupon.discountValue}%`
                      : `$${coupon.discountValue}`}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      coupon.active
                        ? "bg-green-700 text-green-200"
                        : "bg-red-700 text-red-200"
                    }`}
                  >
                    {coupon.active ? "Active" : "Inactive"}
                  </span>
                  <button
                    className="ml-2 px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs hover:bg-slate-600"
                    onClick={async () => {
                      await fetch(`/api/admin/coupons`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          id: coupon.id,
                          active: !coupon.active,
                        }),
                      });
                      fetchCoupons();
                    }}
                  >
                    {coupon.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className="ml-2 px-2 py-1 bg-red-700 text-red-100 rounded text-xs hover:bg-red-600"
                    onClick={async () => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete coupon "${coupon.code}"?`
                        )
                      ) {
                        await fetch(`/api/admin/coupons`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            id: coupon.id,
                          }),
                        });
                        fetchCoupons();
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CouponList;
