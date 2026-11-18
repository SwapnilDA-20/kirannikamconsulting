#!/usr/bin/env node
/**
 * Image optimisation helper.
 *
 * Usage:
 *   node scripts/optimize-images.mjs <input> <output.webp> [width] [height] [position]
 *
 * Examples:
 *   node scripts/optimize-images.mjs ~/photos/living.jpg public/images/properties/kn-r-001/01.webp
 *   node scripts/optimize-images.mjs photo.jpg out.webp 960 1200 top
 *
 * - The original file is never modified.
 * - Output is WebP, max 1800px wide by default, EXIF stripped (removes GPS data).
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [, , input, output, w, h, position = "attention"] = process.argv;
if (!input || !output) {
  console.error("Usage: node scripts/optimize-images.mjs <input> <output.webp> [width] [height] [position]");
  process.exit(1);
}
mkdirSync(dirname(output), { recursive: true });
const width = w ? Number(w) : 1800;
const height = h ? Number(h) : undefined;
const info = await sharp(input)
  .rotate()
  .resize({ width, height, fit: height ? "cover" : "inside", position, withoutEnlargement: true })
  .webp({ quality: 80, effort: 6 })
  .toFile(output);
console.log(`${output}: ${info.width}x${info.height}, ${(info.size / 1024).toFixed(1)} KB`);
