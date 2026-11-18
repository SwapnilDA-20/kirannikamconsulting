import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — deployable to Cloudflare Pages (output in ./out)
  output: "export",
  // Images are pre-optimised to WebP (see scripts/optimize-images.mjs)
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
