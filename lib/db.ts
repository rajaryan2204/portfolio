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
