"use client";

import { useEffect, useRef } from "react";

/**
 * Thin scroll-progress bar fixed to the TOP of the viewport, filling
 * left-to-right as the reader travels the page. सहयात्री means "fellow
 * traveller"; this line walks the journey with you.
 *
 * Driven by a passive scroll listener + rAF, animating transform only.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 90,
        pointerEvents: "none",
        background: "rgba(212,175,55,0.14)",
      }}
    >
      <div
        ref={barRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "#D4AF37",
          transform: "scaleX(0)",
          transformOrigin: "left",
          willChange: "transform",
        }}
      />
    </div>
  );
}
