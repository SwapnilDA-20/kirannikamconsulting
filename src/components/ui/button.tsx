import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ease-[var(--ease-luxe)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        gold: "bg-gold text-navy hover:bg-gold-light shadow-[0_10px_30px_-12px_rgb(198_164_108/0.6)]",
        navy: "bg-navy text-ivory hover:bg-navy-soft",
        "outline-light": "border border-ivory/40 text-ivory hover:border-gold hover:text-gold",
        "outline-dark": "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-ivory",
        whatsapp: "bg-[#1f7a4d] text-white hover:bg-[#186640]",
        ghost: "text-navy hover:bg-navy/5",
        link: "px-0! py-0! h-auto! tracking-[0.16em] text-gold-dark hover:text-navy underline-offset-8 hover:underline",
      },
      size: {
        sm: "h-10 px-5",
        md: "h-12 px-7",
        lg: "h-14 px-9",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
