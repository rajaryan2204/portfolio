"use client";

import { profile } from "@/data/profile";
import { FadeIn, StaggerContainer, StaggerItem } from "./MotionWrapper";

export default function Skills() {
  const { skills } = profile;

  const skillGroups = [
    {
      index: "01",
      category: "Languages",
      items: skills.languages,
    },
    {
      index: "02",
      category: "Web & Full-Stack",
      items: skills.web,
    },
    {
      index: "03",
      category: "Control & Embedded Systems",
      items: skills.engineeringAndEmbedded,
    },
    {
      index: "04",
      category: "Tools & Environments",
      items: skills.tools,
    },
  ];

  return (
    <section
      id="skills"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-5 sm:px-6"
    >
      <div className="space-y-10">
        
        {/* Section Header */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
                03 / CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Technologies & Engineering Skills
              </h2>
            </div>
            <span className="text-xs font-mono text-foreground-subtle">
              Languages · Web · Hardware & Control · Tooling
            </span>
          </div>
        </FadeIn>

        {/* Clean Large Numbered Rows with Staggered Entrance */}
        <StaggerContainer className="divide-y divide-border">
          {skillGroups.map((group) => (
            <StaggerItem
              key={group.index}
              className="py-6 first:pt-2 last:pb-2 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start md:items-baseline group"
            >
              {/* Index & Category (5 cols) */}
              <div className="md:col-span-4 flex items-baseline gap-3">
                <span className="text-base sm:text-lg font-mono font-light text-foreground-subtle group-hover:text-accent transition-colors select-none">
                  {group.index}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-foreground tracking-tight group-hover:translate-x-0.5 transition-transform">
                  {group.category}
                </h3>
              </div>

              {/* Technologies Chips List (8 cols) */}
              <div className="md:col-span-8 flex flex-wrap gap-2 pt-1 md:pt-0">
                {group.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-sm font-mono px-3 py-1 rounded bg-surface border border-border text-foreground hover:border-neutral-400 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
