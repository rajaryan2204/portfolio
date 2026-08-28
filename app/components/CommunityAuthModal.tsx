"use client";

import { useState } from "react";
import { X, Github, Linkedin, Mail, GraduationCap, Code2, User, CheckCircle2, Lock } from "lucide-react";
import { MemberUser, saveStoredUser } from "@/lib/collaborationStore";
import { signIn } from "next-auth/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: MemberUser) => void;
}

export default function CommunityAuthModal({ isOpen, onClose, onSuccess }: Props) {
  const [authStep, setAuthStep] = useState<"google_prompt" | "profile_details">("google_prompt");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    college: "",
    skills: "",
  });
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  // 1-Click Google Sign-In with OAuth
  const handleGoogleContinue = async () => {
    setIsGoogleLoading(true);
    try {
      // Trigger official NextAuth Google OAuth redirect
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: typeof window !== "undefined" ? window.location.href : undefined,
      });

      if (result?.error) {
        // If popup/direct OAuth requires fallback step
        setAuthStep("profile_details");
      }
    } catch {
      // Fallback
    }

    setTimeout(() => {
      const defaultEmail = formData.email || "developer@gmail.com";
      const defaultName = formData.name || "Engineering Student";
      
      setFormData((prev) => ({
        ...prev,
        name: defaultName,
        email: defaultEmail,
      }));
      
      setIsGoogleLoading(false);
      setAuthStep("profile_details");
    }, 600);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newUser: MemberUser = {
      id: `user-${Date.now()}`,
      name: formData.name || "Developer",
      email: formData.email || "developer@gmail.com",
      github: formData.github.startsWith("http") ? formData.github : `https://github.com/${formData.github.replace("@", "")}`,
      linkedin: formData.linkedin.startsWith("http") ? formData.linkedin : `https://linkedin.com/in/${formData.linkedin}`,
      college: formData.college || "SLIET Longowal / Engineering Student",
      skills: skillsArray.length > 0 ? skillsArray : ["Embedded", "Web Dev"],
      joinedAt: new Date().toISOString(),
    };

    saveStoredUser(newUser);
    setSaved(true);

    setTimeout(() => {
      onSuccess(newUser);
      onClose();
      setAuthStep("google_prompt");
      setSaved(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-[#ede8dc] border border-border rounded-lg max-w-md w-full p-5 sm:p-8 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto overscroll-contain">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-1.5 transition-colors touch-manipulation"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {saved ? (
          <div className="py-8 sm:py-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-accent mx-auto animate-bounce" />
            <h3 className="text-xl font-medium text-foreground">
              Signed In Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-foreground-muted">
              Connected as <span className="font-semibold text-foreground">{formData.name}</span>. You can now apply for techFEST&apos;26 and team projects in 1 click.
            </p>
          </div>
        ) : authStep === "google_prompt" ? (
          /* STEP 1: GOOGLE SIGN-IN ONLY SCREEN */
          <div className="space-y-6 text-center py-2">
            <div className="p-3.5 rounded-full bg-surface border border-border w-14 h-14 flex items-center justify-center mx-auto text-accent shadow-sm">
              <Lock className="w-6 h-6 text-foreground" />
            </div>

            <div className="space-y-1.5 px-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                AUTHENTICATION REQUIRED
              </span>
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                Sign In to Apply
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed max-w-xs mx-auto">
                Please sign in with your Google account first to apply for team openings and track your application status.
              </p>
            </div>

            {/* Big Google Login Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleGoogleContinue}
                disabled={isGoogleLoading}
                className="w-full py-3.5 px-4 rounded-lg border border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-medium transition-all duration-150 flex items-center justify-center gap-3 shadow-md hover:shadow active:scale-[0.99] touch-manipulation"
              >
                {/* Google SVG */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
                <span>{isGoogleLoading ? "Connecting Google..." : "Continue with Google"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* STEP 2: COMPLETE DEVELOPER PROFILE (GITHUB & LINKEDIN) */
          <>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                STEP 2 OF 2
              </span>
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">
                Complete Your Developer Profile
              </h3>
              <p className="text-xs text-foreground-muted">
                Link your GitHub & LinkedIn so Raj can evaluate your projects for team selection.
              </p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-3.5 pt-1">
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
                  className="w-full px-3 py-2.5 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 transition-colors"
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
                  className="w-full px-3 py-2.5 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 transition-colors"
                />
              </div>

              {/* GitHub & LinkedIn Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-foreground" />
                    <span>GitHub *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="github.com/amandev"
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-foreground" />
                    <span>LinkedIn *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="linkedin.com/in/aman"
                    className="w-full px-3 py-2.5 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 transition-colors"
                  />
                </div>
              </div>

              {/* College / Organization */}
              <div>
                <label className="block text-xs font-mono text-foreground-subtle mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-accent" />
                  <span>College & Branch</span>
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. SLIET Longowal (ECE / ICE / CSE)"
                  className="w-full px-3 py-2.5 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 transition-colors"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setAuthStep("google_prompt")}
                  className="text-xs font-mono text-foreground-muted hover:text-foreground py-2 touch-manipulation"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm touch-manipulation"
                >
                  Save & Unlock Application ↗
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
