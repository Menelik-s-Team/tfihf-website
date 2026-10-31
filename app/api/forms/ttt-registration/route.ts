export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendFormEmail, emailWrapper, row } from "@/lib/email";
import { incrementCount } from "@/lib/digest";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, team, skillSet, bio, aspirations, agreeWaiver } = body;

    if (!name || !phone || !email || !team || !skillSet || !bio || !aspirations) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (!agreeWaiver) {
      return NextResponse.json({ error: "You must agree to the terms to register." }, { status: 400 });
    }

    const html = emailWrapper(
      "Train the Trainer — New Registration",
      row("Program", "Train the Trainer Program — Oct 16–18") +
        row("Full Name", name) +
        row("Phone", phone) +
        row("Email", email) +
        row("Team / Organization", team) +
        row("Players Coached (Skill Set)", skillSet) +
        row("Short Bio", bio.replace(/\n/g, "<br/>")) +
        row("Basketball Aspirations", aspirations.replace(/\n/g, "<br/>"))
    );

    await sendFormEmail({
      subject: `TTT Registration: ${name}`,
      replyTo: email,
      html,
    });
    incrementCount("campRegistrations").catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("TTT registration error:", err);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
