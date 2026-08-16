"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZE_STYLES: Record<Size, { height: string; paddingInline: string; fontSize: string }> = {
  sm: { height: "38px", paddingInline: "20px", fontSize: "13px" },
  md: { height: "54px", paddingInline: "34px", fontSize: "13px" },
  lg: { height: "56px", paddingInline: "48px", fontSize: "14px" },
};

/* Ripple-fill hover effect shared by every primary button on the site. */
const handleRippleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
  btn.style.transform = "translateY(-2px)";
  btn.style.boxShadow = "0 6px 20px rgba(212,175,55,0.45)";
};

const handleRippleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const btn = e.currentTarget;
  btn.querySelector(".donate-ripple")?.classList.remove("donate-ripple-active");
  btn.style.transform = "translateY(0)";
  btn.style.boxShadow = "none";
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  style,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  style?: React.CSSProperties;
}) {
  const s = SIZE_STYLES[size];

  if (variant === "ghost") {
    return (
      <Link
        href={href}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(9,20,38,0.55)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(9,20,38,0.35)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.28)";
        }}
        className={className}
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: s.fontSize,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textDecoration: "none",
          color: "#FFFFFF",
          backgroundColor: "rgba(9,20,38,0.35)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          paddingInline: s.paddingInline,
          height: s.height,
          display: "inline-flex",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.28)",
          borderRadius: "var(--radius-sm)",
          transition: "background-color 0.2s ease, border-color 0.2s ease",
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`donate-spotlight-btn ${className ?? ""}`}
      onMouseEnter={handleRippleEnter}
      onMouseLeave={handleRippleLeave}
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: s.fontSize,
        letterSpacing: "0.04em",
        textDecoration: "none",
        color: "#091426",
        backgroundColor: "#D4AF37",
        paddingInline: s.paddingInline,
        height: s.height,
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "var(--radius-sm)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span className="donate-btn-text">{children}</span>
    </Link>
  );
}
