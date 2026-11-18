import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, MapPin, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Property } from "@/types/property";
import { getLocalityName } from "@/data/localities";
import { formatArea } from "@/lib/currency";
import {
  availabilityLabels,
  formatPropertyPrice,
  propertyTypeLabels,
  transactionLabels,
} from "@/lib/property-utils";

export function PropertyCard({ property: p }: { property: Property }) {
  const cover = p.images[0];
  return (
    <article className="group relative flex h-full flex-col bg-white shadow-[0_1px_0_rgb(16_28_44/0.06)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(16_28_44/0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-105"
          />
        )}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="gold">{transactionLabels[p.transaction]}</Badge>
          {p.availability !== "available" && <Badge variant="glass">{availabilityLabels[p.availability]}</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {propertyTypeLabels[p.type]} · Ref {p.referenceId}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-snug text-navy">
          <Link href={`/properties/${p.slug}`} className="after:absolute after:inset-0">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-dark">
          <MapPin className="size-3.5" aria-hidden /> {getLocalityName(p.locality)}, {p.city}
        </p>
        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 text-sm text-charcoal">
          {p.category === "residential" && (
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Bedrooms</dt>
              <BedDouble className="size-4 text-gold-dark" aria-hidden />
              <dd>{p.bedrooms === 0 ? "Studio" : `${p.bedrooms} BHK`}</dd>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Carpet area</dt>
            <Ruler className="size-4 text-gold-dark" aria-hidden />
            <dd>{formatArea(p.carpetAreaSqFt)}</dd>
          </div>
        </dl>
        <div className="mt-auto flex items-end justify-between pt-6">
          <p className="font-serif text-2xl text-navy">{formatPropertyPrice(p)}</p>
          <ArrowUpRight
            className="size-5 text-gold-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
      </div>
    </article>
  );
}
