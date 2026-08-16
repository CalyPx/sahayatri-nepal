"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--gold-dark)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.25s ease",
        flexShrink: 0,
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function FAQClient({ items }: { items: FaqItemData[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      aria-labelledby="faq-heading"
      style={{ background: "var(--cream)", padding: "clamp(72px,8vw,120px) 0" }}
    >
      <div className="section-inner" style={{ maxWidth: "760px" }}>
        <motion.div {...enter(0)} style={{ marginBottom: "48px" }}>
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
            Common Questions
          </p>
          <h2
            id="faq-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px,3.6vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#091426",
            }}
          >
            Questions donors ask us.
          </h2>
        </motion.div>

        <div style={{ borderTop: "1px solid rgba(9,20,38,0.08)" }}>
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <motion.div key={item.id} {...enter(0.08 + i * 0.05)}>
                <div style={{ borderBottom: "1px solid rgba(9,20,38,0.08)" }}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                      padding: "22px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      fontSize: "16px",
                      color: "#091426",
                    }}
                  >
                    {item.question}
                    <Chevron open={open} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontWeight: 400,
                            fontSize: "15px",
                            lineHeight: 1.7,
                            color: "rgba(9,20,38,0.62)",
                            paddingBottom: "22px",
                            maxWidth: "60ch",
                          }}
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
