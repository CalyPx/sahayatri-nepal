"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const BLUE = "#1A6FA8";
const DARK = "#0A1628";
const BODY_COLOR = "#3A4A5A";
const EASE = [0.22, 1, 0.36, 1] as const;

const PILLARS = [
  {
    tag: "PROGRAMME 01",
    title: "Education",
    desc: "Sign language curriculum, qualified teachers, and structured learning for deaf students across Karnali Province.",
  },
  {
    tag: "PROGRAMME 02",
    title: "Safe Housing",
    desc: "Residential accommodation in Jumla for students travelling from remote villages — some walking days to reach us.",
  },
  {
    tag: "PROGRAMME 03",
    title: "Life Skills",
    desc: "Art, sport, child safeguarding, and extracurricular programmes — because childhood matters beyond the classroom.",
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.26, delay, ease: EASE },
        };

  return (
    <section
      id="what-we-do"
      ref={ref}
      aria-labelledby="wwd-heading"
      className="section-pad-wwd"
      style={{ background: "#F0F7FF", padding: "48px 80px 60px 80px" }}
    >
      <div
        className="wwd-grid"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          alignItems: "flex-start",
        }}
      >
        {/* Left — 3 programme cards in a horizontal row */}
        <div
          className="wwd-cards"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            alignItems: "stretch",
            paddingTop: "8px",
          }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              {...enter(i * 0.09)}
              onMouseEnter={(e) => {
                if (prefersReduced) return;
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow =
                  "0 8px 28px rgba(26,111,168,0.16), 0 16px 48px rgba(26,111,168,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow =
                  "0 2px 12px rgba(26,111,168,0.08), 0 8px 32px rgba(26,111,168,0.06)";
              }}
              style={{
                flex: 1,
                background: "#FFFFFF",
                borderRadius: "12px",
                padding: "36px 32px",
                minHeight: "220px",
                boxShadow:
                  "0 2px 12px rgba(26,111,168,0.08), 0 8px 32px rgba(26,111,168,0.06)",
                borderTop: `3px solid ${BLUE}`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "10px",
                  color: BLUE,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                {pillar.tag}
              </span>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: DARK,
                  marginBottom: "10px",
                  lineHeight: 1.2,
                }}
              >
                {pillar.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#5A6A7A",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right — editorial text */}
        <div
          className="wwd-right"
          style={{
            paddingLeft: "64px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <motion.p
            {...enter(0.06)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 500,
              color: BLUE,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: "0 0 16px 0",
            }}
          >
            WHAT WE DO
          </motion.p>

          <motion.h2
            id="wwd-heading"
            {...enter(0.12)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3vw, 42px)",
              fontWeight: 700,
              color: DARK,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              margin: "0 0 24px 0",
            }}
          >
            A school where silence is never a barrier.
          </motion.h2>

          <motion.p
            {...enter(0.18)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 400,
              color: BODY_COLOR,
              lineHeight: 1.85,
              margin: "0 0 16px 0",
              maxWidth: "480px",
            }}
          >
            In Chandanath-02, Jumla — one of Nepal&rsquo;s most remote and
            underserved districts — Sahayatri Nepal runs the only dedicated
            programme for deaf children in the Karnali Province. We bring
            together sign language instruction, safe boarding, and holistic life
            skills under one roof.
          </motion.p>

          <motion.p
            {...enter(0.24)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 400,
              color: BODY_COLOR,
              lineHeight: 1.85,
              margin: "0 0 16px 0",
              maxWidth: "480px",
            }}
          >
            Our approach is simple: give every child the language, safety, and
            skills they need to speak for themselves — then get out of the way
            and watch them flourish. In 2025, every student who sat the SEE
            national exam passed.
          </motion.p>

          <motion.div {...enter(0.30)}>
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
                fontSize: "14px",
                fontWeight: 500,
                color: BLUE,
                textDecoration: "none",
                borderBottom: `1px solid ${BLUE}`,
                paddingBottom: "2px",
                display: "inline-block",
                marginTop: "8px",
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
