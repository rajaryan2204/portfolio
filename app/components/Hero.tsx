"use client";

import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { FadeIn, SmoothCard } from "./MotionWrapper";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-12 pb-16 sm:pt-20 sm:pb-20 md:pt-28 md:pb-28 max-w-4xl mx-auto px-5 sm:px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start">
        
        {/* Left Editorial Content (7 cols) */}
        <div className="md:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Section Tag */}
          <FadeIn delay={0.05} direction="up">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent">
                01 — INSTRUMENTATION & CONTROL ENGG · DEVELOPER
              </span>
            </div>
          </FadeIn>

          {/* Main Typography */}
          <FadeIn delay={0.15} direction="up" className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.12]">
              Hi, I&apos;m {profile.displayName}.
            </h1>
            <p className="text-lg sm:text-2xl text-foreground-muted font-normal leading-relaxed tracking-tight">
              {profile.bio}
            </p>
          </FadeIn>

          {/* Action Links */}
          <FadeIn delay={0.25} direction="up">
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-[#292524] transition-colors duration-150 shadow-sm touch-manipulation"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded border border-border bg-surface text-foreground text-xs sm:text-sm font-medium hover:bg-surface-subtle transition-colors duration-150 shadow-sm touch-manipulation"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-foreground-subtle" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded border border-border bg-surface text-foreground text-xs sm:text-sm font-medium hover:bg-surface-subtle transition-colors duration-150 shadow-sm touch-manipulation"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-foreground-subtle" />
              </motion.a>
            </div>
          </FadeIn>

          {/* Editorial Micro Metadata */}
          <FadeIn delay={0.35} direction="up">
            <div className="pt-4 border-t border-border/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-foreground-subtle">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                <span>Diploma ICE · SLIET Longowal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{profile.location} ({profile.timezone})</span>
              </div>
            </div>
          </FadeIn>

        </div>

        {/* Right Academic Summary Card (5 cols) */}
        <div className="md:col-span-5 md:pl-2">
          <FadeIn delay={0.2} direction="up">
            <SmoothCard className="bg-surface border border-border rounded p-5 sm:p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
              
              {/* Header info */}
              <div className="flex items-center justify-between border-b border-border/70 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-subtle">
                  ACADEMICS & STUDIES / 2026
                </span>
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>

              {/* Institution */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider block">
                  Institution
                </span>
                <p className="text-sm font-medium text-foreground">
                  Sant Longowal Institute of Engineering & Technology (SLIET)
                </p>
              </div>

              {/* Branch */}
              <div className="space-y-1 pt-2 border-t border-border/50">
                <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider block">
                  Discipline
                </span>
                <p className="text-xs text-foreground font-mono bg-surface-subtle p-2 rounded border border-border/60">
                  Instrumentation & Control Engineering (Diploma 1st Year)
                </p>
              </div>

              {/* Key Builds */}
              <div className="space-y-1 pt-2 border-t border-border/50">
                <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider block">
                  Recent Platforms Built
                </span>
                <p className="text-xs text-foreground-muted font-mono">
                  SLIET Voice · InterviewX AI · VisionX
                </p>
              </div>

            </SmoothCard>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
