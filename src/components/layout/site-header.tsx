"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { mainNav } from "@/config/navigation";
import { siteConfig, telHref } from "@/config/site";
import { cn, isActivePath } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-luxe)]",
        scrolled
          ? "border-b border-gold/15 bg-navy/95 py-3 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-md"
          : "bg-gradient-to-b from-navy/80 to-transparent py-5",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>
      <div className="container-luxe flex items-center justify-between gap-6">
        <Link href="/" aria-label={`${siteConfig.name} — Home`} className="shrink-0">
          <Logo tone="light" className={cn("transition-all duration-500", scrolled ? "h-9 sm:h-10" : "h-10 sm:h-12")} />
        </Link>

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap px-2 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors 2xl:px-3.5 2xl:tracking-[0.16em]",
                      active ? "text-gold" : "text-ivory/85 hover:text-gold",
                    )}
                  >
                    {item.label}
                    {active && <span className="absolute inset-x-2.5 -bottom-0.5 h-px bg-gold" aria-hidden />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 whitespace-nowrap border border-gold/50 px-3 py-2.5 2xl:px-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-navy sm:inline-flex"
          >
            <Phone className="size-3.5" aria-hidden />
            <span className="xl:sr-only 2xl:not-sr-only">{siteConfig.contact.phoneDisplay}</span>
          </a>
          <MobileNav pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
