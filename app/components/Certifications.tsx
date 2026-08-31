"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Linkedin,
  X,
  Eye,
  Check,
  Award,
  Maximize2
} from "lucide-react";
import { FadeIn, SmoothCard } from "./MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";

export default function Certifications() {
  const [selectedCertModal, setSelectedCertModal] = useState<string | null>(null);
  const linkedinCertUrl = "https://www.linkedin.com/in/raj-aryan2204/details/certifications/";

  const modules = [
    "Introduction to AI",
    "Maximize Productivity With AI Tools",
    "Discover the Art of Prompting",
    "Use AI Responsibly",
    "Stay Ahead of the AI Curve"
  ];

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
                04 / CERTIFICATIONS & CREDENTIALS
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Verified Certifications
              </h2>
            </div>

            {/* Direct LinkedIn Profile Link */}
            <a
              href={linkedinCertUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-surface border border-border hover:bg-surface-card hover:border-neutral-400 text-foreground text-xs font-mono font-medium transition-colors shadow-sm"
              title="View all verified certificates on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5 text-accent" />
              <span>LinkedIn Profile ↗</span>
            </a>
          </div>
        </FadeIn>

        {/* Featured Certificate Showcase Card (Grid: Left Image / Right Details) */}
        <FadeIn delay={0.1}>
          <SmoothCard className="rounded-2xl border border-accent/40 bg-surface shadow-sm hover:shadow-md transition-all overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              
              {/* Left Column: Certificate Image Frame (7 cols on desktop) */}
              <div
                onClick={() => setSelectedCertModal("/images/google-ai-certificate.png")}
                className="md:col-span-7 bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border cursor-pointer group relative overflow-hidden"
              >
                {/* Visual Certificate Paper Container */}
                <div className="relative w-full rounded-lg border-2 border-neutral-300 dark:border-neutral-800 shadow-md group-hover:border-accent transition-all overflow-hidden bg-white">
                  <img
                    src="/images/google-ai-certificate.png"
                    alt="Google AI Essentials Certificate - Raj Aryan"
                    className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-semibold backdrop-blur-[1px]">
                    <Eye className="w-4 h-4" />
                    <span>Click to View Full Resolution</span>
                  </div>
                </div>

                {/* Sub-strip indicator */}
                <div className="pt-3 flex items-center justify-between text-xs font-mono text-foreground-muted">
                  <span className="flex items-center gap-1.5 text-accent font-semibold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Official Google Career Certificate</span>
                  </span>
                  <span className="text-[11px] text-foreground-subtle group-hover:text-accent transition-colors flex items-center gap-1">
                    <span>Expand</span>
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Right Column: Certificate Metadata & Course Breakdown (5 cols) */}
              <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded bg-accent/15 text-accent border border-accent/30">
                      <Sparkles className="w-3 h-3" />
                      Google Certified
                    </span>
                    <span className="text-xs font-mono text-foreground-subtle">
                      Jun 27, 2026
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">
                      Google AI Essentials
                    </h3>
                    <p className="text-xs font-mono text-foreground-muted">
                      Issued by <strong className="text-foreground">Google</strong> via Coursera
                    </p>
                    <p className="text-[11px] font-mono text-foreground-subtle">
                      Credential ID: <span className="font-semibold text-foreground">GRWZTXD42969</span>
                    </p>
                  </div>

                  {/* 5 Course Modules List */}
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle block font-semibold">
                      5 Specialization Courses Completed:
                    </span>
                    <ul className="space-y-1.5 text-xs text-foreground font-sans">
                      {modules.map((mod, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="leading-tight text-foreground-muted">{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 border-t border-border/60 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCertModal("/images/google-ai-certificate.png")}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-foreground text-background font-mono text-xs font-medium hover:bg-[#292524] transition-colors shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Full Certificate</span>
                  </button>

                  <a
                    href="https://coursera.org/verify/specialization/GRWZTXD42969"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded border border-border bg-surface text-foreground font-mono text-xs font-medium hover:bg-surface-card transition-colors shadow-sm"
                  >
                    <span>Verify on Coursera ↗</span>
                    <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  </a>
                </div>

              </div>

            </div>
          </SmoothCard>
        </FadeIn>

      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCertModal && (
          <div
            onClick={() => setSelectedCertModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white dark:bg-[#181816] border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl shadow-2xl p-4 sm:p-6 space-y-4 text-neutral-900 dark:text-neutral-100 overflow-hidden max-h-[92vh] flex flex-col justify-between"
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border">
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

              {/* High-Res Certificate Full Image */}
              <div className="overflow-auto flex-grow rounded-xl bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-2 border border-border">
                <img
                  src={selectedCertModal}
                  alt="Google AI Essentials Certificate Full View"
                  className="max-h-[68vh] w-auto object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Modal Bottom Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border text-xs font-mono text-foreground-muted">
                <span>Credential ID: <strong className="text-foreground">GRWZTXD42969</strong></span>
                
                <a
                  href="https://coursera.org/verify/specialization/GRWZTXD42969"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-foreground text-background font-semibold hover:bg-[#292524] transition-colors shadow-sm"
                >
                  <span>Verify on Coursera Official ↗</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
