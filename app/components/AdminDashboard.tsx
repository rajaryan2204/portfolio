"use client";

import { useState, useEffect } from "react";
import {
  Shield,
  Plus,
  Users,
  CheckCircle2,
  XCircle,
  Mail,
  Github,
  Linkedin,
  Clock,
  Send,
  Trash2,
  Sparkles,
  Download,
  MessageCircle,
  X,
  ArrowUpRight
} from "lucide-react";
import {
  Opportunity,
  Application,
  getStoredOpportunities,
  saveStoredOpportunities,
  getStoredApplications,
  saveStoredApplications,
} from "@/lib/collaborationStore";

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const [activeTab, setActiveTab] = useState<"applications" | "inquiries" | "post" | "manage">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [inquiries, setInquiries] = useState<ContactMsg[]>([]);

  // New Opportunity Form State
  const [newOpp, setNewOpp] = useState<{
    title: string;
    eventName: string;
    type: Opportunity["type"];
    description: string;
    rolesNeeded: string;
    deadline: string;
    teamSize: string;
    externalLink: string;
  }>({
    title: "",
    eventName: "",
    type: "hackathon",
    description: "",
    rolesNeeded: "",
    deadline: "",
    teamSize: "4 Members (2 Slots Open)",
    externalLink: "",
  });
  const [oppPublished, setOppPublished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApplications(getStoredApplications());
      setOpportunities(getStoredOpportunities());

      // Fetch Inquiries from Neon DB
      fetch("/api/contact")
        .then((res) => res.json())
        .then((data) => {
          if (data?.messages) {
            setInquiries(data.messages);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "Akshat2945*" || pin === "akshat2945*") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleUpdateStatus = (appId: string, newStatus: "accepted" | "rejected") => {
    const updated = applications.map((app) =>
      app.id === appId ? { ...app, status: newStatus } : app
    );
    setApplications(updated);
    saveStoredApplications(updated);

    // Sync status with server database API
    fetch("/api/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: appId, status: newStatus }),
    }).catch((err) => console.error("Status sync error:", err));
  };

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();

    const rolesArray = newOpp.rolesNeeded
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    const created: Opportunity = {
      id: `opp-${Date.now()}`,
      title: newOpp.title,
      eventName: newOpp.eventName || newOpp.title,
      type: newOpp.type,
      description: newOpp.description,
      rolesNeeded: rolesArray.length > 0 ? rolesArray : ["Developer"],
      deadline: newOpp.deadline || "Open Until Filled",
      teamSize: newOpp.teamSize || "4 Members",
      status: "open",
      externalLink: newOpp.externalLink || undefined,
      datePosted: new Date().toISOString(),
    };

    const updated = [created, ...opportunities];
    setOpportunities(updated);
    saveStoredOpportunities(updated);
    setOppPublished(true);

    setTimeout(() => {
      setOppPublished(false);
      setActiveTab("manage");
      setNewOpp({
        title: "",
        eventName: "",
        type: "hackathon",
        description: "",
        rolesNeeded: "",
        deadline: "",
        teamSize: "4 Members (2 Slots Open)",
        externalLink: "",
      });
    }, 1200);
  };

  const handleDeleteOpportunity = (id: string) => {
    const updated = opportunities.filter((o) => o.id !== id);
    setOpportunities(updated);
    saveStoredOpportunities(updated);
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Applicant Name",
      "Applicant Email",
      "Event",
      "Role Applied",
      "College",
      "GitHub",
      "LinkedIn",
      "Skills",
      "Status",
      "Pitch Message",
      "Applied At",
    ];

    const rows = applications.map((app) => [
      `"${app.id}"`,
      `"${app.applicantName}"`,
      `"${app.applicantEmail}"`,
      `"${app.opportunityTitle}"`,
      `"${app.roleApplied}"`,
      `"${app.applicantCollege || ""}"`,
      `"${app.applicantGithub || ""}"`,
      `"${app.applicantLinkedin || ""}"`,
      `"${app.applicantSkills.join(", ")}"`,
      `"${app.status}"`,
      `"${(app.message || "").replace(/"/g, '""')}"`,
      `"${app.createdAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Raj_Portfolio_Applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-[#ede8dc] border border-border rounded-lg max-w-3xl w-full p-5 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto overscroll-contain">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-1.5 transition-colors touch-manipulation"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-8 text-center space-y-5">
            <div className="p-3.5 rounded-full bg-surface border border-border w-12 h-12 flex items-center justify-center mx-auto text-accent">
              <Shield className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-medium text-foreground">
                Raj&apos;s Admin Control Center
              </h3>
              <p className="text-xs text-foreground-muted">
                Enter your secret password to review team applications, direct inbox messages, and post new competitions.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Enter Admin Password"
                className="w-full px-4 py-2.5 text-center text-base sm:text-sm font-mono tracking-widest rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 transition-colors"
              />

              {error && (
                <p className="text-xs text-red-600 font-mono">
                  Incorrect Password.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm touch-manipulation"
              >
                Access Admin Dashboard ↗
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN PANEL */
          <div className="space-y-6">
            
            {/* Header with Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  AUTHENTICATED AS RAJ ARYAN
                </span>
                <h3 className="text-xl font-medium tracking-tight text-foreground">
                  Leadership Control Hub
                </h3>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab("applications")}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                    activeTab === "applications"
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-surface border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  Applicants ({applications.length})
                </button>

                <button
                  onClick={() => setActiveTab("inquiries")}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors flex items-center gap-1 ${
                    activeTab === "inquiries"
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-surface border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Inquiries ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("post")}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors flex items-center gap-1 ${
                    activeTab === "post"
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-surface border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>Post Opp</span>
                </button>

                <button
                  onClick={() => setActiveTab("manage")}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                    activeTab === "manage"
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-surface border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  Posts ({opportunities.length})
                </button>
              </div>
            </div>

            {/* TAB 1: APPLICATIONS LIST */}
            {activeTab === "applications" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-foreground-subtle">
                    Total Applicants: {applications.length}
                  </span>

                  {applications.length > 0 && (
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded bg-surface border border-border hover:bg-surface-card text-foreground transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-accent" />
                      <span>Export CSV</span>
                    </button>
                  )}
                </div>

                {applications.length === 0 ? (
                  <div className="py-12 text-center text-sm font-mono text-foreground-muted bg-surface rounded border border-border">
                    No applicants received yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded border border-border bg-surface space-y-3 shadow-sm hover:border-neutral-400 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-foreground">
                                {app.applicantName}
                              </h4>
                              <span
                                className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-medium ${
                                  app.status === "accepted"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : app.status === "rejected"
                                    ? "bg-rose-50 text-rose-800 border-rose-300"
                                    : "bg-amber-50 text-amber-800 border-amber-300"
                                }`}
                              >
                                {app.status}
                              </span>
                            </div>
                            <p className="text-xs font-mono text-foreground-muted">
                              Role Applied: <span className="text-foreground font-semibold">{app.roleApplied}</span> ({app.opportunityTitle})
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {app.applicantGithub && (
                              <a
                                href={app.applicantGithub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-foreground-subtle hover:text-foreground transition-colors"
                                title="GitHub Profile"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {app.applicantLinkedin && (
                              <a
                                href={app.applicantLinkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 text-foreground-subtle hover:text-foreground transition-colors"
                                title="LinkedIn Profile"
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Pitch message */}
                        {app.message && (
                          <div className="p-2.5 rounded bg-surface-subtle border border-border/60 text-xs text-foreground leading-relaxed">
                            <span className="text-[10px] font-mono uppercase text-foreground-subtle block mb-1">
                              Applicant Pitch:
                            </span>
                            &ldquo;{app.message}&rdquo;
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateStatus(app.id, "accepted")}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono rounded bg-emerald-800 text-white hover:bg-emerald-900 transition-colors shadow-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept</span>
                            </button>

                            <button
                              onClick={() => handleUpdateStatus(app.id, "rejected")}
                              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-mono rounded border border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </div>

                          {/* Pre-filled candidate email dispatch */}
                          <a
                            href={`mailto:${app.applicantEmail}?subject=${encodeURIComponent(
                              `Invitation to Team Up — ${app.opportunityTitle} (Raj Aryan Portfolio)`
                            )}&body=${encodeURIComponent(
                              `Hi ${app.applicantName},\n\nI reviewed your application for the ${app.roleApplied} role on our team for ${app.opportunityTitle}.\n\nI'd love to connect on WhatsApp / Call to align on our project strategy.\n\nBest,\nRaj Aryan\nSLIET Longowal\nPhone: +91 9288522520`
                            )}`}
                            className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:text-foreground underline transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send Email ({app.applicantEmail})</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: INQUIRIES & DIRECT MESSAGES (FROM NEON DB) */}
            {activeTab === "inquiries" && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-foreground-subtle block">
                  Direct Messages Received: {inquiries.length}
                </span>

                {inquiries.length === 0 ? (
                  <div className="py-12 text-center text-sm font-mono text-foreground-muted bg-surface rounded border border-border">
                    No direct contact inquiries in database yet.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded border border-border bg-surface space-y-2.5 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2">
                          <div>
                            <h4 className="text-sm font-medium text-foreground">
                              {msg.name}
                            </h4>
                            <span className="text-xs font-mono text-foreground-muted">
                              {msg.email} · Topic: <span className="text-accent font-medium">{msg.subject}</span>
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-foreground-subtle">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-foreground leading-relaxed bg-surface-subtle p-3 rounded border border-border/60">
                          {msg.message}
                        </p>

                        <div className="pt-1 flex justify-end">
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(
                              `Re: ${msg.subject} — Raj Aryan`
                            )}&body=${encodeURIComponent(
                              `Hi ${msg.name},\n\nThank you for reaching out via my portfolio!\n\nBest regards,\nRaj Aryan\nraj.aryan9242@gmail.com`
                            )}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply to {msg.email} ↗</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: POST NEW OPPORTUNITY */}
            {activeTab === "post" && (
              <div className="space-y-4">
                {oppPublished ? (
                  <div className="py-12 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-accent mx-auto" />
                    <h4 className="text-base font-medium text-foreground">
                      Opportunity Broadcasted Live!
                    </h4>
                    <p className="text-xs text-foreground-muted">
                      Your new competition post is now visible to all website visitors.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCreateOpportunity} className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-foreground-subtle mb-1">
                        Competition / Hackathon Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newOpp.title}
                        onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                        placeholder="e.g. SLIET Robotics Challenge / TechFEST 2026"
                        className="w-full px-3 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-foreground-subtle mb-1">
                          Category *
                        </label>
                        <select
                          value={newOpp.type}
                          onChange={(e) => setNewOpp({ ...newOpp, type: e.target.value as Opportunity["type"] })}
                          className="w-full px-3 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground"
                        >
                          <option value="hackathon">Hackathon</option>
                          <option value="competition">Competition</option>
                          <option value="research">Research Project</option>
                          <option value="opensource">Open Source Build</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-foreground-subtle mb-1">
                          Deadline / Event Date
                        </label>
                        <input
                          type="text"
                          value={newOpp.deadline}
                          onChange={(e) => setNewOpp({ ...newOpp, deadline: e.target.value })}
                          placeholder="e.g. March 15, 2026"
                          className="w-full px-3 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-foreground-subtle mb-1">
                        Roles Needed (comma-separated) *
                      </label>
                      <input
                        type="text"
                        required
                        value={newOpp.rolesNeeded}
                        onChange={(e) => setNewOpp({ ...newOpp, rolesNeeded: e.target.value })}
                        placeholder="e.g. Embedded Hardware Dev, Next.js Frontend, Video Editor"
                        className="w-full px-3 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-foreground-subtle mb-1">
                        Description & Problem Statement *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newOpp.description}
                        onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                        placeholder="Explain what the project involves, the objective, and what tech stack is preferred..."
                        className="w-full px-3 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-foreground-subtle mb-1">
                        Official Website / Guidelines Link
                      </label>
                      <input
                        type="url"
                        value={newOpp.externalLink}
                        onChange={(e) => setNewOpp({ ...newOpp, externalLink: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Broadcast Opportunity Live ↗</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 4: MANAGE LIVE POSTS */}
            {activeTab === "manage" && (
              <div className="space-y-3">
                {opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 rounded border border-border bg-surface flex items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-subtle border border-border text-accent font-medium">
                          {opp.type}
                        </span>
                        <h4 className="text-sm font-medium text-foreground">
                          {opp.title}
                        </h4>
                      </div>
                      <p className="text-xs text-foreground-muted">
                        Roles: {opp.rolesNeeded.join(" · ")} | Status: <span className="font-semibold">{opp.status}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteOpportunity(opp.id)}
                      className="text-foreground-subtle hover:text-red-600 transition-colors p-2"
                      title="Remove opportunity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
