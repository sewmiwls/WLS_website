import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

interface FooterProps {
  companyName?: string;
  companyTagline?: string;
  phones?: string[];
  email?: string;
  address?: string;
  businessHours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
}

type SocialIconProps = {
  className?: string;
};

const FacebookIcon = ({ className = "" }: SocialIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);

const InstagramIcon = ({ className = "" }: SocialIconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({
  companyName = "WLS Digital Agency",
  companyTagline = "Running a Business Without Online Exposure is like Working Hard Without Direction",
  phones = ["0342240040", "+61402200018"],
  email = "wherelocalsearch@gmail.com",
  address = "Unit 9/3-11 High St, North Melbourne VIC 3051",
  businessHours = {
    weekdays: "Mon-Fri: 9am-8pm",
    saturday: "Sat: 10am-6pm",
    sunday: "Sun: Closed",
  },
}) => {
  const aboutLinks = [
    { name: "Home", href: "/" },
    { name: "Case Studies", href: "/caseStudies" },
    { name: "Packages", href: "/packages" },
    { name: "Get Listed Now", href: "/getListed" },
    { name: "Contacts", href: "/contact" },
    { name: "Terms and Conditions", href: "/terms" },
  ];

  const serviceLinks = [
    {
      name: "Direct debits",
      href: "https://secure.ezidebit.com.au/webddr/Request.aspx?a=7126D855B640623980DD74C33DB6319F&aDur=1&afreq=4",
    },
    {
      name: "Website Renewal",
      href: "https://secure.ezidebit.com.au/webddr/Request.aspx?a=7126D855B640623980DD74C33DB6319F&debits=2&afreq=64&adur=1",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/share/1DCZTAJwx1/?mibextid=wwXIfr",
      icon: <FacebookIcon className="w-5 h-5 text-white" />,
      className: "bg-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/where_local_search?igsh=MXNpdHAwNXQ5NDMycQ==",
      icon: <InstagramIcon className="w-5 h-5 text-white" />,
      className:
        "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    },
  ];

  const contactIconClass =
    "inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00C2FF] flex-shrink-0 mt-1 shadow-lg shadow-[#0066FF]/20";

  return (
    <footer className="w-full font-poppins bg-gradient-to-br from-[#071A33] via-[#0B1F3F] to-[#071A33] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/10 via-[#0B1F3F]/10 to-[#00C2FF]/10"></div>

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 102, 255, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 194, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.35fr_1fr] gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#00C2FF] bg-clip-text text-transparent">
              {companyName}
            </h3>

            <p className="text-slate-300 leading-relaxed mb-6">
              {companyTagline}
            </p>

            <p className="text-slate-400 text-sm">~WLS</p>
          </div>

          {/* About Us Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">ABOUT US</h4>

            <ul className="space-y-3">
              {aboutLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-[#00C2FF] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Service Links */}
            <div className="mt-8 space-y-3">
              {serviceLinks.map((link, index) => (
                <div key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-[#00C2FF] transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts */}
          <div className="min-w-0">
            <h4 className="text-xl font-bold text-white mb-6">CONTACTS</h4>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className={contactIconClass}>
                  <Phone className="w-4 h-4 text-white" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Call Us
                  </p>

                  <div className="flex flex-col gap-1">
                    {phones.map((phoneNumber) => (
                      <Link
                        key={phoneNumber}
                        href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
                      >
                        <span className="block text-slate-300 hover:text-[#00C2FF] transition-colors font-playfair text-xl">
                          {phoneNumber}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className={contactIconClass}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Visit Us
                  </p>

                  <span className="text-slate-300 leading-relaxed block">
                    {address}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 min-w-0">
                <div className={contactIconClass}>
                  <Mail className="w-4 h-4 text-white" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Email Us
                  </p>

                  <Link
                    href={`mailto:${email}`}
                    className="inline-block text-slate-300 hover:text-[#00C2FF] transition-colors text-sm xl:text-base leading-relaxed whitespace-nowrap"
                  >
                    {email}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours + Social Media */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">
              BUSINESS HOURS
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={contactIconClass}>
                  <Clock className="w-4 h-4 text-white" />
                </div>

                <div className="text-slate-300">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Open Hours
                  </p>

                  <div>{businessHours.weekdays}</div>
                  <div>{businessHours.saturday}</div>
                  <div>{businessHours.sunday}</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-4">
                SOCIAL MEDIA
              </h4>

              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${social.className} transition-all duration-300 hover:scale-110 hover:shadow-xl`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#0066FF]/20 pt-8">
          <div className="text-center text-slate-400 text-sm">
            <p>
              All rights reserved to Where Local Search™ 2026 | WLS Group
              pty.ltd. Melbourne VIC 3001
            </p>

            <p className="mt-2">
              © Copyright 1999-2026 WLS Group pty.ltd. Melbourne VIC 3001
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;