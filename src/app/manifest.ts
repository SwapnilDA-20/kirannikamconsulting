import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F5F0",
    theme_color: "#101C2C",
    icons: [{ src: "/images/brand/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
