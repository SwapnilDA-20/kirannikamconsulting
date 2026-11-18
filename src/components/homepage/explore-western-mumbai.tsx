import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { LocalityGrid } from "@/components/localities/locality-grid";
import { Reveal } from "@/components/shared/reveal";
import { localities } from "@/data/localities";

export function ExploreWesternMumbai() {
  return (
    <section className="on-light bg-ivory py-24 sm:py-32" aria-labelledby="areas-heading">
      <div className="container-luxe">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Explore Western Mumbai"
            title={<span id="areas-heading">From Bandra to Borivali — fifteen neighbourhoods, one consultant.</span>}
            intro={<p>Each part of the western suburbs has its own character. Explore the areas we serve to find the one that fits your life or business.</p>}
          />
          <Link href="/areas" className="group inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-navy hover:text-gold-dark">
            All areas <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
        <Reveal className="mt-14">
          <LocalityGrid items={localities.slice(0, 9)} />
        </Reveal>
      </div>
    </section>
  );
}
