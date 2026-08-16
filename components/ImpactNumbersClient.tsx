"use client";

import { Fragment, useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const COUNT_DURATION = 1200; // spec: 1200ms, ease-out

const ICONS = [
  <path key="0" d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Zm4 2.2v5.3c0 1 2.7 2.8 6 2.8s6-1.8 6-2.8v-5.3M20 9.5v6" />,
  <path key="1" d="M12 2 4 5.5v5c0 5 3.4 8.9 8 10.5 4.6-1.6 8-5.5 8-10.5v-5L12 2Zm-3.2 9.6 2.2 2.2 4.6-4.8" />,
  <path key="2" d="M12 7v5.5l4 2.2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z" />,
];
const FALLBACK_ICON = (
  <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />
);

export interface ImpactStatData {
  id: string;
  label: string;
  sublabel: string;
  value: number;
  suffix: string;
}

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

function StatValue({ stat, active, reduced }: { stat: ImpactStatData; active: boolean; reduced: boolean }) {
  const count = useCountUp(stat.value, active, reduced);
  return (
    <div
      aria-label={`${stat.value}${stat.suffix}`}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(72px,9vw,96px)",
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color: "var(--gold-dark)",
        marginBottom: "20px",
      }}
    >
      {count}
      {stat.suffix && (
        <span style={{ opacity: count >= stat.value ? 1 : 0, transition: "opacity 0.25s ease" }}>
          {stat.suffix}
        </span>
      )}
    </div>
  );
}

export default function ImpactNumbersClient({ stats }: { stats: ImpactStatData[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;

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
      style={{ background: "var(--cream)", padding: "clamp(100px,11vw,180px) 0" }}
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
              color: "var(--gold-dark)",
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
              lineHeight: 1.75,
              color: "rgba(9,20,38,0.65)",
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
          {stats.map((stat, i) => (
            <Fragment key={stat.id}>
              <motion.div {...enter(0.1 + i * 0.12)} style={{ flex: 1 }}>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--gold-dark)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ marginBottom: "18px" }}
                >
                  {ICONS[i] ?? FALLBACK_ICON}
                </svg>
                <StatValue stat={stat} active={inView} reduced={reduced} />
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
                    color: "rgba(9,20,38,0.65)",
                  }}
                >
                  {stat.sublabel}
                </p>
              </motion.div>

              {i < stats.length - 1 && (
                <div
                  className="impact-divider"
                  aria-hidden="true"
                  style={{
                    width: "1px",
                    height: "100px",
                    background: "rgba(9,20,38,0.08)",
                    alignSelf: "center",
                    flexShrink: 0,
                    margin: "0 clamp(48px, 6vw, 96px)",
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
