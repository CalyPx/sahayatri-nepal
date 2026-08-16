import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Reports & Updates — Sahayatri Nepal",
  description: "Financial statements, programme updates, and activity reports from Sahayatri Nepal.",
};

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

export default async function ReportsPage() {
  const reports = await prisma.report.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader
          eyebrow="Reports & Updates"
          title="Transparency is part of the work."
          description="Financial statements, programme updates, and activity reports, published as they happen."
        />
        <section style={{ background: "#F0F7FF", padding: "clamp(56px,7vw,96px) 0" }}>
          <div className="section-inner" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {reports.length === 0 && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(9,20,38,0.55)" }}>
                No reports published yet.
              </p>
            )}
            {reports.map((report) => (
              <Link
                key={report.slug}
                href={`/reports/${report.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  background: "#FFFFFF",
                  border: "1px solid rgba(9,20,38,0.08)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px 28px",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(9,20,38,0.5)", marginBottom: "8px" }}>
                    {report.category} · {dateFormatter.format(report.date)}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "17px", color: "#091426" }}>
                    {report.title}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "13px", color: "var(--gold-dark)", whiteSpace: "nowrap" }}>
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
