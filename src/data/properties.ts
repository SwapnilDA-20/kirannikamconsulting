import type { Property } from "@/types/property";

/**
 * ============================================================
 *  VERIFIED PROPERTY INVENTORY
 * ============================================================
 *
 *  This list is intentionally EMPTY.
 *  No property may be added here until:
 *    1. The owner / developer has authorised the listing.
 *    2. Price, carpet area and availability have been verified.
 *    3. Genuine photographs of THAT property are available.
 *    4. MahaRERA project details are available where applicable.
 *
 *  While the list is empty, the website shows a premium
 *  "Speak with Kiran" state instead of listings.
 *
 *  Step-by-step instructions: PROPERTY-MANAGEMENT.md
 *
 *  ---------------- TEMPLATE (copy, uncomment, fill in) ----------------
 *
 *  {
 *    id: "kn-r-001",
 *    slug: "2-bhk-apartment-kandivali-east-kn-r-001",
 *    referenceId: "KN-R-001",
 *    title: "2 BHK Apartment in Thakur Village",
 *    category: "residential",
 *    type: "apartment",
 *    transaction: "sale",            // "sale" | "rent" | "lease"
 *    locality: "kandivali-east",     // slug from src/data/localities.ts
 *    city: "Mumbai",
 *    price: { amount: 0, negotiable: false },   // INR; monthly for rent/lease
 *    carpetAreaSqFt: 0,
 *    bedrooms: 2,
 *    bathrooms: 2,
 *    balconies: 1,
 *    floor: "8th of 22",
 *    parking: "1 covered",
 *    furnishing: "semi-furnished",
 *    possession: "ready-to-move",
 *    availability: "available",
 *    description: "Write an accurate description here.",
 *    highlights: ["East-facing", "Close to Western Express Highway"],
 *    amenities: ["Lift", "Security", "Power backup"],
 *    images: [
 *      { src: "/images/properties/kn-r-001/01.webp", alt: "Living room", width: 1800, height: 1200 },
 *    ],
 *    featured: true,
 *    published: true,
 *    listedOn: "2026-01-15",
 *    verification: { listingAuthorised: true, detailsVerifiedOn: "2026-01-15", photosGenuine: true },
 *    compliance: { projectReraRequired: false },
 *  },
 */
export const properties: Property[] = [];
