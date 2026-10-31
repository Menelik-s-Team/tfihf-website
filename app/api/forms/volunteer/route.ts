export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendFormEmail, emailWrapper, row } from "@/lib/email";
import { incrementCount } from "@/lib/digest";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, sex, age, phone, email, talent, areaOfInterest, howToServe } = body;

    if (!firstName || !lastName || !email || !phone || !howToServe) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const html = emailWrapper(
      "New Volunteer Application",
      row("Name", `${firstName} ${lastName}`) +
        row("Sex", sex || "Not specified") +
        row("Age", age || "Not specified") +
        row("Phone", phone) +
        row("Email", email) +
        row("Talent / Skills", talent || "—") +
        row("Area of Interest", areaOfInterest || "—") +
        row("How They Can Serve", howToServe)
    );

    await sendFormEmail({
      subject: `New Volunteer: ${firstName} ${lastName}`,
      replyTo: email,
      html,
    });
    incrementCount("volunteerApplications").catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Volunteer form error:", err);
    return NextResponse.json({ error: "Failed to submit application. Please try again." }, { status: 500 });
  }
}
