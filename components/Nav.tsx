"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const GOLD = "#D4AF37";

const LINKS = [
  { label: "About",    href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Impact",   href: "/impact" },
  { label: "Stories",  href: "/stories" },
  { label: "Reports",  href: "/reports" },
  { label: "Contact",  href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* Skip link — visible only on keyboard focus (keyboard-nav rule) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-[#0A1628] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:rounded"
      >
        Skip to main content
      </a>

      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(10,22,40,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          paddingTop: scrolled ? "12px" : "20px",
          paddingBottom: scrolled ? "12px" : "20px",
          transition: "background-color 0.4s ease, padding 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark — logo image alt="" because the text beside it describes the brand */}
          <Link
            href="/"
            aria-label="Sahayatri Nepal — home"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent"
            style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
          >
            <div style={{ position: "relative", width: "40px", height: "40px", flexShrink: 0 }}>
              <Image
                src="/sahayatri_nepal_logo.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="40px"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                }}
              >
                Sahayatri Nepal
              </span>
              <span
                style={{
                  fontFamily: "var(--font-dancing)",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: GOLD,
                  lineHeight: 1.1,
                }}
              >
                सहयात्री
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden md:flex items-center" style={{ gap: "42px" }}>
            {LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  onMouseEnter={(e) => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = GOLD;
                      el.style.opacity = "1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "#FFFFFF";
                      el.style.opacity = "0.7";
                    }
                  }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: active ? 600 : 500,
                    fontSize: "13px",
                    color: active ? GOLD : "#FFFFFF",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    opacity: active ? 1 : 0.7,
                    transition: "color 0.25s ease, opacity 0.2s ease",
                    paddingBottom: "3px",
                    borderBottom: active ? `1px solid ${GOLD}` : "1px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/donate"
              aria-label="Donate to Sahayatri Nepal"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.12)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "13px",
                color: GOLD,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: `1px solid ${GOLD}`,
                padding: "9px 20px",
                background: "transparent",
                transition: "background 0.25s ease",
              }}
            >
              DONATE
            </Link>
          </nav>

          {/* Mobile hamburger — padding ensures ≥44×44px touch target */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              padding: "10px",        // 10+24+10 = 44px touch target
              background: "none",
              border: "none",
              cursor: "pointer",
              minWidth: "44px",
              minHeight: "44px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "22px",
                  height: "1.5px",
                  backgroundColor: "#FFFFFF",
                  transition: "all 0.25s ease",
                  transform:
                    i === 0 && open
                      ? "rotate(45deg) translateY(6.5px)"
                      : i === 2 && open
                      ? "rotate(-45deg) translateY(-6.5px)"
                      : "none",
                  opacity: i === 1 && open ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            style={{
              backgroundColor: "rgba(10,22,40,0.98)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "24px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: active ? 600 : 500,
                    fontSize: "12px",
                    color: active ? GOLD : "#FFFFFF",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    opacity: active ? 1 : 0.75,
                    paddingBottom: active ? "2px" : undefined,
                    borderBottom: active ? `1px solid ${GOLD}` : undefined,
                    display: "inline-block",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "12px",
                color: GOLD,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: `1px solid ${GOLD}`,
                padding: "12px 20px",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              DONATE
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
