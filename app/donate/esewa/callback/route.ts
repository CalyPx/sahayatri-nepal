import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { decodeEsewaCallback, verifyEsewaSignature, checkEsewaStatus } from "@/lib/esewa";

export async function GET(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const url = new URL(request.url);
  const data = url.searchParams.get("data");

  if (!data) {
    return NextResponse.redirect(`${siteUrl}/donate/failure`);
  }

  try {
    const payload = decodeEsewaCallback(data);

    if (!verifyEsewaSignature(payload)) {
      return NextResponse.redirect(`${siteUrl}/donate/failure`);
    }

    const donation = await prisma.donation.findUnique({
      where: { gatewayRef: payload.transaction_uuid },
    });
    if (!donation) {
      return NextResponse.redirect(`${siteUrl}/donate/failure`);
    }

    // Always confirm against eSewa's status API rather than trusting the redirect payload alone.
    const status = await checkEsewaStatus({
      totalAmount: donation.amount,
      transactionUuid: donation.gatewayRef,
    });

    const success = status.status === "COMPLETE";

    await prisma.donation.update({
      where: { id: donation.id },
      data: { status: success ? "success" : "failed" },
    });

    return NextResponse.redirect(
      `${siteUrl}/donate/${success ? "success" : "failure"}?ref=${donation.gatewayRef}`,
    );
  } catch {
    return NextResponse.redirect(`${siteUrl}/donate/failure`);
  }
}
