"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function StudentStory() {
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
      aria-labelledby="story-heading"
      style={{ background: "#FAFAF7", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div
        className="section-inner two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
        {/* Left — editorial image with angled cut, offset upward */}
        <motion.div
          {...enter(0)}
          className="story-image"
          style={{
            position: "relative",
            height: "clamp(300px, 45vw, 600px)",
            overflow: "hidden",
            marginTop: "-40px",
            clipPath:
              "polygon(0 0, 100% 0, 100% 90%, 92% 100%, 0 100%)",
          }}
        >
          <Image
            src="/hero_section_photo.webp"
            alt="A teacher and student communicating in sign language outside a school in Jumla, Nepal"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            style={{
              objectFit: "cover",
              objectPosition: "72% center",
            }}
          />
        </motion.div>

        {/* Right — story content */}
        <div style={{ paddingTop: "40px" }}>
          {/* Gold rule above the eyebrow */}
          <motion.div {...enter(0.1)}>
            <div
              aria-hidden="true"
              style={{
                width: "40px",
                height: "2px",
                background: "#D4AF37",
                marginBottom: "14px",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#D4AF37",
                marginBottom: "32px",
              }}
            >
              A Student&rsquo;s Story
            </p>
          </motion.div>

          {/* Quote — the gold border grows to full height on enter */}
          <motion.div
            {...enter(0.16)}
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "stretch",
              marginBottom: "40px",
            }}
          >
            <motion.div
              aria-hidden="true"
              initial={prefersReduced ? false : { scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
              style={{
                width: "2px",
                background: "#D4AF37",
                alignSelf: "stretch",
                flexShrink: 0,
                borderRadius: "1px",
                minHeight: "80px",
                transformOrigin: "top",
              }}
            />
            <blockquote
              id="story-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(26px,3vw,40px)",
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
                color: "#091426",
                margin: 0,
              }}
            >
              &ldquo;Before Sahayatri, I had no way to speak. Now I have words for everything I feel.&rdquo;
            </blockquote>
          </motion.div>

          <motion.p
            {...enter(0.22)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(9,20,38,0.68)",
              marginBottom: "16px",
            }}
          >
            Rajan arrived at Sahayatri at age eight, after three years at home in a remote village with no access to education. He had developed no spoken language and had never been to school.
          </motion.p>

          <motion.p
            {...enter(0.28)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(9,20,38,0.68)",
              marginBottom: "44px",
            }}
          >
            Four years later, Rajan passed his grade exams and taught basic sign language to two younger students who had just joined. He is twelve.
          </motion.p>

          <motion.div {...enter(0.34)}>
            <Link
              href="/stories"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#091426")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#D4AF37")
              }
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "14px",
                letterSpacing: "0.04em",
                textDecoration: "none",
                color: "#D4AF37",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                borderBottom: "1.5px solid #D4AF37",
                paddingBottom: "4px",
                transition: "color 0.2s ease",
              }}
            >
              Read more stories <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
