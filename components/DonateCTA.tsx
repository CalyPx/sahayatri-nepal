"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const [selected, setSelected] = useState(1);

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
      aria-labelledby="donate-heading"
      style={{
        position: "relative",
        background: "#091426",
        padding: "clamp(90px,10vw,140px) 0",
        overflow: "hidden",
      }}
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
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px,4vw,48px)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "#FAFAF7",
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

        {/* Amount selector — pulse on select, checkmark, others dim */}
        <motion.div
          {...enter(0.24)}
          role="group"
          aria-label="Choose a donation amount"
          style={{ display: "flex", gap: "14px", marginBottom: "40px", flexWrap: "wrap" }}
        >
          {AMOUNTS.map((amount, i) => {
            const isSelected = selected === i;
            return (
              <motion.button
                key={amount.param}
                onClick={() => setSelected(i)}
                aria-pressed={isSelected}
                initial={false}
                animate={
                  prefersReduced
                    ? { opacity: isSelected ? 1 : 0.6 }
                    : isSelected
                    ? { scale: [0.97, 1], opacity: 1 }
                    : { scale: 1, opacity: 0.6 }
                }
                transition={{
                  scale: { duration: 0.15, ease: "easeOut" },
                  opacity: { duration: 0.2, ease: "easeOut" },
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                style={{
                  position: "relative",
                  fontFamily: "var(--font-sans)",
                  background: isSelected ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.04)",
                  border: isSelected
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
                {/* Checkmark — fades in at top-right of the selected box */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    opacity: isSelected ? 1 : 0,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: isSelected ? "#D4AF37" : "#FAFAF7",
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
                    color: "rgba(255,255,255,0.58)",
                    lineHeight: 1.4,
                  }}
                >
                  {amount.sub}
                </div>
              </motion.button>
            );
          })}
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
              color: "#091426",
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
              stroke="rgba(255,255,255,0.62)"
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
                color: "rgba(255,255,255,0.62)",
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
