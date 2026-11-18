import { describe, expect, it } from "vitest";
import { fixtures } from "./fixtures";
import {
  applyFilters,
  countActiveFilters,
  filterProperties,
  formatPropertyPrice,
  getFeaturedProperties,
  getPublishedProperties,
  parseFilters,
  propertiesHref,
  serializeFilters,
  sortProperties,
} from "@/lib/property-utils";

const published = getPublishedProperties(fixtures);
const ids = (l: { id: string }[]) => l.map((p) => p.id);

describe("publication gate", () => {
  it("excludes drafts, unauthorised, non-genuine-photo and missing-RERA listings", () => {
    expect(ids(published)).toEqual(["t1", "t2", "t3", "t4", "t5", "t6"]);
  });
  it("includes a RERA-required listing once a number is supplied", () => {
    const withRera = { ...fixtures[8], compliance: { projectReraRequired: true, projectRegistrationNumber: "P5180000TEST" } };
    expect(getPublishedProperties([withRera])).toHaveLength(1);
  });
  it("featured only returns available featured listings", () => {
    expect(ids(getFeaturedProperties(fixtures))).toEqual(["t1"]);
  });
});

describe("filters", () => {
  it("transaction (buy / rent / lease)", () => {
    expect(ids(filterProperties(published, { transaction: "sale" }))).toEqual(["t1", "t2", "t5", "t6"]);
    expect(ids(filterProperties(published, { transaction: "rent" }))).toEqual(["t3"]);
    expect(ids(filterProperties(published, { transaction: "lease" }))).toEqual(["t4"]);
  });
  it("category", () => {
    expect(ids(filterProperties(published, { category: "commercial" }))).toEqual(["t4", "t5"]);
  });
  it("locality", () => {
    expect(ids(filterProperties(published, { locality: "kandivali-east" }))).toEqual(["t1", "t3"]);
  });
  it("property type", () => {
    expect(ids(filterProperties(published, { type: "shop" }))).toEqual(["t5"]);
  });
  it("budget range excludes price-on-request", () => {
    expect(ids(filterProperties(published, { minPrice: 5_000_000, maxPrice: 30_000_000 }))).toEqual(["t1", "t2"]);
  });
  it("carpet area", () => {
    expect(ids(filterProperties(published, { minArea: 800, maxArea: 2000 }))).toEqual(["t2", "t4"]);
  });
  it("bedrooms exact and 4+", () => {
    expect(ids(filterProperties(published, { bedrooms: 2 }))).toEqual(["t1"]);
    expect(ids(filterProperties(published, { bedrooms: 4 }))).toEqual(["t6"]);
  });
  it("availability", () => {
    expect(ids(filterProperties(published, { availability: "available" }))).not.toContain("t3");
  });
  it("free-text search across locality, BHK and reference", () => {
    expect(ids(filterProperties(published, { q: "2 bhk kandivali" }))).toEqual(["t1"]);
    expect(ids(filterProperties(published, { q: "T-4" }))).toEqual(["t4"]);
    expect(ids(filterProperties(published, { q: "Juhu" }))).toEqual(["t6"]);
  });
  it("combined filters", () => {
    expect(ids(applyFilters(published, { transaction: "sale", category: "residential", minArea: 600 }))).toEqual(["t6", "t2", "t1"]);
  });
});

describe("sorting", () => {
  it("newest first by default", () => {
    expect(ids(sortProperties(published))).toEqual(["t6", "t2", "t4", "t1", "t3", "t5"]);
  });
  it("price ascending puts price-on-request last", () => {
    expect(ids(sortProperties(published, "price-asc")).at(-1)).toBe("t5");
  });
  it("price descending puts price-on-request last", () => {
    const r = ids(sortProperties(published, "price-desc"));
    expect(r[0]).toBe("t6");
    expect(r.at(-1)).toBe("t5");
  });
  it("area", () => {
    expect(ids(sortProperties(published, "area-desc"))[0]).toBe("t6");
    expect(ids(sortProperties(published, "area-asc"))[0]).toBe("t5");
  });
});

describe("shareable URLs", () => {
  it("round-trips filters through the query string", () => {
    const f = { transaction: "rent" as const, category: "residential" as const, locality: "kandivali-east", bedrooms: 2, minPrice: 25000, maxPrice: 50000, sort: "price-asc" as const };
    expect(parseFilters(new URLSearchParams(serializeFilters(f)))).toMatchObject(f);
  });
  it("ignores invalid values", () => {
    const f = parseFilters(new URLSearchParams("transaction=steal&category=x&bedrooms=99&minPrice=-5&locality=<script>&sort=evil"));
    expect(countActiveFilters(f)).toBe(0);
  });
  it("builds hrefs", () => {
    expect(propertiesHref()).toBe("/properties");
    expect(propertiesHref({ transaction: "sale", locality: "juhu" })).toBe("/properties?transaction=sale&locality=juhu");
  });
});

describe("price display", () => {
  it("formats sale, rent and on-request", () => {
    expect(formatPropertyPrice(fixtures[0])).toBe("₹90 L");
    expect(formatPropertyPrice(fixtures[1])).toBe("₹2.5 Cr");
    expect(formatPropertyPrice(fixtures[2])).toBe("₹30,000 / month");
    expect(formatPropertyPrice(fixtures[4])).toBe("Price on request");
  });
});
