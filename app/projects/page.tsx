import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Projects — Sahayatri Nepal",
  description: "Education, safe housing and life skills programmes for deaf children in Karnali Province.",
};

const PROJECTS = [
  {
    id: "education",
    num: "01",
    title: "Education",
    photo: "/photos/education-classroom.jpg",
    description:
      "Sign language curriculum and qualified teachers for deaf students across Karnali Province. Structured learning that meets national standards, leading to a 100% SEE pass rate for the Class of 2025.",
  },
  {
    id: "housing",
    num: "02",
    title: "Safe Housing",
    photo: "/photos/safe-housing-dormitory.jpg",
    description:
      "Residential accommodation in Jumla for students who travel days from remote villages across Karnali Province. A safe, supervised home so learning can happen year-round.",
  },
  {
    id: "life-skills",
    num: "03",
    title: "Life Skills",
    photo: "/photos/life-skills-activity.jpg",
    description:
      "Art, sport, child safeguarding, and extracurricular programmes. We believe childhood matters as much as academics — students take part in play and creative activity alongside their studies.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <PageHeader eyebrow="Projects" title="Three programmes. One commitment." />
        {PROJECTS.map((project, i) => (
          <section
            key={project.id}
            id={project.id}
            style={{ background: i % 2 === 0 ? "#FAFAF7" : "#F0F7FF", padding: "clamp(56px,7vw,96px) 0" }}
          >
            <div
              className="section-inner"
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: "clamp(40px,6vw,80px)",
                alignItems: "center",
              }}
            >
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--gold-dark)", marginBottom: "12px" }}>
                  {project.num}
                </p>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px,3.2vw,38px)", color: "#091426", marginBottom: "16px" }}>
                  {project.title}
                </h2>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.8, color: "rgba(9,20,38,0.68)" }}>
                  {project.description}
                </p>
              </div>
              <div style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: "var(--radius-md)", overflow: "hidden", order: i % 2 === 0 ? 1 : 0 }}>
                <Image src={project.photo} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
