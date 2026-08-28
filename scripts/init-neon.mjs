import { neon } from "@neondatabase/serverless";

const DATABASE_URL = "postgresql://neondb_owner:npg_Sr9XpW5sKcPU@ep-late-shadow-awcbgs14-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

async function main() {
  console.log("Connecting to Neon PostgreSQL Database...");
  const sql = neon(DATABASE_URL);

  console.log("Creating tables: users, applications, opportunities...");
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

  console.log("Tables verified and initialized successfully on Neon PostgreSQL!");

  // Insert default seed opportunities if empty
  const oppCount = await sql`SELECT count(*) FROM opportunities;`;
  console.log("Current opportunities count in Neon DB:", oppCount[0].count);

  if (parseInt(oppCount[0].count, 10) === 0) {
    console.log("Seeding techFEST'26 SLIET and SIH 2026 into Neon PostgreSQL...");
    await sql`
      INSERT INTO opportunities (
        id, title, event_name, type, description, roles_needed, deadline, team_size, status, external_link, date_posted
      ) VALUES (
        'opp-techfest',
        'techFEST''26 SLIET — National Level Annual Technical Fest',
        'techFEST''26 (SLIET Longowal)',
        'competition',
        'Recruiting and forming teams to build, compete, and showcase engineering & AI projects at techFEST''26—SLIET''s premier national annual technical festival. Open for hardware/robotics builders, web developers, and technical presenters!',
        ARRAY['Embedded & Robotics Builder', 'Full-Stack Web Dev (Next.js/React)', 'Project Presenter & Pitcher'],
        'Active / Registrations Open',
        '4-6 Members (Slots Open)',
        'open',
        'https://www.techfest26.com/',
        'Active'
      ), (
        'opp-sih',
        'Smart India Hackathon (SIH 2026) — Hardware & AI Edition',
        'Smart India Hackathon 2026',
        'hackathon',
        'Team formation successfully completed for SIH 2026 Hardware & AI edition. Multidisciplinary SLIET team working on smart industrial automation and safety monitoring systems.',
        ARRAY['Team Slots Full (Team Formed)'],
        'Applications Closed',
        '6 Members (Full)',
        'closed',
        'https://sih.gov.in',
        'Closed'
      );
    `;
    console.log("Seeding completed successfully!");
  }
}

main().catch((err) => {
  console.error("Neon DB connection error:", err);
  process.exit(1);
});
