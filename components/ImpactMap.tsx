"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import NepalMap from "./NepalMap";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ImpactMap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="map-heading"
      style={{
        background: "#F0F7FF",
        padding: "clamp(72px, 8vw, 120px) 0",
      }}
    >
      {/* ── Text content — centered header, full-width map below ────────── */}
      <div className="section-inner" style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}>
        <motion.p
          {...enter(0)}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--gold-dark)",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Where We Work
        </motion.p>

        <motion.h2
          id="map-heading"
          {...enter(0.08)}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px,4vw,48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#091426",
            marginBottom: "20px",
            maxWidth: "20ch",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          We work where access to education is hardest.
        </motion.h2>

        <motion.p
          {...enter(0.16)}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: 1.75,
            color: "rgba(9,20,38,0.62)",
            maxWidth: "52ch",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          Sahayatri Nepal supports deaf children in Karnali Province — one
          of Nepal&rsquo;s most remote regions, a five-day journey from the
          capital — providing education, housing and life skills.
        </motion.p>
      </div>

      {/* ── Full-width map ────────────────────────────────────────────────── */}
      <motion.div
        {...enter(0.24)}
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 80px)",
        }}
      >
        <NepalMap />
      </motion.div>
    </section>
  );
}
