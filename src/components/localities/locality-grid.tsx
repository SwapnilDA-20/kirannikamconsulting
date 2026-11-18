import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locality } from "@/data/localities";
import { cn } from "@/lib/utils";

export function LocalityGrid({ items, tone = "light" }: { items: Locality[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-px sm:grid-cols-2 lg:grid-cols-3", dark ? "bg-ivory/10" : "bg-line")}>
      {items.map((l, i) => (
        <li key={l.slug} className={dark ? "bg-navy" : "bg-ivory"}>
          <Link
            href={`/areas/${l.slug}`}
            className={cn(
              "group relative flex h-full flex-col p-7 transition-colors duration-500 sm:p-8",
              dark ? "hover:bg-navy-deep" : "hover:bg-white",
            )}
          >
            <span className={cn("font-serif text-sm", dark ? "text-gold/70" : "text-gold-dark")}>{String(i + 1).padStart(2, "0")}</span>
            <span className={cn("mt-3 font-serif text-3xl", dark ? "text-ivory" : "text-navy")}>{l.name}</span>
            <span className={cn("mt-3 text-sm leading-relaxed", dark ? "text-ivory/65" : "text-muted-dark")}>{l.tagline}</span>
            <ArrowUpRight
              className={cn(
                "absolute top-7 right-7 size-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                dark ? "text-gold/60 group-hover:text-gold" : "text-gold-dark/60 group-hover:text-gold-dark",
              )}
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
