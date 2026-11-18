"use client";

/**
 * next/image loader for the static export. Images are pre-optimised WebP files,
 * so this only adds the base path (needed for GitHub Pages sub-path hosting).
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  const url = src.startsWith("/") && !src.startsWith("//") ? `${base}${src}` : src;
  return `${url}?w=${width}`;
}
