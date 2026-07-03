"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROGRAMS = [
  {
    num: "01",
    title: "Education",
    photo: "/photos/education-classroom.jpg",
    description:
      "Sign language curriculum and qualified teachers for deaf students across Karnali Province. Structured learning that meets national standards.",
    href: "/projects#education",
  },
  {
    num: "02",
    title: "Safe Housing",
    photo: "/photos/safe-housing-dormitory.jpg",
    description:
      "Residential accommodation in Jumla for students who travel days from remote villages. A safe home so learning can happen.",
    href: "/projects#housing",
  },
  {
    num: "03",
    title: "Life Skills",
    photo: "/photos/life-skills-activity.jpg",
    description:
      "Art, sport, child safeguarding, and extracurricular programmes. We believe childhood matters as much as academics.",
    href: "/projects#life-skills",
  },
];

export default function Programs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="programs-heading"
      style={{ background: "#F4F4F1", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div className="section-inner">

        {/* Header */}
        <motion.div {...enter(0)} style={{ marginBottom: "72px", maxWidth: "560px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: "20px",
            }}
          >
            What We Do
          </p>
          <h2
            id="programs-heading"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(36px,4vw,48px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#0D1B2A",
            }}
          >
            Three programmes.<br />One commitment.
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          className="three-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.title}
              {...enter(0.1 + i * 0.1)}
              onMouseEnter={(e) => {
                if (!prefersReduced) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 8px 32px rgba(26,111,168,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 16px rgba(0,0,0,0.05)";
              }}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
                overflow: "hidden",
              }}
            >
              {/* Full-bleed photo with badge overlay */}
              <div
                style={{
                  position: "relative",
                  margin: "-36px -32px 24px -32px",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={program.photo}
                  alt={`${program.title} programme`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Number badge as absolute overlay */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#1A6FA8",
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {program.num}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#0D1B2A",
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                  lineHeight: 1.2,
                }}
              >
                {program.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#6B7A8D",
                  marginBottom: "36px",
                  flex: 1,
                }}
              >
                {program.description}
              </p>

              <Link
                href={program.href}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#0D1B2A")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#D4AF37")
                }
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "13px",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  color: "#D4AF37",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  alignSelf: "flex-start",
                  transition: "color 0.2s ease",
                  borderBottom: "1px solid #D4AF37",
                  paddingBottom: "2px",
                }}
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
