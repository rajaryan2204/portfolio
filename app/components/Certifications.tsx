"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Linkedin,
  X,
  Maximize2,
  Eye
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SmoothCard } from "./MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";

const VERIFIED_CREDENTIALS = [
  {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    category: "Professional AI Specialization",
    issuer: "Google (via Coursera)",
    date: "Jun 27, 2026",
    credentialId: "GRWZTXD42969",
    badge: "Google Certified",
    icon: Sparkles,
    imagePreview: "/images/google-ai-certificate.png",
    description:
      "Official Google certification covering 5 comprehensive courses: Introduction to AI, Maximize Productivity With AI Tools, Discover the Art of Prompting, Use AI Responsibly, and Stay Ahead of the AI Curve.",
    skills: ["Artificial Intelligence (AI)", "Prompt Engineering", "Google AI", "Productivity Workflows"],
    verificationUrl: "https://coursera.org/verify/specialization/GRWZTXD42969",
  },
  {
    id: "sliet-engineering",
    title: "Engineering Studies — SLIET Longowal",
    category: "Academic Qualification",
    issuer: "Sant Longowal Institute of Engineering & Technology (SLIET)",
    date: "2026 — Present (1st Year)",
    credentialId: "SLIET-2026",
    badge: "SLIET Longowal",
    icon: Award,
    imagePreview: null,
    description:
      "Formal engineering studies covering circuit analysis, sensors, digital systems, computing architectures, and foundational control and software theory.",
    skills: ["Control Systems", "Instrumentation", "Circuit Analysis", "Sensors"],
    verificationUrl: "https://www.linkedin.com/in/raj-aryan2204/",
  },
  {
    id: "tech-builder",
    title: "Software & Systems Development",
    category: "Verified Projects & Engineering",
    issuer: "GitHub & Live Production Systems",
    date: "2025 — 2026",
    credentialId: "GITHUB-RAJARYAN2204",
    badge: "Verified Builds",
    icon: ShieldCheck,
    imagePreview: null,
    description:
      "Production-grade full-stack and desktop tools including SLIET Voice, InterviewX AI, VisionX computer vision assistant, and SyncBridge.",
    skills: ["Python", "TypeScript", "Next.js", "OpenCV", "PostgreSQL"],
    verificationUrl: "https://github.com/rajaryan2204",
  },
];

export default function Certifications() {
  const [selectedCertModal, setSelectedCertModal] = useState<string | null>(null);
  const linkedinCertUrl = "https://www.linkedin.com/in/raj-aryan2204/details/certifications/";

  return (
    <section
      id="achievements"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-5 sm:px-6"
    >
      <div className="space-y-8">
        
        {/* Section Header */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
                05 / CREDENTIALS & LICENSES
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Certifications & Verified Credentials
              </h2>
            </div>

            {/* Direct LinkedIn Certifications Link */}
            <a
              href={linkedinCertUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-surface border border-border hover:bg-surface-card hover:border-neutral-400 text-foreground text-xs font-mono font-medium transition-colors shadow-sm"
              title="View all verified certificates on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-accent" />
              <span>LinkedIn Certifications ↗</span>
            </a>
          </div>
        </FadeIn>

        {/* Credentials Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {VERIFIED_CREDENTIALS.map((item) => {
            const Icon = item.icon;
            const isGoogle = item.id === "google-ai-essentials";

            return (
              <StaggerItem key={item.id} className={isGoogle ? "sm:col-span-2" : ""}>
                <SmoothCard className={`p-6 rounded border ${isGoogle ? "border-accent/40 bg-surface" : "border-border bg-surface"} hover:bg-[#fbf8f2] hover:border-neutral-400 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm h-full group`}>
                  <div className="space-y-3">
                    
                    {/* Top Row: Badge & Date */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded ${isGoogle ? "bg-accent/15 text-accent border border-accent/30" : "bg-surface-subtle text-accent"}`}>
                        <Icon className="w-3 h-3" />
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-foreground-subtle">
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    {/* Issuer & Credential ID */}
                    <div className="space-y-0.5">
                      <p className="text-xs font-mono text-foreground-subtle">
                        {item.issuer}
                      </p>
                      {item.credentialId && (
                        <p className="text-[11px] font-mono text-foreground-muted">
                          Credential ID: <span className="font-semibold text-foreground">{item.credentialId}</span>
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-sans">
                      {item.description}
                    </p>

                    {/* Visual Certificate Thumbnail Preview */}
                    {item.imagePreview && (
                      <div className="pt-2">
                        <div
                          onClick={() => setSelectedCertModal(item.imagePreview)}
                          className="cursor-pointer rounded-lg border border-border overflow-hidden group/preview relative hover:border-accent transition-all shadow-sm bg-white dark:bg-neutral-900"
                        >
                          <div className="relative w-full h-44 sm:h-52 overflow-hidden flex items-center justify-center bg-neutral-100 dark:bg-neutral-950">
                            <img
                              src={item.imagePreview}
                              alt={item.title}
                              className="w-full h-full object-contain group-hover/preview:scale-[1.02] transition-transform duration-300"
                            />
                            
                            {/* Hover Overlay with Preview Icon */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-medium backdrop-blur-[2px]">
                              <Eye className="w-4 h-4" />
                              <span>Click to Expand Certificate</span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-surface-subtle border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
                            <span className="flex items-center gap-1.5 text-accent font-semibold text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Verified Official Certificate (Google)
                            </span>
                            <span className="text-[10px] text-foreground-subtle">
                              Click to Enlarge ↗
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Skills tags & verification link */}
                  <div className="pt-3 flex items-center justify-between border-t border-border/50 text-xs font-mono">
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-border/70 text-foreground-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent font-semibold hover:underline inline-flex items-center gap-1 transition-colors ml-2 flex-shrink-0"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </SmoothCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>

      {/* High-Resolution Certificate Modal */}
      <AnimatePresence>
        {selectedCertModal && (
          <div
            onClick={() => setSelectedCertModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white dark:bg-[#181816] border-2 border-neutral-300 dark:border-neutral-700 rounded-xl shadow-2xl p-4 sm:p-6 space-y-4 text-neutral-900 dark:text-neutral-100 overflow-hidden max-h-[90vh] flex flex-col justify-between"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-sm sm:text-base font-bold text-foreground font-mono">
                    Google AI Essentials — Raj Aryan (Jun 27, 2026)
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCertModal(null)}
                  className="p-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image Preview */}
              <div className="overflow-auto flex-grow rounded-lg bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-2 border border-border">
                <img
                  src={selectedCertModal}
                  alt="Google AI Essentials Certificate"
                  className="max-h-[65vh] w-auto object-contain rounded shadow-md"
                />
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-border text-xs font-mono text-foreground-muted">
                <span>Credential ID: GRWZTXD42969</span>
                <a
                  href="https://coursera.org/verify/specialization/GRWZTXD42969"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-accent text-background font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>Verify on Coursera ↗</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
