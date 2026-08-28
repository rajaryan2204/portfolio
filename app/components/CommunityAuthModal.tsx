"use client";

import { useState } from "react";
import { X, Github, Linkedin, Mail, GraduationCap, Code2, User, CheckCircle2 } from "lucide-react";
import { MemberUser, saveStoredUser } from "@/lib/collaborationStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: MemberUser) => void;
}

export default function CommunityAuthModal({ isOpen, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    college: "",
    skills: "",
  });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newUser: MemberUser = {
      id: `user-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      github: formData.github.startsWith("http") ? formData.github : `https://github.com/${formData.github.replace("@", "")}`,
      linkedin: formData.linkedin.startsWith("http") ? formData.linkedin : `https://linkedin.com/in/${formData.linkedin}`,
      college: formData.college || "Engineering Student / Developer",
      skills: skillsArray.length > 0 ? skillsArray : ["Developer"],
      joinedAt: new Date().toISOString(),
    };

    saveStoredUser(newUser);
    setSaved(true);

    setTimeout(() => {
      onSuccess(newUser);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#ede8dc] border border-border rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-foreground-muted hover:text-foreground p-1 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {saved ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-accent mx-auto animate-bounce" />
            <h3 className="text-xl font-medium text-foreground">
              Welcome to the Team Network!
            </h3>
            <p className="text-sm text-foreground-muted">
              Profile registered successfully. You can now apply to hackathons and team projects in 1-click.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                COMMUNITY & TEAM NETWORK
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-foreground">
                Join Raj&apos;s Developer Network
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Connect your profiles to apply for hackathon teams, collaborate on open-source projects, and stay notified of new engineering opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-accent" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span>Gmail / Email *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya.sharma@gmail.com"
                  className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                />
              </div>

              {/* GitHub & LinkedIn Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-foreground" />
                    <span>GitHub Username / Link *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="github.com/priyadev"
                    className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-foreground" />
                    <span>LinkedIn Profile *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="linkedin.com/in/priya"
                    className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                  />
                </div>
              </div>

              {/* College / Organization */}
              <div>
                <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-accent" />
                  <span>College / Branch / Role</span>
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. SLIET Longowal (ICE/CSE) / Independent Dev"
                  className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-accent" />
                  <span>Your Key Skills (comma separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Next.js, Python, OpenCV, Arduino, UI/UX"
                  className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
                >
                  Complete Registration ↗
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
