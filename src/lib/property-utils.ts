import type {
  Availability,
  CommercialType,
  Property,
  PropertyCategory,
  PropertyType,
  ResidentialType,
  TransactionType,
} from "@/types/property";
import { properties as allProperties } from "@/data/properties";
import { getLocalityName } from "@/data/localities";
import { formatArea, formatINRCompact } from "@/lib/currency";

/* ------------------------------------------------------------------ */
/*  Labels                                                             */
/* ------------------------------------------------------------------ */

export const transactionLabels: Record<TransactionType, string> = {
  sale: "For Sale",
  rent: "For Rent",
  lease: "For Lease",
};

/** Filter-facing labels (visitor intent) */
export const transactionIntentLabels: Record<TransactionType, string> = {
  sale: "Buy",
  rent: "Rent",
  lease: "Lease",
};

export const categoryLabels: Record<PropertyCategory, string> = {
  residential: "Residential",
  commercial: "Commercial",
};

export const residentialTypeLabels: Record<ResidentialType, string> = {
  apartment: "Apartment / Flat",
  studio: "Studio / 1 RK",
  penthouse: "Penthouse",
  duplex: "Duplex",
  "row-house": "Row House",
  "independent-house": "Independent House",
};

export const commercialTypeLabels: Record<CommercialType, string> = {
  office: "Office Space",
  shop: "Shop",
  retail: "Retail Unit",
  showroom: "Showroom",
  "commercial-unit": "Commercial Unit",
  "commercial-building": "Commercial Building",
  "co-working": "Co-working / Managed Office",
};

export const propertyTypeLabels: Record<PropertyType, string> = {
  ...residentialTypeLabels,
  ...commercialTypeLabels,
};

export const availabilityLabels: Record<Availability, string> = {
  available: "Available",
  "under-offer": "Under Offer",
  sold: "Sold",
  rented: "Rented",
  leased: "Leased",
  "coming-soon": "Coming Soon",
};

/* ------------------------------------------------------------------ */
/*  Publication gate                                                   */
/* ------------------------------------------------------------------ */

/**
 * A listing is only shown publicly if it is published, authorised,
 * verified, has genuine photographs, and — where a MahaRERA project
 * registration is required — has that registration number.
 */
export function isPubliclyListable(p: Property): boolean {
  const v = p.verification;
  if (!p.published) return false;
  if (!v.listingAuthorised || !v.photosGenuine || !v.detailsVerifiedOn) return false;
  if (p.images.length === 0) return false;
  if (p.compliance.projectReraRequired && !p.compliance.projectRegistrationNumber?.trim()) return false;
  return true;
}

export function getPublishedProperties(source: Property[] = allProperties): Property[] {
  return source.filter(isPubliclyListable);
}

export function getPropertyBySlug(slug: string, source: Property[] = allProperties): Property | undefined {
  return getPublishedProperties(source).find((p) => p.slug === slug);
}

export function getFeaturedProperties(source: Property[] = allProperties, limit = 6): Property[] {
  return getPublishedProperties(source)
    .filter((p) => p.featured && p.availability === "available")
    .slice(0, limit);
}

export function getRelatedProperties(p: Property, source: Property[] = allProperties, limit = 3): Property[] {
  return getPublishedProperties(source)
    .filter((o) => o.id !== p.id && o.category === p.category)
    .sort((a, b) => Number(b.locality === p.locality) - Number(a.locality === p.locality))
    .slice(0, limit);
}

/* ------------------------------------------------------------------ */
/*  Display helpers                                                    */
/* ------------------------------------------------------------------ */

export function isPeriodic(p: Pick<Property, "transaction">): boolean {
  return p.transaction === "rent" || p.transaction === "lease";
}

export function formatPropertyPrice(p: Pick<Property, "price" | "transaction">): string {
  if (p.price.onRequest || !p.price.amount) return "Price on request";
  const base = formatINRCompact(p.price.amount);
  return isPeriodic(p) ? `${base} / month` : base;
}

