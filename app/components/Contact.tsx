"use client";

import { useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TIP: Connect your backend endpoint here (e.g. Formspree, Resend, or EmailJS)
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-6"
    >
      <div className="space-y-12">
        
        {/* Section Tag & Giant Editorial Header */}
        <div className="space-y-3">
          <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
            07 / GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
            Let&apos;s make<br />something useful.
          </h2>
          <p className="text-base text-foreground-muted max-w-xl leading-relaxed pt-1">
            Have a project in mind, an interesting idea to build, or want to collaborate? Feel free to reach out directly.
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
                  <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">Email</span>
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
                    <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">Phone</span>
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
                  <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">GitHub</span>
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
                  <span className="text-xs font-mono text-foreground-subtle block uppercase tracking-wider">LinkedIn</span>
                  <span className="text-sm font-mono text-foreground font-medium">linkedin.com/in/raj-aryan2204</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-foreground-subtle group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

          </div>

          {/* Right: Quick Direct Form (6 cols) */}
          <div className="md:col-span-6 md:pl-2">
            {submitted ? (
              <div className="p-8 rounded border border-border bg-surface text-center space-y-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8 text-accent mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-foreground">
                    Message prepared!
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out, {formData.name}. You can also write directly to{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-accent hover:underline font-medium"
                    >
                      {profile.email}
                    </a>
                    .
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", message: "" });
                  }}
                  className="text-xs text-foreground-subtle hover:text-foreground underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-surface p-6 rounded border border-border shadow-sm">
                <span className="text-xs font-mono text-foreground-subtle uppercase tracking-wider block">
                  Quick Message
                </span>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono text-foreground-subtle mb-1"
                  >
                    Name
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
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono text-foreground-subtle mb-1"
                  >
                    Email
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
                    placeholder="you@example.com"
                  />
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
                    placeholder="What would you like to build together?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors duration-150 shadow-sm"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
