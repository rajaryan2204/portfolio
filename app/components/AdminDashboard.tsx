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
  X
} from "lucide-react";
import {
  Opportunity,
  Application,
  getStoredOpportunities,
  saveStoredOpportunities,
  getStoredApplications,
  saveStoredApplications,
} from "@/lib/collaborationStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboard({ isOpen, onClose }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const [activeTab, setActiveTab] = useState<"applications" | "post" | "manage">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

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
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "2204" || pin.toLowerCase() === "raj2204" || pin === "admin") {
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
  };

  const handleDeleteApplication = (appId: string) => {
    const updated = applications.filter((app) => app.id !== appId);
    setApplications(updated);
    saveStoredApplications(updated);
  };

  const handlePublishOpportunity = (e: React.FormEvent) => {
    e.preventDefault();

    const rolesArray = newOpp.rolesNeeded
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    const createdOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title: newOpp.title,
      eventName: newOpp.eventName || newOpp.title,
      type: newOpp.type,
      description: newOpp.description,
      rolesNeeded: rolesArray.length > 0 ? rolesArray : ["Developer"],
      deadline: newOpp.deadline || "TBA",
      teamSize: newOpp.teamSize,
      status: "open",
      externalLink: newOpp.externalLink || undefined,
      datePosted: "Just now",
    };

    const updatedOpps = [createdOpp, ...opportunities];
    setOpportunities(updatedOpps);
    saveStoredOpportunities(updatedOpps);
    setOppPublished(true);

    setTimeout(() => {
      setOppPublished(false);
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
      setActiveTab("manage");
    }, 1200);
  };

  const handleDeleteOpportunity = (oppId: string) => {
    const updated = opportunities.filter((o) => o.id !== oppId);
    setOpportunities(updated);
    saveStoredOpportunities(updated);
  };

  // Export Applicants to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) return;

    const headers = ["Applicant Name,Email,College,Role Applied,Opportunity,Status,GitHub,LinkedIn,Date"];
    const rows = applications.map((app) =>
      `"${app.applicantName}","${app.applicantEmail}","${app.applicantCollege}","${app.roleApplied}","${app.opportunityTitle}","${app.status}","${app.applicantGithub}","${app.applicantLinkedin}","${new Date(app.createdAt).toLocaleDateString()}"`
    );

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Raj_Portfolio_Applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#ede8dc] border border-border rounded-lg max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-foreground-muted hover:text-foreground p-1 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* PIN Authentication Screen */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-8 text-center space-y-5">
            <div className="p-3 rounded-full bg-surface border border-border w-12 h-12 flex items-center justify-center mx-auto text-accent">
              <Shield className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-medium text-foreground">
                Raj&apos;s Admin Control Center
              </h3>
              <p className="text-xs text-foreground-muted">
                Enter your secret PIN to review team applications and publish new competitions.
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
                placeholder="Enter PIN (e.g. 2204)"
                className="w-full px-4 py-2.5 text-center text-sm font-mono tracking-widest rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 transition-colors"
              />

              {error && (
                <p className="text-xs text-red-600 font-mono">
                  Incorrect PIN. (Hint: 2204)
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
              >
                Access Admin Dashboard ↗
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Workspace */
          <div className="space-y-6">
            
            {/* Header with Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5">
                  <Shield className="w-3 h-3" />
                  ADMIN PORTAL
                </span>
                <h3 className="text-xl sm:text-2xl font-medium text-foreground">
                  Team & Hackathon Manager
                </h3>
              </div>

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
                  onClick={() => setActiveTab("post")}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors flex items-center gap-1 ${
                    activeTab === "post"
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-surface border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>Post Opportunity</span>
                </button>

                <button
                  onClick={() => setActiveTab("manage")}
                  className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors ${
                    activeTab === "manage"
                      ? "bg-foreground text-background border-foreground font-medium"
                      : "bg-surface border-border text-foreground-muted hover:text-foreground"
                  }`}
                >
                  Live Posts ({opportunities.length})
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
                    {applications.map((app) => {
                      const mailSubject = encodeURIComponent(`Welcome to the Team! [${app.opportunityTitle}]`);
                      const mailBody = encodeURIComponent(
                        `Hi ${app.applicantName},\n\nI reviewed your profile and application for "${app.opportunityTitle}" as ${app.roleApplied}.\n\nI'd love to have you on the team! Let's connect on WhatsApp/Discord to coordinate our project roadmap.\n\nBest,\nRaj Aryan\nSant Longowal Institute of Engineering & Technology (SLIET)`
                      );
                      const emailLink = `mailto:${app.applicantEmail}?subject=${mailSubject}&body=${mailBody}`;

                      return (
                        <div
                          key={app.id}
                          className="p-5 rounded border border-border bg-surface space-y-3 shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base font-medium text-foreground">
                                  {app.applicantName}
                                </h4>
                                <span
                                  className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-medium ${
                                    app.status === "accepted"
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                      : app.status === "rejected"
                                      ? "bg-rose-100 text-rose-800 border border-rose-300"
                                      : "bg-amber-100 text-amber-800 border border-amber-300"
                                  }`}
                                >
                                  {app.status}
                                </span>
                              </div>
                              <p className="text-xs text-foreground-muted">
                                Applied for: <span className="font-medium text-foreground">{app.roleApplied}</span> in <span className="italic">{app.opportunityTitle}</span>
                              </p>
                            </div>

                            <div className="flex items-center gap-3 text-xs font-mono text-foreground-subtle">
                              <span>{app.applicantCollege}</span>
                              <button
                                onClick={() => handleDeleteApplication(app.id)}
                                className="text-foreground-subtle hover:text-red-600 transition-colors p-1"
                                title="Delete application"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-foreground bg-surface-subtle p-3 rounded border border-border/60 leading-relaxed font-sans">
                            &ldquo;{app.message}&rdquo;
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs font-mono">
                            {/* Profiles & Contact */}
                            <div className="flex items-center gap-3">
                              <a
                                href={emailLink}
                                className="inline-flex items-center gap-1 text-foreground hover:text-accent font-medium"
                                title="Send pre-filled welcome email"
                              >
                                <Mail className="w-3.5 h-3.5 text-accent" />
                                <span>{app.applicantEmail}</span>
                              </a>
                              {app.applicantGithub && (
                                <a
                                  href={app.applicantGithub}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-foreground hover:text-accent"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                  <span>GitHub</span>
                                </a>
                              )}
                              {app.applicantLinkedin && (
                                <a
                                  href={app.applicantLinkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-foreground hover:text-accent"
                                >
                                  <Linkedin className="w-3.5 h-3.5" />
                                  <span>LinkedIn</span>
                                </a>
                              )}
                            </div>

                            {/* Decision Action Buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateStatus(app.id, "accepted")}
                                className="px-3 py-1 text-xs font-mono font-medium rounded bg-emerald-800 text-white hover:bg-emerald-900 transition-colors flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Accept Member</span>
                              </button>

                              <button
                                onClick={() => handleUpdateStatus(app.id, "rejected")}
                                className="px-3 py-1 text-xs font-mono font-medium rounded bg-surface-subtle border border-border text-foreground hover:bg-rose-100 hover:text-rose-800 transition-colors flex items-center gap-1"
                              >
                                <XCircle className="w-3 h-3" />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: POST NEW HACKATHON / OPPORTUNITY FORM */}
            {activeTab === "post" && (
              <div className="space-y-4 bg-surface p-6 rounded border border-border">
                {oppPublished ? (
                  <div className="py-8 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-accent mx-auto" />
                    <h4 className="text-base font-medium text-foreground">
                      Opportunity Published!
                    </h4>
                    <p className="text-xs text-foreground-muted">
                      Your hackathon/team post is now live on your portfolio for visitors to apply.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePublishOpportunity} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-foreground-subtle mb-1">
                          Post Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={newOpp.title}
                          onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                          placeholder="e.g. techFEST'26 SLIET Project Showcase"
                          className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-foreground-subtle mb-1">
                          Opportunity Type *
                        </label>
                        <select
                          value={newOpp.type}
                          onChange={(e) =>
                            setNewOpp({ ...newOpp, type: e.target.value as Opportunity["type"] })
                          }
                          className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 font-sans"
                        >
                          <option value="competition">🔬 National / Campus Technical Fest</option>
                          <option value="hackathon">🏆 National Hackathon (SIH, etc.)</option>
                          <option value="opensource">🛠️ Open-Source Project Team</option>
                          <option value="research">💡 Research & Embedded Systems</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-foreground-subtle mb-1">
                        Roles Needed (comma separated) *
                      </label>
                      <input
                        type="text"
                        required
                        value={newOpp.rolesNeeded}
                        onChange={(e) => setNewOpp({ ...newOpp, rolesNeeded: e.target.value })}
                        placeholder="e.g. Embedded Developer, Next.js Frontend, Project Presenter"
                        className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-foreground-subtle mb-1">
                        Description & Objective *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newOpp.description}
                        onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                        placeholder="Describe the problem statement, technology stack, and what the team will build..."
                        className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 resize-y"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-foreground-subtle mb-1">
                          Deadline / Target Date
                        </label>
                        <input
                          type="text"
                          value={newOpp.deadline}
                          onChange={(e) => setNewOpp({ ...newOpp, deadline: e.target.value })}
                          placeholder="e.g. Active / Registrations Open"
                          className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-foreground-subtle mb-1">
                          Official Event Website Link
                        </label>
                        <input
                          type="url"
                          value={newOpp.externalLink}
                          onChange={(e) => setNewOpp({ ...newOpp, externalLink: e.target.value })}
                          placeholder="https://www.techfest26.com/"
                          className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700"
                        />
                      </div>
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

            {/* TAB 3: MANAGE LIVE POSTS */}
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
