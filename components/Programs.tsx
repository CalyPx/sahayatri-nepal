"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROGRAMS = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    title: "Education",
    description: "Sign language curriculum and qualified teachers for deaf students across Karnali Province. Structured learning that meets national standards.",
    href: "/projects#education",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Safe Housing",
    description: "Residential accommodation in Jumla for students who travel days from remote villages. A safe home so learning can happen.",
    href: "/projects#housing",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 0 0-16 0"/>
      </svg>
    ),
    title: "Life Skills",
    description: "Art, sport, child safeguarding, and extracurricular programmes. We believe childhood matters as much as academics.",
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
              fontSize: "12px",
              letterSpacing: "0.18em",
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
              fontSize: "clamp(34px,4.5vw,52px)",
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
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(0,0,0,0.10)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
              }}
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                transition: "transform 0.32s ease, box-shadow 0.32s ease",
              }}
            >
              {/* Icon container — solid blue badge */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "#1A6FA8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  flexShrink: 0,
                }}
              >
                {program.icon}
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
                  lineHeight: 1.75,
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
