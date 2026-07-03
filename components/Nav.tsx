"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const handleDonateEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const maxDist = Math.max(
    Math.hypot(x, y),
    Math.hypot(rect.width - x, y),
    Math.hypot(x, rect.height - y),
    Math.hypot(rect.width - x, rect.height - y),
  );
  const scaleNeeded = (maxDist * 2.2) / 8;
  const existing = btn.querySelector(".donate-ripple");
  if (existing) existing.remove();
  const circle = document.createElement("span");
  circle.className = "donate-ripple";
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
  circle.style.setProperty("--ripple-scale", String(scaleNeeded));
  btn.appendChild(circle);
  requestAnimationFrame(() => circle.classList.add("donate-ripple-active"));
  btn.style.boxShadow = "0 4px 16px rgba(212,175,55,0.4)";
};

const handleDonateLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const btn = e.currentTarget;
  btn.querySelector(".donate-ripple")?.classList.remove("donate-ripple-active");
  btn.style.boxShadow = "none";
};

const LINKS = [
  { label: "Home",     href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Contact",  href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 80;
      scrolledRef.current = s;
      setScrolled(s);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href);

  const linkColor = (active: boolean) =>
    active
      ? scrolled ? "#091426" : "#FFFFFF"
      : scrolled ? "rgba(9,20,38,0.60)" : "rgba(255,255,255,0.80)";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-[#0D1B2A] focus:px-4 focus:py-2 focus:text-sm focus:rounded"
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
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid transparent",
          transition:
            "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 clamp(24px,5vw,80px)",
            height: "76px",
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
              width={44}
              height={44}
              style={{ objectFit: "contain" }}
              priority
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
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
          <nav aria-label="Primary" className="hidden md:flex items-center" style={{ gap: "26px" }}>
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
                      (e.currentTarget as HTMLElement).style.color = "#D4AF37";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = linkColor(active);
                  }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "15px",
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

            {/* Donate — always gold */}
            <Link
              href="/donate"
              className="donate-spotlight-btn donate-spotlight-sm"
              onMouseEnter={handleDonateEnter}
              onMouseLeave={handleDonateLeave}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.01em",
                textDecoration: "none",
                color: "#0D1B2A",
                backgroundColor: "#D4AF37",
                paddingInline: "20px",
                height: "38px",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: "10px",
                marginLeft: "10px",
                transition: "box-shadow 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              <span className="donate-btn-text">Donate</span>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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
                  backgroundColor: scrolled ? "#1A1A1A" : "#FFFFFF",
                  transition: "background-color 0.3s ease, transform 0.2s ease, opacity 0.2s ease",
                  transform:
                    i === 0 && open ? "rotate(45deg) translateY(6.5px)"
                    : i === 2 && open ? "rotate(-45deg) translateY(-6.5px)"
                    : "none",
                  opacity: i === 1 && open ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <nav
            aria-label="Mobile navigation"
            style={{
              backgroundColor: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              padding: "24px clamp(24px,5vw,80px) 32px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
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
              className="donate-spotlight-btn donate-spotlight-sm"
              onMouseEnter={handleDonateEnter}
              onMouseLeave={handleDonateLeave}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                color: "#0D1B2A",
                backgroundColor: "#D4AF37",
                padding: "12px 24px",
                textAlign: "center",
                borderRadius: "10px",
                marginTop: "4px",
                alignSelf: "flex-start",
                transition: "box-shadow 0.2s ease",
              }}
            >
              <span className="donate-btn-text">Donate</span>
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
