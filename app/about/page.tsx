import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import TeamGrid from "@/components/TeamGrid";

export const metadata: Metadata = {
  title: "About Us — Sahayatri Nepal",
  description: "The story behind Sahayatri Nepal and our work with deaf children in Karnali Province.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader
          eyebrow="About Us"
          title="Fellow travellers, since 2013."
          description="Sahayatri Nepal (सहयात्री नेपाल) means 'fellow traveller' — the only dedicated programme for deaf children in Karnali Province, one of Nepal's most remote and underserved regions."
        />

        <section style={{ background: "#FAFAF7", padding: "clamp(64px,8vw,110px) 0" }}>
          <div className="section-inner" style={{ maxWidth: "720px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.8, color: "rgba(9,20,38,0.7)", marginBottom: "24px" }}>
              Founded in 2013 in Chandanath-02, Jumla, Sahayatri Nepal provides education, safe
              housing and life-skills programming for deaf children who would otherwise have no
              access to schooling. We operate in partnership with Learn for Life, United Kingdom.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.8, color: "rgba(9,20,38,0.7)" }}>
              Our students travel from remote villages across Karnali Province to study a sign
              language curriculum taught by qualified teachers meeting national standards, live in
              supervised residential housing in Jumla, and take part in art, sport, and
              safeguarding programmes alongside their academic studies.
            </p>
          </div>
        </section>

        <div id="team">
          <TeamGrid />
        </div>

        <section id="partners" style={{ background: "#F0F7FF", padding: "clamp(56px,7vw,88px) 0" }}>
          <div className="section-inner" style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px,2.8vw,32px)", color: "#091426", marginBottom: "16px" }}>
              Our partner
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.8, color: "rgba(9,20,38,0.7)" }}>
              Sahayatri Nepal operates in partnership with Learn for Life, United Kingdom, which
              supports fundraising and programme oversight for our work in Jumla.
            </p>
          </div>
        </section>

        <section id="safeguarding" style={{ background: "#FAFAF7", padding: "clamp(56px,7vw,88px) 0" }}>
          <div className="section-inner" style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px,2.8vw,32px)", color: "#091426", marginBottom: "16px" }}>
              Safeguarding
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.8, color: "rgba(9,20,38,0.7)" }}>
              All staff complete regular child safeguarding training covering reporting
              procedures, safe recruitment, and ongoing review across our residential and
              classroom settings. Visitors and volunteers must complete safeguarding clearance
              before working with students — get in touch via the contact page to discuss.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
