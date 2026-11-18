"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { PropertyImage } from "@/types/property";
import { cn } from "@/lib/utils";

export function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;
  const go = useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  if (count === 0) return null;
  const current = images[index];

  return (
    <section aria-label={`Photographs of ${title}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        <Image src={current.src} alt={current.alt} fill priority sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute right-4 bottom-4 inline-flex cursor-pointer items-center gap-2 bg-navy/80 px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ivory backdrop-blur-sm hover:bg-navy"
        >
          <Expand className="size-4" aria-hidden /> View {count > 1 ? `all ${count} photos` : "full size"}
        </button>
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute top-1/2 left-4 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-navy/70 text-ivory hover:bg-navy">
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute top-1/2 right-4 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-navy/70 text-ivory hover:bg-navy">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <ul className="scrollbar-none mt-3 flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <li key={img.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show photo ${i + 1} of ${count}: ${img.alt}`}
                aria-current={i === index}
                className={cn(
                  "relative block h-20 w-28 cursor-pointer overflow-hidden ring-offset-2 transition",
                  i === index ? "ring-2 ring-gold" : "opacity-70 hover:opacity-100",
                )}
              >
                <Image src={img.src} alt="" fill sizes="112px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-navy/95" />
          <Dialog.Content className="fixed inset-0 z-[100] flex flex-col p-4 text-ivory sm:p-8">
            <div className="flex items-center justify-between">
              <Dialog.Title className="font-serif text-xl">{title}</Dialog.Title>
              <Dialog.Description className="sr-only">Photo gallery. Use the arrow keys to move between photos.</Dialog.Description>
              <Dialog.Close aria-label="Close gallery" className="inline-flex size-11 cursor-pointer items-center justify-center border border-ivory/25 hover:border-gold hover:text-gold">
                <X className="size-5" aria-hidden />
              </Dialog.Close>
            </div>
            <div className="relative mt-4 flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button type="button" onClick={() => go(-1)} disabled={count < 2} aria-label="Previous photo" className="inline-flex size-11 cursor-pointer items-center justify-center border border-ivory/25 hover:border-gold disabled:opacity-30">
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <p className="text-sm text-ivory/70" aria-live="polite">
                {index + 1} / {count} — {current.alt}
              </p>
              <button type="button" onClick={() => go(1)} disabled={count < 2} aria-label="Next photo" className="inline-flex size-11 cursor-pointer items-center justify-center border border-ivory/25 hover:border-gold disabled:opacity-30">
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
