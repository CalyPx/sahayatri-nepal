/**
 * Reads the real Nepal province GeoJSON survey data, applies Douglas-Peucker
 * simplification at the coordinate level, projects with d3-geo, and writes
 * SVG path strings to a TypeScript data file.
 *
 * Run once: node scripts/generate-nepal-paths.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { geoMercator, geoPath, geoCentroid } from "d3-geo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// ---------------------------------------------------------------------------
// Douglas-Peucker simplification — works on [lon, lat] coordinate arrays
// tolerance is in degrees; 0.02° ≈ 2.2 km, good for a 500 px province map
// ---------------------------------------------------------------------------
function perpendicularDistance(point, lineStart, lineEnd) {
  const [x0, y0] = point;
  const [x1, y1] = lineStart;
  const [x2, y2] = lineEnd;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(x0 - x1, y0 - y1);
  const t = ((x0 - x1) * dx + (y0 - y1) * dy) / len2;
  const px = x1 + t * dx - x0;
  const py = y1 + t * dy - y0;
  return Math.hypot(px, py);
}

function rdp(points, tolerance) {
  if (points.length <= 2) return points;
  let maxDist = 0;
  let maxIdx = 0;
  const first = points[0];
  const last = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], first, last);
    if (d > maxDist) { maxDist = d; maxIdx = i; }
  }
  if (maxDist > tolerance) {
    const left = rdp(points.slice(0, maxIdx + 1), tolerance);
    const right = rdp(points.slice(maxIdx), tolerance);
    return left.slice(0, -1).concat(right);
  }
  return [first, last];
}

function simplifyRings(geometry, tolerance) {
  function simplifyRing(ring) {
    const s = rdp(ring, tolerance);
    // Ensure ring closes (first === last)
    if (s.length < 4) return null; // degenerate after simplification
    if (s[0][0] !== s[s.length - 1][0] || s[0][1] !== s[s.length - 1][1]) {
      s.push(s[0]);
    }
    return s;
  }

  if (geometry.type === "Polygon") {
    const rings = geometry.coordinates
      .map(simplifyRing)
      .filter(Boolean);
    return { ...geometry, coordinates: rings };
  }
  if (geometry.type === "MultiPolygon") {
    const polys = geometry.coordinates
      .map((poly) => poly.map(simplifyRing).filter(Boolean))
      .filter((poly) => poly.length > 0);
    return { ...geometry, coordinates: polys };
  }
  return geometry;
}

// ---------------------------------------------------------------------------
// Province name lookup
// ---------------------------------------------------------------------------
const PROVINCE_NAMES = {
  "1": "Koshi",
  "2": "Madhesh",
  "3": "Bagmati",
  "4": "Gandaki",
  "5": "Lumbini",
  "6": "Karnali",
  "7": "Sudurpashchim",
};

// ---------------------------------------------------------------------------
// Load and simplify GeoJSON
// ---------------------------------------------------------------------------
const raw = JSON.parse(
  readFileSync(join(root, "public/maps/nepal-provinces.geojson"), "utf8")
);
console.log(`Loaded ${raw.features.length} provinces.`);

const TOLERANCE = 0.02; // degrees — ~2.2 km; coarser than survey resolution but fine at 500 px
const geojson = {
  ...raw,
  features: raw.features.map((f) => ({
    ...f,
    geometry: simplifyRings(f.geometry, TOLERANCE),
  })),
};
console.log(`Simplified (tolerance ${TOLERANCE}°).`);

// ---------------------------------------------------------------------------
// Projection — fit all provinces into 500 × 260 canvas with 10 px padding
// ---------------------------------------------------------------------------
const W = 500;
const H = 260;
const projection = geoMercator().fitExtent([[10, 10], [W - 10, H - 10]], geojson);
const pathGen = geoPath().projection(projection).digits(2);

// ---------------------------------------------------------------------------
// Generate province path data
// ---------------------------------------------------------------------------
const provinces = geojson.features.map((feat) => {
  const id = feat.properties.ADM1_EN;
  const pcode = feat.properties.ADM1_PCODE;
  const name = PROVINCE_NAMES[id] ?? `Province ${id}`;
  const d = pathGen(feat) ?? "";
  const [cLon, cLat] = geoCentroid(feat);
  const proj = projection([cLon, cLat]) ?? [0, 0];
  const svgCentroid = [+proj[0].toFixed(2), +proj[1].toFixed(2)];

  console.log(
    `  ${name} (${pcode}): SVG centroid (${svgCentroid}), path len = ${d.length}`
  );

  return { id, pcode, name, d, svgCentroid };
});

// ---------------------------------------------------------------------------
// Jumla district HQ  (29.277°N, 82.193°E)
// ---------------------------------------------------------------------------
const jumlaRaw = projection([82.193, 29.277]) ?? [0, 0];
const JUMLA_PIN = [+jumlaRaw[0].toFixed(2), +jumlaRaw[1].toFixed(2)];
console.log(`\nJumla pin → SVG ${JSON.stringify(JUMLA_PIN)}`);

// ---------------------------------------------------------------------------
// Write TypeScript data file
// ---------------------------------------------------------------------------
const outPath = join(root, "components/nepal-province-data.ts");
const ts = `// AUTO-GENERATED — do not edit manually.
// Source: public/maps/nepal-provinces.geojson (real survey data, RDP-simplified at ${TOLERANCE}° tolerance)
// Regenerate: node scripts/generate-nepal-paths.mjs

export const MAP_WIDTH = ${W};
export const MAP_HEIGHT = ${H};

export interface ProvinceData {
  id: string;                    // ADM1_EN "1"–"7"
  pcode: string;                 // e.g. "NP06"
  name: string;                  // e.g. "Karnali"
  d: string;                     // SVG path from real GeoJSON coordinates
  svgCentroid: [number, number]; // [x, y] in SVG canvas space
}

export const PROVINCES: ProvinceData[] = ${JSON.stringify(provinces, null, 2)};

export const JUMLA_PIN: [number, number] = [${JUMLA_PIN[0]}, ${JUMLA_PIN[1]}];
`;

writeFileSync(outPath, ts, "utf8");
const kbSize = (Buffer.byteLength(ts) / 1024).toFixed(1);
console.log(`\nWrote ${outPath} (${kbSize} KB)`);
