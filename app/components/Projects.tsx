"use client";

import { useEffect, useState, useMemo } from "react";
import { ArrowUpRight, Star, GitFork, Archive, GitBranch, Loader2, Github, Sparkles, Globe, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubRepository, getGitHubRepositories } from "@/lib/github";

const FILTERS = ["All", "TypeScript", "Python", "JavaScript", "C++", "Other"] as const;
type FilterType = (typeof FILTERS)[number];

export default function Projects() {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      setLoading(true);
      setError(null);
      setIsPlaceholder(false);
      const res = await getGitHubRepositories(profile.username);

      if (!isMounted) return;

      if (res.isPlaceholder) {
        setIsPlaceholder(true);
      } else if (res.error) {
        setError(res.error);
      } else {
        setRepositories(res.repositories);
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

  // Order repositories: Featured apps first (slietvoice, interviewx-ai, VisionX, SyncBridge)
  const orderedRepositories = useMemo(() => {
    const priority = ["interviewx-ai", "slietvoice", "VisionX", "SyncBridge", "RajJarvis", "mac-controller"];
    return [...filteredRepositories].sort((a, b) => {
      const idxA = priority.indexOf(a.name);
      const idxB = priority.indexOf(b.name);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  }, [filteredRepositories]);

  // Split into Featured (top 4) and Archive (remaining) when viewing "All"
  const isAllFilter = activeFilter === "All";
  const featuredRepos = isAllFilter ? orderedRepositories.slice(0, 4) : [];
  const archiveRepos = isAllFilter ? orderedRepositories.slice(4) : orderedRepositories;

  return (
    <section
      id="projects"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-6"
    >
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
              04 / SELECTED WORK & LIVE APPS
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Projects & Web Applications
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-foreground-subtle">
              GitHub Live Sync
            </span>
          </div>
        </div>

        {/* Quick Direct Live App Highlights (InterviewX AI & SLIET Voice) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* InterviewX AI Direct Card */}
          <div className="p-5 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-150 flex flex-col justify-between space-y-3 shadow-sm group">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Live Platform
                </span>
                <span className="text-[10px] font-mono text-foreground-subtle">Next.js / AI</span>
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                InterviewX AI
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                AI-driven technical mock interview platform with real-time speech evaluation and question synthesis.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 border-t border-border/60">
              <a
                href={profile.projectLiveUrls["interviewx-ai"] || "https://interviewx-ai-one.vercel.app/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-background bg-foreground px-3 py-1.5 rounded hover:bg-[#292524] transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit InterviewX ↗</span>
              </a>
              <a
                href="https://github.com/rajaryan2204/interviewx-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            </div>
          </div>

          {/* SLIET Voice Direct Card */}
          <div className="p-5 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-150 flex flex-col justify-between space-y-3 shadow-sm group">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5">
                  <Globe className="w-3 h-3" />
                  Campus Portal
                </span>
                <span className="text-[10px] font-mono text-foreground-subtle">TypeScript / SLIET</span>
              </div>
              <h3 className="text-lg font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                SLIET Voice (CampusVoice)
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Student grievance management, live campus polls, and opinion escalation platform for SLIET.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 border-t border-border/60">
              <a
                href={profile.projectLiveUrls["slietvoice"] || "https://slietvoice.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-background bg-foreground px-3 py-1.5 rounded hover:bg-[#292524] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit SLIET Voice ↗</span>
              </a>
              <a
                href="https://github.com/rajaryan2204/slietvoice"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            </div>
          </div>

        </div>

        {/* Filter Controls */}
        {!loading && !error && !isPlaceholder && repositories.length > 0 && (
          <div
            className="flex flex-wrap items-center gap-2 pt-2"
            role="tablist"
            aria-label="Filter projects by programming language"
          >
            <span className="text-xs font-mono text-foreground-subtle mr-2">Filter by Stack:</span>
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-xs px-3 py-1 rounded border font-mono transition-all duration-150 ${
                    isActive
                      ? "bg-foreground text-background border-foreground font-medium shadow-sm"
                      : "bg-surface/80 border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center text-foreground-muted text-sm flex items-center justify-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
            <span className="font-mono">Syncing repositories from GitHub...</span>
          </div>
        )}

        {/* Placeholder Setup Helper */}
        {!loading && isPlaceholder && (
          <div className="py-10 px-6 rounded border border-border bg-surface text-left space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Github className="w-4 h-4 text-accent" />
              <span>Connect Your GitHub Repositories</span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed max-w-xl">
              Open <code className="text-foreground bg-surface-subtle px-1.5 py-0.5 rounded font-mono border border-border">data/profile.ts</code> and enter your exact GitHub username in <code className="text-accent font-mono">username: &quot;YOUR_USERNAME&quot;</code>.
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && !isPlaceholder && error && (
          <div className="py-12 px-6 rounded border border-border bg-surface text-center space-y-3 shadow-sm">
            <p className="text-sm text-foreground-muted">
              Unable to load GitHub projects right now.
            </p>
            <div>
              <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline transition-colors font-medium"
              >
                <span>View my GitHub profile</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* Empty Repositories State */}
        {!loading && !error && !isPlaceholder && repositories.length === 0 && (
          <div className="py-12 text-center text-foreground-muted text-sm font-mono">
            No public repositories found.
          </div>
        )}

        {/* Empty Filter State */}
        {!loading && !error && !isPlaceholder && filteredRepositories.length === 0 && (
          <div className="py-10 text-center text-foreground-muted text-sm">
            No repositories found for language: <span className="font-mono text-foreground font-medium">{activeFilter}</span>.
          </div>
        )}

        {/* FEATURED PROJECTS TIER (Prominent Cards with Live Visit & Highlights) */}
        {!loading && !error && !isPlaceholder && featuredRepos.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Engineering Builds</span>
            </div>

            <div className="space-y-5">
              {featuredRepos.map((repo, index) => {
                const indexFormatted = String(index + 1).padStart(2, "0");
                const descriptionDisplay =
                  profile.projectDescriptions[repo.name] ||
                  repo.description ||
                  "Software development repository and source codebase.";

                const languageDisplay =
                  profile.projectLanguages[repo.name] ||
                  repo.language ||
                  "TypeScript";

                const liveUrl =
                  profile.projectLiveUrls[repo.name] ||
                  (repo.name.toLowerCase().includes("interviewx")
                    ? "https://interviewx-ai-one.vercel.app/"
                    : repo.name.toLowerCase().includes("sliet")
                    ? "https://slietvoice.vercel.app"
                    : undefined);
                const highlights = profile.projectHighlights[repo.name] || [];

                return (
                  <article
                    key={repo.id}
                    className="p-6 md:p-7 rounded border border-border bg-surface hover:bg-[#fbf8f2] hover:border-neutral-400 transition-all duration-200 group shadow-sm relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-medium text-accent">
                          {indexFormatted} — FEATURED
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                          <a
                            href={liveUrl || repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5"
                          >
                            <span>{repo.name}</span>
                            <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                          </a>
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-foreground-subtle">
                        <span className="px-2 py-0.5 rounded bg-surface-subtle border border-border/80 text-foreground font-medium">
                          {languageDisplay}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-foreground-muted leading-relaxed mb-4 max-w-2xl">
                      {descriptionDisplay}
                    </p>

                    {/* Key Architecture Highlights */}
                    {highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {highlights.map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-surface-subtle border border-border/60 text-foreground-muted"
                          >
                            ✓ {hl}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs font-mono text-foreground-subtle">
                      <div className="flex items-center gap-4">
                        {repo.stargazers_count > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-600 fill-amber-600/20" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {repo.forks_count}
                          </span>
                        )}
                        <span>{repo.formattedDate}</span>
                      </div>

                      {/* Action Links: Live Demo + GitHub */}
                      <div className="flex items-center gap-4">
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-accent font-semibold inline-flex items-center gap-1 transition-colors underline underline-offset-4"
                          >
                            <Globe className="w-3.5 h-3.5 text-accent" />
                            <span>Visit Live App ↗</span>
                          </a>
                        )}

                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground-muted hover:text-foreground inline-flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3 h-3" />
                          <span>Source Code ↗</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ARCHIVE PROJECTS TIER (Clean Editorial Rows) */}
        {!loading && !error && !isPlaceholder && archiveRepos.length > 0 && (
          <div className="space-y-4 pt-4">
            {isAllFilter && (
              <div className="text-xs font-mono uppercase tracking-wider text-foreground-subtle">
                Project Archive & Automation Toolkits
              </div>
            )}

            <div className="divide-y divide-border border-t border-b border-border">
              {archiveRepos.map((repo, idx) => {
                const globalIndex = isAllFilter ? idx + 5 : idx + 1;
                const indexFormatted = String(globalIndex).padStart(2, "0");

                const descriptionDisplay =
                  profile.projectDescriptions[repo.name] ||
                  repo.description ||
                  "Software development repository and source codebase.";

                const languageDisplay =
                  profile.projectLanguages[repo.name] ||
                  repo.language ||
                  "TypeScript";

                const liveUrl =
                  profile.projectLiveUrls[repo.name] ||
                  (repo.name.toLowerCase().includes("interviewx")
                    ? "https://interviewx-ai-one.vercel.app/"
                    : repo.name.toLowerCase().includes("sliet")
                    ? "https://slietvoice.vercel.app"
                    : undefined);

                return (
                  <article
                    key={repo.id}
                    className="py-5 px-3 -mx-3 rounded hover:bg-surface/70 transition-colors duration-150 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1.5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-foreground-subtle select-none">
                          {indexFormatted}
                        </span>
                        <h4 className="text-base sm:text-lg font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                          <a
                            href={liveUrl || repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5"
                          >
                            <span>{repo.name}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-foreground-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                          </a>
                        </h4>

                        {repo.archived && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-subtle border border-border text-foreground-subtle">
                            <Archive className="w-2.5 h-2.5" />
                            Archived
                          </span>
                        )}
                        {repo.fork && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface-subtle border border-border text-foreground-subtle">
                            <GitBranch className="w-2.5 h-2.5" />
                            Fork
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-foreground-subtle">
                        {languageDisplay}
                      </span>
                    </div>

                    <p className="text-sm text-foreground-muted leading-relaxed mb-2 max-w-2xl pl-7 sm:pl-7">
                      {descriptionDisplay}
                    </p>

                    <div className="flex items-center justify-between gap-4 text-xs font-mono text-foreground-subtle pl-7 sm:pl-7">
                      <span>{repo.formattedDate}</span>
                      
                      <div className="flex items-center gap-4">
                        {liveUrl && (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-accent font-medium transition-colors"
                          >
                            Visit App ↗
                          </a>
                        )}
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground-muted hover:text-accent transition-colors"
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* View All Repositories Link at Bottom */}
        {!isPlaceholder && (
          <div className="pt-2 flex items-center justify-between">
            <a
              href={`https://github.com/${profile.username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-foreground hover:border-accent"
            >
              <span>View all repositories on GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <span className="text-xs font-mono text-foreground-subtle">
              {repositories.length} Total Repositories
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
