export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sendFormEmail, emailWrapper, row } from "@/lib/email";
import { incrementCount } from "@/lib/digest";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }

    const html = emailWrapper(
      "New Contact Form Submission",
      row("Name", `${firstName} ${lastName}`) +
        row("Email", email) +
        row("Message", message.replace(/\n/g, "<br/>"))
    );

    await sendFormEmail({
      subject: `New Contact: ${firstName} ${lastName}`,
      replyTo: email,
      html,
    });
    incrementCount("contactMessages").catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
