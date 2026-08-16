import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, subject, message } = parsed.data;

  await prisma.contactSubmission.create({ data: { name, email, subject, message } });

  await sendMail({
    subject: `[Contact form] ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    replyTo: email,
  });

  return NextResponse.json({ ok: true });
}
