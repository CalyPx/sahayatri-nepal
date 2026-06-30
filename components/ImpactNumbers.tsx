"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { target: 47,  suffix: "",  label: "Students enrolled", sub: "Karnali Province" },
  { target: 100, suffix: "%", label: "SEE pass rate",      sub: "Class of 2025"   },
  { target: 12,  suffix: "",  label: "Years of service",   sub: "Since 2013"      },
];

function useCountUp(target: number, duration: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (!active) return;
    if (reduced) { setValue(target); return; }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);
  return value;
}

export default function ImpactNumbers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const c0 = useCountUp(STATS[0].target, 2000, inView, reduced);
  const c1 = useCountUp(STATS[1].target, 2200, inView, reduced);
  const c2 = useCountUp(STATS[2].target, 1800, inView, reduced);
  const counts = [c0, c1, c2];

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
      aria-labelledby="impact-heading"
      style={{ background: "#FFFFFF", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div className="section-inner">

        {/* Header */}
        <motion.div {...enter(0)} style={{ marginBottom: "72px" }}>
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
            Our Impact
          </p>
          <h2
            id="impact-heading"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(32px,4vw,48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0D1B2A",
              marginBottom: "16px",
            }}
          >
            Twelve years of showing up.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#6B7A8D",
              maxWidth: "48ch",
            }}
          >
            These are the numbers that matter.
          </p>
        </motion.div>

        {/* Stats row */}
        <div
          className="impact-row"
          style={{ display: "flex", alignItems: "flex-start", gap: 0 }}
        >
          {STATS.map((stat, i) => (
            <>
              <motion.div
                key={stat.label}
                {...enter(0.1 + i * 0.12)}
                style={{ flex: 1 }}
              >
                <div
                  aria-label={`${stat.target}${stat.suffix}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: "clamp(72px,9vw,96px)",
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                    color: "#D4AF37",
                    marginBottom: "20px",
                  }}
                >
                  {counts[i]}{stat.suffix}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#0D1B2A",
                    marginBottom: "6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#6B7A8D",
                  }}
                >
                  {stat.sub}
                </p>
              </motion.div>

              {i < STATS.length - 1 && (
                <div
                  key={`divider-${i}`}
                  className="impact-divider"
                  aria-hidden="true"
                  style={{
                    width: "1px",
                    height: "100px",
                    background: "rgba(0,0,0,0.08)",
                    alignSelf: "center",
                    flexShrink: 0,
                    margin: "0 64px",
                  }}
                />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
