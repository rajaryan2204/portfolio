"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Currently", href: "#currently" },
  { label: "Timeline", href: "#journey" },
  { label: "Writing", href: "#writing" },
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

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-[#ede8dc]/95 backdrop-blur-md border-b border-border py-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-[#ede8dc] border-b border-border/70 py-4"
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

        {/* Center/Right: Availability & Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {/* Subtle Live Availability Status */}
          <div className="flex items-center gap-2 text-xs font-mono text-foreground-muted bg-surface/80 border border-border px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Open for collab & work</span>
          </div>

          <nav className="flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-150 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-foreground hover:after:w-full after:transition-all after:duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Hamburger Button with 44px Accessible Target */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden text-foreground-muted hover:text-foreground w-10 h-10 flex items-center justify-center rounded border border-border bg-surface/60 transition-colors touch-manipulation"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <nav
          className="md:hidden border-b border-border bg-[#ede8dc] px-5 py-4 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-foreground-muted pb-3 mb-1 border-b border-border/60">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Open for collaborations & teamwork</span>
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
