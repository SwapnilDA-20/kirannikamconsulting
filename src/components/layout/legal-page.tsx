import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/page-hero";

export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={[{ name: title, path }]} intro={`Last updated: ${updated}`} />
      <section className="on-light bg-ivory py-20">
        <div className="container-luxe">
          <article className="prose-luxe max-w-3xl text-charcoal">{children}</article>
        </div>
      </section>
    </>
  );
}
