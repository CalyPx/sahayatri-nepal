"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  MAP_WIDTH,
  MAP_HEIGHT,
  PROVINCES,
  JUMLA_PIN,
} from "./nepal-province-data";

const KARNALI_ID = "6";
const KARNALI_CENTROID =
  PROVINCES.find((p) => p.id === KARNALI_ID)?.svgCentroid ?? [155, 120];

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
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: "4px solid #0A1628",
      }}
    />
  );
}

export default function NepalMap() {
  const prefersReduced = useReducedMotion();
  const [pinHovered, setPinHovered] = useState(false);
  const [hoveredProvId, setHoveredProvId] = useState<string | null>(null);

  const [jx, jy] = JUMLA_PIN;
  const [kx] = KARNALI_CENTROID;
  // Label pushed below pin — Jumla is the geographic center of Karnali
  const ky = 145;

  // The inner <g> is shifted by translate(-20, 0), so subtract 20 from x
  // to get the rendered position as a % of the viewBox dimensions.
  const pinLeft = `${((jx - 20) / MAP_WIDTH) * 100}%`;
  const pinTop = `${(jy / MAP_HEIGHT) * 100}%`;

  const hovProv =
    hoveredProvId && hoveredProvId !== KARNALI_ID
      ? PROVINCES.find((p) => p.id === hoveredProvId)
      : null;

  const provLeft = hovProv
    ? `${((hovProv.svgCentroid[0] - 20) / MAP_WIDTH) * 100}%`
    : "50%";
  const provTop = hovProv
    ? `${(hovProv.svgCentroid[1] / MAP_HEIGHT) * 100}%`
    : "50%";

  return (
    <div style={{ position: "relative", lineHeight: 0 }}>
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        aria-label="Map of Nepal highlighting Karnali Province — where Sahayatri Nepal works"
      >
        <g transform="translate(-20 0)">

          {/* ── Province fills ──────────────────────────────────────────────── */}
          {PROVINCES.map((province) => {
            const isKarnali = province.id === KARNALI_ID;
            return (
              <path
                key={province.pcode}
                id={`province-${province.id}`}
                d={province.d}
                fill={
                  isKarnali
                    ? "#FBE5A8"
                    : hoveredProvId === province.id
                    ? "#E0E0D6"
                    : "#F0F0EB"
                }
                stroke={isKarnali ? "#D4AF37" : "#1A6FA8"}
                strokeWidth={isKarnali ? 4 : 2}
                strokeLinejoin="round"
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

          

          {/* ── Jumla pulse rings (decorative, outside scale group) ─────────── */}
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

          {/* ── Jumla pin with hover (enlarged hit area + scale animation) ──── */}
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

          {/* ── Jumla label text ─────────────────────────────────────────────── */}
          <text
            x={jx + 14}
            y={jy - 4}
            fontFamily="'Space Grotesk', system-ui, sans-serif"
            fontWeight={600}
            fontSize={11}
            fill="#0A1628"
            letterSpacing="0.02em"
            style={{ pointerEvents: "none" }}
          >
            Jumla
          </text>
          <text
            x={jx + 14}
            y={jy + 10}
            fontFamily="'Space Grotesk', system-ui, sans-serif"
            fontWeight={400}
            fontSize={8.5}
            fill="#5A6A7A"
            letterSpacing="0.01em"
            style={{ pointerEvents: "none" }}
          >
            
          </text>

        </g>
      </svg>

      {/* ── Pin tooltip (HTML overlay — easier styling than SVG foreignObject) ── */}
      <div
        style={{
          position: "absolute",
          left: pinLeft,
          top: pinTop,
          transform: "translate(-50%, -100%)",
          marginTop: "-12px",
          pointerEvents: "none",
          opacity: pinHovered ? 1 : 0,
          transition: "opacity 0.2s ease",
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: "#0A1628",
            color: "white",
            padding: "8px 14px",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            whiteSpace: "nowrap",
            lineHeight: 1.5,
          }}
        >
          Chandanath-02, Jumla
        </div>
        <TooltipArrow />
      </div>

      
    </div>
  );
}
