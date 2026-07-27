import type { Metadata } from "next";
import { Poppins, Playfair } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const playfair = Playfair({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google Maps Optimizers",
  description: "Your local search solution",
  keywords: [
    "Google Maps Optimizers",
    "Local Search",
    "Local SEO",
    "Local Business",
    "Local Listings",
    "Local Search Engine Optimization",
    "Local Search Marketing",
    "Local Search Solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
