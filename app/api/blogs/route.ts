import { NextResponse } from "next/server";
import { fetchBlogs, saveBlog, deleteBlog, BlogPost } from "@/lib/db";

const RAJ_EMAIL = "raj.aryan9242@gmail.com";
const ADMIN_PASSCODE = "Akshat2945*";

export async function GET() {
  try {
    const blogs = await fetchBlogs();
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, excerpt, content, tags, readTime, authorEmail, adminPasscode } = body;

    // Security Gate: Only raj.aryan9242@gmail.com or valid admin passcode
    const isAuthorized =
      (authorEmail && authorEmail.toLowerCase() === RAJ_EMAIL.toLowerCase()) ||
      (adminPasscode && (adminPasscode === ADMIN_PASSCODE || adminPasscode === "akshat2945*"));

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Only Raj Aryan (raj.aryan9242@gmail.com) can publish blog posts." },
        { status: 403 }
      );
    }

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required." },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newBlog: BlogPost = {
      id: body.id || `blog-${Date.now()}`,
      slug: slug || `post-${Date.now()}`,
      title,
      excerpt: excerpt || content.slice(0, 160) + "...",
      content,
      tags: Array.isArray(tags) ? tags : ["Engineering", "Tech"],
      readTime: readTime || `${Math.max(1, Math.ceil(content.split(" ").length / 200))} min read`,
      author: "Raj Aryan",
      publishedAt: body.publishedAt || new Date().toISOString(),
    };

    const saved = await saveBlog(newBlog);
    return NextResponse.json({ success: true, blog: saved });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error saving blog post." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const authorEmail = searchParams.get("authorEmail");
    const adminPasscode = searchParams.get("adminPasscode");

    // Security Gate
    const isAuthorized =
      (authorEmail && authorEmail.toLowerCase() === RAJ_EMAIL.toLowerCase()) ||
      (adminPasscode && (adminPasscode === ADMIN_PASSCODE || adminPasscode === "akshat2945*"));

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized to delete." },
        { status: 403 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Blog ID is required" },
        { status: 400 }
      );
    }

    await deleteBlog(id);
    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
