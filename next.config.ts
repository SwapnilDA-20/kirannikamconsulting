import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — deployable to Cloudflare Pages (output in ./out)
  output: "export",
  // Optional sub-path hosting (GitHub Pages project site): NEXT_PUBLIC_BASE_PATH=/kirannikamconsulting
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  // Images are pre-optimised to WebP; the loader only adds the base path
  images: { loader: "custom", loaderFile: "./src/lib/image-loader.ts" },
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
