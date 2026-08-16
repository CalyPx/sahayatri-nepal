"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-width video welcome block. Accepts a real video + caption track once
 * filmed — for now it renders a poster-only placeholder so the section is
 * structurally ready to receive real media.
 */
export default function SignLanguageWelcome({
  videoSrc,
  captionsSrc,
  poster = "/hero_section_photo.webp",
}: {
  videoSrc?: string;
  captionsSrc?: string;
  poster?: string;
}) {
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
      aria-labelledby="sign-welcome-heading"
      style={{ background: "#FAFAF7", padding: "clamp(72px,8vw,120px) 0" }}
    >
      <div className="section-inner">
        <motion.div {...enter(0)} style={{ maxWidth: "640px", marginBottom: "40px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold-dark)",
              marginBottom: "20px",
            }}
          >
            A Welcome, In Our Language
          </p>
          <h2
            id="sign-welcome-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px,3.6vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#091426",
            }}
          >
            A message from our students, in Nepali Sign Language.
          </h2>
        </motion.div>

        <motion.div
          {...enter(0.12)}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-card-hover)",
            background: "#091426",
          }}
        >
          {videoSrc ? (
            <video
              controls
              poster={poster}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={videoSrc} />
              {captionsSrc && (
                <track kind="captions" src={captionsSrc} srcLang="en" label="English captions" default />
              )}
            </video>
          ) : (
            <>
              {/* Placeholder poster — swap videoSrc/captionsSrc props once footage is ready */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={poster}
                alt="Placeholder — sign language welcome video coming soon"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(9,20,38,0.35)",
                }}
              >
                <div
                  style={{
                    width: "76px",
                    height: "76px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.14)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                    <path d="M8 5v14l11-7Z" />
                  </svg>
                </div>
              </div>
              <span
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                Video coming soon
              </span>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
