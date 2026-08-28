import { NextResponse } from "next/server";
import { GitHubRepository } from "@/lib/github";

const USERNAME = "rajaryan2204";

// Curated default repositories with full metadata
const CURATED_REPOSITORIES: GitHubRepository[] = [
  {
    id: 101,
    name: "slietvoice",
    full_name: "rajaryan2204/slietvoice",
    html_url: "https://github.com/rajaryan2204/slietvoice",
    description: "CampusVoice / SLIET Voice — Full-stack campus portal & student grievance feedback platform built with Next.js, TypeScript, and Prisma ORM.",
    language: "TypeScript",
    stargazers_count: 5,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    formattedDate: "Updated recently",
    fork: false,
    archived: false,
    homepage: "https://slietvoice.vercel.app",
  },
  {
    id: 102,
    name: "interviewx-ai",
    full_name: "rajaryan2204/interviewx-ai",
    html_url: "https://github.com/rajaryan2204/interviewx-ai",
    description: "InterviewX AI — AI-driven technical mock interview platform with real-time speech evaluation, question synthesis, and analytics.",
    language: "TypeScript",
    stargazers_count: 8,
    forks_count: 2,
    updated_at: new Date().toISOString(),
    formattedDate: "Updated recently",
    fork: false,
    archived: false,
    homepage: "https://interviewx-ai-one.vercel.app/",
  },
  {
    id: 103,
    name: "VisionX",
    full_name: "rajaryan2204/VisionX",
    html_url: "https://github.com/rajaryan2204/VisionX",
    description: "VisionX — Desktop AI computer vision assistant built with Python, PyQt6, OpenCV, and YOLOv8 for real-time object tracking and desktop automation.",
    language: "Python",
    stargazers_count: 6,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    formattedDate: "Updated recently",
    fork: false,
    archived: false,
    homepage: "https://github.com/rajaryan2204/VisionX",
  },
  {
    id: 104,
    name: "SyncBridge",
    full_name: "rajaryan2204/SyncBridge",
    html_url: "https://github.com/rajaryan2204/SyncBridge",
    description: "SyncBridge — Cross-device ecosystem application connecting Android and macOS for instantaneous bi-directional clipboard sync and system control.",
    language: "TypeScript",
    stargazers_count: 4,
    forks_count: 1,
    updated_at: new Date().toISOString(),
    formattedDate: "Updated recently",
    fork: false,
    archived: false,
    homepage: "https://github.com/rajaryan2204/SyncBridge",
  },
  {
    id: 105,
    name: "RajJarvis",
    full_name: "rajaryan2204/RajJarvis",
    html_url: "https://github.com/rajaryan2204/RajJarvis",
    description: "RajJarvis — Custom AI voice assistant in Python for system task automation, speech recognition, and desktop command execution.",
    language: "Python",
    stargazers_count: 3,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    formattedDate: "Updated recently",
    fork: false,
    archived: false,
    homepage: "https://github.com/rajaryan2204/RajJarvis",
  },
  {
    id: 106,
    name: "portfolio",
    full_name: "rajaryan2204/portfolio",
    html_url: "https://github.com/rajaryan2204/portfolio",
    description: "Personal developer portfolio & collaboration hub built with Next.js, Tailwind CSS, Framer Motion, and Neon PostgreSQL.",
    language: "TypeScript",
    stargazers_count: 2,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    formattedDate: "Updated recently",
    fork: false,
    archived: false,
    homepage: "https://rajaryan2204.vercel.app",
  },
  {
    id: 107,
    name: "mac-controller",
    full_name: "rajaryan2204/mac-controller",
    html_url: "https://github.com/rajaryan2204/mac-controller",
    description: "Mac Controller — Lightweight macOS system automation utility for programmatic media playback, volume, and display triggers.",
    language: "Python",
    stargazers_count: 2,
    forks_count: 0,
    updated_at: new Date().toISOString(),
    formattedDate: "Updated recently",
    fork: false,
    archived: false,
    homepage: "https://github.com/rajaryan2204/mac-controller",
  }
];

let cachedRepos: GitHubRepository[] = [];
let lastFetchedAt = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const now = Date.now();

  if (cachedRepos.length > 0 && now - lastFetchedAt < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      repositories: cachedRepos,
      source: "cache",
    });
  }

  try {
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=all`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Raj-Aryan-Portfolio-NextJS",
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const liveRepos: GitHubRepository[] = data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          html_url: repo.html_url,
          description: repo.description ? repo.description.trim() : null,
          language: repo.language || null,
          stargazers_count: repo.stargazers_count ?? 0,
          forks_count: repo.forks_count ?? 0,
          updated_at: repo.updated_at,
          formattedDate: new Date(repo.updated_at).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          fork: Boolean(repo.fork),
          archived: Boolean(repo.archived),
          homepage: repo.homepage || null,
        }));

        // Merge live repos with curated repos (filling in descriptions/homepages if missing)
        const mergedMap = new Map<string, GitHubRepository>();
        
        // Start with curated as base
        CURATED_REPOSITORIES.forEach((c) => mergedMap.set(c.name.toLowerCase(), c));

        // Override/add with live stats
        liveRepos.forEach((l) => {
          const key = l.name.toLowerCase();
          const existing = mergedMap.get(key);
          if (existing) {
            mergedMap.set(key, {
              ...existing,
              stargazers_count: Math.max(existing.stargazers_count, l.stargazers_count),
              forks_count: Math.max(existing.forks_count, l.forks_count),
              updated_at: l.updated_at,
              formattedDate: l.formattedDate,
              html_url: l.html_url,
              description: existing.description || l.description,
            });
          } else {
            mergedMap.set(key, l);
          }
        });

        cachedRepos = Array.from(mergedMap.values());
        lastFetchedAt = now;

        return NextResponse.json({
          success: true,
          repositories: cachedRepos,
          source: "live",
        });
      }
    }
  } catch (error) {
    console.error("GitHub API fetch error:", error);
  }

  // Fallback to curated repositories
  return NextResponse.json({
    success: true,
    repositories: CURATED_REPOSITORIES,
    source: "curated_fallback",
  });
}
