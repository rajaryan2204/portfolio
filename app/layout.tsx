import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";
import AuthProvider from "./components/AuthProvider";

const SITE_URL = "https://rajaryan2204.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.displayName} — Software Developer & Engineering Student @ SLIET`,
  description: `Personal portfolio of ${profile.displayName} (SLIET Longowal). Building AI tools, computer vision assistants, and full-stack systems.`,
  keywords: [
    profile.displayName,
    "Raj Aryan",
    "SLIET",
    "SLIET Longowal",
    "Software Developer",
    "AI Developer",
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
    title: `${profile.displayName} — Software Developer & Engineering Student @ SLIET`,
    description: `Engineering Student at SLIET Longowal & Developer building intelligent software, computer vision assistants, and web platforms.`,
    url: SITE_URL,
    siteName: `${profile.displayName} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.displayName} — Software Developer & Engineering Student @ SLIET`,
    description: `Personal portfolio of ${profile.displayName} (SLIET Longowal). Explore software projects, computer vision tools, and engineering builds.`,
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
