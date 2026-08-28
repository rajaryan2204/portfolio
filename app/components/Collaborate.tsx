"use client";

import { Users, Trophy, Code2, Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

export default function Collaborate() {
  const collabTracks = [
    {
      title: "Hackathons & Competitions",
      icon: Trophy,
      description:
        "Passionate about teaming up for regional and national hackathons to build rapid AI, web, and IoT prototypes.",
      topics: ["Rapid Prototyping", "Full-Stack + AI", "Team Brainstorming"],
    },
    {
      title: "Open Source & Software Builds",
      icon: Code2,
      description:
        "Looking to contribute to or co-create developer tools, Python utilities, and Next.js platforms.",
      topics: ["Computer Vision", "Cross-Device Tools", "Next.js & APIs"],
    },
    {
      title: "Control & Embedded Systems",
      icon: Cpu,
      description:
        "Teaming up with fellow engineering students on microcontroller hardware, sensors, and industrial automation projects.",
      topics: ["Microcontrollers", "Sensors & Signal", "Process Control"],
    },
    {
      title: "Product & Startup MVPs",
      icon: Users,
      description:
        "Collaborating on turning creative ideas into functional MVP products with clean architecture and responsive interfaces.",
      topics: ["MVP Development", "UI Architecture", "Ecosystem Integration"],
    },
  ];

  return (
    <section
      id="collaborate"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-6"
    >
      <div className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/80 pb-4">
          <div>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
              06 / COLLABORATE & TEAM UP
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Work Together in a Team
            </h2>
          </div>
          <span className="text-xs font-mono text-accent flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open for New Collaborations</span>
          </span>
        </div>

        <p className="text-base text-foreground-muted max-w-2xl leading-relaxed">
          I enjoy working alongside passionate developers, students, researchers, and creators. Whether you are forming a team for a hackathon, starting an open-source tool, or building a practical engineering project—let&apos;s team up!
        </p>

        {/* 4 Collaboration Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {collabTracks.map((track, idx) => {
            const Icon = track.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-150 space-y-4 shadow-sm flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-surface-subtle border border-border text-accent">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                        {track.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {track.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-border/60">
                  <div className="flex flex-wrap gap-1.5">
                    {track.topics.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-border/70 text-foreground-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`#contact`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-accent font-medium pt-1 transition-colors group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Start a {track.title.split(" ")[0]} project with Raj</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="p-6 rounded border border-border bg-[#f5f0e6] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-medium text-foreground">
              Have a specific idea or hackathon team in mind?
            </h4>
            <p className="text-xs text-foreground-muted">
              Drop an email or message with details about your project or event.
            </p>
          </div>

          <a
            href={`mailto:${profile.email}?subject=Collaboration%20Proposal%20-%20Raj%20Aryan`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Propose Collaboration ↗</span>
          </a>
        </div>

      </div>
    </section>
  );
}
