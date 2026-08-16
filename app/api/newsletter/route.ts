import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";

const schema = z.object({
  email: z.string().trim().email().max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const { email } = parsed.data;

  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (!existing) {
    await prisma.newsletterSubscriber.create({ data: { email } });
    await sendMail({
      subject: "New newsletter subscriber",
      text: `${email} just subscribed to updates from the website.`,
    });
  }

  return NextResponse.json({ ok: true });
}
