export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getAndResetCounts } from "@/lib/digest";
import { sendFormEmail, FOUNDATION_EMAIL } from "@/lib/email";
import nodemailer from "nodemailer";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization");
  if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const counts = await getAndResetCounts();
  const total = counts.campRegistrations + counts.volunteerApplications + counts.contactMessages;
  const since = new Date(counts.lastReset).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const now = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .card { background: #fff; border-radius: 10px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: #0a1628; padding: 28px 32px; border-bottom: 3px solid #00B4A6; }
    .header h1 { color: #00B4A6; margin: 0; font-size: 20px; letter-spacing: 1px; }
    .header p { color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 13px; }
    .body { padding: 32px; }
    .period { font-size: 13px; color: #888; margin-bottom: 24px; }
    .stats { display: flex; gap: 16px; margin-bottom: 28px; flex-wrap: wrap; }
    .stat { background: #f8f8f8; border-radius: 10px; padding: 20px 24px; flex: 1; min-width: 140px; text-align: center; border-top: 3px solid #00B4A6; }
    .stat .num { font-size: 36px; font-weight: 900; color: #0a1628; line-height: 1; }
    .stat .label { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
    .total { background: #0a1628; color: #00B4A6; border-radius: 10px; padding: 16px 24px; text-align: center; font-size: 18px; font-weight: 900; margin-bottom: 28px; }
    .note { font-size: 13px; color: #666; line-height: 1.7; border-top: 1px solid #eee; padding-top: 20px; }
    .footer { background: #0D0D0D; padding: 16px 32px; text-align: center; }
    .footer p { color: rgba(255,255,255,0.4); font-size: 11px; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>TFIHF — 3-Day Activity Digest</h1>
      <p>Automated report from tfihf.com</p>
    </div>
    <div class="body">
      <p class="period">Period: ${since} → ${now}</p>

      <div class="total">${total} Total Submission${total !== 1 ? "s" : ""} This Period</div>

      <div class="stats">
        <div class="stat">
          <div class="num">${counts.campRegistrations}</div>
          <div class="label">Camp Registrations</div>
        </div>
        <div class="stat">
          <div class="num">${counts.volunteerApplications}</div>
          <div class="label">Volunteer Applications</div>
        </div>
        <div class="stat">
          <div class="num">${counts.contactMessages}</div>
          <div class="label">Contact Messages</div>
        </div>
      </div>

      <p class="note">
        Every individual submission was also sent to your inbox in real time with full details.
        This digest is your 3-day overview so you always know where engagement stands.
        <br /><br />
        — Powered by tfihf.com · Built by Apex Digital
      </p>
    </div>
    <div class="footer"><p>You're receiving this because you're the admin of TFIHF's website.</p></div>
  </div>
</body>
</html>`;

  const transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false,
    auth: { user: process.env.TITAN_EMAIL, pass: process.env.TITAN_PASSWORD },
  });

  await transporter.sendMail({
    from: `"TFIHF Website" <${process.env.TITAN_EMAIL}>`,
    to: FOUNDATION_EMAIL,
    subject: `TFIHF 3-Day Digest — ${total} submission${total !== 1 ? "s" : ""} (${now})`,
    html,
  });

  return NextResponse.json({ success: true, total, counts });
}
