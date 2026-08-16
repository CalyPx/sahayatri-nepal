import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DonateFailurePage() {
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
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px,3.6vw,40px)",
                color: "#FAFAF7",
                marginBottom: "16px",
              }}
            >
              Donation not completed.
            </h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", marginBottom: "32px" }}>
              Something interrupted the payment, or it was cancelled. No charge was made — please try again, or email us if you keep running into trouble.
            </p>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              <Link href="/donate" style={{ color: "#D4AF37", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px" }}>
                Try again
              </Link>
              <Link href="/contact" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "14px" }}>
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
