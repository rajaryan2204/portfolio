"use client";

export interface MemberUser {
  id: string;
  name: string;
  email: string;
  github: string;
  linkedin: string;
  college: string;
  skills: string[];
  joinedAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  eventName: string;
  type: "hackathon" | "competition" | "opensource" | "research";
  description: string;
  rolesNeeded: string[];
  deadline: string;
  teamSize: string;
  status: "open" | "closed";
  externalLink?: string;
  datePosted: string;
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantGithub: string;
  applicantLinkedin: string;
  applicantCollege: string;
  applicantSkills: string[];
  roleApplied: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

// Initial pre-seeded opportunities
export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Smart India Hackathon (SIH 2026) — Hardware & AI Track",
    eventName: "Smart India Hackathon 2026",
    type: "hackathon",
    description:
      "Forming a multidisciplinary team from SLIET and partner institutions to build an AI-powered smart industrial automation and safety monitoring system.",
    rolesNeeded: ["IoT & Embedded Firmware Dev", "UI/UX & Frontend (Next.js)", "Computer Vision / ML Dev"],
    deadline: "October 15, 2026",
    teamSize: "6 Members (2 Slots Open)",
    status: "open",
    externalLink: "https://sih.gov.in",
    datePosted: "Aug 2026",
  },
  {
    id: "opp-2",
    title: "HackSLIET 2026 — Annual National Hackathon",
    eventName: "HackSLIET 2026",
    type: "hackathon",
    description:
      "Teaming up to build a high-impact campus and healthcare productivity platform with real-time sync and voice AI capabilities.",
    rolesNeeded: ["Full-Stack Next.js Dev", "Backend & API Engineer", "Product Pitch / Presenter"],
    deadline: "November 20, 2026",
    teamSize: "4 Members (1 Slot Open)",
    status: "open",
    datePosted: "Aug 2026",
  },
  {
    id: "opp-3",
    title: "VisionX v2.0 — Open Source Core Contributors",
    eventName: "VisionX AI Project",
    type: "opensource",
    description:
      "Open-source development for desktop computer vision assistant (YOLOv8 + PyQt6 + OpenCV). Looking for contributors for cross-platform packaging, screen capture optimizations, and custom model training.",
    rolesNeeded: ["Python / OpenCV Developer", "PyQt6 / GUI Designer", "Documentation & QA Tester"],
    deadline: "Rolling / Open",
    teamSize: "Open Community",
    status: "open",
    externalLink: "https://github.com/rajaryan2204/VisionX",
    datePosted: "Aug 2026",
  },
  {
    id: "opp-4",
    title: "SyncBridge Mac-Android Sync — Android Bluetooth & WiFi P2P",
    eventName: "SyncBridge Ecosystem",
    type: "research",
    description:
      "Researching and implementing zero-latency peer-to-peer Wi-Fi and Bluetooth BLE background daemon for instantaneous clipboard synchronization between Android and macOS.",
    rolesNeeded: ["Android Kotlin Developer", "macOS Swift / System Utility Dev"],
    deadline: "December 30, 2026",
    teamSize: "3 Members (1 Slot Open)",
    status: "open",
    externalLink: "https://github.com/rajaryan2204/SyncBridge",
    datePosted: "Aug 2026",
  },
];

// Initial sample application for demonstration
export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    opportunityId: "opp-1",
    opportunityTitle: "Smart India Hackathon (SIH 2026) — Hardware & AI Track",
    applicantName: "Aman Verma",
    applicantEmail: "aman.verma@example.com",
    applicantGithub: "https://github.com/aman-verma",
    applicantLinkedin: "https://linkedin.com/in/aman-verma",
    applicantCollege: "SLIET Longowal (ECE)",
    applicantSkills: ["ESP32", "Arduino", "C++", "Sensors"],
    roleApplied: "IoT & Embedded Firmware Dev",
    message:
      "Hi Raj! I'm a 2nd year ECE student at SLIET with strong hands-on experience in ESP32, sensor interfacing, and MQTT protocols. Would love to team up for SIH 2026!",
    status: "accepted",
    createdAt: "2026-08-28T14:30:00Z",
  },
];

const STORAGE_KEYS = {
  USER: "raj_portfolio_user",
  OPPORTUNITIES: "raj_portfolio_opportunities",
  APPLICATIONS: "raj_portfolio_applications",
  ADMIN_AUTH: "raj_portfolio_admin_authenticated",
};

export function getStoredUser(): MemberUser | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveStoredUser(user: MemberUser | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export function getStoredOpportunities(): Opportunity[] {
  if (typeof window === "undefined") return INITIAL_OPPORTUNITIES;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.OPPORTUNITIES);
    return data ? JSON.parse(data) : INITIAL_OPPORTUNITIES;
  } catch {
    return INITIAL_OPPORTUNITIES;
  }
}

export function saveStoredOpportunities(opps: Opportunity[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.OPPORTUNITIES, JSON.stringify(opps));
}

export function getStoredApplications(): Application[] {
  if (typeof window === "undefined") return INITIAL_APPLICATIONS;
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : INITIAL_APPLICATIONS;
  } catch {
    return INITIAL_APPLICATIONS;
  }
}

export function saveStoredApplications(apps: Application[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
}
