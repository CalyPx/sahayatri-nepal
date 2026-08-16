"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { useLanguage } from "./LanguageContext";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Film-grain: SVG feTurbulence tile, layered at 3% opacity */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const { t } = useLanguage();
  const HEADLINE_LINES = t.hero.headlineLines;

  /* Opening sequence:
     t=0      page is navy silence, nothing else
     t=0.35s  headline arrives word by word (80ms stagger)
     t=1.05s  the photo fades in behind the words
     t=1.5s+  eyebrow, paragraph, CTAs settle in            */
  const fade = (delay: number, y = 12) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  const headlineContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
  };
  const headlineWord = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  const h1Style: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(54px,7vw,88px)",
    lineHeight: 0.94,
    letterSpacing: "-0.045em",
    color: "#FFFFFF",
    maxWidth: "9ch",
    marginBottom: "34px",
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#091426",
      }}
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          animation: prefersReduced ? "none" : "kenburns 12s ease-out forwards",
          transformOrigin: "74% center",
          willChange: "transform",
        }}
      >
        <Image
          src="/hero_section_photo.webp"
          alt="A teacher communicates in Nepali sign language with a smiling child outside a school in Karnali Province, Nepal"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "74% center" }}
        />
      </div>

      {/* Refined overlay — lighter, mountains breathe */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,16,35,.40) 0%, rgba(5,16,35,.30) 30%, rgba(5,16,35,.10) 60%, rgba(5,16,35,.02) 100%)",
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: NOISE,
          backgroundRepeat: "repeat",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      {/* Opening silence — navy cover that lifts once the words exist */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.4, delay: 1.05, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            background: "#091426",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          minHeight: "100svh",
          paddingTop: "100px",
          paddingBottom: "clamp(48px, 8vh, 100px)",
          paddingLeft: "clamp(40px,6vw,100px)",
          paddingRight: "clamp(20px,3vw,40px)",
        }}
      >
        <div style={{ maxWidth: "560px", width: "100%" }}>
          {/* Eyebrow — arrives with the photo, not before the words */}
          <motion.p
            {...fade(1.5, 0)}
            className="hero-eyebrow"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: "24px",
              whiteSpace: "nowrap",
            }}
          >
            {t.hero.eyebrow}
          </motion.p>

          {/* Headline — word by word, like first words being learned */}
          {prefersReduced ? (
            <h1 style={h1Style}>
              {HEADLINE_LINES.map((line, li) => (
                <span key={li}>
                  {line.join(" ")}
                  {li < HEADLINE_LINES.length - 1 && <br />}
                </span>
              ))}
            </h1>
          ) : (
            <motion.h1
              style={h1Style}
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              aria-label={HEADLINE_LINES.map((l) => l.join(" ")).join(" ")}
            >
              {HEADLINE_LINES.map((line, li) => (
                <span
                  key={li}
                  aria-hidden="true"
                  style={{ display: "block" }}
                >
                  {line.map((word, wi) => (
                    <motion.span
                      key={wi}
                      variants={headlineWord}
                      style={{ display: "inline-block", willChange: "transform" }}
                    >
                      {word}
                      {wi < line.length - 1 ? " " : ""}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          )}

          {/* Paragraph */}
          <motion.p
            {...fade(1.65)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,.84)",
              marginTop: 0,
              maxWidth: "480px",
            }}
          >
            {t.hero.paragraph}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fade(1.8, 0)}
            className="hero-ctas"
            style={{
              display: "flex",
              gap: "22px",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: "44px",
            }}
          >
            <Button href="/donate" size="md" style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {t.hero.donate}
            </Button>

            <Button href="/about" variant="ghost" size="md">
              {t.hero.story}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
