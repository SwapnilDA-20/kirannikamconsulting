import { Suspense } from "react";
import type { PropertyFilters } from "@/lib/property-utils";
import { applyFilters, getPublishedProperties } from "@/lib/property-utils";
import { localities } from "@/data/localities";
import { PropertyExplorer } from "./property-explorer";
import { PropertyGrid } from "./property-grid";
import { PropertyEmptyState } from "./property-empty-state";
import { whatsappLinks } from "@/lib/whatsapp";

type Locked = Pick<PropertyFilters, "category" | "transaction" | "locality">;

/**
 * Server wrapper: pre-renders matching listings (good for SEO and no-JS),
 * then the client explorer takes over with live filters and shareable URLs.
 */
export function PropertyExplorerSection({ locked = {}, whatsappHref }: { locked?: Locked; whatsappHref?: string }) {
  const published = getPublishedProperties();
  const scoped = applyFilters(published, locked);
  const options = localities.map(({ slug, name }) => ({ slug, name }));
  const fallback =
    scoped.length > 0 ? (
      <PropertyGrid items={scoped} />
    ) : (
      <PropertyEmptyState whatsappHref={whatsappHref ?? whatsappLinks.general()} />
    );
  return (
    <Suspense fallback={fallback}>
      <PropertyExplorer properties={scoped} localities={options} locked={locked} />
    </Suspense>
  );
}
