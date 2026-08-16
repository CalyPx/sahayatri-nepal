import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = {
  title: "Donate — Sahayatri Nepal",
  description: "Support education, housing and life skills for deaf children in Karnali Province, Nepal.",
};

export const dynamic = "force-dynamic";

export default async function DonatePage({
  searchParams,
}: {
  searchParams: Promise<{ amount?: string }>;
}) {
  const { amount } = await searchParams;

  return (
    <>
      <Nav />
      <main id="main-content">
        <section
          style={{
            background: "#091426",
            minHeight: "100vh",
            padding: "clamp(140px,16vw,200px) 0 clamp(80px,10vw,140px)",
          }}
        >
          <div className="section-inner" style={{ maxWidth: "480px" }}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D4AF37",
                marginBottom: "20px",
              }}
            >
              Support the Work
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px,4vw,44px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#FAFAF7",
                marginBottom: "16px",
              }}
            >
              Give a child a future they can hear.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.62)",
                marginBottom: "40px",
              }}
            >
              Donations are processed securely via eSewa. Every rupee goes directly to
              students in Jumla, Karnali Province.
            </p>
            <DonateForm initialAmount={amount ?? "2000"} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
