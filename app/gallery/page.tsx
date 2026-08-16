import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Gallery — Sahayatri Nepal",
  description: "Photos from Sahayatri Nepal's programmes in Jumla, Karnali Province.",
};

export const dynamic = "force-dynamic";

// Shown until real photos are added via /admin/gallery.
const FALLBACK_PHOTOS = [
  { photoUrl: "/hero_section_photo.webp", caption: "A teacher and student communicating in sign language outside a school in Jumla" },
  { photoUrl: "/photos/education-classroom.webp", caption: "Students in a classroom at Sahayatri Nepal" },
  { photoUrl: "/photos/life-skills-activity.webp", caption: "Students taking part in a life-skills activity" },
  { photoUrl: "/photos/safe-housing-dormitory.webp", caption: "The residential dormitory in Jumla" },
  { photoUrl: "/playground.webp", caption: "The newly installed playground at the Jumla residential site" },
];

export default async function GalleryPage() {
  const dbPhotos = await prisma.galleryPhoto.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  const photos = dbPhotos.length > 0 ? dbPhotos : FALLBACK_PHOTOS;

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader eyebrow="Gallery" title="Life at Sahayatri Nepal." />
        <section style={{ background: "#FAFAF7", padding: "clamp(56px,7vw,96px) 0" }}>
          <div
            className="section-inner"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}
          >
            {photos.map((photo, i) => (
              <div
                key={photo.photoUrl}
                style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: "var(--radius-md)", overflow: "hidden" }}
              >
                <Image
                  src={photo.photoUrl}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={i < 3 ? "eager" : "lazy"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
