"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  PROVINCES,
  JUMLA_PIN,
} from "./nepal-province-data";

const EASE = [0.16, 1, 0.3, 1] as const;
const KARNALI_ID = "6";

const DRAW_DURATION = 1.0;   // per-province stroke draw
const DRAW_STAGGER = 0.12;   // sequential offset between provinces
const PIN_DELAY = DRAW_STAGGER * (PROVINCES.length - 1) + 0.7;

// Tooltip arrow pointing downward
function TooltipArrow() {
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: "5px solid #091426",
      }}
    />
  );
}

export default function NepalMap() {
  const prefersReduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.3 });
  const [pinHovered, setPinHovered] = useState(false);
  const [hoveredProvId, setHoveredProvId] = useState<string | null>(null);

  const show = prefersReduced || inView;
  const [jx, jy] = JUMLA_PIN;

  // The inner <g> is shifted by translate(-20, 0), so subtract 20 from x
  // to get the rendered position as a % of the viewBox dimensions.
  const pinLeft = `${((jx - 20) / MAP_WIDTH) * 100}%`;
  const pinTop = `${(jy / MAP_HEIGHT) * 100}%`;

  return (
    <div ref={wrapRef} style={{ position: "relative", lineHeight: 0 }}>
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label="Map of Nepal highlighting Karnali Province — where Sahayatri Nepal works"
      >
        <g transform="translate(-20 0)">

          {/* ── Province paths — draw in sequentially on scroll ──────────── */}
          {PROVINCES.map((province, i) => {
            const isKarnali = province.id === KARNALI_ID;
            const fillColor = isKarnali
              ? "#FBE5A8"
              : hoveredProvId === province.id
              ? "#DEEBF7"
              : "#F0F7FF";
            return (
              <motion.path
                key={province.pcode}
                id={`province-${province.id}`}
                d={province.d}
                fill={fillColor}
                stroke={isKarnali ? "#D4AF37" : "#1A6FA8"}
                strokeWidth={isKarnali ? 4 : 2}
                strokeLinejoin="round"
                initial={
                  prefersReduced
                    ? false
                    : { pathLength: 0, fillOpacity: 0 }
                }
                animate={
                  show ? { pathLength: 1, fillOpacity: 1 } : {}
                }
                transition={{
                  pathLength: {
                    duration: DRAW_DURATION,
                    delay: i * DRAW_STAGGER,
                    ease: EASE,
                  },
                  fillOpacity: {
                    duration: 0.6,
                    delay: i * DRAW_STAGGER + 0.35,
                    ease: "easeOut",
                  },
                }}
                style={{
                  transition: "fill 0.2s ease",
                  cursor: isKarnali ? "default" : "pointer",
                }}
                onMouseEnter={
                  isKarnali ? undefined : () => setHoveredProvId(province.id)
                }
                onMouseLeave={
                  isKarnali ? undefined : () => setHoveredProvId(null)
                }
              />
            );
          })}

          {/* ── Pin, pulse rings and label — after the map has drawn ─────── */}
          <motion.g
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: prefersReduced ? 0 : PIN_DELAY }}
          >
            {/* Jumla pulse rings (decorative) */}
            {!prefersReduced && (
              <>
                <circle cx={jx} cy={jy} r="10" fill="#D4AF37" fillOpacity="0">
                  <animate
                    attributeName="r"
                    values="10;28;10"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.40;0;0.40"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx={jx} cy={jy} r="10" fill="#D4AF37" fillOpacity="0">
                  <animate
                    attributeName="r"
                    values="10;20;10"
                    dur="2.5s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.28;0;0.28"
                    dur="2.5s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </>
            )}

            {/* Jumla pin with hover (enlarged hit area + scale animation) */}
            <g
              onMouseEnter={() => setPinHovered(true)}
              onMouseLeave={() => setPinHovered(false)}
              style={{ cursor: "pointer" }}
            >
              {/* Expanded transparent hit area so hovering near the pin works */}
              <circle cx={jx} cy={jy} r={18} fill="transparent" />
              {/* Scale wrapper — transformBox fill-box keeps origin at pin center */}
              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transform: pinHovered ? "scale(1.15)" : "scale(1)",
                  transition: "transform 0.2s ease",
                }}
              >
                <circle cx={jx} cy={jy} r={10} fill="#D4AF37" />
                <circle cx={jx} cy={jy} r={4} fill="#FFFFFF" />
              </g>
            </g>

            {/* Jumla label */}
            <text
              x={jx + 14}
              y={jy - 4}
              fontFamily="var(--font-display), system-ui, sans-serif"
              fontWeight={600}
              fontSize={11}
              fill="#091426"
              letterSpacing="0.02em"
              style={{ pointerEvents: "none" }}
            >
              Jumla
            </text>
          </motion.g>
        </g>
      </svg>

      {/* ── Pin tooltip — premium card, fades and slides up ─────────────── */}
      <div
        style={{
          position: "absolute",
          left: pinLeft,
          top: pinTop,
          transform: pinHovered
            ? "translate(-50%, -100%) translateY(0)"
            : "translate(-50%, -100%) translateY(8px)",
          marginTop: "-18px",
          pointerEvents: "none",
          opacity: pinHovered ? 1 : 0,
          transition:
            "opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "#091426",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "12px",
            padding: "16px 20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              aria-hidden="true"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#D4AF37",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "13px",
                color: "#FAFAF7",
                letterSpacing: "0.01em",
                lineHeight: 1.4,
              }}
            >
              Chandanath-02, Jumla
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "16px",
              color: "#D4AF37",
              marginTop: "6px",
              lineHeight: 1.3,
            }}
          >
            Our programme since 2013
          </div>
        </div>
        <TooltipArrow />
      </div>
    </div>
  );
}
