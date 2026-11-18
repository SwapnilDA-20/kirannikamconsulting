/**
 * ============================================================
 *  KIRAN NIKAM CONSULTING — CENTRAL BUSINESS CONFIGURATION
 * ============================================================
 *
 *  This is the ONLY place where business details live.
 *  Every page and component reads from this file — never type a
 *  phone number, email or address directly into a component.
 *
 *  Fields marked VERIFIED were supplied by the business.
 *  Fields marked EDITABLE / PLACEHOLDER must be confirmed before launch.
 *  See LAUNCH-CHECKLIST.md.
 */

export type ReraAgentStatus = "not-provided" | "registered" | "not-applicable";

export interface BusinessHours {
  /** e.g. "Monday – Saturday" */
  days: string;
  /** e.g. "10:00 AM – 7:00 PM" */
  hours: string;
}

export const siteConfig = {
  // ---------------------------------------------------------- VERIFIED
  name: "Kiran Nikam Consulting",
  shortName: "Kiran Nikam",
  consultant: {
    name: "Kiran Nikam",
    designation: "Real Estate Consultant",
    // EDITABLE — replace the file at this path to change the photograph.
    photo: {
      src: "/images/consultant/kiran-nikam-profile.webp",
      width: 960,
      height: 1200,
      alt: "Kiran Nikam, Real Estate Consultant at Kiran Nikam Consulting, at his office desk",
    },
    secondaryPhoto: {
      src: "/images/consultant/kiran-nikam-office.webp",
      width: 960,
      height: 1280,
      alt: "Kiran Nikam seated at his desk in the Kiran Nikam Consulting office, Kandivali East",
    },
  },
  category: "Residential and Commercial Real Estate Consultancy",
  primaryMarket: "Mumbai Western Suburbs",
  city: "Mumbai",
  tagline: "Your Property Journey. Our Expertise.",
  altHeadline: "Discover the Right Property. Make the Right Move.",

  contact: {
    /** Shown to visitors */
    phoneDisplay: "+91 98709 47557",
    /** Used for tel: links (E.164) */
    phoneE164: "+919870947557",
    /** Digits only, country code first, no "+" — used for wa.me links */
    whatsapp: "919870947557",
    email: "kirannikam5171@gmail.com",
  },

  address: {
    line1: "Shop No. 10, Dynasty CHSL",
    line2: "Thakur Complex, 90 Feet Road",
    locality: "Kandivali East",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400101",
    country: "India",
    countryCode: "IN",
    /** One-line version for display */
    full: "Shop No. 10, Dynasty CHSL, Thakur Complex, 90 Feet Road, Kandivali East, Mumbai, Maharashtra 400101, India",
    /** Google Maps search link — no API key required */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Dynasty CHSL, Thakur Complex, 90 Feet Road, Kandivali East, Mumbai 400101",
      ),
  },

  // ---------------------------------------------------------- EDITABLE
  /**
   * PLACEHOLDER — production domain. Set NEXT_PUBLIC_SITE_URL in the
   * Cloudflare Pages environment, or change the fallback below, once the
   * custom domain is live. Used for canonical URLs, sitemap and Open Graph.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://kirannikamconsulting.pages.dev").replace(/\/$/, ""),

  description:
    "Kiran Nikam Consulting is a Mumbai-based real estate consultancy helping individuals, families and businesses explore residential and commercial property opportunities across Mumbai's Western Suburbs.",

  logo: {
    primary: "/images/brand/logo.svg",
    onDark: "/images/brand/logo-light.svg",
    mono: "/images/brand/logo-dark.svg",
    mark: "/images/brand/logo-mark.svg",
    favicon: "/images/brand/favicon.svg",
  },

  ogImage: "/images/og/og-default.jpg",

  /**
   * EDITABLE — business hours. Leave as null until confirmed; the site
   * then shows "Visits by appointment" instead of inventing hours.
   * Example: [{ days: "Monday – Saturday", hours: "10:00 AM – 7:00 PM" }]
   */
  businessHours: null as BusinessHours[] | null,

  /**
   * EDITABLE — social media profiles. Only add genuine, owned accounts.
   * Empty strings are hidden automatically.
   */
  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  /**
   * ============================================================
   *  MAHARERA — DO NOT FILL WITH UNVERIFIED INFORMATION
   * ============================================================
   *  Nothing in this block is shown publicly unless:
   *    agent.status === "registered"  AND
   *    agent.registrationNumber is set AND
   *    agent.verifiedOn is set         AND
   *    publish === true
   *  See RERA-COMPLIANCE-CHECKLIST.md.
   */
  rera: {
    publish: false as boolean,
    agent: {
      status: "not-provided" as ReraAgentStatus,
      /** MahaRERA agent registration number, exactly as on the certificate */
      registrationNumber: "",
      /** ISO date, e.g. "2025-01-15" */
      validFrom: "",
      /** ISO date */
      validUntil: "",
      /** ISO date on which the number was checked on the MahaRERA portal */
      verifiedOn: "",
    },
    /** Official portal — used for the "verify on MahaRERA" link */
    portalUrl: "https://maharera.maharashtra.gov.in",
    /** Additional disclosure text approved by the business / its advisor */
    disclosureText: "",
  },

  /** General disclaimers — factual, make no regulatory claims. */
  disclaimers: {
    general:
      "Property information on this website is provided for general guidance only and does not constitute an offer or contract. Details, availability and prices must be independently verified before any decision is made.",
    illustrative:
      "Photographs marked “Illustrative” are representative design imagery and do not depict any specific property offered by Kiran Nikam Consulting.",
    enquiry:
      "Submitting an enquiry opens WhatsApp or your email app with a pre-filled message. Nothing is sent or stored by this website until you send the message yourself.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** True only when MahaRERA agent details have been verified and approved for publication. */
export function isReraPublishable(): boolean {
  const { publish, agent } = siteConfig.rera;
  return (
    publish === true &&
    agent.status === "registered" &&
    agent.registrationNumber.trim().length > 0 &&
    agent.verifiedOn.trim().length > 0
  );
}

export const telHref = `tel:${siteConfig.contact.phoneE164}`;
export const mailHref = `mailto:${siteConfig.contact.email}`;
