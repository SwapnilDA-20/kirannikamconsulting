import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { whatsappLinks } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-navy pt-32 pb-24 text-ivory">
      <div className="bg-blueprint absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="container-luxe">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display-title mt-6 max-w-3xl">This address isn’t on our map.</h1>
        <p className="mt-6 max-w-xl text-lg text-ivory/70">
          The page you were looking for may have moved, or the listing may no longer be available.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              Return home <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <Link href="/properties">Browse properties</Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <a href={whatsappLinks.general()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Ask Kiran
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
