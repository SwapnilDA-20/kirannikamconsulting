import type { Metadata } from "next";
import { siteConfig, isReraPublishable } from "@/config/site";
import { localities } from "@/data/localities";

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

interface MetaInput {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string; width?: number; height?: number };
  noIndex?: boolean;
  /** Use the title exactly, without the brand suffix */
  absoluteTitle?: boolean;
}

export function createMetadata({ title, description, path, image, noIndex, absoluteTitle }: MetaInput): Metadata {
  const ogImage = image ?? {
    src: siteConfig.ogImage,
    alt: `${siteConfig.name} — ${siteConfig.tagline}`,
    width: 1200,
    height: 630,
  };
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: ogImage.src, alt: ogImage.alt, width: ogImage.width, height: ogImage.height }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.src],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/* ------------------------------------------------------------------ */
/*  Structured data (JSON-LD)                                          */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  const hours = siteConfig.businessHours;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo.primary),
    image: absoluteUrl(siteConfig.consultant.photo.src),
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    slogan: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: `${siteConfig.address.locality}, ${siteConfig.address.city}`,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.countryCode,
    },
    hasMap: siteConfig.address.mapsUrl,
    areaServed: localities.map((l) => ({
      "@type": "Place",
      name: `${l.name}, Mumbai`,
    })),
    employee: {
      "@type": "Person",
      name: siteConfig.consultant.name,
      jobTitle: siteConfig.consultant.designation,
      image: absoluteUrl(siteConfig.consultant.photo.src),
    },
    knowsAbout: [
      "Residential real estate",
      "Commercial real estate",
      "Property rentals",
      "Office leasing",
      "Mumbai Western Suburbs",
    ],
    ...(hours
      ? { openingHours: hours.map((h) => `${h.days} ${h.hours}`) }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(isReraPublishable()
      ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "MahaRERA Agent Registration",
            value: siteConfig.rera.agent.registrationNumber,
          },
        }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-IN",
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
