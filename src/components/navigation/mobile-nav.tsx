"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "radix-ui";
import { Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { mainNav, serviceNav } from "@/config/navigation";
import { mailHref, siteConfig, telHref } from "@/config/site";
import { whatsappLinks } from "@/lib/whatsapp";
import { cn, isActivePath } from "@/lib/utils";

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const extra = serviceNav.filter((s) => !mainNav.some((m) => m.href === s.href));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex size-11 cursor-pointer items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold xl:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-navy/70 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.3s_ease]" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col overflow-y-auto bg-navy text-ivory shadow-2xl data-[state=open]:animate-[slide-in_0.45s_var(--ease-luxe)]">
          <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
            <Logo tone="light" className="h-10" />
            <Dialog.Close
              className="inline-flex size-11 cursor-pointer items-center justify-center border border-ivory/25 transition-colors hover:border-gold hover:text-gold"
              aria-label="Close menu"
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <Dialog.Description className="sr-only">Pages and contact options for {siteConfig.name}</Dialog.Description>
          <nav aria-label="Mobile" className="flex-1 px-6 py-8">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between border-b border-ivory/5 py-3.5 font-serif text-2xl transition-colors",
                        active ? "text-gold" : "text-ivory hover:text-gold",
                      )}
                    >
                      {item.label}
                      {active && <span className="h-px w-6 bg-gold" aria-hidden />}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="eyebrow mt-10 mb-4 text-gold">More services</p>
            <ul className="grid grid-cols-1 gap-2">
              {extra.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium tracking-wide text-ivory/75 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 border-t border-ivory/10 px-6 py-6">
            <a href={telHref} className="flex items-center gap-3 text-sm text-ivory/85 hover:text-gold">
              <Phone className="size-4 text-gold" aria-hidden /> {siteConfig.contact.phoneDisplay}
            </a>
            <a href={mailHref} className="flex items-center gap-3 text-sm break-all text-ivory/85 hover:text-gold">
              <Mail className="size-4 shrink-0 text-gold" aria-hidden /> {siteConfig.contact.email}
            </a>
            <a
              href={whatsappLinks.general()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 bg-gold text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-navy hover:bg-gold-light"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp Kiran
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
