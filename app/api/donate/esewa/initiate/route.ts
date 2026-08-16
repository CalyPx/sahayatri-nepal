import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { buildEsewaFormFields, ESEWA_FORM_URL } from "@/lib/esewa";

const schema = z.object({
  amount: z.number().int().positive().max(10_000_000),
  donorName: z.string().trim().min(1).max(200),
  donorEmail: z.string().trim().email().max(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid donation details." }, { status: 400 });
  }

  const { amount, donorName, donorEmail } = parsed.data;
  const transactionUuid = randomUUID();

  await prisma.donation.create({
    data: {
      amount,
      donorName,
      donorEmail,
      gatewayRef: transactionUuid,
      status: "pending",
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const fields = buildEsewaFormFields({
    amount,
    transactionUuid,
    successUrl: `${siteUrl}/donate/esewa/callback`,
    failureUrl: `${siteUrl}/donate/esewa/callback`,
  });

  return NextResponse.json({ formUrl: ESEWA_FORM_URL, fields });
}
