"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Mission() {
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
      aria-labelledby="mission-heading"
      style={{ background: "#FAFAF7", padding: "clamp(80px,9vw,128px) 0 clamp(80px,9vw,120px)" }}
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
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px,4vw,48px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#091426",
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
              lineHeight: 1.75,
              color: "rgba(9,20,38,0.68)",
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
              lineHeight: 1.75,
              color: "rgba(9,20,38,0.68)",
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
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(9,20,38,0.22)";
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.01em",
                textDecoration: "none",
                color: "#091426",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1.5px solid rgba(9,20,38,0.22)",
                paddingBottom: "4px",
                transition: "border-color 0.2s ease",
              }}
            >
              Learn about our work <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — editorial photo with mono caption
            (the pull quote moved to its own dark section mid-page) */}
        <motion.div {...enter(0.15)} style={{ paddingTop: "clamp(0px,2vw,20px)" }}>
          <div
            aria-hidden="true"
            style={{
              width: "32px",
              height: "2px",
              background: "#D4AF37",
              marginBottom: "24px",
            }}
          />

          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 3",
              overflow: "hidden",
              borderRadius: "2px",
            }}
          >
            <Image
              src="/playground.webp"
              alt="Students playing on the newly installed playground in Jumla"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(9,20,38,0.45)",
              marginTop: "14px",
            }}
          >
            Playground installation — Jumla, May 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}
