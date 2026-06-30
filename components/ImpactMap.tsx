"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import NepalMap from "./NepalMap";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "47",   label: "Students"   },
  { value: "100%", label: "SEE Pass"   },
  { value: "12",   label: "Years"      },
];

export default function ImpactMap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.55, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="map-heading"
      style={{
        background: "#F0F7FF",
        padding: "120px clamp(24px, 8vw, 120px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "50fr 50fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: Real Nepal map from GeoJSON survey data ─────────────── */}
        <motion.div
          {...enter(0)}
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <NepalMap />
        </motion.div>

        {/* ── RIGHT: Text content ─────────────────────────────────────────── */}
        <div>
          {/* Eyebrow */}
          <motion.p
            {...enter(0.08)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C8A84B",
              marginBottom: "20px",
            }}
          >
            Where We Work
          </motion.p>

          {/* Headline */}
          <motion.h2
            id="map-heading"
            {...enter(0.14)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.4vw, 38px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#0A1628",
              marginBottom: "24px",
              maxWidth: "20ch",
            }}
          >
            We work where access to education is hardest.
          </motion.h2>

          {/* Body */}
          <motion.p
            {...enter(0.20)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.8,
              color: "#5A6A7A",
              marginBottom: "48px",
              maxWidth: "44ch",
            }}
          >
            Sahayatri Nepal supports deaf children in Karnali Province — one
            of Nepal&rsquo;s most remote regions — providing education, housing
            and life skills.
          </motion.p>

          {/* Stats row */}
          <motion.div
            {...enter(0.26)}
            style={{
              display: "flex",
              gap: "clamp(24px, 4vw, 40px)",
              flexWrap: "wrap",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "clamp(28px, 3.2vw, 32px)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "#0A1628",
                    marginBottom: "6px",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#8A9B8E",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
