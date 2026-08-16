"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const COL_LINKS = {
  Organization: [
    { label: "About Us",       href: "/about" },
    { label: "Our Team",       href: "/about#team" },
    { label: "Partners",       href: "/about#partners" },
    { label: "Safeguarding",   href: "/about#safeguarding" },
  ],
  Projects: [
    { label: "Education",      href: "/projects#education" },
    { label: "Safe Housing",   href: "/projects#housing" },
    { label: "Life Skills",    href: "/projects#life-skills" },
    { label: "Gallery",        href: "/gallery" },
  ],
  Reports: [
    { label: "Annual Report 2024–25", href: "/reports/annual-2024-25" },
    { label: "SEE Results 2025",      href: "/reports/see-2025" },
    { label: "Safeguarding",          href: "/reports/safeguarding-2025" },
    { label: "All Reports",           href: "/reports" },
  ],
};

export default function Footer() {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerStatus, setFooterStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleFooterSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!footerEmail) return;
    setFooterStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: footerEmail }),
      });
      if (res.ok) {
        setFooterStatus("done");
        setFooterEmail("");
      } else {
        setFooterStatus("error");
      }
    } catch {
      setFooterStatus("error");
    }
  }

  return (
    <footer
      role="contentinfo"
      style={{
        position: "relative",
        background: "#091426",
        padding: "140px 0 64px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
        {/* Top grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "80px",
            paddingBottom: "88px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Col 1 — Brand */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "14px",
              }}
            >
              <Image
                src="/sahayatri_nepal_logo.png"
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                style={{ objectFit: "contain" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#FAFAF7",
                  letterSpacing: "-0.01em",
                }}
              >
                Sahayatri Nepal
              </span>
            </Link>

            {/* Signature — gold script with a slow shimmer */}
            <p
              className="script-shimmer"
              style={{
                fontFamily: "var(--font-script)",
                fontWeight: 700,
                fontSize: "26px",
                lineHeight: 1.3,
                marginBottom: "22px",
              }}
            >
              सहयात्री नेपाल
            </p>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.62)",
                maxWidth: "240px",
                marginBottom: "28px",
              }}
            >
              Educating deaf children in Karnali Province, Nepal since 2013. In partnership with Learn for Life, United Kingdom.
            </p>

            <a
              href="mailto:hhnjumla25@gmail.com"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.62)")
              }
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(255,255,255,0.62)",
                textDecoration: "none",
                display: "block",
                marginBottom: "6px",
                transition: "color 0.2s ease",
              }}
            >
              hhnjumla25@gmail.com
            </a>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(255,255,255,0.62)",
              }}
            >
              +977 984-5165386
            </span>
          </div>

          {/* Link columns */}
          {Object.entries(COL_LINKS).map(([title, links]) => (
            <div key={title}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.58)",
                  paddingBottom: "10px",
                  marginBottom: "0",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.90)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.62)")
                    }
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.62)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Partners + newsletter — structural scaffold, real content/copy TBD */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "32px",
            padding: "44px 0",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Partner org logos */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              In partnership with
            </span>
            {/* Placeholder chip — swap for the real Learn for Life logo mark */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "36px",
                paddingInline: "16px",
                border: "1px solid rgba(255,255,255,0.14)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "13px",
                color: "rgba(255,255,255,0.72)",
                whiteSpace: "nowrap",
              }}
            >
              Learn for Life, UK
            </div>
          </div>

          {/* Newsletter signup */}
          {footerStatus === "done" ? (
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#D4AF37" }}>
              ✓ Subscribed. Thank you.
            </p>
          ) : (
            <form onSubmit={handleFooterSubscribe} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder="Your email address"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: "var(--radius-sm)",
                  padding: "11px 16px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  color: "#FAFAF7",
                  minWidth: "200px",
                }}
              />
              <button
                type="submit"
                disabled={footerStatus === "sending"}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#091426",
                  background: "#D4AF37",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  padding: "11px 20px",
                  cursor: footerStatus === "sending" ? "wait" : "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {footerStatus === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "36px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Left: Facebook icon + copyright */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <a
              href="https://www.facebook.com/profile.php?id=61588662294463"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sahayatri Nepal on Facebook"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#D4AF37")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.62)")
              }
              style={{
                color: "rgba(255,255,255,0.62)",
                transition: "color 0.2s ease",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              © 2025 Sahayatri Nepal · Registered NGO, Jumla, Karnali Province, Nepal
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Partner: Learn for Life, United Kingdom
          </span>
        </div>
      </div>
    </footer>
  );
}
