"use client";
import React, { useState, useEffect, act } from "react";
import {
  BarChart3,
  Users,
  Globe,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  MapPin,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Filter,
  User,
} from "lucide-react";
import ContactsList from "./_components/ContactsList";
import TestimonialsList from "./_components/TestimonialList";
import UsersList from "./_components/UserList";
import PaymentsList from "./_components/PaymentList";
import CreateCouponForm from "./_components/CouponForm";
import CouponList from "./_components/CouponList";
import ChangePassword from "./_components/ChangePassword";
import CaseStudyList from "./_components/CaseStudyList";
import CaseStudyForm from "./_components/CaseStudyForm";
import PageList from "./_components/PageList";
import PageForm from "./_components/PageForm";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "contacts" | "testimonials" | "users" | "payments" | "caseStudies" | "pages"
  >("overview");
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [username, setUsername] = useState("");
  const [showCaseStudyForm, setShowCaseStudyForm] = useState(false);
  const [editingCaseStudyId, setEditingCaseStudyId] = useState<string | undefined>();
  const [showPageForm, setShowPageForm] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | undefined>();

  // Simulate auth check
  useEffect(() => {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_token="))
      ?.split("=")[1];

    const adminName = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin_name="))
      ?.split("=")[1];

    if (adminToken !== "valid" || !adminName) {
      window.location.href = "/admin/login";
    }

    setUsername(adminName?.toString() || "");

  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  type StatCardProps = {
    title: string;
    value: string | number;
    change: string | number;
    trend: "up" | "down";
    icon: React.ElementType;
    color: string;
  };

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    trend,
    icon: Icon,
    color,
  }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <button
          type="button"
          name="options"
          className="text-slate-400 hover:text-white"
          title="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
        <div className="flex items-center space-x-2">
          {trend === "up" ? (
            <ArrowUpRight className="w-4 h-4 text-green-400" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-400" />
          )}
          <span
            className={`text-sm font-medium ${
              trend === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {change}
          </span>
          <span className="text-slate-500 text-sm">vs last month</span>
        </div>
      </div>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
        <button className="text-slate-400 hover:text-white text-sm">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {[
          {
            action: "New listing added",
            location: "New York, NY",
            time: "2 min ago",
            status: "success",
          },
          {
            action: "Profile updated",
            location: "Los Angeles, CA",
            time: "15 min ago",
            status: "info",
          },
          {
            action: "Review responded",
            location: "Chicago, IL",
            time: "1 hour ago",
            status: "success",
          },
          {
            action: "Listing optimized",
            location: "Miami, FL",
            time: "2 hours ago",
            status: "warning",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                item.status === "success"
                  ? "bg-green-400"
                  : item.status === "info"
                  ? "bg-blue-400"
                  : item.status === "warning"
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }`}
            ></div>
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{item.action}</p>
              <p className="text-slate-400 text-xs">{item.location}</p>
            </div>
            <span className="text-slate-500 text-xs">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const TopLocations = () => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          Top Performing Locations
        </h3>
        <button
          type="button"
          name="locations"
          className="text-slate-400 hover:text-white"
          title="More locations"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">
        {[
          {
            name: "Downtown Restaurant",
            location: "New York, NY",
            score: 4.8,
            growth: "+12%",
          },
          {
            name: "Tech Solutions Co",
            location: "San Francisco, CA",
            score: 4.7,
            growth: "+8%",
          },
          {
            name: "Fitness Center Plus",
            location: "Los Angeles, CA",
            score: 4.6,
            growth: "+15%",
          },
          {
            name: "Coffee House Central",
            location: "Chicago, IL",
            score: 4.5,
            growth: "+5%",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">{item.name}</p>
                <p className="text-slate-400 text-xs">{item.location}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-medium">
                  {item.score}
                </span>
              </div>
              <span className="text-green-400 text-xs font-medium">
                {item.growth}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-[120vh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
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

      {/* Header */}
      <header className="w-full  fixed z-50  border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-l md:text-xl font-bold text-white">
                    Admin Dashboard
                  </h1>
                  <p className="text-slate-400 md:text-sm text-xs">
                    Local Search Management
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
                />
              </div> */}
              <div className="relative">
                <button
                  type="button"
                  title="User Profile"
                  name="user-icon"
                  className="relative p-2 flex flex-col justify-center items-center text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-poppins ">{username}</span>
                </button>
              </div>
              <button
                type="button"
                name="notifications"
                title="Notifications"
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                onClick={() => setShowChangePassword(true)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              {typeof window !== "undefined" && showChangePassword && (
                <div className="fixed top-[150px] inset-0 z-50 flex items-center justify-center bg-black/60">
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 w-full max-w-md relative">
                    <button
                      onClick={() => setShowChangePassword(false)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-white"
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Change Password Required
                    </h3>
                    <p className="text-slate-300 mb-6">
                      For your security, please change your password now.
                    </p>
                    <button
                      onClick={() => {
                        setShowChangePassword(false);
                        setShowPasswordForm(true);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              )}
              {showPasswordForm && (
                <div className="fixed min-h-[100vh] inset-0 z-50 flex items-center justify-center bg-black/60">
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 w-full max-w-md relative">
                    <button
                      onClick={() => setShowPasswordForm(false)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-white"
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <ChangePassword />
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm md:visible hidden">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative h-full md:top-[80px] top-[60px] z-10 max-w-7xl mx-auto px-6 py-8">
        <div className=" md:flex overflow-scroll space-x-4 my-8">
          {["overview", "contacts", "testimonials", "users", "payments", "caseStudies", "pages"].map(
            (tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setSelectedTab(tab as any)}
                className={`px-4 py-2 mb-2 rounded-lg transition-colors cursor-pointer ${
                  selectedTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {tab === "caseStudies" ? "Case Studies" : tab === "pages" ? "Pages" : tab[0].toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {selectedTab === "contacts" && <ContactsList />}
        {selectedTab === "testimonials" && <TestimonialsList />}
        {selectedTab === "users" && <UsersList />}
        {selectedTab === "payments" && <PaymentsList />}
        {selectedTab === "caseStudies" && (
          <CaseStudyList
            onEdit={(id) => {
              setEditingCaseStudyId(id);
              setShowCaseStudyForm(true);
            }}
            onNew={() => {
              setEditingCaseStudyId(undefined);
              setShowCaseStudyForm(true);
            }}
          />
        )}
        {selectedTab === "pages" && (
          <PageList
            onEdit={(id) => {
              setEditingPageId(id);
              setShowPageForm(true);
            }}
            onNew={() => {
              setEditingPageId(undefined);
              setShowPageForm(true);
            }}
          />
        )}
        {selectedTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Listings"
                value="10,247"
                change="+12.5%"
                trend="up"
                icon={MapPin}
                color="from-blue-500 to-blue-600"
              />
              <StatCard
                title="Active Clients"
                value="2,847"
                change="+8.2%"
                trend="up"
                icon={Users}
                color="from-green-500 to-green-600"
              />
              <StatCard
                title="Avg. Rating"
                value="4.7"
                change="+0.3"
                trend="up"
                icon={Star}
                color="from-yellow-500 to-yellow-600"
              />
              <StatCard
                title="Monthly Revenue"
                value="$94,512"
                change="-2.1%"
                trend="down"
                icon={TrendingUp}
                color="from-purple-500 to-purple-600"
              />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Create Coupon */}
              <div className="mt-8 lg:col-span-2">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">
                      Coupons
                    </h3>
                    <button
                      onClick={() => setShowCouponModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Create Coupon
                    </button>
                  </div>
                  <CouponList />
                </div>
                {showCouponModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 w-full max-w-md relative">
                      <button
                        onClick={() => setShowCouponModal(false)}
                        className="absolute top-3 right-3 text-slate-400 hover:text-white"
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <h3 className="text-xl font-semibold text-white mb-6">
                        Create Coupon
                      </h3>
                      <CreateCouponForm
                      // onSuccess={() => setShowCouponModal(false)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="space-y-8">
                <RecentActivity />
                <TopLocations />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Add Listing",
                      icon: MapPin,
                      color: "from-blue-500 to-blue-600",
                      onclick: () => setSelectedTab("contacts"),
                    },
                    {
                      label: "Manage Users",
                      icon: Users,
                      color: "from-green-500 to-green-600",
                      onclick: () => setSelectedTab("users"),
                    },
                    {
                      label: "View Analytics",
                      icon: BarChart3,
                      color: "from-purple-500 to-purple-600",
                      onclick: () => setSelectedTab("overview"),
                    },
                    {
                      label: "Settings",
                      icon: Settings,
                      color: "from-slate-500 to-slate-600",
                      onclick: () => setSelectedTab("overview"),
                    },
                  ].map((action, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={action.onclick}
                      className="flex flex-col items-center space-y-3 p-6 bg-slate-700/30 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
                    >
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform duration-200`}
                      >
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Case Study Form Modal */}
      {showCaseStudyForm && (
        <CaseStudyForm
          caseStudyId={editingCaseStudyId}
          onClose={() => {
            setShowCaseStudyForm(false);
            setEditingCaseStudyId(undefined);
          }}
          onSave={() => {
            // Refresh will happen automatically when modal closes
          }}
        />
      )}

      {/* Page Form Modal */}
      {showPageForm && (
        <PageForm
          pageId={editingPageId}
          onClose={() => {
            setShowPageForm(false);
            setEditingPageId(undefined);
          }}
          onSave={() => {
            // Refresh will happen automatically when modal closes
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
