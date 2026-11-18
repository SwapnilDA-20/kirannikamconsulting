"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { PropertyCategory, TransactionType } from "@/types/property";
import { propertiesHref } from "@/lib/property-utils";
import { cn } from "@/lib/utils";

const tabs: { value: TransactionType; label: string }[] = [
  { value: "sale", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "lease", label: "Lease" },
];

export function HeroSearch({ localities }: { localities: { slug: string; name: string }[] }) {
  const router = useRouter();
  const id = useId();
  const [transaction, setTransaction] = useState<TransactionType>("sale");
  const [category, setCategory] = useState<PropertyCategory | "">("");
  const [locality, setLocality] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      propertiesHref({
        transaction,
        category: category || undefined,
        locality: locality || undefined,
      }),
    );
  };

  const selectCls =
    "h-14 w-full cursor-pointer appearance-none border-0 bg-transparent px-5 text-[0.95rem] text-ivory focus-visible:outline-none [&>option]:text-charcoal";

  return (
    <form onSubmit={submit} role="search" aria-label="Property discovery" className="w-full max-w-4xl">
      <div role="radiogroup" aria-label="Transaction type" className="flex">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            role="radio"
            aria-checked={transaction === t.value}
            onClick={() => setTransaction(t.value)}
            className={cn(
              "cursor-pointer px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors",
              transaction === t.value ? "bg-gold text-navy" : "bg-navy/60 text-ivory/80 backdrop-blur-md hover:text-gold",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid border border-ivory/15 bg-navy/70 backdrop-blur-md sm:grid-cols-[1fr_1fr_auto]">
        <div className="border-b border-ivory/10 sm:border-r sm:border-b-0">
          <label htmlFor={`${id}-cat`} className="block px-5 pt-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Category
          </label>
          <select id={`${id}-cat`} value={category} onChange={(e) => setCategory(e.target.value as PropertyCategory | "")} className={cn(selectCls, "-mt-2")}>
            <option value="">Residential & commercial</option>
            <option value="residential">Residential — flats & apartments</option>
            <option value="commercial">Commercial — offices, shops & retail</option>
          </select>
        </div>
        <div className="border-b border-ivory/10 sm:border-b-0">
          <label htmlFor={`${id}-loc`} className="block px-5 pt-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">
            Locality
          </label>
          <select id={`${id}-loc`} value={locality} onChange={(e) => setLocality(e.target.value)} className={cn(selectCls, "-mt-2")}>
            <option value="">All Western Suburbs</option>
            {localities.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex h-16 cursor-pointer items-center justify-center gap-2.5 bg-gold px-8 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:bg-gold-light sm:h-auto"
        >
          <Search className="size-4" aria-hidden /> Search
        </button>
      </div>
    </form>
  );
}
