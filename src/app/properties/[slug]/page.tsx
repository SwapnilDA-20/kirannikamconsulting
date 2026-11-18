import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { PropertyGallery } from "@/components/properties/property-gallery";
import { PropertyEnquiry } from "@/components/properties/property-enquiry";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertyEmptyState } from "@/components/properties/property-empty-state";
import { JsonLd } from "@/components/shared/json-ld";
import { Badge } from "@/components/ui/badge";
import { RegulatoryInfo } from "@/components/contact/regulatory-info";
import { getLocalityName } from "@/data/localities";
import { formatArea, formatINR } from "@/lib/currency";
import {
  availabilityLabels,
  formatPropertyPrice,
  getPropertyBySlug,
  getPublishedProperties,
  getRelatedProperties,
  isPeriodic,
  propertySummary,
  propertyTypeLabels,
  transactionLabels,
} from "@/lib/property-utils";
import { absoluteUrl, createMetadata } from "@/lib/seo";
import { whatsappLinks } from "@/lib/whatsapp";
import { siteConfig } from "@/config/site";
import type { Property } from "@/types/property";

/**
 * Static export requires at least one generated path. While there is no
 * verified inventory, a single non-indexed placeholder route is generated
 * that shows the "listings being curated" state — never a fake listing.
 */
const PLACEHOLDER_SLUG = "listings-coming-soon";

export const dynamicParams = false;

export function generateStaticParams() {
  const published = getPublishedProperties();
  if (published.length === 0) return [{ slug: PLACEHOLDER_SLUG }];
  return published.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPropertyBySlug(slug);
  if (!p) {
    return createMetadata({
      title: "Verified Listings Coming Soon",
      description: "Verified property listings from Kiran Nikam Consulting are being prepared.",
      path: `/properties/${slug}`,
      noIndex: true,
    });
  }
  const cover = p.images[0];
  return createMetadata({
    title: `${p.title} — ${transactionLabels[p.transaction]} in ${getLocalityName(p.locality)}`,
    description: `${propertySummary(p)}. ${formatPropertyPrice(p)}. Ref ${p.referenceId}. Enquire with ${siteConfig.name}.`.slice(0, 300),
    path: `/properties/${p.slug}`,
    image: cover ? { src: cover.src, alt: cover.alt, width: cover.width, height: cover.height } : undefined,
  });
}

