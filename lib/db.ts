import { neon } from "@neondatabase/serverless";
import { Application, Opportunity, MemberUser, INITIAL_OPPORTUNITIES, INITIAL_APPLICATIONS } from "./collaborationStore";

const DATABASE_URL = process.env.DATABASE_URL;

// Helper to get Neon SQL client if configured
export function getDb() {
  if (!DATABASE_URL) return null;
  return neon(DATABASE_URL);
}

// Auto-initialize Neon PostgreSQL tables
export async function initDb() {
  const sql = getDb();
  if (!sql) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        github TEXT,
        linkedin TEXT,
        college TEXT,
        skills TEXT[],
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        opportunity_id TEXT NOT NULL,
        opportunity_title TEXT NOT NULL,
        applicant_name TEXT NOT NULL,
        applicant_email TEXT NOT NULL,
        applicant_github TEXT,
        applicant_linkedin TEXT,
        applicant_college TEXT,
        applicant_skills TEXT[],
        role_applied TEXT NOT NULL,
        message TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS opportunities (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        event_name TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        roles_needed TEXT[],
        deadline TEXT,
        team_size TEXT,
        status TEXT DEFAULT 'open',
        external_link TEXT,
        date_posted TEXT
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT[],
        read_time TEXT DEFAULT '4 min read',
        author TEXT DEFAULT 'Raj Aryan',
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (err) {
    console.error("Neon DB Init Notice:", err);
  }
}

// In-memory runtime store fallback when DATABASE_URL is not provided
let memApplications = [...INITIAL_APPLICATIONS];
let memOpportunities = [...INITIAL_OPPORTUNITIES];
let memUsers: MemberUser[] = [];

// ==================== APPLICATIONS ====================

export async function fetchApplications(): Promise<Application[]> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      const rows = await sql`
        SELECT 
          id,
          opportunity_id AS "opportunityId",
          opportunity_title AS "opportunityTitle",
          applicant_name AS "applicantName",
          applicant_email AS "applicantEmail",
          applicant_github AS "applicantGithub",
          applicant_linkedin AS "applicantLinkedin",
          applicant_college AS "applicantCollege",
          applicant_skills AS "applicantSkills",
          role_applied AS "roleApplied",
          message,
          status,
          created_at AS "createdAt"
        FROM applications
        ORDER BY created_at DESC;
      `;
      if (rows && rows.length > 0) {
        return rows as unknown as Application[];
      }
    } catch (e) {
      console.error("Neon fetch error, falling back:", e);
    }
  }
  return memApplications;
}

export async function insertApplication(app: Application): Promise<Application> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      await sql`
        INSERT INTO applications (
          id, opportunity_id, opportunity_title, applicant_name, applicant_email,
          applicant_github, applicant_linkedin, applicant_college, applicant_skills,
          role_applied, message, status, created_at
        ) VALUES (
          ${app.id}, ${app.opportunityId}, ${app.opportunityTitle}, ${app.applicantName},
          ${app.applicantEmail}, ${app.applicantGithub}, ${app.applicantLinkedin},
          ${app.applicantCollege}, ${app.applicantSkills}, ${app.roleApplied},
          ${app.message}, ${app.status}, ${app.createdAt}
        );
      `;
      return app;
    } catch (e) {
      console.error("Neon insert application error:", e);
    }
  }
  memApplications = [app, ...memApplications.filter((a) => a.id !== app.id)];
  return app;
}

export async function updateApplicationStatus(id: string, status: "accepted" | "rejected" | "pending"): Promise<boolean> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      await sql`
        UPDATE applications
        SET status = ${status}
        WHERE id = ${id};
      `;
      return true;
    } catch (e) {
      console.error("Neon update application error:", e);
    }
  }
  memApplications = memApplications.map((a) => (a.id === id ? { ...a, status } : a));
  return true;
}

export async function fetchUserApplications(email: string): Promise<Application[]> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      const rows = await sql`
        SELECT 
          id,
          opportunity_id AS "opportunityId",
          opportunity_title AS "opportunityTitle",
          applicant_name AS "applicantName",
          applicant_email AS "applicantEmail",
          applicant_github AS "applicantGithub",
          applicant_linkedin AS "applicantLinkedin",
          applicant_college AS "applicantCollege",
          applicant_skills AS "applicantSkills",
          role_applied AS "roleApplied",
          message,
          status,
          created_at AS "createdAt"
        FROM applications
        WHERE applicant_email = ${email}
        ORDER BY created_at DESC;
      `;
      return rows as unknown as Application[];
    } catch (e) {
      console.error("Neon user applications fetch error:", e);
    }
  }
  return memApplications.filter((a) => a.applicantEmail.toLowerCase() === email.toLowerCase());
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export async function saveContactMessage(msg: { name: string; email: string; subject: string; message: string }) {
  const sql = getDb();
  const id = `msg-${Date.now()}`;
  if (sql) {
    try {
      await initDb();
      await sql`
        INSERT INTO contact_messages (id, name, email, subject, message)
        VALUES (${id}, ${msg.name}, ${msg.email}, ${msg.subject}, ${msg.message});
      `;
      return { id, ...msg, createdAt: new Date().toISOString() };
    } catch (e) {
      console.error("Neon contact save error:", e);
    }
  }
  return { id, ...msg, createdAt: new Date().toISOString() };
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      const rows = await sql`
        SELECT id, name, email, subject, message, created_at AS "createdAt"
        FROM contact_messages
        ORDER BY created_at DESC;
      `;
      return rows as unknown as ContactMessage[];
    } catch (e) {
      console.error("Neon contact fetch error:", e);
    }
  }
  return [];
}

