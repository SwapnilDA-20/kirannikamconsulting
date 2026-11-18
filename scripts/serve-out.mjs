#!/usr/bin/env node
// Minimal static server for ./out that mimics Cloudflare Pages clean URLs (/about -> about.html).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = join(process.cwd(), "out");
const PORT = Number(process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml", ".json": "application/json", ".webmanifest": "application/manifest+json", ".ico": "image/x-icon" };

async function isFile(p) { try { return (await stat(p)).isFile(); } catch { return false; } }

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [join(ROOT, path), join(ROOT, `${path}.html`), join(ROOT, path, "index.html")];
  for (const c of candidates) {
    if (c.startsWith(ROOT) && (await isFile(c))) {
      const body = await readFile(c);
      const type = types[extname(c)] || "application/octet-stream";
      // gzip text assets, as Cloudflare Pages does in production
      if (/text|javascript|json|xml|svg/.test(type) && /gzip/.test(req.headers["accept-encoding"] || "")) {
        res.writeHead(200, { "Content-Type": type, "Content-Encoding": "gzip" });
        return res.end(gzipSync(body));
      }
      res.writeHead(200, { "Content-Type": type });
      return res.end(body);
    }
  }
  res.writeHead(404, { "Content-Type": types[".html"] });
  res.end(await readFile(join(ROOT, "404.html")).catch(() => "Not found"));
}).listen(PORT, () => console.log(`Serving ./out at http://localhost:${PORT}`));
