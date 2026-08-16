"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "./LanguageContext";

export default function Nav() {
  const { locale, setLocale, t } = useLanguage();
  const LINKS = [
    { label: t.nav.home,     href: "/" },
    { label: t.nav.about,    href: "/about" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.gallery,  href: "/gallery" },
    { label: t.nav.contact,  href: "/contact" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const heroBottom = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const hero = document.getElementById("hero");
    const measure = () => {
      heroBottom.current = hero ? hero.offsetHeight : window.innerHeight;
    };
    measure();

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);

      // Smart nav: hide on scroll down, reappear on scroll up.
      // Never hide inside the hero, and only after 200px.
      const goingDown = y > lastY.current;
      if (y <= Math.max(200, heroBottom.current - 76)) {
        setHidden(false);
      } else {
        setHidden(goingDown);
      }
      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href);

  const linkColor = (active: boolean) =>
    active
      ? scrolled ? "#091426" : "#FFFFFF"
      : scrolled ? "rgba(9,20,38,0.60)" : "rgba(255,255,255,0.95)";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[200] focus-visible:bg-white focus-visible:text-[#091426] focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:rounded"
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
          background: scrolled ? "rgba(250,250,247,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(9,20,38,0.06)"
            : "1px solid transparent",
          transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
          transition:
            "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 clamp(24px,5vw,80px)",
            height: scrolled ? "72px" : "88px",
            transition: "height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            aria-label="Sahayatri Nepal — home"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <Image
              src="/sahayatri_nepal_logo.png"
              alt=""
              aria-hidden="true"
              width={51}
              height={51}
              style={{ objectFit: "contain" }}
              priority
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "15px",
                color: scrolled ? "#091426" : "#FFFFFF",
                letterSpacing: "-0.01em",
                transition: "color 0.3s ease",
              }}
            >
              Sahayatri Nepal
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center" style={{ gap: "38px" }}>
            {LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={active ? "nav-link nav-link-active" : "nav-link"}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.color = scrolled ? "#8C6D1F" : "#D4AF37";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = linkColor(active);
                  }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    color: linkColor(active),
                    transition: "color 0.3s ease",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Donate — pill shape, gold, subtle scale on hover */}
            <Link
              href="/donate"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(212,175,55,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(212,175,55,0.18)";
              }}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.01em",
                textDecoration: "none",
                color: "#091426",
                backgroundColor: "#D4AF37",
                paddingInline: "22px",
                height: "40px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                borderRadius: "var(--radius-pill)",
                marginLeft: "10px",
                boxShadow: "0 2px 8px rgba(212,175,55,0.18)",
                transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {t.nav.donate}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#091426" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ne" : "en")}
              aria-label={locale === "en" ? "Switch to Nepali" : "Switch to English"}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "12px",
                letterSpacing: "0.02em",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: scrolled ? "rgba(9,20,38,0.6)" : "rgba(255,255,255,0.85)",
                marginLeft: "6px",
                padding: "6px",
              }}
            >
              {locale === "en" ? "नेपाली" : "EN"}
            </button>
          </nav>

          {/* Mobile hamburger — icon animates into an X via transform/opacity only */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-open={open}
            className="flex md:hidden"
            style={{
              flexDirection: "column",
              gap: "5px",
              padding: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              minWidth: "44px",
              minHeight: "44px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  backgroundColor: scrolled ? "#091426" : "#FFFFFF",
                  transition:
                    "background-color 0.3s ease, transform 0.25s ease-in-out, opacity 0.25s ease-in-out",
                  transform:
                    i === 0 && open ? "translateY(6.5px) rotate(45deg)"
                    : i === 2 && open ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                  opacity: i === 1 && open ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile drawer — always rendered (hidden via opacity/transform)
            so the open transition has a "closed" DOM state to animate
            from on the very first open, not just on subsequent closes. */}
        <nav
            aria-label="Mobile navigation"
            data-open={open}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "rgba(250,250,247,0.96)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderTop: "1px solid rgba(9,20,38,0.06)",
              padding: "24px clamp(24px,5vw,80px) 32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              transformOrigin: "top",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-8px)",
              transition: open
                ? "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)"
                : "opacity 0.2s ease-in, transform 0.2s ease-in",
              pointerEvents: open ? "auto" : "none",
              visibility: open ? "visible" : "hidden",
            }}
          >
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "15px",
                  textDecoration: "none",
                  color: "#091426",
                  opacity: isActive(link.href) ? 1 : 0.60,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                color: "#091426",
                backgroundColor: "#D4AF37",
                padding: "12px 26px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                textAlign: "center",
                borderRadius: "var(--radius-pill)",
                marginTop: "4px",
                alignSelf: "flex-start",
                boxShadow: "0 2px 8px rgba(212,175,55,0.18)",
              }}
            >
              {t.nav.donate}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#091426" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ne" : "en")}
              aria-label={locale === "en" ? "Switch to Nepali" : "Switch to English"}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(9,20,38,0.6)",
                marginTop: "8px",
                padding: 0,
                alignSelf: "flex-start",
              }}
            >
              {locale === "en" ? "नेपाली" : "EN"}
            </button>
        </nav>
      </header>
    </>
  );
}
