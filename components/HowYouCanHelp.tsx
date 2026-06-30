"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const BLUE = "#1A6FA8";
const DARK = "#0A1628";
const EASE = [0.22, 1, 0.36, 1] as const;

const WAYS = [
  {
    amount: "NPR 500/mo",
    title: "Monthly giving",
    body: "School supplies, materials and daily support for one student every month.",
    cta: "Give monthly →",
    href: "/donate?type=monthly",
  },
  {
    amount: "NPR 2,000",
    title: "One-time gift",
    body: "Food, shelter or a full term of education for a child in Jumla.",
    cta: "Donate once →",
    href: "/donate?type=once",
  },
  {
    amount: "Partner with us",
    title: "INGOs & Corporates",
    body: "Coordination, funding partnerships and CSR collaboration welcome.",
    cta: "Get in touch →",
    href: "/contact",
  },
];

export default function HowYouCanHelp() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
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
      ref={ref}
      aria-labelledby="help-heading"
      className="section-pad-help"
      style={{ background: "#FFFFFF", padding: "100px 120px" }}
    >
      <motion.p
        {...enter(0)}
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "10px",
          color: BLUE,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textAlign: "center",
          margin: "0 0 20px 0",
        }}
      >
        HOW YOU CAN HELP
      </motion.p>

      <motion.h2
        id="help-heading"
        {...enter(0.07)}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(28px, 3vw, 40px)",
          color: DARK,
          textAlign: "center",
          margin: "0 0 64px 0",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        Three ways to make a difference.
      </motion.h2>

      <div
        className="help-cols"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "48px",
          alignItems: "stretch",
        }}
      >
        {WAYS.map((way, i) => (
          <motion.div
            key={way.title}
            {...enter(0.10 + i * 0.09)}
            className="help-col"
            style={{
              flex: 1,
              borderLeft: i > 0 ? "1px solid #E0EAF4" : "none",
              paddingLeft: i > 0 ? "48px" : "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "20px",
                color: BLUE,
                marginBottom: "12px",
                lineHeight: 1,
              }}
            >
              {way.amount}
            </div>

            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "20px",
                color: DARK,
                marginBottom: "14px",
                lineHeight: 1.2,
              }}
            >
              {way.title}
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                fontSize: "14px",
                color: "#5A6A7A",
                lineHeight: 1.8,
                margin: "0 0 24px 0",
                flex: 1,
              }}
            >
              {way.body}
            </p>

            <Link
              href={way.href}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#0D4F7A")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = BLUE)
              }
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "13px",
                color: BLUE,
                textDecoration: "none",
                borderBottom: `1px solid ${BLUE}`,
                paddingBottom: "2px",
                display: "inline-block",
                transition: "color 0.2s ease",
              }}
            >
              {way.cta}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
