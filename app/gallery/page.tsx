import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Gallery — Sahayatri Nepal",
  description: "Photos from Sahayatri Nepal's programmes in Jumla, Karnali Province.",
};

const PHOTOS = [
  { src: "/hero_section_photo.webp", alt: "A teacher and student communicating in sign language outside a school in Jumla" },
  { src: "/photos/education-classroom.jpg", alt: "Students in a classroom at Sahayatri Nepal" },
  { src: "/photos/life-skills-activity.jpg", alt: "Students taking part in a life-skills activity" },
  { src: "/photos/safe-housing-dormitory.jpg", alt: "The residential dormitory in Jumla" },
  { src: "/playground.webp", alt: "The newly installed playground at the Jumla residential site" },
];

export default function GalleryPage() {
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
            {PHOTOS.map((photo) => (
              <div
                key={photo.src}
                style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: "var(--radius-md)", overflow: "hidden" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
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
