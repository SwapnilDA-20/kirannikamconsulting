import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { localities } from "@/data/localities";
import { properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
import { isReraPublishable, siteConfig } from "@/config/site";

const pub = (p: string) => join(process.cwd(), "public", p);

describe("verified business details", () => {
  it("matches the supplied information", () => {
    expect(siteConfig.name).toBe("Kiran Nikam Consulting");
    expect(siteConfig.consultant.name).toBe("Kiran Nikam");
    expect(siteConfig.contact.phoneE164).toBe("+919870947557");
    expect(siteConfig.contact.email).toBe("kirannikam5171@gmail.com");
    expect(siteConfig.address.full).toContain("Shop No. 10, Dynasty CHSL, Thakur Complex, 90 Feet Road, Kandivali East");
    expect(siteConfig.address.postalCode).toBe("400101");
  });
});

describe("MahaRERA", () => {
  it("is not published without verified details", () => {
    const { agent, publish } = siteConfig.rera;
    if (!agent.registrationNumber || !agent.verifiedOn || agent.status !== "registered" || !publish) {
      expect(isReraPublishable()).toBe(false);
    }
  });
});

describe("localities", () => {
  it("has all 15 required areas with unique slugs and valid nearby links", () => {
    expect(localities).toHaveLength(15);
    const slugs = new Set(localities.map((l) => l.slug));
    expect(slugs.size).toBe(15);
    for (const l of localities) for (const n of l.nearby) expect(slugs.has(n), `${l.slug} -> ${n}`).toBe(true);
  });
  it("has unique (non-duplicated) overview content", () => {
    expect(new Set(localities.map((l) => l.overview)).size).toBe(localities.length);
  });
});

describe("properties", () => {
  it("have unique ids, slugs and reference IDs, and their images exist", () => {
    const uniq = (k: "id" | "slug" | "referenceId") => new Set(properties.map((p) => p[k])).size === properties.length;
    expect(uniq("id") && uniq("slug") && uniq("referenceId")).toBe(true);
    for (const p of properties) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      for (const img of p.images) expect(existsSync(pub(img.src)), img.src).toBe(true);
      if (p.compliance.projectQrCode) expect(existsSync(pub(p.compliance.projectQrCode))).toBe(true);
    }
  });
});

describe("testimonials", () => {
  it("all have recorded consent", () => {
    for (const t of testimonials) expect(t.consentReceivedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("required assets", () => {
  it.each([
    "images/consultant/kiran-nikam-profile.webp",
    "images/consultant/kiran-nikam-office.webp",
    "images/brand/logo.svg",
    "images/brand/logo-dark.svg",
    "images/brand/logo-light.svg",
    "images/brand/favicon.svg",
    "images/og/og-default.jpg",
  ])("%s exists", (f) => expect(existsSync(pub(f))).toBe(true));
});
