import { NextResponse } from "next/server";
import { fetchApplications, insertApplication, updateApplicationStatus, fetchUserApplications } from "@/lib/db";
import { Application } from "@/lib/collaborationStore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      const userApps = await fetchUserApplications(email);
      return NextResponse.json({ success: true, applications: userApps });
    }

    const allApps = await fetchApplications();
    return NextResponse.json({ success: true, applications: allApps });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.applicantName || !body.applicantEmail || !body.opportunityTitle) {
      return NextResponse.json(
        { success: false, error: "Name, email, and opportunity title are required." },
        { status: 400 }
      );
    }

    const newApplication: Application = {
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
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
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const saved = await insertApplication(newApplication);

    return NextResponse.json({
      success: true,
      message: "Application submitted and stored in Neon DB successfully.",
      application: saved,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process application." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Application ID and new status are required." },
        { status: 400 }
      );
    }

    await updateApplicationStatus(id, status);

    return NextResponse.json({
      success: true,
      message: `Application ${id} status updated to ${status}.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update application status." },
      { status: 500 }
    );
  }
}
