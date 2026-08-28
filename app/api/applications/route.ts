import { NextResponse } from "next/server";
import { INITIAL_APPLICATIONS } from "@/lib/collaborationStore";

// In-memory runtime cache for serverless lifecycle
let memoryApplications = [...INITIAL_APPLICATIONS];

export async function GET() {
  return NextResponse.json({
    success: true,
    applications: memoryApplications,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.applicantName || !body.applicantEmail || !body.opportunityTitle) {
      return NextResponse.json(
        { success: false, error: "Missing required application fields." },
        { status: 400 }
      );
    }

    const newApplication = {
      id: `app-${Date.now()}`,
      opportunityId: body.opportunityId || "opp-techfest",
      opportunityTitle: body.opportunityTitle,
      applicantName: body.applicantName,
      applicantEmail: body.applicantEmail,
      applicantGithub: body.applicantGithub || "",
      applicantLinkedin: body.applicantLinkedin || "",
      applicantCollege: body.applicantCollege || "Student / Developer",
      applicantSkills: Array.isArray(body.applicantSkills) ? body.applicantSkills : ["Developer"],
      roleApplied: body.roleApplied || "Team Member",
      message: body.message || "Interested in collaborating.",
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    memoryApplications = [newApplication, ...memoryApplications];

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      application: newApplication,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process application." },
      { status: 500 }
    );
  }
}
