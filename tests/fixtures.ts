/**
 * TEST-ONLY FIXTURES. These are not real listings and are never imported
 * by the website. They exist solely to verify filter / sort behaviour.
 */
import type { Property } from "@/types/property";

type Base = Pick<Property, "city" | "description" | "amenities" | "images" | "availability" | "possession" | "published" | "verification" | "compliance">;

const base: Base = {
  city: "Mumbai",
  description: "Test fixture",
  amenities: [],
  images: [{ src: "/x.webp", alt: "x", width: 10, height: 10 }],
  availability: "available",
  possession: "ready-to-move",
  published: true,
  verification: { listingAuthorised: true, detailsVerifiedOn: "2026-01-01", photosGenuine: true },
  compliance: { projectReraRequired: false },
};

export const fixtures: Property[] = [
  { ...base, id: "t1", slug: "t1", referenceId: "T-1", title: "Two bedroom flat", category: "residential", type: "apartment", transaction: "sale", locality: "kandivali-east", price: { amount: 9_000_000 }, carpetAreaSqFt: 650, bedrooms: 2, bathrooms: 2, listedOn: "2026-01-03", featured: true },
  { ...base, id: "t2", slug: "t2", referenceId: "T-2", title: "Three bedroom home", category: "residential", type: "apartment", transaction: "sale", locality: "borivali-west", price: { amount: 25_000_000 }, carpetAreaSqFt: 1100, bedrooms: 3, bathrooms: 3, listedOn: "2026-01-05" },
  { ...base, id: "t3", slug: "t3", referenceId: "T-3", title: "One bedroom rental", category: "residential", type: "apartment", transaction: "rent", locality: "kandivali-east", price: { amount: 30_000 }, carpetAreaSqFt: 420, bedrooms: 1, bathrooms: 1, listedOn: "2026-01-02", availability: "rented" },
  { ...base, id: "t4", slug: "t4", referenceId: "T-4", title: "Office suite", category: "commercial", type: "office", transaction: "lease", locality: "andheri-east", price: { amount: 150_000 }, carpetAreaSqFt: 1500, listedOn: "2026-01-04" },
  { ...base, id: "t5", slug: "t5", referenceId: "T-5", title: "High street shop", category: "commercial", type: "shop", transaction: "sale", locality: "malad-west", price: { amount: 0, onRequest: true }, carpetAreaSqFt: 300, listedOn: "2026-01-01" },
  { ...base, id: "t6", slug: "t6", referenceId: "T-6", title: "Large family residence", category: "residential", type: "penthouse", transaction: "sale", locality: "juhu", price: { amount: 80_000_000 }, carpetAreaSqFt: 2600, bedrooms: 5, bathrooms: 5, listedOn: "2026-01-06" },
  // Must never be listed: unpublished, unauthorised, missing RERA
  { ...base, id: "d1", slug: "d1", referenceId: "D-1", title: "Draft", category: "residential", type: "apartment", transaction: "sale", locality: "bandra", price: { amount: 1 }, carpetAreaSqFt: 1, bedrooms: 1, bathrooms: 1, listedOn: "2026-01-01", published: false },
  { ...base, id: "d2", slug: "d2", referenceId: "D-2", title: "Unauthorised", category: "residential", type: "apartment", transaction: "sale", locality: "bandra", price: { amount: 1 }, carpetAreaSqFt: 1, bedrooms: 1, bathrooms: 1, listedOn: "2026-01-01", verification: { listingAuthorised: false, detailsVerifiedOn: "2026-01-01", photosGenuine: true } },
  { ...base, id: "d3", slug: "d3", referenceId: "D-3", title: "New project no RERA", category: "residential", type: "apartment", transaction: "sale", locality: "bandra", price: { amount: 1 }, carpetAreaSqFt: 1, bedrooms: 1, bathrooms: 1, listedOn: "2026-01-01", compliance: { projectReraRequired: true } },
  { ...base, id: "d4", slug: "d4", referenceId: "D-4", title: "Stock photos", category: "residential", type: "apartment", transaction: "sale", locality: "bandra", price: { amount: 1 }, carpetAreaSqFt: 1, bedrooms: 1, bathrooms: 1, listedOn: "2026-01-01", verification: { listingAuthorised: true, detailsVerifiedOn: "2026-01-01", photosGenuine: false } },
];
