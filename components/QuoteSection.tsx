"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* The quote arrives character by character — 30ms stagger.
   Split into two lines, indices continue across both. */
const LINE_ONE = "The children who come to us are not broken.";
const LINE_TWO = "They have simply been waiting for a language.";
const FULL_QUOTE = `“${LINE_ONE} ${LINE_TWO}”`;

const CHAR_STAGGER = 0.03;
const TOTAL_CHARS = LINE_ONE.length + LINE_TWO.length + 2; // + quote marks
const ATTRIBUTION_DELAY = TOTAL_CHARS * CHAR_STAGGER + 0.3;

function CharLine({
  text,
  startIndex,
  show,
  reduced,
}: {
  text: string;
  startIndex: number;
  show: boolean;
  reduced: boolean;
}) {
  /* Words wrapped inline-block so lines never break mid-word;
     each character fades in with its own transition delay. */
  const words = text.split(" ");
  let charIndex = startIndex;
  return (
    <>
      {words.map((word, wi) => {
        const spans = word.split("").map((ch, ci) => {
          const idx = charIndex + ci;
          return (
            <span
              key={ci}
              style={
                reduced
                  ? undefined
                  : {
                      opacity: show ? 1 : 0,
                      transition: `opacity 0.35s ease ${idx * CHAR_STAGGER}s`,
                    }
              }
            >
              {ch}
            </span>
          );
        });
        charIndex += word.length + 1;
        return (
          <span key={wi} style={{ display: "inline-block" }}>
            {spans}
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

export default function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();
  const reduced = !!prefersReduced;
  const show = reduced || inView;

  const enterLate = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      aria-label="Mission quote"
      style={{
        position: "relative",
        background: "#091426",
        padding: "clamp(110px,14vw,170px) 24px",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Watermark — सहयात्री, barely visible, behind the quote.
          Rendered via ::before (globals.css) so it stays out of the
          accessibility tree and text-contrast audits. */}
      <span
        aria-hidden="true"
        className="quote-watermark"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-script)",
          fontWeight: 700,
          fontSize: "clamp(110px,18vw,200px)",
          color: "rgba(255,255,255,0.03)",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      />

      <blockquote
        style={{
          position: "relative",
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(24px, 3.2vw, 38px)",
          color: "#FAFAF7",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: 1.45,
          letterSpacing: "-0.015em",
          border: "none",
          padding: 0,
        }}
      >
        {/* Real text for screen readers; the animated spans are decorative */}
        <span className="sr-only">{FULL_QUOTE}</span>
        <span aria-hidden="true">
          <span
            style={
              reduced
                ? undefined
                : { opacity: show ? 1 : 0, transition: "opacity 0.35s ease 0s" }
            }
          >
            &ldquo;
          </span>
          <CharLine text={LINE_ONE} startIndex={1} show={show} reduced={reduced} />
          <br />
          <CharLine
            text={LINE_TWO}
            startIndex={LINE_ONE.length + 1}
            show={show}
            reduced={reduced}
          />
          <span
            style={
              reduced
                ? undefined
                : {
                    opacity: show ? 1 : 0,
                    transition: `opacity 0.35s ease ${(TOTAL_CHARS - 1) * CHAR_STAGGER}s`,
                  }
            }
          >
            &rdquo;
          </span>
        </span>
      </blockquote>

      <motion.p
        {...enterLate(ATTRIBUTION_DELAY)}
        style={{
          position: "relative",
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "24px",
          color: "#D4AF37",
          marginTop: "28px",
        }}
      >
        — Devendra Timilsena, Chief Advisor
      </motion.p>

      <motion.p
        {...enterLate(ATTRIBUTION_DELAY + 0.35)}
        style={{
          position: "relative",
          fontFamily: "var(--font-script)",
          fontWeight: 700,
          fontSize: "clamp(32px, 4.5vw, 54px)",
          color: "rgba(212,175,55,0.85)",
          marginTop: "44px",
          lineHeight: 1.25,
        }}
      >
        सहयात्री — Fellow Travellers
      </motion.p>
    </section>
  );
}
