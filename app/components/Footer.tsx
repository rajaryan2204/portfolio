import { profile } from "@/data/profile";
import { ArrowUp, Heart, Code2 } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 max-w-4xl mx-auto px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-foreground-subtle">

        {/* Left: Brand + Year */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-foreground">{profile.name}</span>
          <span>© {currentYear} {profile.displayName}</span>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-5">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>

        {/* Right: Back to top */}
        <a
          href="#hero"
          className="inline-flex items-center gap-1.5 hover:text-accent transition-colors group"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

      </div>
    </footer>
  );
}
