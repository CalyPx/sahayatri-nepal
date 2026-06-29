"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const BLUE = "#1A6FA8";
const DARK = "#0A1628";
const BODY_COLOR = "#3A4A5A";
const EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    title: "Education",
    desc: "Sign language curriculum for deaf students",
  },
  {
    title: "Shelter",
    desc: "Safe housing in Jumla for rural students",
  },
  {
    title: "Life Skills",
    desc: "Art, sport and child safeguarding programs",
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.38, delay, ease: EASE },
  });

  return (
    <section
      id="what-we-do"
      ref={ref}
      style={{ background: "#F0F7FF", padding: "112px 0" }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 80px",
          display: "flex",
          alignItems: "center",
          gap: "88px",
        }}
      >
        {/* Left — three circles stacked */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            flexShrink: 0,
          }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              {...enter(i * 0.1)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                border: `1.5px solid ${BLUE}`,
                background: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "28px",
                cursor: "default",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  fontWeight: 700,
                  color: DARK,
                  letterSpacing: "-0.01em",
                  marginBottom: "8px",
                  lineHeight: 1.1,
                }}
              >
                {pillar.title}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "12px",
                  fontWeight: 400,
                  color: BODY_COLOR,
                  lineHeight: 1.55,
                }}
              >
                {pillar.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Right — editorial text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Eyebrow */}
          <motion.p
            {...enter(0.08)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "9px",
              fontWeight: 600,
              color: BLUE,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              margin: "0 0 18px 0",
            }}
          >
            WHAT WE DO
          </motion.p>

          {/* H2 */}
          <motion.h2
            {...enter(0.16)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3vw, 36px)",
              fontWeight: 700,
              color: DARK,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 28px 0",
            }}
          >
            A school where silence is never a barrier.
          </motion.h2>

          {/* Body paragraphs */}
          <motion.p
            {...enter(0.22)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 400,
              color: BODY_COLOR,
              lineHeight: 1.8,
              margin: "0 0 18px 0",
            }}
          >
            In Chandanath-02, Jumla — one of Nepal&rsquo;s most remote and
            underserved districts — Sahayatri Nepal runs the only dedicated
            programme for deaf children in the Karnali Province. We bring
            together sign language instruction, safe boarding, and holistic life
            skills under one roof.
          </motion.p>

          <motion.p
            {...enter(0.28)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 400,
              color: BODY_COLOR,
              lineHeight: 1.8,
              margin: "0 0 36px 0",
            }}
          >
            Our approach is simple: give every child the language, safety, and
            skills they need to speak for themselves — then get out of the way
            and watch them flourish. In 2025, every student who sat the SEE
            national exam passed.
          </motion.p>

          {/* Link */}
          <motion.div {...enter(0.34)}>
            <Link
              href="/programs"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#0D4F7A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = BLUE)
              }
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "15px",
                fontWeight: 600,
                color: BLUE,
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                textDecorationThickness: "1px",
                transition: "color 0.2s ease",
              }}
            >
              Learn more →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
