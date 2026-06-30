"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StudentStory() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

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
      aria-labelledby="story-heading"
      style={{ background: "#FFFFFF", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div
        className="section-inner two-col"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "96px",
          alignItems: "start",
        }}
      >
        {/* Left — editorial image, offset upward */}
        <motion.div
          {...enter(0)}
          style={{
            position: "relative",
            height: "600px",
            borderRadius: "24px",
            overflow: "hidden",
            marginTop: "-40px",
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
              transition: prefersReduced ? "none" : "transform 0.7s ease",
            }}
            onMouseEnter={(e) => {
              if (!prefersReduced)
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            }}
          />
        </motion.div>

        {/* Right — story content */}
        <div style={{ paddingTop: "40px" }}>
          <motion.p
            {...enter(0.1)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: "32px",
            }}
          >
            A Student&rsquo;s Story
          </motion.p>

          {/* Quote with thin vertical gold line */}
          <motion.div
            {...enter(0.16)}
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
              marginBottom: "40px",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "2px",
                background: "#D4AF37",
                alignSelf: "stretch",
                flexShrink: 0,
                borderRadius: "1px",
                minHeight: "80px",
              }}
            />
            <blockquote
              id="story-heading"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(26px,3vw,40px)",
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
                color: "#0D1B2A",
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
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#4A5568",
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
              fontSize: "18px",
              lineHeight: 1.8,
              color: "#4A5568",
              marginBottom: "44px",
            }}
          >
            Four years later, Rajan passed his grade exams and taught basic sign language to two younger students who had just joined. He is twelve.
          </motion.p>

          <motion.div {...enter(0.34)}>
            <Link
              href="/stories"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#0D1B2A")
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
