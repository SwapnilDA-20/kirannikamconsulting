/**
 * Strongly typed property model.
 * See PROPERTY-MANAGEMENT.md for how to add a listing.
 */

/** What the visitor can do with the property. "sale" = available to buy. */
export type TransactionType = "sale" | "rent" | "lease";

export type PropertyCategory = "residential" | "commercial";

export type ResidentialType =
  | "apartment"
  | "studio"
  | "penthouse"
  | "duplex"
  | "row-house"
  | "independent-house";

export type CommercialType =
  | "office"
  | "shop"
  | "retail"
  | "showroom"
  | "commercial-unit"
  | "commercial-building"
  | "co-working";

export type PropertyType = ResidentialType | CommercialType;

export type Availability =
  | "available"
  | "under-offer"
  | "sold"
  | "rented"
  | "leased"
  | "coming-soon";

export type Furnishing = "unfurnished" | "semi-furnished" | "fully-furnished";

export type Possession = "ready-to-move" | "under-construction";

export interface PropertyImage {
  /** Path under /public, e.g. "/images/properties/kn-r-001/01.webp" */
  src: string;
  /** Describe what the photo shows — required for accessibility and SEO */
  alt: string;
  width: number;
  height: number;
}

export interface PropertyPrice {
  /** In Indian Rupees. For rent / lease this is the monthly amount. */
  amount: number;
  /** Set true to hide the number and show "Price on request" */
  onRequest?: boolean;
  negotiable?: boolean;
  /** Security deposit (rent / lease), in INR */
  deposit?: number;
  /** Monthly maintenance, in INR, if known */
  maintenance?: number;
}

/** Compliance details for this listing — see RERA-COMPLIANCE-CHECKLIST.md */
export interface ListingCompliance {
  /**
   * Set true if the listing is for a project that must be registered with
   * MahaRERA (e.g. new / under-construction project units). Such listings are
   * NOT published unless a projectRegistrationNumber is provided.
   */
  projectReraRequired: boolean;
  projectName?: string;
  projectRegistrationNumber?: string;
  /** Path to the MahaRERA project QR code image, if required */
  projectQrCode?: string;
}

/** Internal verification record — required before a listing is published. */
export interface ListingVerification {
  /** Owner / developer has authorised Kiran Nikam Consulting to market this property */
  listingAuthorised: boolean;
  /** Price, carpet area and availability checked with the owner on this ISO date */
  detailsVerifiedOn: string;
  /** Photographs are genuine photographs of THIS property */
  photosGenuine: boolean;
}

interface BaseProperty {
  /** Internal unique ID, e.g. "kn-r-001" */
  id: string;
  /** URL segment: /properties/<slug> — lowercase, hyphenated, unique */
  slug: string;
  /** Public reference quoted in enquiries, e.g. "KN-R-001" */
  referenceId: string;
  title: string;
  transaction: TransactionType;
  /** Must match a slug in src/data/localities.ts where possible */
  locality: string;
  city: string;
  /** Optional building / area line. Omit if the owner prefers privacy. */
  addressLine?: string;
  price: PropertyPrice;
  /** Carpet area in square feet (as per RERA definition, where applicable) */
  carpetAreaSqFt: number;
  description: string;
  highlights?: string[];
  amenities: string[];
  images: PropertyImage[];
  availability: Availability;
  possession: Possession;
  furnishing?: Furnishing;
  floor?: string;
  parking?: string;
  /** Show on the homepage "Featured listings" section */
  featured?: boolean;
  /** Master switch. false = draft; never shown on the website. */
  published: boolean;
  /** ISO date the listing was added — used for "Newest" sorting */
  listedOn: string;
  verification: ListingVerification;
  compliance: ListingCompliance;
}

export interface ResidentialProperty extends BaseProperty {
  category: "residential";
  type: ResidentialType;
  /** BHK count. Use 0 for studio / 1 RK. */
  bedrooms: number;
  bathrooms: number;
  balconies?: number;
  facing?: string;
}

export interface CommercialProperty extends BaseProperty {
  category: "commercial";
  type: CommercialType;
  washrooms?: number;
  cabins?: number;
  workstations?: number;
  /** Shop / retail frontage in feet */
  frontageFt?: number;
  pantry?: boolean;
}

export type Property = ResidentialProperty | CommercialProperty;
