import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const report = await prisma.report.findUnique({ where: { slug } });
  if (!report) return {};
  return { title: `${report.title} — Sahayatri Nepal`, description: report.excerpt };
}

export default async function ReportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await prisma.report.findUnique({ where: { slug } });

  if (!report || !report.published) notFound();

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader eyebrow={`${report.category} · ${dateFormatter.format(report.date)}`} title={report.title} />
        <section style={{ background: "#FAFAF7", padding: "clamp(56px,7vw,96px) 0" }}>
          <div className="section-inner" style={{ maxWidth: "720px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "17px", lineHeight: 1.85, color: "rgba(9,20,38,0.75)", whiteSpace: "pre-wrap" }}>
              {report.body}
            </p>
            {report.fileUrl && (
              <a
                href={report.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "32px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "var(--gold-dark)",
                  borderBottom: "1.5px solid var(--gold-dark)",
                  paddingBottom: "3px",
                  textDecoration: "none",
                }}
              >
                Download full PDF →
              </a>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
