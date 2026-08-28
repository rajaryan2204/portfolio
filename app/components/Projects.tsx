"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ArrowUpRight,
  Star,
  GitFork,
  Archive,
  GitBranch,
  Loader2,
  Github,
  Sparkles,
  Globe,
  ExternalLink,
  Laptop,
  Eye,
  Smartphone,
  Mic,
  Sliders,
  Cpu
} from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubRepository, getGitHubRepositories } from "@/lib/github";
import { FadeIn, StaggerContainer, StaggerItem, SmoothCard } from "./MotionWrapper";

const FILTERS = ["All", "TypeScript", "Python", "JavaScript", "C++", "Other"] as const;
type FilterType = (typeof FILTERS)[number];

// Core Featured Projects with curated details
const CORE_FEATURED_PROJECTS = [
  {
    id: "slietvoice",
    title: "SLIET Voice (CampusVoice)",
    badge: "Campus Platform",
    badgeIcon: Globe,
    subtitle: "TypeScript · Next.js · Prisma · PostgreSQL",
    description:
      "Full-stack campus portal and voice-integrated student feedback platform engineered for SLIET college grievance management, anonymous reporting, and live campus polling.",
    highlights: ["Role-based grievance flow", "Anonymous reporting", "Live campus polls", "Verified news board"],
    liveUrl: "https://slietvoice.vercel.app",
    githubUrl: "https://github.com/rajaryan2204/slietvoice",
    lang: "TypeScript",
  },
  {
    id: "interviewx-ai",
    title: "InterviewX AI",
    badge: "AI Mock Platform",
    badgeIcon: Sparkles,
    subtitle: "TypeScript · Next.js · Speech AI",
    description:
      "AI-driven technical mock interview platform featuring automated question synthesis, real-time speech evaluation, and comprehensive skill assessment analytics.",
    highlights: ["AI mock assessments", "Real-time speech analysis", "Skill scoring matrix", "Next.js & TypeScript"],
    liveUrl: "https://interviewx-ai-one.vercel.app/",
    githubUrl: "https://github.com/rajaryan2204/interviewx-ai",
    lang: "TypeScript",
  },
  {
    id: "VisionX",
    title: "VisionX",
    badge: "Computer Vision",
    badgeIcon: Eye,
    subtitle: "Python · PyQt6 · OpenCV · YOLOv8",
    description:
      "Desktop AI computer vision assistant built for real-time object tracking, multi-region screen bounding, and automated visual triggers with sub-30ms inference.",
    highlights: ["YOLOv8 real-time detection", "PyQt6 desktop UI", "OpenCV video processing", "Task automation"],
    liveUrl: "https://github.com/rajaryan2204/VisionX",
    githubUrl: "https://github.com/rajaryan2204/VisionX",
    lang: "Python",
  },
  {
    id: "SyncBridge",
    title: "SyncBridge",
    badge: "Cross-Device Sync",
    badgeIcon: Smartphone,
    subtitle: "TypeScript · Android · macOS",
    description:
      "Cross-device ecosystem application connecting Android and macOS for instantaneous bi-directional clipboard sync, remote screen lock, and system volume control.",
    highlights: ["Sub-50ms clipboard sync", "Android + macOS ecosystem", "Remote lock trigger", "Local network security"],
    liveUrl: "https://github.com/rajaryan2204/SyncBridge",
    githubUrl: "https://github.com/rajaryan2204/SyncBridge",
    lang: "TypeScript",
  },
  {
    id: "RajJarvis",
    title: "RajJarvis",
    badge: "AI Voice Assistant",
    badgeIcon: Mic,
    subtitle: "Python · SpeechRecognition · Automation",
    description:
      "Custom AI voice assistant in Python for system task automation, speech recognition, desktop audio processing, and automated script execution.",
    highlights: ["Voice command parser", "Speech synthesis", "Desktop automation", "Python AI backend"],
    liveUrl: "https://github.com/rajaryan2204/RajJarvis",
    githubUrl: "https://github.com/rajaryan2204/RajJarvis",
    lang: "Python",
  },
];

