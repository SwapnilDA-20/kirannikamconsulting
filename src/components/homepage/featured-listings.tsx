import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertyEmptyState } from "@/components/properties/property-empty-state";
import { getFeaturedProperties } from "@/lib/property-utils";
import { whatsappLinks } from "@/lib/whatsapp";

export function FeaturedListings() {
  const featured = getFeaturedProperties();
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-ivory sm:py-32" aria-labelledby="featured-heading">
      <div className="bg-blueprint absolute inset-0 opacity-50" aria-hidden />
      <div className="container-luxe relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="dark"
            eyebrow="Featured listings"
            title={<span id="featured-heading">Verified opportunities, carefully presented.</span>}
            intro={<p>Every listing is published only after its details have been confirmed with the owner.</p>}
          />
          {featured.length > 0 && (
            <Link href="/properties" className="group inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-gold">
              View all properties <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
        </div>
        <div className="mt-14">
          {featured.length > 0 ? (
            <PropertyGrid items={featured} />
          ) : (
            <PropertyEmptyState tone="dark" whatsappHref={whatsappLinks.general()} />
          )}
        </div>
      </div>
    </section>
  );
}
