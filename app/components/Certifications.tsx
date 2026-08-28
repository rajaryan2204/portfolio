"use client";

import { useState } from "react";
import {
  Award,
  Trophy,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Cpu,
  BookOpen,
  ShieldCheck,
  Linkedin,
  X,
  Maximize2,
  Check,
  FileCheck
} from "lucide-react";
import { profile } from "@/data/profile";
import { FadeIn, StaggerContainer, StaggerItem, SmoothCard } from "./MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";

const VERIFIED_CREDENTIALS = [
  {
    id: "google-prompting-essentials",
    title: "Google Prompting Essentials Specialization",
    category: "Professional AI Certification",
    issuer: "Google (via Coursera)",
    date: "June 2026",
    credentialId: "RJUN7JDGNDEV",
    badge: "Google Certified",
    icon: Sparkles,
    hasInteractivePreview: true,
    description:
      "Official Google certification in Artificial Intelligence (AI) and Prompt Engineering, mastering structured prompting techniques, multimodal GenAI workflows, and LLM orchestration.",
    skills: ["Artificial Intelligence (AI)", "Prompt Engineering", "Google AI", "LLMs"],
    verificationUrl: "https://www.coursera.org/account/accomplishments/specialization/RJUN7JDGNDEV",
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
    hasInteractivePreview: false,
    description:
      "Formal engineering studies covering circuit analysis, sensors, digital systems, and foundational control and software theory.",
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
    hasInteractivePreview: false,
    description:
      "Production-grade full-stack and desktop tools including SLIET Voice, InterviewX AI, VisionX computer vision assistant, and SyncBridge.",
    skills: ["Python", "TypeScript", "Next.js", "OpenCV", "PostgreSQL"],
    verificationUrl: "https://github.com/rajaryan2204",
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
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
            const isGoogle = item.id === "google-prompting-essentials";

            return (
              <StaggerItem key={item.id}>
                <SmoothCard className={`p-6 rounded border ${isGoogle ? "border-accent/40 bg-surface/90" : "border-border bg-surface"} hover:bg-[#fbf8f2] hover:border-neutral-400 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm h-full group`}>
                  <div className="space-y-3">
                    
                    {/* Visual Certificate Card Preview for Google Prompting Essentials */}
                    {isGoogle && (
                      <div
                        onClick={() => setSelectedCert("google")}
                        className="cursor-pointer rounded-lg bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-blue-500/10 border border-accent/40 p-4 space-y-2.5 hover:border-accent transition-all relative overflow-hidden group/cert shadow-inner"
                        title="Click to view full certificate"
                      >
                        {/* Certificate Header Banner */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Google Colors G Icon */}
                            <div className="w-6 h-6 rounded-full bg-white dark:bg-neutral-800 border border-border flex items-center justify-center shadow-sm">
                              <span className="font-bold text-xs bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 bg-clip-text text-transparent">
                                G
                              </span>
                            </div>
                            <span className="text-[11px] font-bold tracking-tight text-foreground font-mono">
                              Google
                            </span>
                          </div>

                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accent/20 text-accent font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            VERIFIED
                          </span>
                        </div>

                        {/* Certificate Body */}
                        <div className="space-y-0.5 border-t border-border/50 pt-2">
                          <p className="text-[10px] font-mono text-foreground-subtle uppercase">
                            Specialization Certificate
                          </p>
                          <h4 className="text-sm font-bold text-foreground tracking-tight leading-tight">
                            Google Prompting Essentials
                          </h4>
                          <p className="text-xs font-medium text-accent">
                            Awarded to Raj Aryan
                          </p>
                        </div>

                        {/* Certificate Footer with 1-click Modal Trigger */}
                        <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-foreground-subtle border-t border-border/40">
                          <span>ID: RJUN7JDGNDEV</span>
                          <span className="text-accent font-semibold group-hover/cert:underline flex items-center gap-1">
                            <Maximize2 className="w-3 h-3" />
                            <span>Preview Certificate</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Top Row: Badge & Date */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 px-2 py-0.5 rounded ${isGoogle ? "bg-accent/15 text-accent border border-accent/30" : "bg-surface-subtle text-accent"}`}>
                        <Icon className="w-3 h-3" />
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-foreground-subtle">
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    {/* Issuer & Credential ID */}
                    <div className="space-y-0.5">
                      <p className="text-xs font-mono text-foreground-subtle">
                        {item.issuer}
                      </p>
                      {item.credentialId && (
                        <p className="text-[11px] font-mono text-foreground-muted">
                          ID: <span className="font-semibold text-foreground">{item.credentialId}</span>
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Skills tags & verification */}
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

                    {isGoogle ? (
                      <button
                        type="button"
                        onClick={() => setSelectedCert("google")}
                        className="text-accent font-semibold hover:underline inline-flex items-center gap-1 transition-colors ml-2 flex-shrink-0"
                      >
                        <span>View Certificate</span>
                        <Maximize2 className="w-3 h-3" />
                      </button>
                    ) : (
                      <a
                        href={item.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-muted hover:text-foreground inline-flex items-center gap-0.5 transition-colors ml-2 flex-shrink-0"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </SmoothCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>

      {/* High-Resolution Certificate Modal */}
      <AnimatePresence>
        {selectedCert === "google" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#181816] border-2 border-neutral-300 dark:border-neutral-700 rounded-xl shadow-2xl p-6 sm:p-10 space-y-6 text-neutral-900 dark:text-neutral-100 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Watermark / Frame */}
              <div className="border-4 border-double border-neutral-300 dark:border-neutral-700 p-6 sm:p-8 rounded-lg space-y-6 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-[#181816] dark:via-[#1c1c1a] dark:to-[#181816] shadow-sm">
                
                {/* Header with Google and Coursera Logos */}
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 bg-clip-text text-transparent">
                      Google
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                    coursera
                  </span>
                </div>

                {/* Main Certificate Content */}
                <div className="text-center space-y-3 py-2">
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                    This is to certify that
                  </p>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight font-serif">
                    Raj Aryan
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
                    has successfully completed the online, non-credit Specialization
                  </p>

                  <h4 className="text-lg sm:text-xl font-bold text-accent tracking-tight pt-1">
                    Google Prompting Essentials Specialization
                  </h4>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto leading-relaxed">
                    Demonstrating proficiency in prompt engineering principles, multimodal AI interactions, generative workflows, and real-world AI task optimization.
                  </p>
                </div>

                {/* Certificate Footer with ID and Verification Link */}
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <div className="text-left space-y-0.5">
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                      Credential ID: RJUN7JDGNDEV
                    </p>
                    <p>Issue Date: June 2026</p>
                  </div>

                  <a
                    href="https://www.coursera.org/account/accomplishments/specialization/RJUN7JDGNDEV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
                  >
                    <span>Verify on Coursera</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
