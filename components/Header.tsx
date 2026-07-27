"use client";

import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Header: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/caseStudies", label: "Case Studies" },
    { href: "/packages", label: "Coverage" },
    { href: "/getListed", label: "Get Listed Now" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/terms", label: "Terms And Conditions" },
  ];

  const pathname = usePathname();

  const isCurrentPath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out transform
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
        backdrop-blur-md bg-slate-900/80 border-b border-slate-700`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Image
            src="/images/Where-Local-Search-0201.webp"
            alt="logo"
            width={200}
            height={100}
            className="h-16 md:h-24 w-auto object-contain"
          />

          {/* Hamburger Menu Button */}
          <button
            aria-label="Toggle menu"
            type="button"
            className="lg:hidden p-2 text-slate-300 hover:text-purple-300 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-7 text-sm">
            {menuItems.map((item) => {
              const active = isCurrentPath(item.href);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative font-poppins font-medium transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
                    active
                      ? "text-purple-300 after:w-full after:bg-gradient-to-r after:from-purple-400 after:via-fuchsia-400 after:to-cyan-400"
                      : "text-slate-300 hover:text-purple-200 after:w-0 hover:after:w-full after:bg-gradient-to-r after:from-purple-400 after:to-cyan-400"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <nav className="pt-2 pb-4 space-y-2">
            {menuItems.map((item) => {
              const active = isCurrentPath(item.href);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 font-poppins text-sm transition ${
                    active
                      ? "bg-purple-500/15 text-purple-300"
                      : "text-slate-300 hover:bg-white/5 hover:text-purple-200"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;