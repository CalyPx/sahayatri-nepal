// One-off/reusable helper: re-encode a JPEG/PNG as genuine WebP.
// Usage: node scripts/convert-to-webp.mjs <input> <output> [quality]
import sharp from "sharp";
import { statSync } from "fs";

const [, , input, output, qualityArg] = process.argv;
if (!input || !output) {
  console.error("Usage: node scripts/convert-to-webp.mjs <input> <output> [quality=75]");
  process.exit(1);
}
const quality = qualityArg ? Number(qualityArg) : 75;

const before = statSync(input).size;
await sharp(input).webp({ quality }).toFile(output);
const after = statSync(output).size;
console.log(
  `${input} -> ${output}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${Math.round((1 - after / before) * 100)}% smaller)`,
);
