/**
 * Sub-path the site is served from. Empty for a root domain (Cloudflare Pages /
 * custom domain); "/kirannikamconsulting" for GitHub Pages project sites.
 * Set via NEXT_PUBLIC_BASE_PATH at build time.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

/** Prefix a public-folder path (e.g. "/images/x.webp") with the base path. */
export function asset(path: string): string {
  return path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path;
}
