import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import type { Crumb } from "@/lib/seo";

/** Interior page hero — midnight navy with an optional illustrative backdrop. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  image?: { src: string; alt: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy pt-36 pb-20 text-ivory sm:pt-44 sm:pb-28">
      {image && (
        <>
          {/* Responsive illustrative backdrop: 900px variant for small screens */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            srcSet={`${image.src.replace(/\.webp$/, "-900.webp")} 900w, ${image.src} 1800w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
          />
          <span className="absolute right-4 bottom-3 z-10 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
            Illustrative image
          </span>
        </>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/85 to-navy" aria-hidden />
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="container-luxe relative">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-10 text-gold">{eyebrow}</p>
        <h1 className="display-title mt-5 max-w-4xl">{title}</h1>
        {intro && <div className="mt-7 max-w-2xl text-lg leading-relaxed text-ivory/75">{intro}</div>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
