import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Student Stories — Sahayatri Nepal",
  description: "Stories from students at Sahayatri Nepal.",
};

export default async function StoriesPage() {
  const stories = await prisma.story.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader eyebrow="Student Stories" title="Their words, their futures." />
        <section style={{ background: "#FAFAF7", padding: "clamp(56px,7vw,96px) 0" }}>
          <div
            className="section-inner"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}
          >
            {stories.length === 0 && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "rgba(9,20,38,0.55)" }}>
                No stories published yet.
              </p>
            )}
            {stories.map((story) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: "#FFFFFF",
                  border: "1px solid rgba(9,20,38,0.08)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
                  <Image
                    src={story.photoUrl ?? "/hero_section_photo.webp"}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "17px", color: "#091426", marginBottom: "10px" }}>
                    {story.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "15px", color: "rgba(9,20,38,0.65)" }}>
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
