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

// Exactly the 2 requested opportunities: SIH 2026 (Closed) & techFEST'26 SLIET (Open)
export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-techfest",
    title: "techFEST'26 SLIET — National Level Annual Technical Fest",
    eventName: "techFEST'26 (SLIET Longowal)",
    type: "competition",
    description:
      "Recruiting and forming teams to build, compete, and showcase engineering & AI projects at techFEST'26—SLIET's premier national annual technical festival. Open for hardware/robotics builders, web developers, and technical presenters!",
    rolesNeeded: ["Embedded & Robotics Builder", "Full-Stack Web Dev (Next.js/React)", "Project Presenter & Pitcher"],
    deadline: "Active / Registrations Open",
    teamSize: "4-6 Members (Slots Open)",
    status: "open",
    externalLink: "https://www.techfest26.com/",
    datePosted: "Active",
  },
  {
    id: "opp-sih",
    title: "Smart India Hackathon (SIH 2026) — Hardware & AI Edition",
    eventName: "Smart India Hackathon 2026",
    type: "hackathon",
    description:
      "Team formation successfully completed for SIH 2026 Hardware & AI edition. Multidisciplinary SLIET team working on smart industrial automation and safety monitoring systems.",
    rolesNeeded: ["Team Slots Full (Team Formed)"],
    deadline: "Applications Closed",
    teamSize: "6 Members (Full)",
    status: "closed",
    externalLink: "https://sih.gov.in",
    datePosted: "Closed",
  },
];

// Initial sample application
export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    opportunityId: "opp-techfest",
    opportunityTitle: "techFEST'26 SLIET — National Level Annual Technical Fest",
    applicantName: "Aman Verma",
    applicantEmail: "aman.verma@example.com",
    applicantGithub: "https://github.com/aman-verma",
    applicantLinkedin: "https://linkedin.com/in/aman-verma",
    applicantCollege: "SLIET Longowal (ECE)",
    applicantSkills: ["Arduino", "Sensors", "C++", "Robotics"],
    roleApplied: "Embedded & Robotics Builder",
    message:
      "Hi Raj! I'm an ECE student at SLIET with hands-on experience in microcontroller hardware and sensors. Would love to team up for techFEST'26!",
    status: "pending",
    createdAt: "2026-08-28T14:30:00Z",
  },
];

const STORAGE_KEYS = {
  USER: "raj_portfolio_user",
  OPPORTUNITIES: "raj_portfolio_opportunities_v2", // bumped key so newly updated listings reflect immediately
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
