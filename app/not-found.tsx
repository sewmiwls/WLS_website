import React from "react";
import Link from "next/link";
import Header from "@/components/Header";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6">
      <Header visible={true} />
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          404
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-white mb-4">
          The page you&apos;re looking for is lost in space
        </h1>

        <p className="text-slate-300 mb-8 leading-relaxed">
          We hit a cosmic snag! Don&apos;t worry though - while this page seems to
          have drifted off into the digital void, we&apos;ve got plenty of other
          interesting content to explore. Feel free to check out our case
          studies or head back home.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* <Link href="/">
            <button className="w-full group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span className="relative z-10">Goto Home page</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link> */}

          <Link href="/">
            <button className="w-full px-6 py-3 border-2 border-slate-600 rounded-lg font-semibold text-slate-300 hover:border-blue-400 hover:text-blue-400 transition-all duration-300">
              Back to Home
            </button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default NotFound;