export default function Projects() {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      setLoading(true);
      setError(null);
      const res = await getGitHubRepositories(profile.username);

      if (!isMounted) return;

      if (res.repositories && res.repositories.length > 0) {
        setRepositories(res.repositories);
      } else if (res.error) {
        setError(res.error);
      }
      setLoading(false);
    }

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter repositories based on selected filter
  const filteredRepositories = useMemo(() => {
    if (activeFilter === "All") return repositories;

    return repositories.filter((repo) => {
      const effectiveLang = (
        profile.projectLanguages[repo.name] ||
        repo.language ||
        ""
      ).toLowerCase();

      if (activeFilter === "Other") {
        const standardLangs = ["javascript", "typescript", "python", "c++", "c"];
        return !standardLangs.some((l) => effectiveLang.includes(l));
      }

      return effectiveLang.includes(activeFilter.toLowerCase());
    });
  }, [repositories, activeFilter]);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-5 sm:px-6"
    >
      <div className="space-y-12">
        
        {/* Section Header */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
                04 / FEATURED WORK & CODE
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Featured Projects & Systems
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-foreground-subtle flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>GitHub Synced</span>
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Core Featured Projects Grid (VisionX, SyncBridge, RajJarvis, SLIET Voice, InterviewX) */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CORE_FEATURED_PROJECTS.map((proj) => {
            const BadgeIcon = proj.badgeIcon;
            return (
              <StaggerItem key={proj.id}>
                <SmoothCard className="p-6 rounded border border-border bg-surface hover:bg-[#fbf8f2] hover:border-neutral-400 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm group h-full">
                  <div className="space-y-2.5">
                    
                    {/* Top Row: Badge & Language */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5 bg-accent/10 px-2 py-0.5 rounded">
                        <BadgeIcon className="w-3 h-3" />
                        {proj.badge}
                      </span>
                      <span className="text-[11px] font-mono text-foreground-subtle">
                        {proj.subtitle.split("·")[0].trim()}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed font-sans">
                      {proj.description}
                    </p>

                    {/* Feature Highlight Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-border/70 text-foreground-muted"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex items-center justify-between border-t border-border/60">
                    {proj.liveUrl.startsWith("http") && !proj.liveUrl.includes("github.com") ? (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-background bg-foreground px-3 py-1.5 rounded hover:bg-[#292524] transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Demo ↗</span>
                      </a>
                    ) : (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-background bg-foreground px-3 py-1.5 rounded hover:bg-[#292524] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Project ↗</span>
                      </a>
                    )}

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </SmoothCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* All Open Source Repositories Section */}
        <div className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-3">
            <h3 className="text-lg font-medium text-foreground tracking-tight">
              All Public Repositories ({repositories.length > 0 ? repositories.length : 6})
            </h3>
            <span className="text-xs font-mono text-foreground-subtle">
              github.com/{profile.username}
            </span>
          </div>

          {/* Filter Tabs */}
          {repositories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-foreground-subtle mr-2">Filter:</span>
              {FILTERS.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`text-xs px-3 py-1 rounded border font-mono transition-colors ${
                      isActive
                        ? "bg-foreground text-background border-foreground font-medium"
                        : "bg-surface border-border text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          )}

          {/* Repositories Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepositories.map((repo) => (
              <StaggerItem key={repo.id}>
                <SmoothCard className="p-4 rounded border border-border bg-surface hover:bg-[#fbf8f2] hover:border-neutral-400 transition-all duration-150 flex flex-col justify-between space-y-3 shadow-sm h-full group">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <GitBranch className="w-3.5 h-3.5 text-accent" />
                        <span className="text-sm font-mono font-medium text-foreground group-hover:text-accent transition-colors truncate max-w-[170px]">
                          {repo.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-subtle border border-border text-foreground-subtle">
                        {repo.language || "Code"}
                      </span>
                    </div>

                    <p className="text-xs text-foreground-muted leading-relaxed line-clamp-2">
                      {repo.description || "Public software repository by Raj Aryan."}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-foreground-subtle border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-accent" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground-muted hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
                    >
                      <span>Code</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </SmoothCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
}
