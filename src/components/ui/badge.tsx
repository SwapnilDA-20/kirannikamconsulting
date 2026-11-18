import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]",
  {
    variants: {
      variant: {
        gold: "bg-gold text-navy",
        navy: "bg-navy text-ivory",
        outline: "border border-navy/20 text-navy",
        glass: "bg-navy/70 text-ivory backdrop-blur-sm",
        success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        muted: "bg-ivory-deep text-muted-dark",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
