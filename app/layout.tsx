import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";
import dynamic from 'next/dynamic';
import { Analytics } from "@vercel/analytics/next";

// Dynamically import HeaderWrapper with a loading state
const HeaderWrapper = dynamic(() => import('@/components/ui/header-wrapper'), {
  loading: () => (
    <div className="sticky top-5 z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-14 rounded-2xl bg-gray-900/20 backdrop-blur-xl bg-opacity-90 px-6 shadow-2xl shadow-black/50 border border-white/10 animate-pulse"></div>
      </div>
    </div>
  )
});
import type { Metadata } from "next";

// === Fonts ===
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

// === Metadata ===
export const metadata: Metadata = {
  metadataBase: new URL("https://seloraa.com"),
  title: "Seloraa - Intelligence for Teams",
  description:
    "Seloraa is an AI-powered workforce intelligence platform that helps you make data-driven HR decisions — from promotions and performance tracking to upskilling, attrition prediction, succession planning, and organizational design. Built for forward-thinking teams who want to lead, not lag.",
  keywords: [
    "HR software", "people analytics", "workforce intelligence", "succession planning",
    "performance management", "promotion decisions", "firing decisions", "attrition prediction",
    "upskilling platform", "reskilling employees", "talent intelligence", "AI for HR",
    "AI HR platform", "organizational design", "future of work", "employee evaluation tools",
    "talent development", "AI employee insights", "HR automation", "modern HR SaaS",
    "team optimization", "employee lifecycle analytics", "workforce planning",
    "Seloraa", "next-gen HR tech", "AI-powered HR software", "leadership planning",
    "people strategy platform", "HR decision-making tools"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Seloraa - AI for Workforce Decisions",
    description:
      "Smarter, AI-powered talent decisions for modern teams — including promotion, attrition prediction, upskilling, and succession planning.",
    url: "https://seloraa.com",
    siteName: "Seloraa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seloraa - AI for Workforce Decisions",
    description:
      "Smarter, AI-powered talent decisions for modern teams — including promotion, attrition prediction, upskilling, and succession planning.",
    creator: "@seloraa",
  },
  icons: {
    icon: [
      { url: '/images/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/images/site.webmanifest',
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

// === Layout ===
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
      >
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          <HeaderWrapper />
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
