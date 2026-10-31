import nodemailer from "nodemailer";

export const FOUNDATION_EMAIL = "tfihf2003@gmail.com";

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.TITAN_EMAIL,
      pass: process.env.TITAN_PASSWORD,
    },
  });
}

export async function sendFormEmail({
  subject,
  replyTo,
  html,
}: {
  subject: string;
  replyTo?: string;
  html: string;
}) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"TFIHF Website" <${process.env.TITAN_EMAIL}>`,
    to: FOUNDATION_EMAIL,
    subject,
    replyTo: replyTo ?? undefined,
    html,
  });
}

export function emailWrapper(title: string, rows: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
    .card { background: #fff; border-radius: 10px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: #C8102E; padding: 28px 32px; }
    .header h1 { color: #FDB927; margin: 0; font-size: 20px; letter-spacing: 1px; }
    .header p { color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px; }
    .body { padding: 32px; }
    .row { margin-bottom: 18px; border-bottom: 1px solid #f0f0f0; padding-bottom: 18px; }
    .row:last-child { border-bottom: none; margin-bottom: 0; }
    .label { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #C8102E; margin-bottom: 4px; }
    .value { font-size: 15px; color: #222; line-height: 1.6; }
    .footer { background: #0D0D0D; padding: 16px 32px; text-align: center; }
    .footer p { color: rgba(255,255,255,0.4); font-size: 11px; margin: 0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>TFIHF — ${title}</h1>
      <p>Received ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</p>
    </div>
    <div class="body">${rows}</div>
    <div class="footer"><p>Sent from tfihf.com · Website by Apex Digital</p></div>
  </div>
</body>
</html>`;
}

export function row(label: string, value: string) {
  return `<div class="row"><div class="label">${label}</div><div class="value">${value || "—"}</div></div>`;
}
