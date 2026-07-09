"use client";

import { Fragment, useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const COUNT_DURATION = 1200; // spec: 1200ms, ease-out

const STATS = [
  { target: 47,  suffix: "",  label: "Students enrolled", sub: "Karnali Province" },
  { target: 100, suffix: "%", label: "SEE pass rate",      sub: "Class of 2025"   },
  { target: 12,  suffix: "",  label: "Years of service",   sub: "Since 2013"      },
];

function useCountUp(target: number, active: boolean, reduced: boolean) {
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (!active) return;
    if (reduced) { setValue(target); return; }
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduced]);
  return value;
}

export default function ImpactNumbers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

  const c0 = useCountUp(STATS[0].target, inView, reduced);
  const c1 = useCountUp(STATS[1].target, inView, reduced);
  const c2 = useCountUp(STATS[2].target, inView, reduced);
  const counts = [c0, c1, c2];

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
      aria-labelledby="impact-heading"
      style={{ background: "#FAFAF7", padding: "clamp(90px,10vw,140px) 0" }}
    >
      <div className="section-inner">

        {/* Header */}
        <motion.div {...enter(0)} style={{ marginBottom: "72px" }}>
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
            Our Impact
          </p>
          <h2
            id="impact-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px,4vw,48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#091426",
              marginBottom: "16px",
            }}
          >
            Twelve years of showing up.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(9,20,38,0.55)",
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
            <Fragment key={stat.label}>
              <motion.div {...enter(0.1 + i * 0.12)} style={{ flex: 1 }}>
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
                  {counts[i]}
                  {stat.suffix && (
                    /* suffix appended once the count completes */
                    <span
                      style={{
                        opacity: counts[i] >= stat.target ? 1 : 0,
                        transition: "opacity 0.25s ease",
                      }}
                    >
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#091426",
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
                    color: "rgba(9,20,38,0.50)",
                  }}
                >
                  {stat.sub}
                </p>
              </motion.div>

              {i < STATS.length - 1 && (
                <div
                  className="impact-divider"
                  aria-hidden="true"
                  style={{
                    width: "1px",
                    height: "100px",
                    background: "rgba(9,20,38,0.08)",
                    alignSelf: "center",
                    flexShrink: 0,
                    margin: "0 64px",
                  }}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
