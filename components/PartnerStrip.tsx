"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PartnerStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.4, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-label="Partnership"
      style={{
        background: "#F0F7FF",
        padding: "40px 120px",
        borderTop: "1px solid #D0E4F4",
        borderBottom: "1px solid #D0E4F4",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "48px",
        }}
      >
        <motion.span
          {...enter(0)}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "13px",
            color: "#5A6A7A",
            whiteSpace: "nowrap",
          }}
        >
          In partnership with
        </motion.span>

        <motion.div {...enter(0.08)} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "20px",
              color: "#0A1628",
              lineHeight: 1.2,
            }}
          >
            Learn for Life
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: "12px",
              color: "#5A6A7A",
              marginTop: "2px",
            }}
          >
            United Kingdom
          </div>
        </motion.div>

        <motion.div
          {...enter(0.12)}
          style={{
            width: "1px",
            height: "40px",
            background: "#D0E4F4",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />

        <motion.div {...enter(0.16)} style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "20px",
              color: "#0A1628",
              lineHeight: 1.2,
            }}
          >
            Sahayatri Nepal
          </div>
          <div
            style={{
              fontFamily: "var(--font-dancing)",
              fontWeight: 700,
              fontSize: "20px",
              color: "#D4AF37",
              marginTop: "2px",
              lineHeight: 1.2,
            }}
          >
            सहयात्री नेपाल
          </div>
        </motion.div>
      </div>
    </section>
  );
}
