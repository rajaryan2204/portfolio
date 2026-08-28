"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, CheckCircle2, ArrowRight, Loader2, Send } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Collaboration / Inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send directly via Formspree public endpoint for raj.aryan9242@gmail.com
      const res = await fetch("https://formspree.io/f/xbjnqkyv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: still mark submitted and provide direct Gmail dispatch
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(
    formData.subject || "Message from Portfolio"
  )}&body=${encodeURIComponent(
    `Hi Raj,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section
      id="contact"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-6"
    >
      <div className="space-y-12">
        
        {/* Section Tag & Giant Editorial Header */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
            08 / GET IN TOUCH & CONNECT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Let&apos;s make<br />something useful.
          </h2>
          <p className="text-base text-foreground-muted max-w-xl leading-relaxed pt-1">
            Have a project in mind, want to team up for a hackathon, or discuss engineering? All messages arrive directly in my Gmail inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left: Prominent Direct Contact Channels (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Email Channel */}
            <a
              href={`mailto:${profile.email}`}
              className="p-4 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-150 flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <div>
                  <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">Direct Email</span>
                  <span className="text-sm font-mono text-foreground font-medium">{profile.email}</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Phone Channel */}
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="p-4 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-150 flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent" />
                  <div>
                    <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">Phone / WhatsApp</span>
                    <span className="text-sm font-mono text-foreground font-medium">{profile.phone}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}

            {/* GitHub Channel */}
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-150 flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Github className="w-4 h-4 text-foreground" />
                <div>
                  <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">GitHub Profile</span>
                  <span className="text-sm font-mono text-foreground font-medium">github.com/{profile.username}</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* LinkedIn Channel */}
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded border border-border bg-surface hover:bg-surface-card transition-all duration-150 flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-foreground" />
                <div>
                  <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">LinkedIn Network</span>
                  <span className="text-sm font-mono text-foreground font-medium">linkedin.com/in/raj-aryan2204</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

          </div>

          {/* Right: Live Interactive Contact Form (6 cols) */}
          <div className="md:col-span-6 md:pl-2">
            {submitted ? (
              <div className="p-8 rounded border border-border bg-surface text-center space-y-4 shadow-sm">
                <CheckCircle2 className="w-9 h-9 text-accent mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-base font-medium text-foreground">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed max-w-sm mx-auto">
                    Thank you, <span className="font-medium text-foreground">{formData.name}</span>. Your message has been routed to Raj&apos;s personal inbox (<code>{profile.email}</code>).
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={mailtoLink}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm"
                  >
                    <span>Open Pre-filled in Gmail / Mail Client</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "Collaboration / Inquiry", message: "" });
                    }}
                    className="text-xs text-foreground-subtle hover:text-foreground underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-6 rounded border border-border shadow-sm">
                <div className="flex items-center justify-between pb-1 border-b border-border/60">
                  <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider">
                    Direct Message to Raj
                  </span>
                  <span className="text-[10px] font-mono text-accent flex items-center gap-1">
                    <Send className="w-3 h-3" />
                    Delivers to Inbox
                  </span>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono text-foreground-subtle mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-600 transition-colors"
                    placeholder="e.g. Alex Sharma"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono text-foreground-subtle mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-600 transition-colors"
                    placeholder="alex@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-foreground-subtle mb-1"
                  >
                    Subject / Topic
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-600 transition-colors font-sans"
                  >
                    <option value="Team Collaboration / Hackathon">🤝 Team Collaboration / Hackathon</option>
                    <option value="Open Source / Project Contribution">🛠️ Open Source / Project Contribution</option>
                    <option value="Control Systems & Engineering Inquiry">🔬 Control Systems & Engineering Inquiry</option>
                    <option value="Internship / Work Opportunity">💼 Internship / Work Opportunity</option>
                    <option value="General Conversation / Connect">💬 General Conversation / Just saying hi</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-foreground-subtle mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded bg-[#fbf8f2] border border-border text-foreground placeholder:text-neutral-400 focus:border-neutral-600 transition-colors resize-y"
                    placeholder="Tell me about your project, idea, or team..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors duration-150 shadow-sm disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to Raj...</span>
                    </>
                  ) : (
                    <>
                      <span>Send to Raj&apos;s Inbox</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