// ==================== BLOG / ARTICLES ====================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  author: string;
  publishedAt: string;
}

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "a-day-at-sliet-labs-and-late-night-coding",
    title: "A Day in SLIET: Balancing ICE Labs, Classes & Late Night Coding",
    excerpt: "How today went—attending electrical science lectures, working in the instrumentation lab, and unwinding with late-night coding in the hostel room.",
    content: `Today was one of those days where time just flew by.

Woke up around 7:30 AM for morning lectures. The morning session was on electrical circuit laws and signal basics. It's fascinating how simple Kirchhoff's laws and op-amp configurations form the backbone of complex instrumentation systems.

### In the Lab
Spent a solid 2 hours in the lab testing circuit breadboards with multimeters and oscilloscopes. There's a different kind of satisfaction when the physical circuit behaves exactly the way the calculation predicted.

### Evening & Night
After classes and evening chai with friends, I sat down in my hostel room to work on my projects. Fixed a few state management bugs and brainstormed some hardware ideas for techFEST'26. 

Late nights here at SLIET have a peaceful vibe—everyone's either grinding on code, talking about projects, or listening to music. Ending the day feeling productive.`,
    tags: ["Daily Log", "SLIET Life", "Hostel"],
    readTime: "2 min read",
    author: "Raj Aryan",
    publishedAt: "2026-02-28T21:00:00.000Z",
  },
  {
    id: "blog-2",
    slug: "prepping-for-techfest-2026-and-team-ideas",
    title: "Prepping for techFEST'26 & Brainstorming Ideas",
    excerpt: "Campus is buzzing with energy as annual technical fest preparations kick off. Thinking through robotics and full-stack project ideas with classmates.",
    content: `You can feel the energy on campus shifting—posters for techFEST'26 are going up, and everyone in the department is talking about competitions and workshops.

Spent the afternoon discussing potential hackathon project ideas with a few classmates. We're thinking of building a hardware-software bridge that combines microcontroller sensor telemetry with a clean Next.js live dashboard.

It's exciting to see how much you learn when you're preparing for a real competition under a deadline. Tomorrow we're setting up the initial hardware components and testing the sensor readouts.`,
    tags: ["techFEST'26", "Campus Vibe", "Teaming Up"],
    readTime: "2 min read",
    author: "Raj Aryan",
    publishedAt: "2026-02-20T19:30:00.000Z",
  },
  {
    id: "blog-3",
    slug: "late-night-reflections-on-growth",
    title: "Late Night Reflections: How Building Daily Changes Everything",
    excerpt: "A quiet reflection on consistency, learning from mistakes, and how writing code and studying engineering shapes my daily mindset.",
    content: `Sometimes you need to take a step back and appreciate how far consistency takes you.

When I first started tinkering with code and microcontrollers, even small syntax errors or faulty wiring felt overwhelming. But showing up every day, writing a few lines of code, and understanding one new concept at a time changes your perspective.

Whether it's debugging a stubborn API route or understanding instrumentation physics, the key is just staying curious and patient. Grateful for the journey so far.`,
    tags: ["Reflections", "Mindset", "Late Night Thoughts"],
    readTime: "3 min read",
    author: "Raj Aryan",
    publishedAt: "2026-02-10T23:45:00.000Z",
  },
];

let memBlogs: BlogPost[] = [...INITIAL_BLOGS];

export async function fetchBlogs(): Promise<BlogPost[]> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      const rows = await sql`
        SELECT 
          id,
          slug,
          title,
          excerpt,
          content,
          tags,
          read_time AS "readTime",
          author,
          published_at AS "publishedAt"
        FROM blogs
        ORDER BY published_at DESC;
      `;
      if (rows && rows.length > 0) {
        return rows as unknown as BlogPost[];
      }
      
      // Auto-seed initial blogs into Neon
      for (const blog of INITIAL_BLOGS) {
        await sql`
          INSERT INTO blogs (id, slug, title, excerpt, content, tags, read_time, author, published_at)
          VALUES (${blog.id}, ${blog.slug}, ${blog.title}, ${blog.excerpt}, ${blog.content}, ${blog.tags}, ${blog.readTime}, ${blog.author}, ${blog.publishedAt})
          ON CONFLICT (id) DO NOTHING;
        `;
      }
      return INITIAL_BLOGS;
    } catch (e) {
      console.error("Neon fetch blogs error:", e);
    }
  }
  return memBlogs;
}

export async function saveBlog(blog: BlogPost): Promise<BlogPost> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      await sql`
        INSERT INTO blogs (id, slug, title, excerpt, content, tags, read_time, author, published_at)
        VALUES (${blog.id}, ${blog.slug}, ${blog.title}, ${blog.excerpt}, ${blog.content}, ${blog.tags}, ${blog.readTime}, ${blog.author}, ${blog.publishedAt})
        ON CONFLICT (id) DO UPDATE SET
          title = ${blog.title},
          excerpt = ${blog.excerpt},
          content = ${blog.content},
          tags = ${blog.tags},
          read_time = ${blog.readTime};
      `;
      return blog;
    } catch (e) {
      console.error("Neon save blog error:", e);
    }
  }
  memBlogs = [blog, ...memBlogs.filter((b) => b.id !== blog.id)];
  return blog;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const sql = getDb();
  if (sql) {
    try {
      await initDb();
      await sql`DELETE FROM blogs WHERE id = ${id};`;
      return true;
    } catch (e) {
      console.error("Neon delete blog error:", e);
    }
  }
  memBlogs = memBlogs.filter((b) => b.id !== id);
  return true;
}
