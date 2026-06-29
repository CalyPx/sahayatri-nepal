"use client";

import { motion, useScroll, useReducedMotion } from "framer-motion";
import Image from "next/image";

const GOLD = "#D4AF37";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const enter = (delay: number, duration = 0.32, y = 14) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: EASE },
        };

  return (
    <section
      aria-label="Introduction"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "640px",
        overflow: "hidden",       // fix 8: clips Ken Burns scale at edges
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Gold scroll progress line — fixed left edge */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "2px",
          height: "100dvh",
          background: GOLD,
          transformOrigin: "top",
          scaleY: scrollYProgress,
          zIndex: 100,
        }}
      />

      {/* Fix 8 — Ken Burns wrapper: 20s slow zoom, forwards (does not loop) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          animation: prefersReduced ? "none" : "kenburns 20s ease-out forwards",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <Image
          src="/class-group-photo.jpg"
          alt="Sahayatri Nepal students raising their hands together in a classroom in Jumla, Karnali Province"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />
      </div>

      {/* Radial overlay — lighter at center, darker at edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(8,15,30,0.45) 0%, rgba(8,15,30,0.72) 100%)",
        }}
      />

      {/* Content — flexbox-centered, paddingTop clears transparent nav */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          width: "80%",
          maxWidth: "900px",
          paddingTop: "80px",
          paddingBottom: "24px",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          {...enter(0.08, 0.28, 10)}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "11px",
            color: GOLD,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            margin: "0 0 20px 0",
          }}
        >
          CHANDANATH-02, JUMLA&nbsp;&middot;&nbsp;KARNALI PROVINCE, NEPAL
        </motion.p>

        {/* H1 */}
        <motion.h1
          {...enter(0.18, 0.42, 20)}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(44px, 6vw, 86px)",
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            textAlign: "center",
            maxWidth: "880px",
            margin: "0 auto",
          }}
        >
          Educating deaf children in Nepal&rsquo;s most remote province.
        </motion.h1>

        {/* Fix 3 — Dancing Script: text-shadow for legibility over photo */}
        <motion.span
          {...(prefersReduced
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.45, delay: 0.58, ease: "easeOut" },
              })}
          style={{
            display: "block",
            fontFamily: "var(--font-dancing)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)",
            color: GOLD,
            transform: "rotate(-4deg)",
            marginTop: "-8px",
            marginBottom: "24px",
            textAlign: "center",
            lineHeight: 1.2,
            textShadow: "0 2px 8px rgba(0,0,0,0.45)",
          }}
        >
          in the arms of the future
        </motion.span>

        {/* Fix 7 — Partner line: rgba 0.80 */}
        <motion.p
          {...enter(0.28, 0.28, 8)}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(255,255,255,0.80)",
            margin: "0 0 40px 0",
          }}
        >
          In partnership with Learn for Life, United Kingdom
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...enter(0.36, 0.28, 8)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {/* Fix 4 — SEE OUR WORK: 1.5px border, hover transform + gold */}
          <a
            href="#what-we-do"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = GOLD;
              el.style.color = GOLD;
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(255,255,255,0.65)";
              el.style.color = "#FFFFFF";
              el.style.transform = "translateY(0)";
            }}
            style={{
              display: "inline-block",
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.65)",
              color: "#FFFFFF",
              padding: "16px 44px",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              borderRadius: 0,
              textDecoration: "none",
              transition: "all 0.25s ease",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            SEE OUR WORK
          </a>

          {/* Fix 5 — DONATE NOW: hover transform + darker gold */}
          <a
            href="/donate"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#B8962E";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = GOLD;
              el.style.transform = "translateY(0)";
            }}
            style={{
              display: "inline-block",
              background: GOLD,
              border: `1px solid ${GOLD}`,
              color: "#091426",
              padding: "16px 44px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              borderRadius: 0,
              textDecoration: "none",
              transition: "all 0.25s ease",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            DONATE NOW
          </a>
        </motion.div>

        {/* Fix 1 — Impact strip: marginTop 56px
            Fix 2 — All numbers equal: clamp(36px, 4vw, 58px), labels 9px/0.14em/0.5 */}
        <motion.div
          {...enter(0.44, 0.32, 8)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "48px",
            marginTop: "56px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(36px, 4vw, 58px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              47
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: "6px",
                lineHeight: 1.6,
              }}
            >
              students
              <br />
              enrolled
            </div>
          </div>

          <div
            aria-hidden="true"
            style={{
              width: "1px",
              height: "44px",
              background: "rgba(255,255,255,0.15)",
              flexShrink: 0,
              alignSelf: "center",
            }}
          />

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(36px, 4vw, 58px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              100%
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: "6px",
                lineHeight: 1.6,
              }}
            >
              SEE pass rate
              <br />
              Class of 2025
            </div>
          </div>

          <div
            aria-hidden="true"
            style={{
              width: "1px",
              height: "44px",
              background: "rgba(255,255,255,0.15)",
              flexShrink: 0,
              alignSelf: "center",
            }}
          />

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(36px, 4vw, 58px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              12
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "9px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: "6px",
                lineHeight: 1.6,
              }}
            >
              years
              <br />
              operating
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
