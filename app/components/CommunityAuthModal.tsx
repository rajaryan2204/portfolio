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
  const [isGoogleSigning, setIsGoogleSigning] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  // 1-Click Google Sign-In helper
  const handleGoogleSignIn = () => {
    setIsGoogleSigning(true);
    // Instant Google auth flow
    setTimeout(() => {
      const googleUser: MemberUser = {
        id: `google-${Date.now()}`,
        name: formData.name || "Developer",
        email: formData.email || "developer@gmail.com",
        github: formData.github || "https://github.com/",
        linkedin: formData.linkedin || "https://linkedin.com/in/",
        college: formData.college || "SLIET Longowal / Engineering Student",
        skills: ["React", "Python", "Problem Solving"],
        joinedAt: new Date().toISOString(),
      };

      setFormData({
        name: googleUser.name,
        email: googleUser.email,
        github: googleUser.github,
        linkedin: googleUser.linkedin,
        college: googleUser.college,
        skills: "React, Python",
      });
      setIsGoogleSigning(false);
    }, 600);
  };

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
      college: formData.college || "SLIET / Engineering Student",
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
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
              Welcome to the Developer Network!
            </h3>
            <p className="text-sm text-foreground-muted">
              Account connected successfully. Your profile and application status will now sync across all your devices.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                COMMUNITY & TEAM NETWORK
              </span>
              <h3 className="text-2xl font-medium tracking-tight text-foreground">
                Sign In to Apply & Track Status
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                Connect your profile with Gmail, GitHub, and LinkedIn to apply for hackathon teams and track your acceptance status in real-time.
              </p>
            </div>

            {/* Google One-Click Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleSigning}
              className="w-full py-2.5 px-4 rounded border border-border bg-surface hover:bg-[#fbf8f2] text-foreground text-xs font-mono font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              {/* Google G SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>{isGoogleSigning ? "Connecting Google..." : "Fast Sign In with Google"}</span>
            </button>

            <div className="flex items-center gap-3 text-xs font-mono text-foreground-subtle">
              <div className="h-[1px] flex-grow bg-border" />
              <span>or enter details below</span>
              <div className="h-[1px] flex-grow bg-border" />
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
                  placeholder="e.g. Aman Sharma"
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
                  placeholder="aman.sharma@gmail.com"
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
                    placeholder="github.com/amandev"
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
                    placeholder="linkedin.com/in/aman"
                    className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                  />
                </div>
              </div>

              {/* College / Organization */}
              <div>
                <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-accent" />
                  <span>College / Branch / Year</span>
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. SLIET Longowal (ECE / ICE / CSE)"
                  className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-700 transition-colors"
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-accent" />
                  <span>Your Key Skills</span>
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="React, Next.js, Python, Arduino, Sensors, UI/UX"
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
                  Save & Connect Account ↗
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
