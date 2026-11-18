import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { localities } from "@/data/localities";
import { getPublishedProperties } from "@/lib/property-utils";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: [string, number][] = [
    ["/", 1],
    ["/properties", 0.9],
    ["/residential", 0.8],
    ["/commercial", 0.8],
    ["/buy-property", 0.8],
    ["/rent-property", 0.8],
    ["/sell-property", 0.7],
    ["/lease-property", 0.7],
    ["/areas", 0.8],
    ["/about", 0.7],
    ["/contact", 0.8],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];
  return [
    ...staticRoutes.map(([path, priority]) => ({
      url: `${siteConfig.url}${path === "/" ? "" : path}`,
      lastModified: now,
      priority,
    })),
    ...localities.map((l) => ({ url: `${siteConfig.url}/areas/${l.slug}`, lastModified: now, priority: 0.7 })),
    ...getPublishedProperties().map((p) => ({
      url: `${siteConfig.url}/properties/${p.slug}`,
      lastModified: new Date(p.verification.detailsVerifiedOn || p.listedOn),
      priority: 0.8,
    })),
  ];
}