export function propertySummary(p: Property): string {
  const parts: string[] = [];
  if (p.category === "residential") {
    parts.push(p.bedrooms === 0 ? "Studio" : `${p.bedrooms} BHK`);
  }
  parts.push(propertyTypeLabels[p.type]);
  parts.push(formatArea(p.carpetAreaSqFt) + " carpet");
  parts.push(getLocalityName(p.locality));
  return parts.join(" · ");
}

/* ------------------------------------------------------------------ */
/*  Filters                                                            */
/* ------------------------------------------------------------------ */

export type SortOption = "newest" | "price-asc" | "price-desc" | "area-desc" | "area-asc";

export const sortLabels: Record<SortOption, string> = {
  newest: "Newest first",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "area-desc": "Carpet area: largest first",
  "area-asc": "Carpet area: smallest first",
};

export interface PropertyFilters {
  q?: string;
  transaction?: TransactionType;
  category?: PropertyCategory;
  type?: PropertyType;
  locality?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  /** Minimum BHK. 4 means 4+ */
  bedrooms?: number;
  availability?: "available" | "any";
  sort?: SortOption;
}

export interface RangeOption {
  label: string;
  min?: number;
  max?: number;
}

export const saleBudgetOptions: RangeOption[] = [
  { label: "Up to ₹50 L", max: 5_000_000 },
  { label: "₹50 L – ₹1 Cr", min: 5_000_000, max: 10_000_000 },
  { label: "₹1 Cr – ₹2 Cr", min: 10_000_000, max: 20_000_000 },
  { label: "₹2 Cr – ₹5 Cr", min: 20_000_000, max: 50_000_000 },
  { label: "Above ₹5 Cr", min: 50_000_000 },
];

export const rentBudgetOptions: RangeOption[] = [
  { label: "Up to ₹25,000 / month", max: 25_000 },
  { label: "₹25,000 – ₹50,000 / month", min: 25_000, max: 50_000 },
  { label: "₹50,000 – ₹1 L / month", min: 50_000, max: 100_000 },
  { label: "₹1 L – ₹3 L / month", min: 100_000, max: 300_000 },
  { label: "Above ₹3 L / month", min: 300_000 },
];

export const areaOptions: RangeOption[] = [
  { label: "Up to 500 sq ft", max: 500 },
  { label: "500 – 800 sq ft", min: 500, max: 800 },
  { label: "800 – 1,200 sq ft", min: 800, max: 1200 },
  { label: "1,200 – 2,000 sq ft", min: 1200, max: 2000 },
  { label: "Above 2,000 sq ft", min: 2000 },
];

export const bedroomOptions = [1, 2, 3, 4] as const;

export function budgetOptionsFor(t?: TransactionType): RangeOption[] {
  if (!t) return [];
  return t === "sale" ? saleBudgetOptions : rentBudgetOptions;
}

function matchesQuery(p: Property, q: string): boolean {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    p.title,
    p.referenceId,
    p.description,
    getLocalityName(p.locality),
    p.addressLine ?? "",
    propertyTypeLabels[p.type],
    p.category === "residential" ? `${p.bedrooms} bhk ${p.bedrooms}bhk` : "",
  ]
    .join(" ")
    .toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

export function filterProperties(list: Property[], f: PropertyFilters): Property[] {
  return list.filter((p) => {
    if (f.q && !matchesQuery(p, f.q)) return false;
    if (f.transaction && p.transaction !== f.transaction) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.type && p.type !== f.type) return false;
    if (f.locality && p.locality !== f.locality) return false;
    if (f.minPrice !== undefined || f.maxPrice !== undefined) {
      // Price-on-request listings cannot be compared, so they are excluded from budget filters.
      if (p.price.onRequest || !p.price.amount) return false;
      if (f.minPrice !== undefined && p.price.amount < f.minPrice) return false;
      if (f.maxPrice !== undefined && p.price.amount > f.maxPrice) return false;
    }
    if (f.minArea !== undefined && p.carpetAreaSqFt < f.minArea) return false;
    if (f.maxArea !== undefined && p.carpetAreaSqFt > f.maxArea) return false;
    if (f.bedrooms !== undefined) {
      if (p.category !== "residential") return false;
      if (f.bedrooms >= 4 ? p.bedrooms < 4 : p.bedrooms !== f.bedrooms) return false;
    }
    if (f.availability === "available" && p.availability !== "available") return false;
    return true;
  });
}

