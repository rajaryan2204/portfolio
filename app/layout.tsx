import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";
import AuthProvider from "./components/AuthProvider";

const SITE_URL = "https://rajaryan2204.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.displayName} — Instrumentation & Control Engineer · Developer`,
  description: `Personal portfolio of ${profile.displayName} (SLIET Longowal). Building control systems, computer vision tools, and modern web applications.`,
  keywords: [
    profile.displayName,
    "Raj Aryan",
    "SLIET",
    "SLIET Longowal",
    "Instrumentation & Control",
    "Developer",
    "Software Engineer",
    "Computer Vision",
    "VisionX",
    "SyncBridge",
    "SLIET Voice",
    "InterviewX AI",
    "Python",
    "TypeScript",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: profile.displayName, url: SITE_URL }],
  creator: profile.displayName,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${profile.displayName} — Developer & Engineering Student`,
    description: `1st Year Instrumentation & Control Engineering at SLIET Longowal. Developer building intelligent software, desktop tools, and web applications.`,
    url: SITE_URL,
    siteName: `${profile.displayName} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.displayName} — Developer & Engineering Student`,
    description: `Personal portfolio of ${profile.displayName} (SLIET Longowal). Explore software projects, computer vision tools, and daily logs.`,
    creator: profile.displayName,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ede8dc" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground antialiased min-h-screen font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
