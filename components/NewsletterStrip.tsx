"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
// Replace with a real Formspree endpoint when available
const FORM_ACTION = "https://formspree.io/f/mwkgvpyv";

export default function NewsletterStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const enter = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.5, delay, ease: EASE },
        };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch(FORM_ACTION, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("done");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:hhnjumla25@gmail.com?subject=Newsletter%20signup&body=Please%20add%20me%20to%20your%20updates%20list:%20${encodeURIComponent(email)}`;
      setStatus("done");
    }
  }

  return (
    <section
      ref={ref}
      aria-labelledby="newsletter-heading"
      style={{
        background: "#F0F7FF",
        padding: "80px clamp(24px, 8vw, 120px)",
        borderTop: "1px solid #D0E4F4",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }}
      >
        {/* ── Left: text ─────────────────────────────────────────────────── */}
        <div>
          <motion.h2
            id="newsletter-heading"
            {...enter(0)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "32px",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#0A1628",
              marginBottom: "14px",
            }}
          >
            Stay connected to the work.
          </motion.h2>
          <motion.p
            {...enter(0.08)}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#5A6A7A",
              margin: 0,
            }}
          >
            Get updates on our students, programmes, and impact — straight from
            Jumla.
          </motion.p>
        </div>

        {/* ── Right: form ────────────────────────────────────────────────── */}
        <motion.div {...enter(0.12)}>
          {status === "done" ? (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "15px",
                color: "#1A6FA8",
              }}
            >
              ✓ You&rsquo;re subscribed. Thank you.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  background: "#FFFFFF",
                  border: "1px solid #D0E4F4",
                  borderRadius: "6px",
                  padding: "14px 18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  color: "#0A1628",
                  outline: "none",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "#1A6FA8")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "#D0E4F4")
                }
              />
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: "#D4AF37",
                  color: "#091426",
                  border: "none",
                  borderRadius: "6px",
                  padding: "14px 28px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: status === "sending" ? "wait" : "pointer",
                  letterSpacing: "0.02em",
                  transition: "background 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#C8A84B")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#D4AF37")
                }
              >
                {status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
              {status === "error" && (
                <p
                  style={{
                    width: "100%",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    color: "#B04040",
                    margin: "4px 0 0",
                  }}
                >
                  Something went wrong — email us directly at hhnjumla25@gmail.com
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
