"use client";

import { profile } from "@/data/profile";
import { Compass, BookOpen, Hammer, Cpu } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SmoothCard } from "./MotionWrapper";

export default function Currently() {
  const { currently } = profile;

  const entries = [
    {
      label: "Building",
      value: currently.building,
      icon: Hammer,
    },
    {
      label: "Learning",
      value: currently.learning,
      icon: Cpu,
    },
    {
      label: "Exploring",
      value: currently.exploring,
      icon: Compass,
    },
    {
      label: "Reading / Research",
      value: currently.reading,
      icon: BookOpen,
    },
  ];

  return (
    <section
      id="currently"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-5 sm:px-6 section-glow"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left Header */}
        <div className="md:col-span-4 space-y-1">
          <FadeIn delay={0.05}>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
              03 / NOW & FOCUS
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Currently
            </h2>
            <p className="text-xs font-mono text-foreground-subtle pt-2">
              A small live glimpse into what I&apos;m focused on right now.
            </p>
          </FadeIn>
        </div>

        {/* Right Content Grid */}
        <div className="md:col-span-8 space-y-4">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {entries.map((entry, idx) => {
              const Icon = entry.icon;
              return (
                <StaggerItem key={idx}>
                  <SmoothCard className="p-5 rounded-xl border border-border bg-surface hover:bg-surface-card hover:border-accent transition-all duration-200 space-y-2 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider font-medium">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      <span>{entry.label}</span>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">
                      {entry.value}
                    </p>
                  </SmoothCard>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
}
