"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface FinancialAllocationData {
  id: string;
  label: string;
  percent: number;
  color: string;
}

export default function FinancialTransparencyClient({
  allocation,
  fiscalYear,
}: {
  allocation: FinancialAllocationData[];
  fiscalYear: string;
}) {
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
      aria-labelledby="financial-heading"
      style={{ background: "#FFFFFF", padding: "clamp(72px,8vw,120px) 0" }}
    >
      <div className="section-inner" style={{ maxWidth: "760px" }}>
        <motion.div {...enter(0)} style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold-dark)",
              marginBottom: "20px",
            }}
          >
            Financial Transparency
          </p>
          <h2
            id="financial-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px,3.6vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#091426",
              marginBottom: "16px",
            }}
          >
            Where every rupee goes.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "15px",
              color: "rgba(9,20,38,0.65)",
            }}
          >
            Allocation for fiscal year {fiscalYear}.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {allocation.map((row, i) => (
            <motion.div key={row.id} {...enter(0.12 + i * 0.1)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: "15px", color: "#091426" }}>
                  {row.label}
                </span>
                <span style={{ fontWeight: 600, fontSize: "15px", color: row.color }}>
                  {row.percent}%
                </span>
              </div>
              <div
                style={{
                  height: "10px",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(9,20,38,0.06)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={prefersReduced ? false : { width: 0 }}
                  animate={inView ? { width: `${row.percent}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: EASE }}
                  style={{
                    height: "100%",
                    borderRadius: "var(--radius-pill)",
                    background: row.color,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
