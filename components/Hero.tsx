"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Headline preserved exactly, split for word-by-word arrival */
const HEADLINE_LINES = [["Every", "child"], ["deserves", "a"], ["language."]];

/* Film-grain: SVG feTurbulence tile, layered at 3% opacity */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

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
  btn.style.boxShadow = "0 6px 20px rgba(212,175,55,0.45)";
};

const handleDonateLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const btn = e.currentTarget;
  btn.querySelector(".donate-ripple")?.classList.remove("donate-ripple-active");
  btn.style.transform = "translateY(0)";
  btn.style.boxShadow = "none";
};

export default function Hero() {
  const prefersReduced = useReducedMotion();

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
          animation: prefersReduced ? "none" : "kenburns 24s ease-out forwards",
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
            "linear-gradient(90deg, rgba(5,16,35,.58) 0%, rgba(5,16,35,.42) 30%, rgba(5,16,35,.12) 60%, rgba(5,16,35,.02) 100%)",
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
            Deaf Education · Karnali Province, Nepal
          </motion.p>

          {/* Headline — word by word, like first words being learned */}
          {prefersReduced ? (
            <h1 style={h1Style}>
              Every child<br />
              deserves a<br />
              language.
            </h1>
          ) : (
            <motion.h1
              style={h1Style}
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              aria-label="Every child deserves a language."
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
              lineHeight: 1.7,
              color: "rgba(255,255,255,.84)",
              marginTop: 0,
              maxWidth: "480px",
            }}
          >
            Sahayatri Nepal provides education, safe housing and life skills for deaf children in remote Karnali Province.
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
            <Link
              href="/donate"
              className="donate-spotlight-btn donate-spotlight-md"
              onMouseEnter={handleDonateEnter}
              onMouseLeave={handleDonateLeave}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#091426",
                backgroundColor: "#D4AF37",
                paddingInline: "34px",
                height: "54px",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "10px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              <span className="donate-btn-text">Donate Now</span>
            </Link>

            <Link
              href="/about"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.10)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.32)";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.86)";
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "rgba(255,255,255,0.86)",
                backgroundColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                paddingInline: "34px",
                height: "54px",
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "10px",
                transition: "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
