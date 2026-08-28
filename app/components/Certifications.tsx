"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Linkedin,
  X,
  Eye,
  BadgeCheck
} from "lucide-react";
import { FadeIn, SmoothCard } from "./MotionWrapper";
import { motion, AnimatePresence } from "framer-motion";

const CERTIFICATES = [
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
                05 / CERTIFICATIONS & CREDENTIALS
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
              <span>LinkedIn Profile ↗</span>
            </a>
          </div>
        </FadeIn>

        {/* Real Verified Certificates List (Only User Verified Items) */}
        <div className="space-y-6">
          {CERTIFICATES.map((item) => {
            const Icon = item.icon;

            return (
              <FadeIn key={item.id} delay={0.1}>
                <SmoothCard className="p-6 sm:p-8 rounded-xl border border-accent/40 bg-surface hover:border-accent transition-all duration-200 space-y-6 shadow-sm group">
                  
                  {/* Top Metadata Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-border/70 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/30">
                          <Icon className="w-3 h-3" />
                          {item.badge}
                        </span>
                        <span className="text-xs font-mono text-foreground-subtle">
                          {item.issuer}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-medium text-foreground tracking-tight group-hover:text-accent transition-colors pt-1">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-foreground-subtle">
                      <span>Issued: <strong className="text-foreground">{item.date}</strong></span>
                      <span>•</span>
                      <span>ID: <strong className="text-foreground">{item.credentialId}</strong></span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-foreground-muted leading-relaxed font-sans max-w-3xl">
                    {item.description}
                  </p>

                  {/* Real Certificate Image Visual Thumbnail Preview */}
                  {item.imagePreview && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle block">
                        Official Certificate Document:
                      </span>
                      
                      <div
                        onClick={() => setSelectedCertModal(item.imagePreview)}
                        className="cursor-pointer rounded-lg border-2 border-border overflow-hidden group/preview relative hover:border-accent transition-all shadow-md bg-white dark:bg-neutral-900 max-w-2xl"
                      >
                        <div className="relative w-full h-56 sm:h-72 overflow-hidden flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-2">
                          <img
                            src={item.imagePreview}
                            alt={item.title}
                            className="w-full h-full object-contain group-hover/preview:scale-[1.01] transition-transform duration-300"
                          />
                          
                          {/* Hover Overlay with Preview Icon */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-medium backdrop-blur-[2px]">
                            <Eye className="w-4 h-4" />
                            <span>Click to View Full Size Certificate</span>
                          </div>
                        </div>

                        <div className="p-3 bg-surface-subtle border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
                          <span className="flex items-center gap-1.5 text-accent font-semibold text-xs">
                            <CheckCircle2 className="w-4 h-4" />
                            Verified by Google Career Certificates & Coursera
                          </span>
                          <span className="text-xs text-foreground font-medium group-hover/preview:underline">
                            Enlarge Certificate ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Skills Tags & Verification CTA */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60 text-xs font-mono">
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs font-mono px-3 py-1 rounded bg-surface-subtle border border-border text-foreground-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-foreground text-background font-mono text-xs font-medium hover:bg-[#292524] transition-colors shadow-sm whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>Verify on Coursera</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </SmoothCard>
              </FadeIn>
            );
          })}
        </div>

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
              className="relative w-full max-w-4xl bg-white dark:bg-[#181816] border-2 border-neutral-300 dark:border-neutral-700 rounded-xl shadow-2xl p-4 sm:p-6 space-y-4 text-neutral-900 dark:text-neutral-100 overflow-hidden max-h-[92vh] flex flex-col justify-between"
            >
              {/* Modal Top Header */}
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
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Image Preview */}
              <div className="overflow-auto flex-grow rounded-lg bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-2 border border-border">
                <img
                  src={selectedCertModal}
                  alt="Google AI Essentials Certificate"
                  className="max-h-[68vh] w-auto object-contain rounded shadow-md"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-border text-xs font-mono text-foreground-muted">
                <span>Credential ID: GRWZTXD42969</span>
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
