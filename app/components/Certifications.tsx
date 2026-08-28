"use client";

import { Award, Trophy, CheckCircle2, ExternalLink, Sparkles, Cpu, BookOpen, ShieldCheck } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SmoothCard } from "./MotionWrapper";

const ACHIEVEMENTS = [
  {
    id: "techfest26",
    title: "techFEST'26 SLIET — National Technical Fest",
    category: "Hackathon & Robotics",
    issuer: "Sant Longowal Institute of Engineering & Technology",
    date: "2026",
    badge: "National Fest",
    icon: Trophy,
    description:
      "Active participant and team builder in SLIET's flagship national level annual technical fest, developing hardware-software integrations and microcontroller sensor telemetry.",
    skills: ["Embedded Systems", "Robotics", "Next.js Dashboard", "Telemetry"],
  },
  {
    id: "sih2026",
    title: "Smart India Hackathon (SIH 2026)",
    category: "National Innovation",
    issuer: "Ministry of Education & AICTE",
    date: "2026",
    badge: "SIH Team",
    icon: Sparkles,
    description:
      "Collaborated on engineering software solutions for national problem statements, focusing on campus grievance automation and real-time student polling architectures.",
    skills: ["Full-Stack", "System Design", "Cloud Database", "Problem Solving"],
  },
  {
    id: "cv-python",
    title: "Python, OpenCV & YOLOv8 Computer Vision",
    category: "Technical Certification",
    issuer: "Engineering Project Credential",
    date: "2025 — 2026",
    badge: "Computer Vision",
    icon: Cpu,
    description:
      "Designed and deployed real-time object tracking, bounding box analysis, and desktop automated vision tools (VisionX) with sub-30ms inference latency.",
    skills: ["OpenCV", "YOLOv8", "PyQt6", "Real-Time Inference"],
  },
  {
    id: "fullstack-nextjs",
    title: "Full-Stack Web Architecture & Serverless",
    category: "Software Development",
    issuer: "Modern Web Engineering",
    date: "2025 — 2026",
    badge: "Full-Stack",
    icon: ShieldCheck,
    description:
      "Engineered production-grade web applications with Next.js App Router, TypeScript, Tailwind CSS, NextAuth, and Neon PostgreSQL cloud databases.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Neon PostgreSQL"],
  },
  {
    id: "ice-diploma",
    title: "Diploma in Instrumentation & Control Engineering",
    category: "Academic Qualification",
    issuer: "SLIET Longowal (Deemed-to-be-University)",
    date: "2026 — Present",
    badge: "1st Year ICE",
    icon: Award,
    description:
      "Rigorous technical engineering curriculum covering applied physics, electrical sciences, op-amps, digital logic, sensors, and foundational control systems.",
    skills: ["Control Systems", "Circuits", "Sensors & Transducers", "Digital Logic"],
  },
];

export default function Certifications() {
  return (
    <section
      id="achievements"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-5 sm:px-6"
    >
      <div className="space-y-10">
        
        {/* Section Header */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
                05 / CREDENTIALS & MILESTONES
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Certifications & Achievements
              </h2>
            </div>
            <span className="text-xs font-mono text-foreground-subtle">
              Hackathons · Technical Credentials · Academics
            </span>
          </div>
        </FadeIn>

        {/* Achievements Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ACHIEVEMENTS.map((item) => {
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

                  {/* Skills tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5 border-t border-border/50">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-border/70 text-foreground-muted"
                      >
                        {skill}
                      </span>
                    ))}
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
