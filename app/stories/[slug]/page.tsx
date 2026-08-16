import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await prisma.story.findUnique({ where: { slug } });
  if (!story) return {};
  return { title: `${story.title} — Sahayatri Nepal`, description: story.quote };
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await prisma.story.findUnique({ where: { slug } });

  if (!story || !story.published) notFound();

  const paragraphs = story.body.split("\n\n");

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader eyebrow="A Student's Story" title={story.title} />
        <section style={{ background: "#FAFAF7", padding: "clamp(56px,7vw,96px) 0" }}>
          <div className="section-inner" style={{ maxWidth: "760px" }}>
            {story.photoUrl && (
              <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "40px" }}>
                <Image src={story.photoUrl} alt="" fill sizes="760px" style={{ objectFit: "cover" }} />
              </div>
            )}
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(24px,3vw,34px)",
                lineHeight: 1.25,
                color: "#091426",
                borderLeft: "2px solid #D4AF37",
                paddingLeft: "24px",
                margin: "0 0 32px",
              }}
            >
              &ldquo;{story.quote}&rdquo;
            </blockquote>
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.8, color: "rgba(9,20,38,0.7)", marginBottom: "18px" }}>
                {p}
              </p>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
