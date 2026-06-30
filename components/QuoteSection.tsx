"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-label="Mission quote"
      style={{
        background: "#091426",
        padding: "100px 80px",
        textAlign: "center",
      }}
    >
      <motion.blockquote
        {...enter(0)}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(22px, 3vw, 36px)",
          fontStyle: "italic",
          color: "#FFFFFF",
          maxWidth: "760px",
          margin: "0 auto",
          lineHeight: 1.6,
          border: "none",
          padding: 0,
        }}
      >
        &ldquo;The children who come to us are not broken.
        <br />
        They have simply been waiting for a language.&rdquo;
      </motion.blockquote>

      <motion.p
        {...enter(0.15)}
        style={{
          fontFamily: "var(--font-dancing)",
          fontWeight: 700,
          fontSize: "24px",
          color: "#D4AF37",
          marginTop: "20px",
        }}
      >
        — Devendra Timilsena, Chief Advisor
      </motion.p>

      <motion.p
        {...enter(0.28)}
        style={{
          fontFamily: "var(--font-dancing)",
          fontWeight: 700,
          fontSize: "clamp(36px, 5vw, 64px)",
          color: "#D4AF37",
          opacity: 0.85,
          marginTop: "32px",
          lineHeight: 1.2,
        }}
      >
        सहयात्री — Fellow Travellers
      </motion.p>
    </section>
  );
}
