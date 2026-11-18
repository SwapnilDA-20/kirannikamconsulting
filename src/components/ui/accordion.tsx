"use client";

import * as React from "react";
import { Accordion as A } from "radix-ui";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = A.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof A.Item>) {
  return <A.Item className={cn("border-b border-line", className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof A.Trigger>) {
  return (
    <A.Header className="flex">
      <A.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-start justify-between gap-6 py-6 text-left font-serif text-xl text-navy transition-colors hover:text-gold-dark sm:text-2xl",
          className,
        )}
        {...props}
      >
        {children}
        <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-navy/15 transition-all duration-300 group-hover:border-gold group-data-[state=open]:rotate-45 group-data-[state=open]:border-gold group-data-[state=open]:bg-gold">
          <Plus className="size-4" aria-hidden />
        </span>
      </A.Trigger>
    </A.Header>
  );
}

export function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof A.Content>) {
  return (
    <A.Content
      className="overflow-hidden text-[0.975rem] leading-relaxed text-muted-dark data-[state=closed]:animate-[collapse_0.3s_ease] data-[state=open]:animate-[expand_0.35s_ease]"
      {...props}
    >
      <div className={cn("max-w-3xl pb-7 pr-12", className)}>{children}</div>
    </A.Content>
  );
}
