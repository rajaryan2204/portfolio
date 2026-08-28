import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { saveContactMessage, fetchContactMessages } from "@/lib/db";

export async function GET() {
  try {
    const messages = await fetchContactMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Save directly to Neon PostgreSQL Cloud Database
    const savedMsg = await saveContactMessage({
      name,
      email,
      subject: subject || "Portfolio Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message received and stored in database.",
      destination: profile.email,
      data: savedMsg,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error processing message." },
      { status: 500 }
    );
  }
}
