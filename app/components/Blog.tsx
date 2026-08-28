"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Tag,
  Plus,
  Trash2,
  Edit3,
  X,
  Sparkles,
  ArrowUpRight,
  Shield,
  CheckCircle2,
  Loader2,
  ChevronRight,
  Coffee,
  Heart,
  Smile,
  Zap
} from "lucide-react";
import { useSession } from "next-auth/react";
import { getStoredUser } from "@/lib/collaborationStore";
import { BlogPost, INITIAL_BLOGS } from "@/lib/db";
import { FadeIn, StaggerContainer, StaggerItem, SmoothCard } from "./MotionWrapper";

const RAJ_EMAIL = "raj.aryan9242@gmail.com";

const MOODS = [
  { label: "⚡ Productive", tag: "Productive" },
  { label: "☕ Chill", tag: "Chill" },
  { label: "🎯 Focused", tag: "Focused" },
  { label: "💡 Inspired", tag: "Inspired" },
  { label: "🌙 Late Night", tag: "Late Night Thoughts" },
];

export default function Blog() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [activeTag, setActiveTag] = useState<string>("All");

  // Author Mode State (Raj Aryan Exclusive)
  const [isAuthor, setIsAuthor] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [savingBlog, setSavingBlog] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Editor Form State
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "Daily Log, SLIET Life",
    readTime: "2 min read",
  });

  // Verify Author Status: Signed-in via Google as raj.aryan9242@gmail.com or local stored user
  useEffect(() => {
    const user = getStoredUser();
    const currentEmail = session?.user?.email || user?.email || "";
    
    if (currentEmail.toLowerCase() === RAJ_EMAIL.toLowerCase()) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [session]);

  // Fetch blogs from API / Neon DB
  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data?.blogs && data.blogs.length > 0) {
        setBlogs(data.blogs);
      }
    } catch (e) {
      console.error("Failed to load journal logs:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // Compute all unique tags
  const allTags = ["All", ...Array.from(new Set(blogs.flatMap((b) => b.tags || [])))];

  // Filtered blogs
  const filteredBlogs =
    activeTag === "All"
      ? blogs
      : blogs.filter((b) => b.tags?.includes(activeTag));

  // Open Editor for new entry
  const handleOpenNewPost = () => {
    setEditingBlogId(null);
    const todayFormatted = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    setBlogForm({
      title: `Daily Entry — ${todayFormatted}`,
      excerpt: "",
      content: "",
      tags: "Daily Log, SLIET Life",
      readTime: "2 min read",
    });
    setEditorOpen(true);
  };

  // Open Editor to edit existing post
  const handleEditPost = (blog: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingBlogId(blog.id);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags.join(", "),
      readTime: blog.readTime,
    });
    setEditorOpen(true);
  };

  // Delete post
  const handleDeletePost = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this journal entry?")) return;

    try {
      const user = getStoredUser();
      const email = session?.user?.email || user?.email || RAJ_EMAIL;
      const res = await fetch(`/api/blogs?id=${id}&authorEmail=${encodeURIComponent(email)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        if (selectedBlog?.id === id) {
          setSelectedBlog(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete journal entry:", err);
    }
  };

  // Handle Blog Submit (Save / Publish)
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBlog(true);

    try {
      const user = getStoredUser();
      const email = session?.user?.email || user?.email || RAJ_EMAIL;

      const tagsArray = blogForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const wordCount = blogForm.content.split(/\s+/).filter(Boolean).length;
      const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

      const payload = {
        id: editingBlogId || undefined,
        title: blogForm.title,
        excerpt: blogForm.excerpt || blogForm.content.slice(0, 150) + "...",
        content: blogForm.content,
        tags: tagsArray.length > 0 ? tagsArray : ["Daily Log"],
        readTime: blogForm.readTime || estimatedReadTime,
        authorEmail: email,
      };

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data?.success && data?.blog) {
        setPublishSuccess(true);
        loadBlogs();
        setTimeout(() => {
          setPublishSuccess(false);
          setEditorOpen(false);
        }, 1000);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingBlog(false);
    }
  };

  return (
    <section
      id="journal"
      className="py-16 md:py-24 border-t border-border max-w-4xl mx-auto px-5 sm:px-6"
    >
      <div className="space-y-10">
        
        {/* Section Header */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <span className="text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-accent block">
                07 / DAILY JOURNAL & LIFE LOGS
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Daily Life & Reflections
              </h2>
              <p className="text-xs font-mono text-foreground-subtle pt-1">
                A personal space where I document everyday college life at SLIET, lab sessions, hostel moments, and daily thoughts.
              </p>
            </div>

            {/* Author Exclusive Action / Badge */}
            <div className="flex items-center gap-3">
              {isAuthor ? (
                <button
                  type="button"
                  onClick={handleOpenNewPost}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-foreground text-background text-xs font-mono font-medium hover:bg-[#292524] transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-accent" />
                  <span>Write Today&apos;s Entry ✍️</span>
                </button>
              ) : (
                <span className="text-xs font-mono text-foreground-subtle">
                  Raj Aryan&apos;s Personal Journal
                </span>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Tag Filters */}
        {allTags.length > 1 && (
          <FadeIn delay={0.1} className="flex flex-wrap items-center gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={`text-xs font-mono px-3 py-1 rounded transition-colors ${
                  activeTag === tag
                    ? "bg-foreground text-background font-medium"
                    : "bg-surface border border-border text-foreground-muted hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </FadeIn>
        )}

        {/* Journal Entries List */}
        <StaggerContainer className="space-y-4">
          {filteredBlogs.map((blog) => (
            <StaggerItem key={blog.id}>
              <SmoothCard
                onClick={() => setSelectedBlog(blog)}
                className="p-5 sm:p-6 rounded border border-border bg-surface hover:bg-[#fbf8f2] hover:border-neutral-400 transition-all duration-200 cursor-pointer shadow-sm group relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-foreground-subtle">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    <span className="text-foreground font-medium">
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span>·</span>
                    <span className="text-foreground-subtle">{blog.readTime}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags?.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-border/70 text-foreground-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-foreground tracking-tight group-hover:text-accent transition-colors mb-2">
                  {blog.title}
                </h3>

                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed line-clamp-2 mb-3 font-sans">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs font-mono">
                  <span className="text-accent inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Full Entry</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  {/* Raj Exclusive Edit & Delete buttons */}
                  {isAuthor && (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleEditPost(blog, e)}
                        className="p-1 text-foreground-subtle hover:text-foreground transition-colors"
                        title="Edit Entry"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeletePost(blog.id, e)}
                        className="p-1 text-foreground-subtle hover:text-red-600 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </SmoothCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* ==================== FULL JOURNAL READER MODAL ==================== */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-[#ede8dc] border border-border rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto overscroll-contain">
            
            {/* Close */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-1.5 transition-colors touch-manipulation"
              aria-label="Close entry"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Meta */}
            <div className="space-y-2 border-b border-border/80 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-foreground-subtle">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span className="text-foreground font-medium">
                  {new Date(selectedBlog.publishedAt).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span>·</span>
                <span>By Raj Aryan</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground leading-tight">
                {selectedBlog.title}
              </h2>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedBlog.tags?.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-foreground-muted"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Formatted Content */}
            <div className="space-y-4 text-sm sm:text-base text-foreground/90 leading-relaxed font-sans prose prose-neutral max-w-none">
              {selectedBlog.content.split("\n\n").map((chunk, idx) => {
                if (chunk.startsWith("### ")) {
                  return (
                    <h4 key={idx} className="text-base sm:text-lg font-medium text-foreground pt-2 font-mono">
                      {chunk.replace("### ", "")}
                    </h4>
                  );
                }
                if (chunk.startsWith("1. ") || chunk.startsWith("- ")) {
                  const lines = chunk.split("\n");
                  return (
                    <ul key={idx} className="space-y-1.5 pl-4 list-disc text-foreground-muted font-sans">
                      {lines.map((line, lIdx) => (
                        <li key={lIdx}>{line.replace(/^(\d+\.\s*|-\s*)/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={idx} className="text-foreground-muted leading-relaxed font-sans">{chunk}</p>;
              })}
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-subtle">
              <span>Raj Aryan&apos;s Daily Log</span>
              <button
                type="button"
                onClick={() => setSelectedBlog(null)}
                className="hover:text-foreground underline transition-colors"
              >
                Back to Journal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==================== RAJ ARYAN EXCLUSIVE JOURNAL WRITING MODAL ==================== */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-[#ede8dc] border border-border rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto overscroll-contain">
            
            {/* Close */}
            <button
              onClick={() => setEditorOpen(false)}
              className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-1.5 transition-colors"
              aria-label="Close editor"
            >
              <X className="w-5 h-5" />
            </button>

            {publishSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto animate-bounce" />
                <h3 className="text-xl font-medium text-foreground">
                  Today&apos;s Entry Saved!
                </h3>
                <p className="text-xs text-foreground-muted">
                  Your daily thoughts have been securely saved to your journal database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent font-semibold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    EXCLUSIVE JOURNAL — RAJ ARYAN
                  </span>
                  <h3 className="text-xl font-medium tracking-tight text-foreground">
                    {editingBlogId ? "Edit Daily Entry" : "Write Today's Life Log ✍️"}
                  </h3>
                  <p className="text-xs text-foreground-muted">
                    Write about your day, college classes, SLIET hostel moments, project progress, or personal thoughts.
                  </p>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-mono text-foreground-subtle mb-1">
                    Entry Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. A Day in SLIET: Productive Labs & Late Night Coding"
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 font-medium"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-mono text-foreground-subtle mb-1">
                    Quick 1-Line Summary (Optional)
                  </label>
                  <input
                    type="text"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    placeholder="How was today in a few words..."
                    className="w-full px-3.5 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono text-foreground-subtle mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    placeholder="Daily Log, SLIET Life, Hostel, Coding, Thoughts"
                    className="w-full px-3 py-2 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground"
                  />
                </div>

                {/* Journal Content */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono text-foreground-subtle">
                      Journal Entry (Write freely how today went) *
                    </label>
                    <span className="text-[10px] font-mono text-foreground-subtle">
                      {blogForm.content.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    required
                    rows={8}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="Aaj ka din kaisa tha? Classes, labs, projects, friends, late-night thoughts..."
                    className="w-full px-3.5 py-2.5 text-base sm:text-sm rounded bg-[#fbf8f2] border border-border text-foreground focus:border-neutral-700 font-sans leading-relaxed resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditorOpen(false)}
                    className="px-4 py-2 text-xs font-mono text-foreground-muted hover:text-foreground"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={savingBlog}
                    className="px-5 py-2.5 text-xs font-mono font-medium rounded bg-foreground text-background hover:bg-[#292524] transition-colors shadow-sm flex items-center gap-2"
                  >
                    {savingBlog ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{editingBlogId ? "Update Entry ↗" : "Save to My Journal ↗"}</span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
