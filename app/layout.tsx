import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.displayName} — Developer`,
  description: `Personal portfolio of ${profile.displayName}, showcasing software projects, computer vision tools, and systems work.`,
  keywords: [
    profile.displayName,
    "Developer",
    "Software Engineer",
    "Computer Vision",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: profile.displayName, url: profile.social.github }],
  creator: profile.displayName,
  openGraph: {
    title: `${profile.displayName} — Developer`,
    description: `Personal portfolio of ${profile.displayName}, showcasing software projects, computer vision tools, and systems work.`,
    url: profile.social.github,
    siteName: `${profile.displayName} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${profile.displayName} — Developer`,
    description: `Personal portfolio of ${profile.displayName}, showcasing software projects, computer vision tools, and systems work.`,
    creator: profile.displayName,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ede8dc",
  width: "device-width",
  initialScale: 1,
};

import AuthProvider from "./components/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#ede8dc]">
      <body className="bg-[#ede8dc] text-[#171717] antialiased min-h-screen font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
