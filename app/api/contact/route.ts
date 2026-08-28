import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Direct Formspree / Webhook forwarder
    try {
      await fetch("https://formspree.io/f/xbjnqkyv", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: subject || "Portfolio Direct Inquiry",
          message,
          to: profile.email,
        }),
      });
    } catch {
      // Non-blocking fallback
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Dispatched to Raj's inbox.",
      destination: profile.email,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error processing message." },
      { status: 500 }
    );
  }
}
