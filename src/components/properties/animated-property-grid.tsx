"use client";

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import type { Property } from "@/types/property";
import { PropertyCard } from "./property-card";

/** Results grid that animates gracefully as filters change. Honours reduced-motion. */
export function AnimatedPropertyGrid({ items }: { items: Property[] }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((p) => (
              <m.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <PropertyCard property={p} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </MotionConfig>
    </LazyMotion>
  );
}
