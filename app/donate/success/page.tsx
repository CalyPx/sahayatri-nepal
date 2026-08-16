import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const donation = ref ? await prisma.donation.findUnique({ where: { gatewayRef: ref } }) : null;

  return (
    <>
      <Nav />
      <main id="main-content">
        <section
          style={{
            background: "#091426",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            padding: "140px 0 80px",
          }}
        >
          <div className="section-inner" style={{ maxWidth: "480px", textAlign: "center", margin: "0 auto" }}>
            <p style={{ fontSize: "48px", marginBottom: "24px" }}>✓</p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px,3.6vw,40px)",
                color: "#FAFAF7",
                marginBottom: "16px",
              }}
            >
              Thank you.
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "32px" }}>
              {donation
                ? `Your donation of NPR ${donation.amount.toLocaleString()} was received. A confirmation has been recorded against reference ${donation.gatewayRef}.`
                : "Your donation was received."}
            </p>
            <Link href="/" style={{ color: "#D4AF37", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px" }}>
              ← Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
