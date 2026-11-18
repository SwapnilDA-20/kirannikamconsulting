import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Elegant on-scroll reveal using CSS scroll-driven animations — zero JavaScript.
 * Where unsupported, or with prefers-reduced-motion, content is simply shown.
 * Content is never hidden from crawlers or no-JS visitors.
 */
export function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
