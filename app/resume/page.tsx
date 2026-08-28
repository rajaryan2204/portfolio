"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Download, Mail, Github, Linkedin, MapPin, Globe, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-8 px-4 sm:px-6 font-sans text-neutral-900 dark:text-neutral-100">
      
      {/* Top Action Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-mono font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-mono font-medium hover:bg-neutral-800 dark:hover:bg-white transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Resume Container (Standard 8.5x11 Paper Look) */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#161615] border border-neutral-300 dark:border-neutral-800 p-8 sm:p-12 rounded-xl shadow-lg print:shadow-none print:border-none print:p-0 print:m-0 space-y-6">
        
        {/* Header */}
        <header className="border-b border-neutral-300 dark:border-neutral-700 pb-5 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                Raj Aryan
              </h1>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Instrumentation & Control Engineering Student · Software Developer
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              India (IST UTC+5:30)
            </span>
          </div>

          {/* Contact Links Strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-400 pt-1">
            <a href="mailto:raj.aryan9242@gmail.com" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 underline">
              <Mail className="w-3 h-3" />
              <span>raj.aryan9242@gmail.com</span>
            </a>
            <span>•</span>
            <a href="https://github.com/rajaryan2204" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 underline">
              <Github className="w-3 h-3" />
              <span>github.com/rajaryan2204</span>
            </a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/raj-aryan2204/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 underline">
              <Linkedin className="w-3 h-3" />
              <span>linkedin.com/in/raj-aryan2204</span>
            </a>
            <span>•</span>
            <a href="https://rajaryan2204.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white flex items-center gap-1 underline">
              <Globe className="w-3 h-3" />
              <span>rajaryan2204.vercel.app</span>
            </a>
          </div>
        </header>

        {/* Education */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-1">
            <div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                Sant Longowal Institute of Engineering & Technology (SLIET)
              </h3>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                Diploma in Instrumentation and Control Engineering (1st Year)
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              2026 — Present
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">Relevant Coursework:</span> Applied Physics & Electrical Sciences, Circuit Analysis, Introduction to Instrumentation & Transducers, C/C++ Programming, Digital Logic, Control Systems Fundamentals.
          </p>
        </section>

        {/* Technical Skills */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs leading-relaxed pt-1">
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">Programming Languages:</span>
              <p className="text-neutral-600 dark:text-neutral-400 font-mono">Python, C, C++, TypeScript, JavaScript, SQL</p>
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">Web & Full-Stack:</span>
              <p className="text-neutral-600 dark:text-neutral-400 font-mono">Next.js (App Router), React, Tailwind CSS, Prisma ORM, Node.js, NextAuth</p>
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">Instrumentation & Systems:</span>
              <p className="text-neutral-600 dark:text-neutral-400 font-mono">Control Systems, Sensors & Transducers, OpenCV, YOLOv8, PyQt6, Microcontrollers</p>
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">Tools & Databases:</span>
              <p className="text-neutral-600 dark:text-neutral-400 font-mono">Git, GitHub, VS Code, Linux, PostgreSQL (Neon Cloud), Postman, Docker, Vercel</p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1">
            Featured Engineering Projects
          </h2>
          
          <div className="space-y-3 pt-1">
            
            {/* Project 1: SLIET Voice */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span>SLIET Voice (CampusVoice)</span>
                  <span className="text-neutral-400 font-normal font-mono text-xs">| Next.js, TypeScript, Prisma, PostgreSQL</span>
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <a href="https://slietvoice.vercel.app" target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 underline">
                    Live Demo ↗
                  </a>
                </div>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 list-disc pl-4 space-y-0.5 leading-relaxed">
                <li>Built a modern full-stack grievance escalation and live campus polling portal for SLIET students.</li>
                <li>Engineered anonymous feedback reporting flows with role-based admin moderation and PostgreSQL relational schema.</li>
              </ul>
            </div>

            {/* Project 2: InterviewX AI */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span>InterviewX AI</span>
                  <span className="text-neutral-400 font-normal font-mono text-xs">| Next.js, Speech Recognition, AI Assessment</span>
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <a href="https://interviewx-ai-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 underline">
                    Live Demo ↗
                  </a>
                </div>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 list-disc pl-4 space-y-0.5 leading-relaxed">
                <li>Designed an AI-driven technical mock interview platform featuring automated question synthesis and real-time speech evaluation.</li>
                <li>Integrated responsive scoring matrices and interactive performance analytics for aspiring developers.</li>
              </ul>
            </div>

            {/* Project 3: VisionX */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span>VisionX (Desktop AI Vision Assistant)</span>
                  <span className="text-neutral-400 font-normal font-mono text-xs">| Python, PyQt6, OpenCV, YOLOv8</span>
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <a href="https://github.com/rajaryan2204/VisionX" target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 underline">
                    Source Code ↗
                  </a>
                </div>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 list-disc pl-4 space-y-0.5 leading-relaxed">
                <li>Engineered a desktop computer vision tool for real-time object tracking and screen region bounding with sub-30ms inference.</li>
                <li>Built a responsive graphical interface in PyQt6 with multi-camera video feed processing.</li>
              </ul>
            </div>

            {/* Project 4: SyncBridge */}
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span>SyncBridge</span>
                  <span className="text-neutral-400 font-normal font-mono text-xs">| TypeScript, Android, macOS Automation</span>
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <a href="https://github.com/rajaryan2204/SyncBridge" target="_blank" rel="noopener noreferrer" className="text-neutral-700 dark:text-neutral-300 underline">
                    Source Code ↗
                  </a>
                </div>
              </div>
              <ul className="text-xs text-neutral-600 dark:text-neutral-400 list-disc pl-4 space-y-0.5 leading-relaxed">
                <li>Connected Android and macOS ecosystems for sub-50ms bi-directional clipboard sync and remote screen locking over local network.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Competitions & Achievements */}
        <section className="space-y-2">
          <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1">
            Competitions & Certifications
          </h2>
          <div className="space-y-1.5 pt-1 text-xs leading-relaxed">
            <div className="flex justify-between">
              <span className="font-semibold text-neutral-900 dark:text-white">Google AI Essentials — Google (Coursera: GRWZTXD42969)</span>
              <a href="https://coursera.org/verify/specialization/GRWZTXD42969" target="_blank" rel="noopener noreferrer" className="font-mono text-neutral-700 dark:text-neutral-300 underline">
                Verified Credential ↗
              </a>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-neutral-900 dark:text-white">LinkedIn Verified Licenses & Certifications</span>
              <a href="https://www.linkedin.com/in/raj-aryan2204/details/certifications/" target="_blank" rel="noopener noreferrer" className="font-mono text-neutral-700 dark:text-neutral-300 underline">
                Verify on LinkedIn ↗
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
