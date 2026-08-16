import nodemailer from "nodemailer";

function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendMail(opts: { subject: string; text: string; replyTo?: string }) {
  const to = process.env.CONTACT_TO_EMAIL;
  const transport = getTransport();

  if (!transport || !to) {
    // No SMTP credentials configured yet — log instead of failing the request.
    console.log("[mailer] SMTP not configured, skipping send:", opts.subject);
    return { sent: false };
  }

  await transport.sendMail({
    from: process.env.SMTP_USER,
    to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
  return { sent: true };
}
