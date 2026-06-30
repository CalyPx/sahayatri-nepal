"use client";

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
  return (
    <footer
      role="contentinfo"
      style={{
        background: "#0D1B2A",
        padding: "100px 0 52px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="section-inner">
        {/* Top grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "64px",
            paddingBottom: "72px",
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
                marginBottom: "24px",
              }}
            >
              <Image
                src="/sahayatri_nepal_logo.png"
                alt="Sahayatri Nepal"
                width={34}
                height={34}
                style={{ objectFit: "contain" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "16px",
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                Sahayatri Nepal
              </span>
            </Link>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.42)",
                maxWidth: "240px",
                marginBottom: "28px",
              }}
            >
              Educating deaf children in Karnali Province, Nepal since 2013. In partnership with Learn for Life, United Kingdom.
            </p>

            <a
              href="mailto:hhnjumla25@gmail.com"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.72)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.42)")
              }
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(255,255,255,0.42)",
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
                color: "rgba(255,255,255,0.42)",
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
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  marginBottom: "24px",
                }}
              >
                {title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")
                    }
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.45)",
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
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            © 2025 Sahayatri Nepal · Registered NGO, Jumla, Karnali Province, Nepal
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "13px",
              color: "rgba(255,255,255,0.22)",
            }}
          >
            Partner: Learn for Life, United Kingdom
          </span>
        </div>
      </div>
    </footer>
  );
}