function specs(p: Property): [string, string][] {
  const rows: [string, string][] = [
    ["Reference ID", p.referenceId],
    ["Transaction", transactionLabels[p.transaction]],
    ["Property type", propertyTypeLabels[p.type]],
    ["Carpet area", formatArea(p.carpetAreaSqFt)],
  ];
  if (p.category === "residential") {
    rows.push(["Configuration", p.bedrooms === 0 ? "Studio / 1 RK" : `${p.bedrooms} BHK`]);
    rows.push(["Bathrooms", String(p.bathrooms)]);
    if (p.balconies !== undefined) rows.push(["Balconies", String(p.balconies)]);
    if (p.facing) rows.push(["Facing", p.facing]);
  } else {
    if (p.washrooms !== undefined) rows.push(["Washrooms", String(p.washrooms)]);
    if (p.cabins !== undefined) rows.push(["Cabins", String(p.cabins)]);
    if (p.workstations !== undefined) rows.push(["Workstations", String(p.workstations)]);
    if (p.frontageFt !== undefined) rows.push(["Frontage", `${p.frontageFt} ft`]);
    if (p.pantry !== undefined) rows.push(["Pantry", p.pantry ? "Yes" : "No"]);
  }
  if (p.floor) rows.push(["Floor", p.floor]);
  if (p.furnishing) rows.push(["Furnishing", p.furnishing.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())]);
  if (p.parking) rows.push(["Parking", p.parking]);
  rows.push(["Possession", p.possession === "ready-to-move" ? "Ready to move" : "Under construction"]);
  rows.push(["Availability", availabilityLabels[p.availability]]);
  if (isPeriodic(p) && p.price.deposit) rows.push(["Security deposit", formatINR(p.price.deposit)]);
  if (p.price.maintenance) rows.push(["Maintenance", `${formatINR(p.price.maintenance)} / month`]);
  return rows;
}

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params;
  const p = getPropertyBySlug(slug);

  if (!p) {
    if (slug !== PLACEHOLDER_SLUG) notFound();
    return (
      <section className="bg-navy pt-36 pb-24 text-ivory sm:pt-44">
        <div className="container-luxe">
          <Breadcrumbs items={[{ name: "Properties", path: "/properties" }, { name: "Coming soon", path: `/properties/${slug}` }]} />
          <PropertyEmptyState tone="dark" className="mt-10" whatsappHref={whatsappLinks.general()} showBrowseLink titleAs="h1" />
        </div>
      </section>
    );
  }

  const related = getRelatedProperties(p);
  const localityName = getLocalityName(p.locality);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    url: absoluteUrl(`/properties/${p.slug}`),
    description: p.description,
    datePosted: p.listedOn,
    image: p.images.map((i) => absoluteUrl(i.src)),
    identifier: p.referenceId,
    provider: { "@id": absoluteUrl("/#organization") },
    about: {
      "@type": p.category === "residential" ? "Apartment" : "Place",
      name: p.title,
      address: { "@type": "PostalAddress", addressLocality: `${localityName}, ${p.city}`, addressRegion: "Maharashtra", addressCountry: "IN" },
      floorSize: { "@type": "QuantitativeValue", value: p.carpetAreaSqFt, unitCode: "FTK" },
      ...(p.category === "residential" ? { numberOfRooms: p.bedrooms } : {}),
    },
    ...(!p.price.onRequest && p.price.amount
      ? {
          offers: {
            "@type": "Offer",
            price: p.price.amount,
            priceCurrency: "INR",
            availability: p.availability === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            ...(isPeriodic(p) ? { priceSpecification: { "@type": "UnitPriceSpecification", price: p.price.amount, priceCurrency: "INR", unitCode: "MON" } } : {}),
          },
        }
      : {}),
  };

  return (
    <>
      <section className="bg-navy pt-32 pb-12 text-ivory sm:pt-40">
        <div className="container-luxe">
          <Breadcrumbs items={[{ name: "Properties", path: "/properties" }, { name: p.title, path: `/properties/${p.slug}` }]} />
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge>{transactionLabels[p.transaction]}</Badge>
            <Badge variant="glass">{availabilityLabels[p.availability]}</Badge>
            <Badge variant="glass">Ref {p.referenceId}</Badge>
          </div>
          <h1 className="section-title mt-5 max-w-4xl">{p.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-ivory/75">
            <MapPin className="size-4 text-gold" aria-hidden /> {p.addressLine ? `${p.addressLine}, ` : ""}
            {localityName}, {p.city}
          </p>
          <p className="mt-6 font-serif text-4xl text-gold">{formatPropertyPrice(p)}</p>
          {p.price.negotiable && <p className="mt-1 text-sm text-ivory/60">Negotiable</p>}
        </div>
      </section>

      <section className="on-light bg-ivory py-14 sm:py-20">
        <div className="container-luxe grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PropertyGallery images={p.images} title={p.title} />

            <h2 className="mt-14 text-3xl text-navy">About this property</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-charcoal">
              {p.description.split(/\n{2,}/).map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            {p.highlights && p.highlights.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl text-navy">Highlights</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-gold" aria-hidden /> {h}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-12 text-3xl text-navy">Specifications</h2>
            <dl className="mt-5 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
              {specs(p).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-3.5 text-sm">
                  <dt className="text-muted-dark">{k}</dt>
                  <dd className="text-right font-medium text-navy">{v}</dd>
                </div>
              ))}
            </dl>

            {p.amenities.length > 0 && (
              <>
                <h2 className="mt-12 text-3xl text-navy">Amenities</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.amenities.map((a) => (
                    <li key={a} className="border border-line bg-white px-4 py-2 text-sm text-navy">
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-12 border-t border-line pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Listing disclosures</h2>
              {p.compliance.projectRegistrationNumber && (
                <p className="mt-3 text-sm text-navy">
                  {p.compliance.projectName ? `${p.compliance.projectName} — ` : ""}MahaRERA Project Registration No.:{" "}
                  <strong>{p.compliance.projectRegistrationNumber}</strong> ·{" "}
                  <a href={siteConfig.rera.portalUrl} target="_blank" rel="noopener noreferrer" className="text-gold-dark underline underline-offset-4">
                    maharera.maharashtra.gov.in
                  </a>
                </p>
              )}
              {p.compliance.projectQrCode && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.compliance.projectQrCode} alt={`MahaRERA QR code for ${p.compliance.projectName ?? p.title}`} width={120} height={120} className="mt-4" />
              )}
              <p className="mt-3 text-xs text-muted-dark">
                Details verified with the owner on{" "}
                {new Date(p.verification.detailsVerifiedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.
                Price, availability and specifications may change; please confirm before making any decision.
              </p>
              <RegulatoryInfo tone="light" className="mt-3" />
            </div>
          </div>
          <div className="lg:col-span-4">
            <PropertyEnquiry property={p} />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="on-light bg-white py-20" aria-labelledby="related-heading">
          <div className="container-luxe">
            <h2 id="related-heading" className="section-title text-navy">
              Similar properties
            </h2>
            <div className="mt-10">
              <PropertyGrid items={related} />
            </div>
          </div>
        </section>
      )}
      <JsonLd data={jsonLd} />
    </>
  );
}
