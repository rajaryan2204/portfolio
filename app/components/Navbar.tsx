"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, FileDown } from "lucide-react";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Currently", href: "#currently" },
  { label: "Timeline", href: "#journey" },
  { label: "Journal", href: "#journal" },
  { label: "Collab", href: "#collaborate" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const resumeUrl = profile.resumeUrl || `mailto:${profile.email}?subject=Resume%20Request%20-%20Raj%20Aryan`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-background border-b border-border/70 py-3.5"
      }`}
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        
        {/* Left: Brand Name */}
        <Link
          href="#hero"
          className="text-base sm:text-lg font-mono font-semibold tracking-tight text-foreground hover:text-accent transition-colors flex items-center gap-2"
          aria-label="Home"
        >
          <span>{profile.name}</span>
        </Link>

        {/* Right Desktop: Navigation & Theme Toggle */}
        <div className="hidden md:flex items-center gap-5">
          <nav className="flex items-center gap-4 text-xs font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground-muted hover:text-foreground transition-colors duration-150 relative py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="h-4 w-[1px] bg-border" />

          {/* Quick Resume Link */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-foreground hover:text-accent px-2 py-1 rounded bg-surface border border-border transition-colors shadow-sm"
            title="Download Resume PDF"
          >
            <FileDown className="w-3.5 h-3.5 text-accent" />
            <span>CV</span>
          </a>

          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile: Controls (Theme Toggle + Hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={toggleMenu}
            className="text-foreground-muted hover:text-foreground w-10 h-10 flex items-center justify-center rounded border border-border bg-surface/60 transition-colors touch-manipulation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <nav
          className="md:hidden border-b border-border bg-background px-5 py-4 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pb-3 mb-1 border-b border-border/60">
            <div className="flex items-center gap-2 text-xs font-mono text-foreground-muted">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>SLIET ICE &apos;26 · Building Daily</span>
            </div>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-accent font-medium underline"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              className="text-base font-medium text-foreground hover:text-accent hover:bg-surface px-3 py-2.5 rounded transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
