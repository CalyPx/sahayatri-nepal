"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { number: "47", label: "students, finding their voice" },
  { number: "100%", label: "SEE pass rate, Class of 2025" },
  { number: "12", label: "years of showing up" },
];

export default function ImpactStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number, y = 16) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y },
          transition: { duration: 0.28, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="impact-heading"
      className="section-pad-dark"
      style={{ background: "#091426", padding: "80px" }}
    >
      <p
        id="impact-heading"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "12px",
          color: "rgba(255,255,255,0.55)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          textAlign: "center",
          margin: "0 0 48px 0",
        }}
      >
        THE SITUATION IN NUMBERS
      </p>

      <div
        className="impact-row"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 0,
        }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.number}
            {...enter(i * 0.1, 20)}
            className="impact-col"
            style={{
              textAlign: "center",
              padding: "0 60px",
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "clamp(52px, 6vw, 88px)",
                color: "#FFFFFF",
                lineHeight: 1,
              }}
              aria-label={stat.number}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dancing)",
                fontWeight: 700,
                fontSize: "22px",
                color: "#D4AF37",
                marginTop: "8px",
                textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                lineHeight: 1.3,
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
