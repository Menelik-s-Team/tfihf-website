export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendFormEmail, emailWrapper, row } from "@/lib/email";
import { incrementCount } from "@/lib/digest";

const SECRET_KEYWORD = "village 23";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, nin, passport, dob, email, sex, address, phone,
      school, educationLevel, team, campExperience, bio,
      secretWord, agreeWaiver,
    } = body;

    if (!name || !nin || !dob || !email || !phone || !address || !school || !team || !campExperience || !bio) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    if ((secretWord || "").trim().toLowerCase() !== SECRET_KEYWORD) {
      return NextResponse.json({ error: "Incorrect secret word. This event is by invitation only." }, { status: 403 });
    }

    if (!agreeWaiver) {
      return NextResponse.json({ error: "You must agree to the terms to register." }, { status: 400 });
    }

    const html = emailWrapper(
      "Formal Dinner Degema — New Registration",
      row("Event", "Formal Dinner Degema — Oct 23rd (Invitation Only)") +
        row("Full Name", name) +
        row("NIN", nin) +
        row("International Passport", passport || "—") +
        row("Date of Birth", dob) +
        row("Sex", sex || "—") +
        row("Email", email) +
        row("Phone", phone) +
        row("Address", address) +
        row("Name of School", school) +
        row("Educational Level", educationLevel || "—") +
        row("Team", team) +
        row("Previous Camp Experience", campExperience.replace(/\n/g, "<br/>")) +
        row("About Themselves", bio.replace(/\n/g, "<br/>")) +
        row("Secret Word Verified", "Yes — Village 23")
    );

    await sendFormEmail({
      subject: `Formal Dinner Registration: ${name}`,
      replyTo: email,
      html,
    });
    incrementCount("campRegistrations").catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Dinner registration error:", err);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
