"use client";

import { Award, Trophy, CheckCircle2, ExternalLink, Sparkles, Cpu, BookOpen, ShieldCheck, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { FadeIn, StaggerContainer, StaggerItem, SmoothCard } from "./MotionWrapper";

const VERIFIED_CREDENTIALS = [
  {
    id: "ice-sliet",
    title: "Instrumentation & Control Engineering (ICE)",
    category: "Academic Engineering Credential",
    issuer: "Sant Longowal Institute of Engineering & Technology (SLIET)",
    date: "2026 — Present (1st Year)",
    badge: "SLIET Longowal",
    icon: Award,
    description:
      "Formal engineering studies in Instrumentation & Control Engineering, covering circuit analysis, sensors, digital systems, and foundational control theory.",
    skills: ["Control Systems", "Instrumentation", "Circuit Analysis", "Sensors"],
    verificationUrl: "https://www.linkedin.com/in/raj-aryan2204/",
  },
  {
    id: "tech-builder",
    title: "Software & Systems Development",
    category: "Verified Projects & Engineering",
    issuer: "GitHub & Live Production Systems",
    date: "2025 — 2026",
    badge: "Verified Builds",
    icon: ShieldCheck,
    description:
      "Production-grade full-stack and desktop tools including SLIET Voice, InterviewX AI, VisionX computer vision assistant, and SyncBridge.",
    skills: ["Python", "TypeScript", "Next.js", "OpenCV", "PostgreSQL"],
    verificationUrl: "https://github.com/rajaryan2204",
  },
];

export default function Certifications() {
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
            return (
              <StaggerItem key={item.id}>
                <SmoothCard className="p-6 rounded border border-border bg-surface hover:bg-[#fbf8f2] hover:border-neutral-400 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm h-full group">
                  <div className="space-y-2.5">
                    
                    {/* Top Row: Badge & Date */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5 bg-accent/10 px-2 py-0.5 rounded">
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

                    {/* Issuer / Category */}
                    <p className="text-xs font-mono text-foreground-subtle">
                      {item.issuer}
                    </p>

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

                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-muted hover:text-foreground inline-flex items-center gap-0.5 transition-colors ml-2 flex-shrink-0"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </SmoothCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
}
