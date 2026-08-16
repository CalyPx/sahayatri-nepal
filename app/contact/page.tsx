import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Sahayatri Nepal",
  description: "Get in touch with Sahayatri Nepal.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader
          eyebrow="Get In Touch"
          title="Contact us."
          description="Questions about donating, sponsoring a student, or visiting the school in Jumla — we'd love to hear from you."
        />
        <section style={{ background: "#FAFAF7", padding: "clamp(56px,7vw,96px) 0" }}>
          <div className="section-inner two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,80px)" }}>
            <ContactForm />
            <div>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "14px", color: "#091426", marginBottom: "10px" }}>
                Sahayatri Nepal
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.8, color: "rgba(9,20,38,0.65)", marginBottom: "20px" }}>
                Chandanath-02, Jumla
                <br />
                Karnali Province, Nepal
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.8, color: "rgba(9,20,38,0.65)" }}>
                <a href="mailto:hhnjumla25@gmail.com" style={{ color: "var(--gold-dark)" }}>
                  hhnjumla25@gmail.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
