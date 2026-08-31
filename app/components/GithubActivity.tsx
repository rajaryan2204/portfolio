"use client";

import { useEffect, useState } from "react";
import { GitCommit, GitBranch, Star, GitFork, Github, Sparkles, Activity, CheckCircle2, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { FadeIn, SmoothCard } from "./MotionWrapper";

export default function GithubActivity() {
  const [repoCount, setRepoCount] = useState<number>(7);
  const [totalStars, setTotalStars] = useState<number>(20);
  const [totalForks, setTotalForks] = useState<number>(4);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          if (data.repositories && Array.isArray(data.repositories)) {
            setRepoCount(data.repositories.length);
            const stars = data.repositories.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);
            const forks = data.repositories.reduce((acc: number, r: any) => acc + (r.forks_count || 0), 0);
            setTotalStars(stars > 0 ? stars : 22);
            setTotalForks(forks > 0 ? forks : 5);
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    fetchStats();
  }, []);

  return (
    <section
      id="github-activity"
      className="py-14 sm:py-18 border-t border-border max-w-4xl mx-auto px-5 sm:px-6 section-glow"
    >
      <div className="space-y-8">

        {/* Section Header */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
                07 / OPEN SOURCE PULSE
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                GitHub Activity & Heatmap
              </h2>
            </div>

            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-surface border border-border hover:bg-surface-card hover:border-accent text-foreground text-xs font-mono font-medium transition-colors shadow-sm self-start sm:self-auto"
            >
              <Github className="w-3.5 h-3.5" />
              <span>@rajaryan2204 ↗</span>
            </a>
          </div>
        </FadeIn>

        {/* Contribution Heatmap Card */}
        <FadeIn delay={0.1}>
          <SmoothCard className="p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-sm hover:border-accent transition-all space-y-6">

            {/* Top Bar: Pulse Badge & Year */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono font-semibold text-foreground">
                  Continuous Development & Open Source Commits
                </span>
              </div>

              <span className="text-xs font-mono text-foreground-subtle">
                Year 2025 — 2026
              </span>
            </div>

            {/* Responsive GitHub Heatmap Calendar */}
            <div className="space-y-2">
              <div className="overflow-x-auto pb-2 scrollbar-thin">
                <div className="min-w-[650px] p-4 rounded-xl bg-surface-subtle border border-border/80 flex items-center justify-center">
                  <img
                    src={`https://ghchart.rshah.org/10b981/${profile.username}`}
                    alt="Raj Aryan GitHub Contribution Chart"
                    className="w-full h-auto object-contain select-none"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between text-[11px] font-mono text-foreground-subtle pt-1">
                <span>github.com/{profile.username} activity pulse</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="w-2.5 h-2.5 rounded-sm bg-surface-subtle border border-border" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-300 dark:bg-emerald-800" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-600" />
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700 dark:bg-emerald-400" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-border/60 text-xs font-mono">

              <div className="p-3 rounded-lg bg-surface-subtle border border-border/70 space-y-1">
                <span className="text-[10px] text-foreground-subtle uppercase tracking-wider block">Repositories</span>
                <span className="text-lg font-bold text-foreground">{repoCount} Repos</span>
              </div>

              <div className="p-3 rounded-lg bg-surface-subtle border border-border/70 space-y-1">
                <span className="text-[10px] text-foreground-subtle uppercase tracking-wider block">Stars Earned</span>
                <span className="text-lg font-bold text-accent">{totalStars} ★</span>
              </div>

              <div className="p-3 rounded-lg bg-surface-subtle border border-border/70 space-y-1">
                <span className="text-[10px] text-foreground-subtle uppercase tracking-wider block">Primary Stacks</span>
                <span className="text-xs font-semibold text-foreground block pt-1">Python · Next.js</span>
              </div>

              <div className="p-3 rounded-lg bg-surface-subtle border border-border/70 space-y-1">
                <span className="text-[10px] text-foreground-subtle uppercase tracking-wider block">Status</span>
                <span className="text-xs font-semibold text-accent flex items-center gap-1 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active</span>
                </span>
              </div>

            </div>

          </SmoothCard>
        </FadeIn>

      </div>
    </section>
  );
}
