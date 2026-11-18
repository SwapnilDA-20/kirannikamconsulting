#!/usr/bin/env node
/**
 * Post-build checks on the static export in ./out
 *  - every internal link / image / asset resolves to a file
 *  - every page has exactly one <h1>, a <title>, a meta description and a canonical URL
 *  - target="_blank" links use rel="noopener"
 *  - no "undefined" / "NaN" / "[object Object]" leaked into HTML
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = join(process.cwd(), "out");
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
if (!existsSync(OUT)) {
  console.error("No ./out directory — run `npm run build` first.");
  process.exit(1);
}

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(OUT);
const pages = files.filter((f) => f.endsWith(".html") && !f.includes("/_next/"));

function resolves(url) {
  let clean = decodeURI(url.split("#")[0].split("?")[0]);
  if (BASE) {
    if (clean !== BASE && !clean.startsWith(BASE + "/")) return false; // missing base path
    clean = clean.slice(BASE.length) || "/";
  }
  if (clean === "" || clean === "/") return existsSync(join(OUT, "index.html"));
  const p = join(OUT, clean);
  return existsSync(p) && statSync(p).isFile() ? true : existsSync(`${p}.html`) || existsSync(join(p, "index.html"));
}

const errors = [];
const seen = new Set();
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const page = "/" + relative(OUT, file);
  const isNotFound = /\/(404|_not-found)\.html$/.test(page);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${page}: expected 1 <h1>, found ${h1}`);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) errors.push(`${page}: missing <title>`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) errors.push(`${page}: missing/short meta description`);
  if (!isNotFound && !/<link rel="canonical" href="[^"]+"/.test(html)) errors.push(`${page}: missing canonical`);
  if (/>(undefined|NaN|\[object Object\])</.test(html)) errors.push(`${page}: leaked undefined/NaN`);

  for (const m of html.matchAll(/<a\b[^>]*>/g)) {
    const tag = m[0];
    if (/target="_blank"/.test(tag) && !/rel="[^"]*noopener/.test(tag)) errors.push(`${page}: _blank link without noopener: ${tag.slice(0, 120)}`);
  }
  for (const m of html.matchAll(/\s(?:href|src|srcSet)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    for (const part of url.split(",").map((s) => s.trim().split(" ")[0])) {
      const key = part.split("?")[0];
      if (seen.has(key)) continue;
      seen.add(key);
      if (!resolves(part)) errors.push(`${page}: broken internal reference ${part}`);
    }
  }
}

console.log(`Checked ${pages.length} pages, ${seen.size} unique internal references.`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("All route, link, image and SEO checks passed.");
