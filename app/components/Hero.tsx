import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin, GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section
      id="hero"
      className="pt-20 pb-20 md:pt-28 md:pb-28 max-w-4xl mx-auto px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
        
        {/* Left Editorial Content (7 cols) */}
        <div className="md:col-span-7 space-y-8">
          
          {/* Section Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent">
              01 — INSTRUMENTATION & CONTROL ENGG · DEVELOPER
            </span>
          </div>

          {/* Main Typography */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.08]">
              Hi, I&apos;m {profile.displayName}.
            </h1>
            <p className="text-xl sm:text-2xl text-foreground-muted font-normal leading-relaxed tracking-tight">
              {profile.bio}
            </p>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-foreground text-background text-sm font-medium hover:bg-[#292524] transition-colors duration-150 shadow-sm"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded border border-border bg-surface text-foreground text-sm font-medium hover:bg-surface-subtle transition-colors duration-150 shadow-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground-subtle" />
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded border border-border bg-surface text-foreground text-sm font-medium hover:bg-surface-subtle transition-colors duration-150 shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground-subtle" />
            </a>

            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded border border-border bg-surface text-foreground text-sm font-medium hover:bg-surface-subtle transition-colors duration-150 shadow-sm"
            >
              <span>Get Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-foreground-subtle" />
            </a>
          </div>

          {/* Editorial Micro Metadata */}
          <div className="pt-4 border-t border-border/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-foreground-subtle">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <span>1st Year Diploma (SLIET)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Based in {profile.location} ({profile.timezone})</span>
            </div>
          </div>

        </div>

        {/* Right Asymmetric Editorial Composition (5 cols) */}
        <div className="md:col-span-5 md:pl-2">
          <div className="bg-surface border border-border rounded p-6 space-y-5 shadow-sm">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-border/70 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground-subtle">
                ACADEMICS & TECH / 2026
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            </div>

            {/* Quote / Philosophy */}
            <p className="text-sm font-serif italic text-foreground leading-relaxed">
              &ldquo;Bridging control systems and hardware instrumentation with modern AI vision and full-stack software.&rdquo;
            </p>

            {/* Academic Focus Snippet (Pure Academics) */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <div className="text-[11px] font-mono text-foreground-subtle uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                <span>Academic Institution</span>
              </div>
              <p className="text-xs text-foreground font-mono bg-surface-subtle p-2.5 rounded border border-border/60">
                Sant Longowal Institute of Engineering & Technology (SLIET)
              </p>
            </div>

            {/* Quick Stats list */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono border-t border-border/50">
              <div>
                <span className="text-foreground-subtle block text-[10px] uppercase tracking-wider">Branch</span>
                <span className="text-foreground font-medium">Control & Instrumentation</span>
              </div>
              <div>
                <span className="text-foreground-subtle block text-[10px] uppercase tracking-wider">GitHub Sync</span>
                <span className="text-accent font-medium">6 Public Repos Live</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
