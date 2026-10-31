export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendFormEmail, emailWrapper, row } from "@/lib/email";
import { incrementCount } from "@/lib/digest";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      playerFirstName, playerLastName, dob, gender, position, height, weight,
      parentFirstName, parentLastName, parentEmail, parentPhone,
      emergencyName, emergencyPhone, emergencyRelation,
      camp, shirtSize, medicalNotes, agreeWaiver, secretWord,
    } = body;

    if (!playerFirstName || !playerLastName || !parentEmail || !parentPhone || !camp) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    if (!agreeWaiver) {
      return NextResponse.json({ error: "You must agree to the waiver to register." }, { status: 400 });
    }

    const DINNER_CAMP = "Bring Back the Village — Formal Dinner Degema (23rd)";
    if (camp === DINNER_CAMP && (secretWord || "").trim().toLowerCase() !== "village 23") {
      return NextResponse.json({ error: "Incorrect secret word. This event is by invitation only." }, { status: 403 });
    }

    const html = emailWrapper(
      "New Camp Registration",
      row("Camp / Program", camp) +
        row("Player Name", `${playerFirstName} ${playerLastName}`) +
        row("Date of Birth", dob || "—") +
        row("Gender", gender || "—") +
        row("Position", position || "—") +
        row("Height / Weight", `${height || "—"} / ${weight || "—"}`) +
        row("Parent / Guardian", `${parentFirstName} ${parentLastName}`) +
        row("Parent Email", parentEmail) +
        row("Parent Phone", parentPhone) +
        row("Emergency Contact", `${emergencyName} (${emergencyRelation}) — ${emergencyPhone}`) +
        row("Shirt Size", shirtSize || "—") +
        row("Medical Notes", medicalNotes || "None") +
        row("Waiver Agreed", "Yes") +
        (camp === DINNER_CAMP ? row("Secret Word Provided", secretWord || "—") : "")
    );

    await sendFormEmail({
      subject: `Camp Registration: ${playerFirstName} ${playerLastName} — ${camp}`,
      replyTo: parentEmail,
      html,
    });
    incrementCount("campRegistrations").catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Camp registration error:", err);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
