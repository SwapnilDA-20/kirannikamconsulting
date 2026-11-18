import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, tone = "dark", className }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className={cn("flex flex-wrap items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em]", tone === "dark" ? "text-ivory/60" : "text-muted-dark")}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-gold" : "text-gold-dark"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="transition-colors hover:text-gold">
                      {c.name}
                    </Link>
                    <ChevronRight className="size-3 opacity-60" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
