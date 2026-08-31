"use client";

import { profile } from "@/data/profile";
import { GraduationCap, BookOpen } from "lucide-react";
import { FadeIn, SmoothCard } from "./MotionWrapper";

export default function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-5 sm:px-6 section-glow"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

        {/* Left Column: Number + Title (4 cols) */}
        <div className="md:col-span-4 space-y-1">
          <FadeIn delay={0.05}>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
              02 / NARRATIVE & STUDIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              About Me
            </h2>
            <p className="text-xs font-mono text-foreground-subtle pt-2">
              Engineering background, academic foundation & vision.
            </p>
          </FadeIn>
        </div>

        {/* Right Column: Bio Paragraphs, Education Card & Topics (8 cols) */}
        <div className="md:col-span-8 space-y-8">

          {/* Narrative paragraphs */}
          <FadeIn delay={0.1} className="space-y-4 text-base text-foreground-muted leading-relaxed">
            {profile.aboutText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </FadeIn>

          {/* Academic Education Box */}
          {profile.education.map((edu, idx) => (
            <FadeIn key={idx} delay={0.2}>
              <SmoothCard className="p-6 rounded border border-border bg-surface space-y-4 shadow-sm hover:shadow-md transition-shadow hover:border-accent">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border/70 pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-accent" />
                    <h3 className="text-base sm:text-lg font-medium text-foreground tracking-tight">
                      {edu.degree} in {edu.field}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-accent font-medium">
                    {edu.period}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {edu.details}
                  </p>
                </div>

                {/* Coursework & Lab Focus */}
                <div className="space-y-2 pt-2 border-t border-border/50">
                  <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                    <span>Key Coursework & Lab Studies:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {edu.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-surface-subtle border border-border text-foreground-muted"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </SmoothCard>
            </FadeIn>
          ))}

          {/* Currently Interested in Topics */}
          <FadeIn delay={0.3} className="pt-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-subtle block">
              Core Technical Interests:
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((topic, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded bg-surface border border-border text-foreground hover:border-accent hover:bg-surface-card transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
