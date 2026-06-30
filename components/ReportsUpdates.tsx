"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BLUE = "#1A6FA8";
const DARK = "#0A1628";
const EASE = [0.22, 1, 0.36, 1] as const;

const REPORTS = [
  {
    date: "May 2025",
    title: "SEE Exam Results 2025",
    description:
      "100% pass rate achieved by all students sitting the national SEE examination at Karnali Secondary School, Anamnagar.",
    href: "/reports/see-2025",
    photo: "/class-group-photo.jpg",
    photoAlt: "Students at Karnali Secondary School",
    placeholder: null,
  },
  {
    date: "May 2025",
    title: "Child Safeguarding Training",
    description:
      "One-day orientation programme on child safeguarding policy held at Karnali Secondary School, Jumla.",
    href: "/reports/safeguarding-2025",
    photo: null,
    photoAlt: null,
    placeholder: "CHILD SAFEGUARDING",
  },
  {
    date: "May 2025",
    title: "Playground Installation",
    description:
      "New playground equipment installed at Anamnagar Junior School, Jumla, funded by Learn for Life UK.",
    href: "/reports/playground-2025",
    photo: null,
    photoAlt: null,
    placeholder: "PLAYGROUND",
  },
  {
    date: "2024–25",
    title: "Annual Report",
    description:
      "Full programme report covering education outcomes, housing, and financial transparency for the 2024–25 academic year.",
    href: "/reports/annual-2024-25",
    photo: null,
    photoAlt: null,
    placeholder: "ANNUAL REPORT",
  },
];

export default function ReportsUpdates() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReduced = useReducedMotion();

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.28, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-labelledby="reports-heading"
      className="section-pad-reports"
      style={{ background: "#F0F7FF", padding: "100px 120px" }}
    >
      <motion.p
        {...enter(0)}
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "10px",
          color: BLUE,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          margin: "0 0 16px 0",
        }}
      >
        REPORTS &amp; UPDATES
      </motion.p>

      <motion.h2
        id="reports-heading"
        {...enter(0.07)}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(28px, 3vw, 40px)",
          color: DARK,
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          margin: "0 0 48px 0",
        }}
      >
        What we&rsquo;ve achieved.
      </motion.h2>

      <div
        className="reports-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        {REPORTS.map((report, i) => (
          <motion.div
            key={report.title}
            {...enter(0.12 + i * 0.07)}
            className="report-card"
            onMouseEnter={(e) => {
              if (prefersReduced) return;
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px rgba(26,111,168,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            style={{
              background: "#FFFFFF",
              border: "1px solid #D0E4F4",
              borderRadius: "4px",
              transition: "box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Photo or placeholder */}
            {report.photo ? (
              <div style={{ position: "relative", height: "160px", flexShrink: 0 }}>
                <Image
                  src={report.photo}
                  alt={report.photoAlt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div
                style={{
                  height: "160px",
                  background: "linear-gradient(135deg, #1A6FA8 0%, #0D4F7A 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  padding: "0 24px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.3)",
                    lineHeight: 1.3,
                  }}
                >
                  {report.title}
                </span>
              </div>
            )}

            {/* Card body */}
            <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", flex: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 400,
                  fontSize: "11px",
                  color: BLUE,
                  background: "#EBF4FF",
                  padding: "3px 8px",
                  borderRadius: "2px",
                  marginBottom: "12px",
                  display: "inline-block",
                  alignSelf: "flex-start",
                }}
              >
                {report.date}
              </span>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "17px",
                  color: DARK,
                  lineHeight: 1.35,
                  marginBottom: "8px",
                }}
              >
                {report.title}
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "#5A6A7A",
                  lineHeight: 1.6,
                  margin: "0 0 16px 0",
                  flex: 1,
                }}
              >
                {report.description}
              </p>

              <Link
                href={report.href}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#0D4F7A")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = BLUE)
                }
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: BLUE,
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "color 0.2s ease",
                }}
              >
                View report →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
