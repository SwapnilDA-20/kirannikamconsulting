import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { PropertyExplorerSection } from "@/components/properties/property-explorer-section";
import { ContactCta } from "@/components/contact/contact-cta";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Properties in Mumbai — Search Flats, Offices & Shops",
  description:
    "Search verified residential and commercial properties to buy, rent or lease across Mumbai’s Western Suburbs. Filter by locality, budget, carpet area, BHK and more.",
  path: "/properties",
});

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Properties"
        title="Discover the right property."
        intro="Search verified residential and commercial listings across Mumbai’s Western Suburbs. Every search is shareable — copy the address bar to send it to family or colleagues."
        crumbs={[{ name: "Properties", path: "/properties" }]}
        image={{ src: "/images/illustrative/lounge-interior.webp", alt: "" }}
      />
      <section className="bg-ivory py-16 sm:py-20" aria-label="Property search">
        <div className="container-luxe">
          <h2 className="sr-only">Search and filter properties</h2>
          <PropertyExplorerSection />
        </div>
      </section>
      <ContactCta title="Can’t find what you need?" body="Many opportunities are discussed privately before they are listed. Tell Kiran your requirement." />
    </>
  );
}
