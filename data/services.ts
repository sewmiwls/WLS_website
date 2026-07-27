export interface ServiceSection {
  title: string;
  body?: string;
  items?: string[];
}

export interface ServiceDetail {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string[];
  sections: ServiceSection[];
  benefits: string[];
  whyChooseUs: string;
  ctaTitle: string;
  ctaText: string;
  ctaButtonLabel: string;
}

export const services: ServiceDetail[] = [
  {
    slug: "google-maps-ranking",
    eyebrow: "Google Maps Ranking Services",
    title: "Get Found By More Local Customers",
    subtitle:
      "Improve your Google Maps visibility and attract more nearby customers who are already searching for your services.",
    intro: [
      "When customers search for businesses near them, Google Maps is often the first place they look.",
      "If your business isn't appearing in the Google Map Pack, you're likely missing valuable leads, phone calls, and customers.",
      "At Where Local Search, we help Australian businesses improve their visibility on Google Maps through strategic Google Business Profile optimization and local SEO techniques.",
    ],
    sections: [
      {
        title: "What Is Google Maps Ranking?",
        body: "Google Maps Ranking refers to where your business appears when someone searches for products or services in your area. The higher your visibility, the greater your chances of receiving more customer actions.",
        items: [
          "Phone Calls",
          "Website Visits",
          "Direction Requests",
          "Customer Enquiries",
          "Sales Opportunities",
        ],
      },
      {
        title: "What's Included",
        items: [
          "Google Business Profile Optimization — We optimize business categories, services, business description, photos, service areas, products, and attributes.",
          "Local Keyword Research — We identify the keywords customers are searching for in your area.",
          "Citation Building — We create and optimize local business listings across trusted Australian directories.",
          "Review Growth Strategy — We help businesses develop systems that encourage genuine customer reviews.",
          "Competitor Analysis — We review top-ranking competitors and identify growth opportunities.",
        ],
      },
    ],
    benefits: [
      "More Local Visibility",
      "More Calls",
      "More Website Traffic",
      "Better Trust",
      "Increased Leads",
    ],
    whyChooseUs:
      "Our focus is helping local businesses become more visible where customers are actively searching. We use proven local SEO strategies designed to improve your business's online presence and strengthen local search signals.",
    ctaTitle: "Request A Free Google Maps Audit",
    ctaText:
      "Contact our team today to discover how your business can improve its local visibility.",
    ctaButtonLabel: "Request Free Audit",
  },
  {
    slug: "local-seo",
    eyebrow: "Local SEO Services",
    title: "Helping Local Businesses Rank Higher In Search Results",
    subtitle:
      "Improve your visibility when customers search for services within your local area.",
    intro: [
      "Local SEO focuses on improving your visibility when customers search for services within your area.",
      "Whether you're a plumber, electrician, dentist, builder, NDIS provider, or local retailer, local SEO helps connect your business with nearby customers.",
    ],
    sections: [
      {
        title: "Our Local SEO Services Include",
        items: [
          "Keyword Research — Discover what customers are searching for.",
          "On-Page SEO — Improve website structure, headings, titles, and content.",
          "Technical SEO — Identify and fix issues affecting website performance.",
          "Service Area Pages — Create suburb-specific landing pages that target local searches.",
          "Internal Linking — Improve website authority and user navigation.",
          "Content Optimization — Enhance existing pages for better search visibility.",
        ],
      },
      {
        title: "Why Local SEO Matters",
        body: "Most customers search online before contacting a business. Local SEO helps your business appear when customers are actively looking for your services.",
      },
    ],
    benefits: [
      "Increased Organic Traffic",
      "More Qualified Leads",
      "Improved Search Visibility",
      "Better User Experience",
      "Long-Term Growth",
    ],
    whyChooseUs:
      "We help local businesses build stronger search visibility through practical SEO strategies focused on real enquiries and long-term growth.",
    ctaTitle: "Get Started Today",
    ctaText: "Contact Where Local Search for a free local SEO assessment.",
    ctaButtonLabel: "Request SEO Assessment",
  },
  {
    slug: "social-media-management",
    eyebrow: "Social Media Management Services",
    title: "Build A Strong Online Presence",
    subtitle:
      "Maintain a consistent and professional presence across major social media platforms.",
    intro: [
      "Social media is one of the most effective ways to build trust, engage customers, and grow brand awareness.",
      "Our Social Media Management services help businesses maintain a consistent and professional presence across major platforms.",
    ],
    sections: [
      {
        title: "Platforms We Manage",
        items: [
          "Facebook",
          "Instagram",
          "LinkedIn",
          "TikTok",
          "Google Business Profile Posts",
        ],
      },
      {
        title: "What's Included",
        items: [
          "Content Creation — Professional posts designed to engage your audience.",
          "Graphic Design — Branded graphics tailored to your business.",
          "Post Scheduling — Consistent posting to keep your audience engaged.",
          "Community Engagement — Responding and interacting with your audience.",
          "Monthly Content Planning — Strategic content designed around your business goals.",
        ],
      },
    ],
    benefits: [
      "Increased Brand Awareness",
      "Better Engagement",
      "More Website Traffic",
      "Improved Customer Relationships",
      "Increased Enquiries",
    ],
    whyChooseUs:
      "We create content that reflects your brand and helps keep your business visible online.",
    ctaTitle: "Let's Grow Your Social Media Presence",
    ctaText: "Contact our team today for a free consultation.",
    ctaButtonLabel: "Book Free Consultation",
  },
  {
    slug: "web-design-development",
    eyebrow: "Web Design & Development Services",
    title: "Professional Websites Designed To Generate Leads",
    subtitle:
      "Create a modern, mobile-friendly website designed to build trust and convert visitors into customers.",
    intro: [
      "Your website is often the first impression potential customers have of your business.",
      "A slow, outdated, or poorly designed website can cause visitors to leave before contacting you.",
      "At Where Local Search, we create modern, mobile-friendly websites designed to build trust, improve user experience, and convert visitors into customers.",
    ],
    sections: [
      {
        title: "Why Your Website Matters",
        body: "A professional website helps your business build credibility, generate enquiries, improve Google visibility, showcase your services, and convert visitors into paying customers.",
      },
      {
        title: "Our Website Services",
        items: [
          "Custom Website Design — Websites tailored specifically to your business goals and target audience.",
          "Mobile Responsive Design — Your website will look and function perfectly across desktop, tablet, and mobile devices.",
          "SEO-Friendly Structure — Every website is built with SEO best practices in mind.",
          "Landing Page Design — Dedicated service pages designed to improve conversions and lead generation.",
          "Website Speed Optimisation — Fast-loading websites provide a better user experience.",
          "Contact Forms & Lead Capture — Make it easy for customers to contact your business.",
        ],
      },
      {
        title: "Industries We Work With",
        items: [
          "Trades",
          "NDIS Providers",
          "Medical Clinics",
          "Restaurants",
          "Professional Services",
          "Retail Businesses",
          "Construction Companies",
          "Local Service Businesses",
        ],
      },
    ],
    benefits: [
      "Build Credibility",
      "Generate Enquiries",
      "Improve Google Visibility",
      "Showcase Services",
      "Convert Visitors",
    ],
    whyChooseUs:
      "We build websites with both users and search engines in mind. Every website is designed to be visually appealing, easy to navigate, and focused on generating business growth.",
    ctaTitle: "Ready For A Better Website?",
    ctaText:
      "Contact our team today and let's build a website that works for your business.",
    ctaButtonLabel: "Start Website Project",
  },
  {
    slug: "cybersecurity-solutions",
    eyebrow: "Cybersecurity Solutions",
    title: "Protect Your Business From Online Threats",
    subtitle:
      "Strengthen your digital security and reduce online risks with practical cybersecurity support.",
    intro: [
      "Cyber threats continue to grow every year, making business security more important than ever.",
      "A single security breach can result in lost data, downtime, financial loss, and damage to your reputation.",
      "At Where Local Search, we help businesses strengthen their digital security and reduce online risks.",
    ],
    sections: [
      {
        title: "Why Cybersecurity Matters",
        body: "Businesses of all sizes face risks that can affect operations, customer trust, and business continuity.",
        items: [
          "Malware",
          "Ransomware",
          "Phishing Attacks",
          "Data Breaches",
          "Website Hacking",
          "Email Compromise",
          "Password Theft",
        ],
      },
      {
        title: "Our Cybersecurity Services",
        items: [
          "Website Security Reviews — We assess your website for potential vulnerabilities and security risks.",
          "Security Monitoring — Monitor systems for suspicious activity and potential threats.",
          "Malware Detection — Identify and remove malicious software affecting your website or systems.",
          "Security Best Practices — Recommendations to improve security policies and procedures.",
          "Data Protection Guidance — Help safeguard sensitive business and customer information.",
          "Backup & Recovery Planning — Prepare for unexpected events with backup and recovery strategies.",
        ],
      },
    ],
    benefits: [
      "Reduced Security Risks",
      "Improved Customer Trust",
      "Better Data Protection",
      "Increased Business Continuity",
      "Greater Peace Of Mind",
    ],
    whyChooseUs:
      "We focus on practical cybersecurity solutions designed to help businesses reduce risk and improve resilience.",
    ctaTitle: "Secure Your Business Today",
    ctaText:
      "Speak with our team about protecting your digital assets and online presence.",
    ctaButtonLabel: "Speak With Our Team",
  },
  {
    slug: "cloud-solutions",
    eyebrow: "Cloud Solutions",
    title: "Modern Cloud Solutions For Growing Businesses",
    subtitle:
      "Improve efficiency, collaboration, scalability, and secure access to business data.",
    intro: [
      "Cloud technology allows businesses to improve efficiency, collaboration, scalability, and data accessibility.",
      "Whether your team works remotely or from multiple locations, cloud solutions can help streamline your operations.",
    ],
    sections: [
      {
        title: "What Are Cloud Solutions?",
        body: "Cloud solutions enable businesses to access systems, files, and applications securely over the internet instead of relying on local servers.",
        items: [
          "Increased Flexibility",
          "Better Collaboration",
          "Enhanced Data Access",
          "Reduced Infrastructure Costs",
          "Improved Scalability",
        ],
      },
      {
        title: "Our Cloud Services",
        items: [
          "Cloud Migration — Move business systems and data to cloud-based platforms.",
          "Cloud Storage Solutions — Securely store and access files from anywhere.",
          "Business Backup Solutions — Protect critical business information through cloud-based backups.",
          "Remote Access Systems — Enable teams to work securely from any location.",
          "Cloud Infrastructure Support — Guidance and support for cloud-based business environments.",
          "Scalability Planning — Prepare your systems to support future business growth.",
        ],
      },
    ],
    benefits: [
      "Access Data Anywhere",
      "Improved Team Collaboration",
      "Increased Flexibility",
      "Better Business Continuity",
      "Scalable Technology Solutions",
    ],
    whyChooseUs:
      "We help businesses understand and implement practical cloud solutions that improve efficiency and support long-term growth.",
    ctaTitle: "Ready To Modernise Your Business?",
    ctaText:
      "Contact our team today to discuss cloud solutions tailored to your business needs.",
    ctaButtonLabel: "Discuss Cloud Solutions",
  },
];

export const getServiceBySlug = (slug: string) => {
  return services.find((service) => service.slug === slug);
};