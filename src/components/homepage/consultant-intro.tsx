import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig, telHref } from "@/config/site";

export function ConsultantIntro() {
  const { consultant } = siteConfig;
  return (
    <section className="on-light bg-ivory py-24 sm:py-32" aria-labelledby="consultant-heading">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -top-5 -left-5 h-full w-full border border-gold/60" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden bg-navy">
              <Image
                src={consultant.photo.src}
                alt={consultant.photo.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -right-4 -bottom-6 bg-navy px-6 py-5 text-ivory shadow-xl sm:-right-8">
              <p className="font-serif text-2xl">{consultant.name}</p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold">{consultant.designation}</p>
            </div>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <p className="eyebrow text-gold-dark">Meet your consultant</p>
          <h2 id="consultant-heading" className="section-title mt-5 text-navy">
            Personal guidance, <em className="text-gold-dark">from the first conversation</em> to the final key.
          </h2>
          <div className="mt-7 space-y-5 text-[1.05rem] leading-relaxed text-muted-dark">
            <p>
              {siteConfig.name} is a Mumbai-based real estate consultancy helping individuals, families and businesses
              explore residential and commercial property opportunities.
            </p>
            <p>
              When you work with us, you speak directly with {consultant.name}. Whether you are buying your first home,
              renting an apartment, selling a property or finding the right premises for your business, the
              consultation is built around your requirement — not around a sales script.
            </p>
          </div>
          <p className="mt-7 flex items-start gap-2 text-sm text-navy">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold-dark" aria-hidden />
            Office: {siteConfig.address.line2}, {siteConfig.address.locality}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="navy">
              <Link href="/about">
                About Kiran <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-dark">
              <a href={telHref}>
                <Phone /> {siteConfig.contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
