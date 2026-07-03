"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const handleDonateEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const maxDist = Math.max(
    Math.hypot(x, y),
    Math.hypot(rect.width - x, y),
    Math.hypot(x, rect.height - y),
    Math.hypot(rect.width - x, rect.height - y),
  );
  const scaleNeeded = (maxDist * 2.2) / 8;
  const existing = btn.querySelector(".donate-ripple");
  if (existing) existing.remove();
  const circle = document.createElement("span");
  circle.className = "donate-ripple";
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.setProperty("--ripple-scale", String(scaleNeeded));
  btn.appendChild(circle);
  requestAnimationFrame(() => circle.classList.add("donate-ripple-active"));
  btn.style.transform = "translateY(-2px)";
  btn.style.boxShadow = "0 6px 24px rgba(212,175,55,0.45)";
};

const handleDonateLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const btn = e.currentTarget;
  btn.querySelector(".donate-ripple")?.classList.remove("donate-ripple-active");
  btn.style.transform = "translateY(0)";
  btn.style.boxShadow = "none";
};

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
            fontSize: "11px",
            letterSpacing: "0.16em",
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
            fontSize: "clamp(36px,4vw,48px)",
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
            fontSize: "16px",
            lineHeight: 1.7,
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
              onMouseEnter={(e) => {
                if (selected !== i) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (selected !== i) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }
              }}
              style={{
                fontFamily: "var(--font-sans)",
                background: selected === i ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.04)",
                border: selected === i
                  ? "1.5px solid #D4AF37"
                  : "1px solid rgba(255,255,255,0.15)",
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
            className="donate-spotlight-btn donate-spotlight-lg"
            onMouseEnter={handleDonateEnter}
            onMouseLeave={handleDonateLeave}
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
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <span className="donate-btn-text">Donate Now</span>
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "12px",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Bank transfer details sent securely on contact
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
