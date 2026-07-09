"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

const SECONDARY_REPORTS = [
  { date: "May 2025", title: "SEE Exam Results 2025",          href: "/reports/see-2025" },
  { date: "May 2025", title: "Child Safeguarding Training",     href: "/reports/safeguarding-2025" },
  { date: "May 2025", title: "Playground Installation, Jumla", href: "/reports/playground-2025" },
];

export default function Reports() {
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
      style={{ background: "#F0F7FF", padding: "clamp(90px,10vw,140px) 0" }}
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
              color: "#D4AF37",
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

        {/* Reports list — rows slide on transform, not padding */}
        <div style={{ borderTop: "1px solid rgba(9,20,38,0.08)" }}>
          {SECONDARY_REPORTS.map((report, i) => (
            <motion.div key={report.title} {...enter(0.18 + i * 0.07)}>
              <Link
                href={report.href}
                className="report-row"
                style={{
                  display: "block",
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(9,20,38,0.08)",
                  textDecoration: "none",
                }}
              >
                <span
                  className="report-row-inner"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 400,
                      fontSize: "12px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      color: "rgba(9,20,38,0.42)",
                      flexShrink: 0,
                      width: "92px",
                    }}
                  >
                    {report.date}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "16px",
                      color: "#091426",
                      flex: 1,
                    }}
                  >
                    {report.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "13px",
                      color: "#D4AF37",
                      flexShrink: 0,
                    }}
                  >
                    Read →
                  </span>
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
              gap: "6px",
              borderBottom: "1.5px solid #D4AF37",
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
