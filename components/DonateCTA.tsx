"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const AMOUNTS = [
  { label: "NPR 500",    sub: "School supplies, one month", param: "500"   },
  { label: "NPR 2,000",  sub: "Food and care, one month",   param: "2000"  },
  { label: "NPR 10,000", sub: "Full term scholarship",       param: "10000" },
];

export default function DonateCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState(1);

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
      aria-labelledby="donate-heading"
      style={{ background: "#0D1B2A", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div className="section-inner" style={{ maxWidth: "680px" }}>

        <motion.p
          {...enter(0)}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4AF37",
            marginBottom: "24px",
          }}
        >
          Support the Work
        </motion.p>

        <motion.h2
          id="donate-heading"
          {...enter(0.08)}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(34px,4.5vw,54px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            marginBottom: "24px",
          }}
        >
          Give a child a future they can hear.
        </motion.h2>

        <motion.p
          {...enter(0.16)}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.62)",
            marginBottom: "56px",
          }}
        >
          Every rupee goes directly to students in Jumla, Karnali Province.
        </motion.p>

        {/* Amount selector */}
        <motion.div
          {...enter(0.24)}
          role="group"
          aria-label="Choose a donation amount"
          style={{ display: "flex", gap: "14px", marginBottom: "40px", flexWrap: "wrap" }}
        >
          {AMOUNTS.map((amount, i) => (
            <button
              key={amount.param}
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              style={{
                fontFamily: "var(--font-sans)",
                background: selected === i ? "rgba(212,175,55,0.08)" : "transparent",
                border: selected === i
                  ? "1.5px solid rgba(212,175,55,0.55)"
                  : "1px solid rgba(255,255,255,0.10)",
                padding: "20px 24px",
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color 0.2s ease, background 0.2s ease",
                borderRadius: "12px",
                flex: "1 1 160px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: selected === i ? "#D4AF37" : "#FFFFFF",
                  lineHeight: 1,
                  marginBottom: "6px",
                  transition: "color 0.2s ease",
                }}
              >
                {amount.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.4,
                }}
              >
                {amount.sub}
              </div>
            </button>
          ))}
        </motion.div>

        <motion.div {...enter(0.32)}>
          <Link
            href={`/donate?amount=${AMOUNTS[selected].param}`}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#c49e2f";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#D4AF37";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#0D1B2A",
              backgroundColor: "#D4AF37",
              paddingInline: "48px",
              height: "56px",
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "10px",
              transition: "background-color 0.2s ease, transform 0.2s ease",
            }}
          >
            Donate Now
          </Link>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(255,255,255,0.28)",
              marginTop: "20px",
            }}
          >
            Bank details sent on contact &middot; hhnjumla25@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
