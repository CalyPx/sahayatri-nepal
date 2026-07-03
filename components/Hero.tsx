"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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

  const fade = (delay: number, y = 12) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: EASE },
        };

  return (
    <section
      aria-label="Introduction"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        overflow: "hidden",
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
          {/* Eyebrow */}
          <motion.p
            {...fade(0, 0)}
            className="hero-eyebrow"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#D8A826",
              marginBottom: "24px",
              whiteSpace: "nowrap",
            }}
          >
            Deaf Education · Karnali Province, Nepal
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fade(0.06)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(68px,7vw,88px)",
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              color: "#FFFFFF",
              maxWidth: "9ch",
              marginBottom: "34px",
            }}
          >
            Every child<br />
            deserves a<br />
            language.
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            {...fade(0.12)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "19px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,.84)",
              marginTop: 0,
              maxWidth: "500px",
            }}
          >
            Sahayatri Nepal provides education, safe housing and life skills for deaf children in remote Karnali Province.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fade(0.18, 0)}
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
                color: "#05101f",
                backgroundColor: "#D8A826",
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
