"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROGRAMS = [
  {
    num: "01",
    title: "Education",
    photo: "/photos/education-classroom.jpg",
    photoAlt: "Staff and students in a training session at a Karnali school, with a presentation displayed on screen",
    description:
      "Sign language curriculum and qualified teachers for deaf students across Karnali Province. Structured learning that meets national standards.",
    href: "/projects#education",
  },
  {
    num: "02",
    title: "Safe Housing",
    photo: "/photos/safe-housing-dormitory.jpg",
    photoAlt: "Staff and students posing together during a celebration at the Sahayatri Nepal center",
    description:
      "Residential accommodation in Jumla for students who travel days from remote villages. A safe home so learning can happen.",
    href: "/projects#housing",
  },
  {
    num: "03",
    title: "Life Skills",
    photo: "/photos/life-skills-activity.jpg",
    photoAlt: "Children playing on swings and a slide in the school playground in Jumla",
    description:
      "Art, sport, child safeguarding, and extracurricular programmes. We believe childhood matters as much as academics.",
    href: "/projects#life-skills",
  },
];

export default function Programs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number, y = 32) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="programs-heading"
      style={{ background: "#F0F7FF", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div className="section-inner">

        {/* Header */}
        <motion.div {...enter(0)} style={{ marginBottom: "72px", maxWidth: "560px" }}>
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
            What We Do
          </p>
          <h2
            id="programs-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px,4vw,48px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#091426",
            }}
          >
            Three programmes.<br />One commitment.
          </h2>
        </motion.div>

        {/* Cards — hover handled in CSS (.program-card in globals.css):
            lift -6px, photo zoom 1.06/600ms, gold left border, arrow slide */}
        <div
          className="three-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "28px",
            alignItems: "stretch",
          }}
        >
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.title}
              {...enter(0.1 + i * 0.1, 40)}
              className="program-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 16px rgba(9,20,38,0.05)",
                overflow: "hidden",
              }}
            >
              {/* Photo with badge overlay */}
              <div
                className="program-photo"
                style={{
                  position: "relative",
                  height: "200px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={program.photo}
                  alt={program.photoAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                {/* Number badge as absolute overlay */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#1A6FA8",
                    background: "rgba(250,250,247,0.92)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    padding: "4px 10px",
                    borderRadius: "4px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {program.num}
                </span>
              </div>

              <div
                style={{
                  padding: "28px 29px 32px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "#091426",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                    lineHeight: 1.2,
                  }}
                >
                  {program.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(9,20,38,0.58)",
                    marginBottom: "32px",
                    flex: 1,
                  }}
                >
                  {program.description}
                </p>

                <Link
                  href={program.href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    color: "var(--gold-dark)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    alignSelf: "flex-start",
                    borderBottom: "1px solid var(--gold-dark)",
                    paddingBottom: "2px",
                  }}
                >
                  Learn more
                  <span className="program-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
