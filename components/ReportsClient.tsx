"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface ReportSummary {
  slug: string;
  title: string;
  date: string;
}

function DocIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 2h8l4 4v16H6V2Z"
        stroke="var(--gold-dark)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="rgba(140,109,31,0.06)"
      />
      <path d="M14 2v4h4" stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 13h6M9 16.5h6" stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ReportsClient({ reports }: { reports: ReportSummary[] }) {
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
      aria-labelledby="reports-heading"
      style={{ background: "#F0F7FF", padding: "clamp(72px,8vw,120px) 0" }}
    >
      <div className="section-inner">

        {/* Header */}
        <motion.div {...enter(0)} style={{ marginBottom: "48px" }}>
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
            Reports &amp; Updates
          </p>
          <h2
            id="reports-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px,4vw,48px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#091426",
            }}
          >
            Transparency is part of the work.
          </h2>
        </motion.div>

        {/* Document cards */}
        <div
          className="three-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {reports.map((report, i) => (
            <motion.div key={report.slug} {...enter(0.1 + i * 0.08)}>
              <Link
                href={`/reports/${report.slug}`}
                className="doc-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: "#FFFFFF",
                  border: "1px solid rgba(9,20,38,0.08)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <DocIcon />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 400,
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "rgba(9,20,38,0.65)",
                    marginBottom: "10px",
                  }}
                >
                  {report.date}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: 1.4,
                    color: "#091426",
                    marginBottom: "20px",
                    flex: 1,
                  }}
                >
                  {report.title}
                </p>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                    color: "var(--gold-dark)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Read
                  <span className="doc-card-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...enter(0.42)} style={{ marginTop: "32px" }}>
          <Link
            href="/reports"
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#091426")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--gold-dark)")
            }
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "14px",
              letterSpacing: "0.04em",
              textDecoration: "none",
              color: "var(--gold-dark)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderBottom: "1.5px solid var(--gold-dark)",
              paddingBottom: "3px",
              transition: "color 0.2s ease",
            }}
          >
            View all reports <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
