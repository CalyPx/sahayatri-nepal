"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Mission() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.55, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="mission-heading"
      style={{ background: "#FAFAF8", padding: "clamp(80px,9vw,128px) 0 64px" }}
    >
      <div
        className="section-inner two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gap: "clamp(48px,7vw,96px)",
          alignItems: "start",
        }}
      >
        {/* LEFT — main text */}
        <div>
          <motion.p
            {...enter(0)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: "28px",
            }}
          >
            Our Mission
          </motion.p>

          <motion.h2
            id="mission-heading"
            {...enter(0.07)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(36px,4vw,48px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#0D1B2A",
              marginBottom: "32px",
              maxWidth: "18ch",
            }}
          >
            A school where silence is never a barrier.
          </motion.h2>

          <motion.p
            {...enter(0.13)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#4A5568",
              marginBottom: "20px",
              maxWidth: "54ch",
            }}
          >
            In Chandanath-02, Jumla — one of Nepal&rsquo;s most remote districts — we run the only dedicated programme for deaf children in Karnali Province.
          </motion.p>

          <motion.p
            {...enter(0.19)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#4A5568",
              marginBottom: "44px",
              maxWidth: "54ch",
            }}
          >
            In 2025, every student who sat the national SEE examination passed — not because we lowered expectations, but because we gave them the language to meet them.
          </motion.p>

          <motion.div {...enter(0.25)}>
            <Link
              href="/about"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(13,27,42,0.22)";
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.01em",
                textDecoration: "none",
                color: "#0D1B2A",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1.5px solid rgba(13,27,42,0.22)",
                paddingBottom: "4px",
                transition: "border-color 0.2s ease",
              }}
            >
              Learn about our work <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — editorial pull quote */}
        <motion.div
          {...enter(0.15)}
          style={{ paddingTop: "clamp(0px,2vw,20px)" }}
        >
          {/* Gold accent line */}
          <div
            aria-hidden="true"
            style={{
              width: "32px",
              height: "2px",
              background: "#D4AF37",
              marginBottom: "32px",
            }}
          />

          <blockquote
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(21px,2.2vw,28px)",
              lineHeight: 1.5,
              letterSpacing: "-0.015em",
              color: "#2C3A4A",
              marginBottom: "32px",
            }}
          >
            &ldquo;The children who come to us are not broken. They have simply been waiting for a language.&rdquo;
          </blockquote>

          {/* Author */}
          <div
            style={{
              borderLeft: "2px solid #D4AF37",
              paddingLeft: "12px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                color: "#0A1628",
                letterSpacing: "0.01em",
                margin: 0,
              }}
            >
              DEVENDRA TIMILSENA
            </p>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "#5A6A7A",
                marginTop: "2px",
                marginBottom: 0,
              }}
            >
              Chief Advisor, Sahayatri Nepal
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
