import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { HeroSearch } from "./hero-search";
import { localities } from "@/data/localities";
import { siteConfig } from "@/config/site";
import { whatsappLinks } from "@/lib/whatsapp";
import { asset } from "@/lib/base-path";

export function Hero() {
  const options = localities.map(({ slug, name }) => ({ slug, name }));
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy pt-32 pb-16 text-ivory sm:pb-24">
      {/* Illustrative backdrop — generic high-rise towers (not a listed property) */}
      <picture>
        <source media="(max-width: 767px)" srcSet={asset("/images/illustrative/towers-dusk-900.webp")} />
        <img
          src={asset("/images/illustrative/towers-dusk.webp")}
          alt="Illustrative image: contemporary high-rise towers against the sky"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1280}
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/75 to-navy/40" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" aria-hidden />
      <span className="absolute right-4 bottom-3 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ivory/50">
        Illustrative image
      </span>

      <div className="container-luxe">
        <p className="eyebrow animate-fade-up text-gold">{siteConfig.name} · {siteConfig.primaryMarket}</p>
        <h1 className="display-title mt-6 max-w-4xl">
          Find Your Place <br className="hidden sm:block" />
          <em className="font-serif text-gold not-italic sm:italic">in Mumbai.</em>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-ivory/80">
          Explore residential and commercial property opportunities across Mumbai with professional guidance from{" "}
          {siteConfig.name}.
        </p>
        <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row">
          <Button asChild size="lg">
            <Link href="/properties">
              Explore Properties <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <a href={whatsappLinks.general()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Connect with Kiran
            </a>
          </Button>
        </div>
        <div className="mt-14 animate-fade-up [animation-delay:480ms]">
          <HeroSearch localities={options} />
        </div>
      </div>
    </section>
  );
}
