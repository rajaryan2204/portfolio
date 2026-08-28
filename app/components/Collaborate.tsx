"use client";

import { useState, useEffect } from "react";
import {
  Trophy,
  Code2,
  Cpu,
  Users,
  ArrowUpRight,
  Sparkles,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus,
  Send,
  Loader2,
  Eye,
  LogOut,
  Lock,
  X
} from "lucide-react";
import { profile } from "@/data/profile";
import {
  MemberUser,
  Opportunity,
  Application,
  getStoredUser,
  saveStoredUser,
  getStoredOpportunities,
  getStoredApplications,
  saveStoredApplications,
} from "@/lib/collaborationStore";
import CommunityAuthModal from "./CommunityAuthModal";
import AdminDashboard from "./AdminDashboard";

export default function Collaborate() {
  const [currentUser, setCurrentUser] = useState<MemberUser | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [userApplications, setUserApplications] = useState<Application[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "competition" | "hackathon">("all");

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [applyModalOpp, setApplyModalOpp] = useState<Opportunity | null>(null);

  // Application Form State
  const [selectedRole, setSelectedRole] = useState("");
  const [applicantPitch, setApplicantPitch] = useState("");
  const [submittingApp, setSubmittingApp] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    const user = getStoredUser();
    setCurrentUser(user);
    setOpportunities(getStoredOpportunities());

    if (user && user.email) {
      fetchUserStatus(user.email);
    }
  }, []);

  // Sync application status across devices via server API
  const fetchUserStatus = async (email: string) => {
    setLoadingStatus(true);
    try {
      const res = await fetch(`/api/applications?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.applications)) {
          setUserApplications(data.applications);
        }
      }
    } catch {
      const localApps = getStoredApplications().filter(
        (a) => a.applicantEmail.toLowerCase() === email.toLowerCase()
      );
      setUserApplications(localApps);
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleLogout = () => {
    saveStoredUser(null);
    setCurrentUser(null);
    setUserApplications([]);
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    if (activeTab === "all") return true;
    return opp.type === activeTab;
  });

  const handleOpenApply = (opp: Opportunity) => {
    if (!currentUser) {
      setAuthModalOpen(true);
    } else {
      setApplyModalOpp(opp);
      setSelectedRole(opp.rolesNeeded[0] || "Developer");
      setApplicationSubmitted(false);
      setApplicantPitch("");
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !applyModalOpp) return;

    setSubmittingApp(true);

    const newApp: Application = {
      id: `app-${Date.now()}`,
      opportunityId: applyModalOpp.id,
      opportunityTitle: applyModalOpp.title,
      applicantName: currentUser.name,
      applicantEmail: currentUser.email,
      applicantGithub: currentUser.github,
      applicantLinkedin: currentUser.linkedin,
      applicantCollege: currentUser.college,
      applicantSkills: currentUser.skills,
      roleApplied: selectedRole,
      message: applicantPitch || "Interested in teaming up and building together!",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApp),
      });
    } catch {
      // Fallback
    }

    const existing = getStoredApplications();
    const updated = [newApp, ...existing];
    saveStoredApplications(updated);
    setUserApplications([newApp, ...userApplications]);

    setSubmittingApp(false);
    setApplicationSubmitted(true);

    setTimeout(() => {
      setApplyModalOpp(null);
      setApplicationSubmitted(false);
    }, 1500);
  };

  return (
    <section
      id="collaborate"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-6"
    >
      <div className="space-y-10">
        
        {/* Section Header with Live Auth Badge & Admin Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
              06 / TEAM UP & HACKATHONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Hackathon & Team Recruitment Board
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-2 text-xs font-mono text-foreground-muted bg-surface px-3 py-1.5 rounded border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-semibold text-foreground">{currentUser.name.split(" ")[0]}</span>
                
                {/* View Applications Status Button */}
                <button
                  onClick={() => {
                    fetchUserStatus(currentUser.email);
                    setStatusModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1 text-accent hover:underline font-semibold ml-1.5"
                >
                  <Eye className="w-3 h-3" />
                  <span>My Status ({userApplications.length})</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="text-foreground-subtle hover:text-red-600 transition-colors ml-1 p-0.5"
                  title="Logout"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-mono font-medium px-4 py-2 rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
              >
                {/* Google Small Icon */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            )}

            <button
              onClick={() => setAdminModalOpen(true)}
              className="p-1.5 text-foreground-subtle hover:text-foreground border border-border rounded bg-surface transition-colors shadow-sm"
              title="Raj's Admin Control Portal"
              aria-label="Admin Control Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Not Logged In Notice Banner */}
        {!currentUser && (
          <div className="p-4 rounded-lg bg-surface border border-border flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-surface-subtle border border-border/80 text-accent">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground font-mono">
                  Authentication Required to Apply
                </h4>
                <p className="text-xs text-foreground-muted">
                  Please sign in with Google first. Once signed in, you can apply for open team slots and track real-time status.
                </p>
              </div>
            </div>

            <button
              onClick={() => setAuthModalOpen(true)}
              className="text-xs font-mono font-medium px-3.5 py-1.5 rounded bg-foreground text-background hover:bg-[#292524] transition-colors whitespace-nowrap shadow-sm"
            >
              Sign In ↗
            </button>
          </div>
        )}

        <p className="text-base text-foreground-muted max-w-2xl leading-relaxed">
          I regularly team up with driven engineering students, developers, and creators for national technical fests, hackathons, and AI builds. Browse open slots below and track your application status in real-time across any device.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-foreground-subtle mr-2">Category:</span>
          {(
            [
              { key: "all", label: "All Opportunities" },
              { key: "competition", label: "🏆 techFEST'26 SLIET" },
              { key: "hackathon", label: "🔒 SIH Hackathon" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-xs px-3 py-1 rounded border font-mono transition-all ${
                activeTab === tab.key
                  ? "bg-foreground text-background border-foreground font-medium shadow-sm"
                  : "bg-surface border-border text-foreground-muted hover:text-foreground hover:bg-surface-card"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          {filteredOpportunities.length === 0 ? (
            <div className="py-12 text-center text-sm font-mono text-foreground-muted bg-surface rounded border border-border">
              No opportunities open in this category right now.
            </div>
          ) : (
            filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-6 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-200 space-y-4 shadow-sm group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border/60 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-surface-subtle border border-border text-accent font-semibold">
                        {opp.type}
                      </span>
                      <span className="text-xs font-mono text-foreground-subtle">
                        {opp.eventName}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-foreground tracking-tight group-hover:text-accent transition-colors">
                      {opp.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-foreground-subtle whitespace-nowrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-accent" />
                      {opp.deadline}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-subtle border border-border/60 text-foreground font-medium">
                      {opp.teamSize}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground-muted leading-relaxed max-w-2xl">
                  {opp.description}
                </p>

                {/* Roles Required Badges */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle block">
                    Roles & Teammates Needed:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {opp.rolesNeeded.map((role, rIdx) => (
                      <span
                        key={rIdx}
                        className="text-xs font-mono px-3 py-1 rounded bg-surface-subtle border border-border text-foreground font-medium"
                      >
                        ⚡ {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60">
                  {opp.status === "open" ? (
                    <span className="text-xs font-mono text-emerald-800 flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Applications Open</span>
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-foreground-subtle flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-400" />
                      <span>Team Formed / Closed</span>
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    {opp.externalLink && (
                      <a
                        href={opp.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-foreground-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        <span>{opp.id.includes("techfest") ? "techFEST Website" : "Official Link"}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}

                    {opp.status === "open" ? (
                      currentUser ? (
                        <button
                          onClick={() => handleOpenApply(opp)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
                        >
                          <Send className="w-3 h-3" />
                          <span>Apply to Team ↗</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setAuthModalOpen(true)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
                        >
                          {/* Google G SVG */}
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                          <span>Sign In with Google to Apply ↗</span>
                        </button>
                      )
                    ) : (
                      <span className="px-3 py-1.5 text-xs font-mono text-foreground-subtle bg-surface-subtle border border-border rounded">
                        Team Full (Closed)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Auth / Register Modal with Google First Flow */}
      <CommunityAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setAuthModalOpen(false);
          fetchUserStatus(user.email);
        }}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          setOpportunities(getStoredOpportunities());
          if (currentUser?.email) {
            fetchUserStatus(currentUser.email);
          }
        }}
      />

      {/* User Live Applications Status Modal */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#ede8dc] border border-border rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setStatusModalOpen(false)}
              className="absolute top-5 right-5 text-foreground-muted hover:text-foreground p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                YOUR APPLICATIONS TRACKER
              </span>
              <h3 className="text-xl font-medium tracking-tight text-foreground">
                Application Status for {currentUser?.name}
              </h3>
              <p className="text-xs text-foreground-muted">
                Synced with cloud database for: <span className="font-mono text-foreground">{currentUser?.email}</span>
              </p>
            </div>

            {loadingStatus ? (
              <div className="py-10 text-center text-sm font-mono text-foreground-muted flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span>Checking latest decision from Raj...</span>
              </div>
            ) : userApplications.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-foreground-muted bg-surface rounded border border-border p-4">
                You haven&apos;t applied to any team yet. Click &quot;Apply to Team&quot; on techFEST&apos;26 above!
              </div>
            ) : (
              <div className="space-y-3">
                {userApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded border border-border bg-surface space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">
                        {app.opportunityTitle}
                      </h4>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                          app.status === "accepted"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : app.status === "rejected"
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {app.status === "accepted" && <CheckCircle2 className="w-3 h-3" />}
                        {app.status === "rejected" && <XCircle className="w-3 h-3" />}
                        {app.status === "pending" && <Clock className="w-3 h-3" />}
                        <span>{app.status.toUpperCase()}</span>
                      </span>
                    </div>

                    <p className="text-xs text-foreground-muted">
                      Role applied: <span className="font-medium text-foreground">{app.roleApplied}</span>
                    </p>

                    {/* Status Feedback Message */}
                    <div className="text-xs font-mono p-2.5 rounded bg-surface-subtle border border-border/60">
                      {app.status === "accepted" && (
                        <p className="text-emerald-800 font-medium">
                          🎉 Congratulations! Raj has accepted your application. Check your email for project coordination details!
                        </p>
                      )}
                      {app.status === "rejected" && (
                        <p className="text-rose-800">
                          Team slots for this role have been filled. Thank you for applying and feel free to connect for future events!
                        </p>
                      )}
                      {app.status === "pending" && (
                        <p className="text-foreground-muted">
                          Application received and currently under review by Raj. You will be notified here and on email once reviewed.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 text-right">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="px-4 py-2 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors"
              >
                Close Tracker
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Application Modal (Only accessible after Google Sign In) */}
      {applyModalOpp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#ede8dc] border border-border rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setApplyModalOpp(null)}
              className="absolute top-5 right-5 text-foreground-muted hover:text-foreground p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {applicationSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto animate-bounce" />
                <h3 className="text-xl font-medium text-foreground">
                  Application Submitted!
                </h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  Your application for <span className="font-medium text-foreground">{applyModalOpp.title}</span> has been stored in Neon Cloud DB and sent to Raj Aryan. You can check your acceptance status anytime under &quot;My Status&quot;!
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                    APPLY TO TEAM
                  </span>
                  <h3 className="text-xl font-medium tracking-tight text-foreground">
                    {applyModalOpp.title}
                  </h3>
                  <p className="text-xs text-foreground-muted">
                    Applying as: <span className="font-medium text-foreground">{currentUser?.name}</span> ({currentUser?.email})
                  </p>
                </div>

                <form onSubmit={handleSubmitApplication} className="space-y-4 pt-1">
                  <div>
                    <label className="block text-xs font-mono text-foreground-subtle mb-1">
                      Choose Your Role *
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 font-sans"
                    >
                      {applyModalOpp.rolesNeeded.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-foreground-subtle mb-1">
                      Why do you want to team up on this? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={applicantPitch}
                      onChange={(e) => setApplicantPitch(e.target.value)}
                      placeholder="Briefly describe your relevant tech skills, projects, and what you can build for this technical fest/hackathon..."
                      className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setApplyModalOpp(null)}
                      className="px-4 py-2 text-xs font-mono text-foreground-muted hover:text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingApp}
                      className="px-5 py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm disabled:opacity-60 flex items-center gap-1.5"
                    >
                      {submittingApp ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Submitting to Neon DB...</span>
                        </>
                      ) : (
                        <span>Submit Application ↗</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
