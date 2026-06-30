"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

const SECONDARY_REPORTS = [
  { date: "May 2025", title: "SEE Exam Results 2025",          href: "/reports/see-2025" },
  { date: "May 2025", title: "Child Safeguarding Training",     href: "/reports/safeguarding-2025" },
  { date: "May 2025", title: "Playground Installation, Jumla", href: "/reports/playground-2025" },
];

export default function Reports() {
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
      aria-labelledby="reports-heading"
      style={{ background: "#FAFAF8", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div className="section-inner">

        {/* Header */}
        <motion.div {...enter(0)} style={{ marginBottom: "56px" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.18em",
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
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(34px,4.5vw,52px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#0D1B2A",
            }}
          >
            Transparency is part of the work.
          </h2>
        </motion.div>

        {/* Featured report — bordered card */}
        <motion.div
          {...enter(0.1)}
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: "24px",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.07)",
            marginBottom: "48px",
          }}
        >
          {/* Left — report cover */}
          <div
            style={{
              background: "#0D1B2A",
              padding: "56px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "340px",
            }}
          >
            {/* Cover top */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                aria-hidden="true"
                style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D4AF37" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                Sahayatri Nepal
              </span>
            </div>

            {/* Cover bottom */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#D4AF37",
                  marginBottom: "12px",
                }}
              >
                Annual Report
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "clamp(52px,7vw,78px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                2024–25
              </p>
            </div>
          </div>

          {/* Right — report detail */}
          <div
            style={{
              background: "#FFFFFF",
              padding: "56px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(22px,2.4vw,28px)",
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  color: "#0D1B2A",
                  marginBottom: "20px",
                }}
              >
                Annual Report 2024–25
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "17px",
                  lineHeight: 1.75,
                  color: "#6B7A8D",
                  marginBottom: "40px",
                  maxWidth: "44ch",
                }}
              >
                Full programme report covering education outcomes, residential housing, child safeguarding, and financial transparency for the 2024–25 academic year.
              </p>
            </div>
            <Link
              href="/reports/annual-2024-25"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#c49e2f";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#D4AF37";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#0D1B2A",
                backgroundColor: "#D4AF37",
                paddingInline: "28px",
                height: "50px",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "10px",
                alignSelf: "flex-start",
                transition: "background-color 0.2s ease, transform 0.2s ease",
              }}
            >
              Download Report
            </Link>
          </div>
        </motion.div>

        {/* Secondary reports list */}
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          {SECONDARY_REPORTS.map((report, i) => (
            <motion.div key={report.title} {...enter(0.18 + i * 0.07)}>
              <Link
                href={report.href}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.07)";
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "22px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  textDecoration: "none",
                  gap: "24px",
                  transition: "padding-left 0.2s ease, border-color 0.2s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "13px",
                    color: "#9AA5B1",
                    flexShrink: 0,
                    width: "80px",
                  }}
                >
                  {report.date}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "#0D1B2A",
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
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...enter(0.42)} style={{ marginTop: "32px" }}>
          <Link
            href="/reports"
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
