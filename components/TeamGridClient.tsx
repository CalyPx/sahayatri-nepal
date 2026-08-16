"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
}

function PersonPlaceholder() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="rgba(9,20,38,0.3)" strokeWidth="1.5" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke="rgba(9,20,38,0.3)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function TeamGridClient({ members }: { members: TeamMemberData[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReduced = useReducedMotion();

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
      aria-labelledby="team-heading"
      style={{ background: "var(--cream)", padding: "clamp(72px,8vw,120px) 0" }}
    >
      <div className="section-inner">
        <motion.div {...enter(0)} style={{ marginBottom: "56px", maxWidth: "560px" }}>
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
            Meet The Team
          </p>
          <h2
            id="team-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(32px,3.6vw,44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#091426",
            }}
          >
            The people behind the work.
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "28px",
          }}
        >
          {members.map((member, i) => (
            <motion.div key={member.id} {...enter(0.06 + i * 0.05)}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  background: "rgba(9,20,38,0.05)",
                  border: "1px solid rgba(9,20,38,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  overflow: "hidden",
                }}
              >
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt=""
                    fill
                    sizes="160px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <PersonPlaceholder />
                )}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#091426",
                  marginBottom: "4px",
                }}
              >
                {member.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "rgba(9,20,38,0.65)",
                }}
              >
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
