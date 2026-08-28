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
  UserPlus,
  Send,
  X
} from "lucide-react";
import { profile } from "@/data/profile";
import {
  MemberUser,
  Opportunity,
  Application,
  getStoredUser,
  getStoredOpportunities,
  getStoredApplications,
  saveStoredApplications,
} from "@/lib/collaborationStore";
import CommunityAuthModal from "./CommunityAuthModal";
import AdminDashboard from "./AdminDashboard";

export default function Collaborate() {
  const [currentUser, setCurrentUser] = useState<MemberUser | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "hackathon" | "opensource" | "research">("all");

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [applyModalOpp, setApplyModalOpp] = useState<Opportunity | null>(null);

  // Application Form State
  const [selectedRole, setSelectedRole] = useState("");
  const [applicantPitch, setApplicantPitch] = useState("");
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    setCurrentUser(getStoredUser());
    setOpportunities(getStoredOpportunities());
  }, []);

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

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !applyModalOpp) return;

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

    const existing = getStoredApplications();
    const updated = [newApp, ...existing];
    saveStoredApplications(updated);

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

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 text-xs font-mono text-foreground-muted bg-surface px-3 py-1.5 rounded border border-border">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Hi, {currentUser.name.split(" ")[0]}</span>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-accent underline ml-1"
                >
                  (Edit)
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join Developer Network</span>
              </button>
            )}

            <button
              onClick={() => setAdminModalOpen(true)}
              className="p-1.5 text-foreground-subtle hover:text-foreground border border-border rounded bg-surface transition-colors"
              title="Raj's Admin Control Portal"
              aria-label="Admin Control Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-base text-foreground-muted max-w-2xl leading-relaxed">
          I regularly team up with driven engineering students, developers, and creators for national hackathons, open-source projects, and robotics/AI builds. Browse open team slots below and apply in 1-click!
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-foreground-subtle mr-2">Category:</span>
          {(
            [
              { key: "all", label: "All Opportunities" },
              { key: "hackathon", label: "🏆 Hackathons" },
              { key: "opensource", label: "🛠️ Open Source" },
              { key: "research", label: "🔬 Engineering & IoT" },
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
                      <button
                        onClick={() => handleOpenApply(opp)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
                      >
                        <Send className="w-3 h-3" />
                        <span>Apply to Team ↗</span>
                      </button>
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

        {/* Quick Custom Idea CTA */}
        <div className="p-6 rounded border border-border bg-[#f5f0e6] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-medium text-foreground">
              Organizing another hackathon or have a custom project idea?
            </h4>
            <p className="text-xs text-foreground-muted">
              Connect directly to brainstorm and build together.
            </p>
          </div>

          <a
            href={`mailto:${profile.email}?subject=Hackathon%20Collaboration%20-%20Raj%20Aryan`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Email Raj Directly ↗</span>
          </a>
        </div>

      </div>

      {/* Auth / Register Modal */}
      <CommunityAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setAuthModalOpen(false);
        }}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => {
          setAdminModalOpen(false);
          setOpportunities(getStoredOpportunities());
        }}
      />

      {/* Team Application Modal */}
      {applyModalOpp && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
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
                  Your application for <span className="font-medium text-foreground">{applyModalOpp.title}</span> has been sent to Raj Aryan. He will review your GitHub and reach out via email!
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
                    Applying as: <span className="font-medium text-foreground">{currentUser?.name}</span> ({currentUser?.college})
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
                      placeholder="Briefly describe your relevant tech skills, projects, and what you can build for this hackathon/project..."
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
                      className="px-5 py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
                    >
                      Submit Team Application ↗
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