export function sortProperties(list: Property[], sort: SortOption = "newest"): Property[] {
  const copy = [...list];
  const price = (p: Property) => (p.price.onRequest || !p.price.amount ? Number.POSITIVE_INFINITY : p.price.amount);
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => price(a) - price(b));
    case "price-desc":
      return copy.sort((a, b) => {
        const pa = price(a) === Infinity ? -1 : price(a);
        const pb = price(b) === Infinity ? -1 : price(b);
        return pb - pa;
      });
    case "area-desc":
      return copy.sort((a, b) => b.carpetAreaSqFt - a.carpetAreaSqFt);
    case "area-asc":
      return copy.sort((a, b) => a.carpetAreaSqFt - b.carpetAreaSqFt);
    case "newest":
    default:
      return copy.sort((a, b) => b.listedOn.localeCompare(a.listedOn));
  }
}

export function applyFilters(list: Property[], f: PropertyFilters): Property[] {
  return sortProperties(filterProperties(list, f), f.sort);
}

/* ------------------------------------------------------------------ */
/*  Shareable URLs                                                     */
/* ------------------------------------------------------------------ */

const TRANSACTIONS: TransactionType[] = ["sale", "rent", "lease"];
const CATEGORIES: PropertyCategory[] = ["residential", "commercial"];
const SORTS = Object.keys(sortLabels) as SortOption[];
const TYPES = Object.keys(propertyTypeLabels) as PropertyType[];

function num(v: string | null): number | undefined {
  if (v === null || v.trim() === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function oneOf<T extends string>(v: string | null, allowed: readonly T[]): T | undefined {
  return v !== null && (allowed as readonly string[]).includes(v) ? (v as T) : undefined;
}

/** Parse filters from URL search params. Unknown / invalid values are ignored. */
export function parseFilters(params: URLSearchParams): PropertyFilters {
  const q = params.get("q")?.slice(0, 80) || undefined;
  const locality = params.get("locality");
  return {
    q,
    transaction: oneOf(params.get("transaction"), TRANSACTIONS),
    category: oneOf(params.get("category"), CATEGORIES),
    type: oneOf(params.get("type"), TYPES),
    locality: locality && /^[a-z0-9-]{1,40}$/.test(locality) ? locality : undefined,
    minPrice: num(params.get("minPrice")),
    maxPrice: num(params.get("maxPrice")),
    minArea: num(params.get("minArea")),
    maxArea: num(params.get("maxArea")),
    bedrooms: (() => {
      const b = num(params.get("bedrooms"));
      return b !== undefined && b >= 1 && b <= 4 ? Math.floor(b) : undefined;
    })(),
    availability: params.get("availability") === "available" ? "available" : undefined,
    sort: oneOf(params.get("sort"), SORTS),
  };
}

/** Serialise filters into a query string (without leading "?"). */
export function serializeFilters(f: PropertyFilters): string {
  const params = new URLSearchParams();
  (Object.entries(f) as [keyof PropertyFilters, unknown][]).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (k === "sort" && v === "newest") return;
    if (k === "availability" && v === "any") return;
    params.set(k, String(v));
  });
  return params.toString();
}

export function propertiesHref(f: PropertyFilters = {}): string {
  const qs = serializeFilters(f);
  return qs ? `/properties?${qs}` : "/properties";
}

export function countActiveFilters(f: PropertyFilters): number {
  return (Object.entries(f) as [keyof PropertyFilters, unknown][]).filter(
    ([k, v]) => v !== undefined && v !== "" && !(k === "sort") && !(k === "availability" && v === "any"),
  ).length;
}
