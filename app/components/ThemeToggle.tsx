"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded p-1.5 border border-border bg-surface text-foreground opacity-50" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-1.5 sm:p-2 rounded border border-border bg-surface hover:bg-surface-card text-foreground transition-colors duration-150 shadow-sm flex items-center justify-center touch-manipulation"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Dark/Light Theme"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-accent transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-foreground transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
