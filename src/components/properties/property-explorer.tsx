"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import type { Property, PropertyCategory, PropertyType, TransactionType } from "@/types/property";
import {
  applyFilters,
  areaOptions,
  bedroomOptions,
  budgetOptionsFor,
  categoryLabels,
  commercialTypeLabels,
  countActiveFilters,
  parseFilters,
  residentialTypeLabels,
  serializeFilters,
  sortLabels,
  transactionIntentLabels,
  type PropertyFilters,
  type SortOption,
} from "@/lib/property-utils";
import { Input, Label, NativeSelect } from "@/components/ui/form-controls";
import { Button } from "@/components/ui/button";
import { AnimatedPropertyGrid } from "./animated-property-grid";
import { PropertyEmptyState } from "./property-empty-state";
import { buildWhatsAppUrl, whatsappMessages } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LocalityOption {
  slug: string;
  name: string;
}

function rangeKey(min?: number, max?: number) {
  return `${min ?? ""}-${max ?? ""}`;
}

export function PropertyExplorer({
  properties,
  localities,
  locked = {},
}: {
  properties: Property[];
  localities: LocalityOption[];
  /** Filters fixed by the page, e.g. { category: "residential" } on /residential */
  locked?: Pick<PropertyFilters, "category" | "transaction" | "locality">;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = useId();

  const filters: PropertyFilters = useMemo(
    () => ({ ...parseFilters(new URLSearchParams(searchParams.toString())), ...locked }),
    [searchParams, locked],
  );
  const [query, setQuery] = useState(filters.q ?? "");
  const [panelOpen, setPanelOpen] = useState(false);

  // Keep the text box in sync when the URL changes (e.g. back button)
  const [syncedQ, setSyncedQ] = useState(filters.q ?? "");
  if ((filters.q ?? "") !== syncedQ) {
    setSyncedQ(filters.q ?? "");
    setQuery(filters.q ?? "");
  }

  const update = (patch: Partial<PropertyFilters>) => {
    const next: PropertyFilters = { ...filters, ...patch };
    // Budget presets depend on the transaction type
    if ("transaction" in patch && patch.transaction !== filters.transaction) {
      next.minPrice = undefined;
      next.maxPrice = undefined;
    }
    // Bedrooms only apply to residential; property type must match category
    if ("category" in patch) {
      if (patch.category === "commercial") next.bedrooms = undefined;
      if (next.type && patch.category) {
        const valid = patch.category === "residential" ? next.type in residentialTypeLabels : next.type in commercialTypeLabels;
        if (!valid) next.type = undefined;
      }
    }
    // Locked values are implied by the page — keep them out of the URL
    (Object.keys(locked) as (keyof typeof locked)[]).forEach((k) => delete next[k]);
    const qs = serializeFilters(next);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Debounce free-text search into the URL (timer is cancelled by "Clear filters")
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const updateRef = useRef(update);
  useEffect(() => {
    updateRef.current = update;
  });
  useEffect(() => () => clearTimeout(timer.current), []);
  const onQueryChange = (value: string) => {
    setQuery(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => updateRef.current({ q: value.trim() || undefined }), 300);
  };

  const results = useMemo(() => applyFilters(properties, filters), [properties, filters]);
  const active = countActiveFilters({ ...filters, ...Object.fromEntries(Object.keys(locked).map((k) => [k, undefined])) });
  const budgetOptions = budgetOptionsFor(filters.transaction);
  const typeOptions: Partial<Record<PropertyType, string>> =
    filters.category === "residential"
      ? residentialTypeLabels
      : filters.category === "commercial"
        ? commercialTypeLabels
        : { ...residentialTypeLabels, ...commercialTypeLabels };

  const reset = () => {
    clearTimeout(timer.current);
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const requirementHref = buildWhatsAppUrl(
    filters.category === "commercial"
      ? whatsappMessages.commercial()
      : filters.category === "residential"
        ? whatsappMessages.residential()
        : whatsappMessages.general(),
  );

  const field = (name: string) => `${id}-${name}`;

  return (
    <div className="on-light">
      {/* Search bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor={field("q")} className="sr-only">
            Search properties
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-dark" aria-hidden />
          <Input
            id={field("q")}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by locality, BHK, type or reference (e.g. 2 BHK Kandivali)"
            className="h-14 pl-11"
            maxLength={80}
            autoComplete="off"
          />
        </div>
        <Button
          type="button"
          variant="navy"
          size="lg"
          className="lg:hidden"
          aria-expanded={panelOpen}
          aria-controls={field("panel")}
          onClick={() => setPanelOpen((o) => !o)}
        >
          <SlidersHorizontal /> Filters {active > 0 && <span className="bg-gold px-1.5 text-navy">{active}</span>}
        </Button>
      </div>

      {/* Filters */}
      <div
        id={field("panel")}
        className={cn(
          "mt-4 grid gap-4 border border-line bg-white p-5 sm:grid-cols-2 lg:grid lg:grid-cols-4 lg:p-6",
          panelOpen ? "grid" : "hidden",
        )}
      >
        {!locked.transaction && (
          <div>
            <Label htmlFor={field("transaction")}>I want to</Label>
            <NativeSelect
              id={field("transaction")}
              value={filters.transaction ?? ""}
              onChange={(e) => update({ transaction: (e.target.value || undefined) as TransactionType | undefined })}
            >
              <option value="">Buy, rent or lease</option>
              {(Object.keys(transactionIntentLabels) as TransactionType[]).map((t) => (
                <option key={t} value={t}>
                  {transactionIntentLabels[t]}
                </option>
              ))}
            </NativeSelect>
            <p className="mt-1.5 text-xs text-muted-dark">
              Selling?{" "}
              <Link href="/sell-property" className="text-gold-dark underline underline-offset-2">
                See seller services
              </Link>
            </p>
          </div>
        )}

        {!locked.category && (
          <div>
            <Label htmlFor={field("category")}>Category</Label>
            <NativeSelect
              id={field("category")}
              value={filters.category ?? ""}
              onChange={(e) => update({ category: (e.target.value || undefined) as PropertyCategory | undefined })}
            >
              <option value="">Residential & commercial</option>
              {(Object.keys(categoryLabels) as PropertyCategory[]).map((c) => (
                <option key={c} value={c}>
                  {categoryLabels[c]}
                </option>
              ))}
            </NativeSelect>
          </div>
        )}

        <div>
          <Label htmlFor={field("type")}>Property type</Label>
          <NativeSelect
            id={field("type")}
            value={filters.type ?? ""}
            onChange={(e) => update({ type: (e.target.value || undefined) as PropertyType | undefined })}
          >
            <option value="">All types</option>
            {(Object.entries(typeOptions) as [PropertyType, string][]).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </NativeSelect>
        </div>

        {!locked.locality && (
          <div>
            <Label htmlFor={field("locality")}>Locality</Label>
            <NativeSelect
              id={field("locality")}
              value={filters.locality ?? ""}
              onChange={(e) => update({ locality: e.target.value || undefined })}
            >
              <option value="">All Western Suburbs</option>
              {localities.map((l) => (
                <option key={l.slug} value={l.slug}>
                  {l.name}
                </option>
              ))}
            </NativeSelect>
          </div>
        )}

        <div>
          <Label htmlFor={field("budget")}>Budget</Label>
          <NativeSelect
            id={field("budget")}
            disabled={!filters.transaction}
            value={rangeKey(filters.minPrice, filters.maxPrice) === "-" ? "" : rangeKey(filters.minPrice, filters.maxPrice)}
            onChange={(e) => {
              const opt = budgetOptions.find((o) => rangeKey(o.min, o.max) === e.target.value);
              update({ minPrice: opt?.min, maxPrice: opt?.max });
            }}
            aria-describedby={!filters.transaction ? field("budget-hint") : undefined}
          >
            <option value="">Any budget</option>
            {budgetOptions.map((o) => (
              <option key={o.label} value={rangeKey(o.min, o.max)}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
          {!filters.transaction && (
            <p id={field("budget-hint")} className="mt-1.5 text-xs text-muted-dark">
              Choose buy, rent or lease first.
            </p>
          )}
        </div>

        <div>
          <Label htmlFor={field("area")}>Carpet area</Label>
          <NativeSelect
            id={field("area")}
            value={rangeKey(filters.minArea, filters.maxArea) === "-" ? "" : rangeKey(filters.minArea, filters.maxArea)}
            onChange={(e) => {
              const opt = areaOptions.find((o) => rangeKey(o.min, o.max) === e.target.value);
              update({ minArea: opt?.min, maxArea: opt?.max });
            }}
          >
            <option value="">Any size</option>
            {areaOptions.map((o) => (
              <option key={o.label} value={rangeKey(o.min, o.max)}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        </div>

        {filters.category !== "commercial" && (
          <div>
            <Label htmlFor={field("bedrooms")}>Bedrooms</Label>
            <NativeSelect
              id={field("bedrooms")}
              value={filters.bedrooms ?? ""}
              onChange={(e) => update({ bedrooms: e.target.value ? Number(e.target.value) : undefined })}
            >
              <option value="">Any BHK</option>
              {bedroomOptions.map((b) => (
                <option key={b} value={b}>
                  {b === 4 ? "4+ BHK" : `${b} BHK`}
                </option>
              ))}
            </NativeSelect>
          </div>
        )}

        <div>
          <Label htmlFor={field("availability")}>Availability</Label>
          <NativeSelect
            id={field("availability")}
            value={filters.availability ?? "any"}
            onChange={(e) => update({ availability: e.target.value === "available" ? "available" : undefined })}
          >
            <option value="any">All listings</option>
            <option value="available">Available now</option>
          </NativeSelect>
        </div>

        <div>
          <Label htmlFor={field("sort")}>Sort by</Label>
          <NativeSelect
            id={field("sort")}
            value={filters.sort ?? "newest"}
            onChange={(e) => update({ sort: e.target.value as SortOption })}
          >
            {(Object.entries(sortLabels) as [SortOption, string][]).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      {/* Result summary */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4" aria-live="polite">
        <p className="text-sm text-muted-dark">
          <span className="font-semibold text-navy">{results.length}</span>{" "}
          {results.length === 1 ? "verified listing" : "verified listings"}
          {active > 0 && " match your filters"}
        </p>
        {active > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex cursor-pointer items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-dark hover:text-navy"
          >
            <RotateCcw className="size-3.5" aria-hidden /> Clear filters
          </button>
        )}
      </div>

      <div className="mt-6">
        {results.length > 0 ? (
          <AnimatedPropertyGrid items={results} />
        ) : properties.length > 0 ? (
          <PropertyEmptyState
            title="No listings match these filters."
            body="Try widening your search — or tell Kiran exactly what you need. New verified opportunities may not be listed online yet."
            whatsappHref={requirementHref}
          />
        ) : (
          <PropertyEmptyState whatsappHref={requirementHref} />
        )}
      </div>
    </div>
  );
}
