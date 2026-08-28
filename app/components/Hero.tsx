"use client";

import { useState, useEffect } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
  GraduationCap,
  FileDown,
  Sparkles,
  Code2,
  Cpu,
  Terminal,
  Layers
} from "lucide-react";
import { profile } from "@/data/profile";
import { FadeIn, SmoothCard } from "./MotionWrapper";
import { motion } from "framer-motion";

export default function Hero() {
  const [repoCount, setRepoCount] = useState<number>(7);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (data.repositories && Array.isArray(data.repositories)) {
            setRepoCount(data.repositories.length);
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    fetchCount();
  }, []);

  const resumeLink = profile.resumeUrl || `mailto:${profile.email}?subject=Resume%20Request%20-%20Raj%20Aryan`;

  return (
    <section
      id="hero"
      className="pt-8 pb-14 sm:pt-14 sm:pb-18 md:pt-20 md:pb-22 max-w-4xl mx-auto px-5 sm:px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
        
        {/* Left Editorial Content (7 cols) */}
        <div className="md:col-span-7 space-y-6 sm:space-y-7">
          
          {/* Section Tag */}
          <FadeIn delay={0.05} direction="up">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent bg-accent/10 px-2.5 py-1 rounded">
                01 — INSTRUMENTATION & CONTROL ENGG · DEVELOPER
              </span>
            </div>
          </FadeIn>

          {/* Main Typography */}
          <FadeIn delay={0.15} direction="up" className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.12]">
              Hi, I&apos;m {profile.displayName}.
            </h1>
            <p className="text-base sm:text-xl text-foreground-muted font-normal leading-relaxed tracking-tight font-sans">
              {profile.bio}
            </p>
          </FadeIn>

          {/* Action Links & Download Resume Button */}
          <FadeIn delay={0.25} direction="up">
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              
              {/* View Projects CTA */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-foreground text-background text-xs sm:text-sm font-medium hover:bg-[#292524] transition-colors duration-150 shadow-sm touch-manipulation font-mono"
              >
                <span>View Projects</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.a>

              {/* Download Resume Button (Opens in New Tab) */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded border border-border bg-surface text-foreground text-xs sm:text-sm font-medium hover:bg-surface-card hover:border-neutral-400 transition-all duration-150 shadow-sm touch-manipulation font-mono"
                title="Download or View Resume PDF in new tab"
              >
                <FileDown className="w-4 h-4 text-accent" />
                <span>Download Resume (PDF)</span>
              </motion.a>

              {/* GitHub */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded border border-border bg-surface text-foreground text-xs sm:text-sm font-medium hover:bg-surface-card hover:border-neutral-400 transition-all duration-150 shadow-sm touch-manipulation font-mono"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-foreground-subtle" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded border border-border bg-surface text-foreground text-xs sm:text-sm font-medium hover:bg-surface-card hover:border-neutral-400 transition-all duration-150 shadow-sm touch-manipulation font-mono"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-foreground-subtle" />
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

        {/* Right Column: Profile Avatar Branding & Live GitHub Metadata (5 cols) */}
        <div className="md:col-span-5 md:pl-2 space-y-4">
          <FadeIn delay={0.2} direction="up">
            
            <SmoothCard className="bg-surface border border-border rounded-lg p-5 sm:p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
              
              {/* Professional Profile Avatar Header */}
              <div className="flex items-center gap-4 border-b border-border/70 pb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent/20 to-emerald-500/20 border-2 border-accent flex items-center justify-center text-foreground font-mono text-xl font-bold shadow-inner relative flex-shrink-0">
                  <span className="text-accent">
                    RA
                  </span>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-accent border-2 border-surface" />
                </div>
                
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base font-medium text-foreground tracking-tight">
                      Raj Aryan
                    </h2>
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" title="Active & Building" />
                  </div>
                  <p className="text-xs font-mono text-foreground-muted">
                    @rajaryan2204 · SLIET ICE &apos;26
                  </p>
                </div>
              </div>

              {/* Institution */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider block">
                  Institution & Department
                </span>
                <p className="text-xs sm:text-sm font-medium text-foreground">
                  Sant Longowal Institute of Engineering & Technology (SLIET)
                </p>
              </div>

              {/* Discipline */}
              <div className="space-y-1 pt-2 border-t border-border/50">
                <span className="text-[10px] font-mono text-foreground-subtle uppercase tracking-wider block">
                  Branch & Studies
                </span>
                <p className="text-xs text-foreground font-mono bg-surface-subtle p-2 rounded border border-border/60">
                  Instrumentation & Control Engineering (Diploma 1st Year)
                </p>
              </div>

              {/* Live Dynamic Stats (Fetched from API) */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono border-t border-border/50">
                <div>
                  <span className="text-foreground-subtle block text-[10px] uppercase tracking-wider">GitHub Repos</span>
                  <span className="text-accent font-semibold text-xs sm:text-sm">{repoCount} Public Repos Live</span>
                </div>
                <div>
                  <span className="text-foreground-subtle block text-[10px] uppercase tracking-wider">Status</span>
                  <span className="text-foreground font-medium text-xs">Open for Collab</span>
                </div>
              </div>

            </SmoothCard>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
