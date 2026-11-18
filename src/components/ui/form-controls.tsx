import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-none border bg-white px-4 text-[0.95rem] text-charcoal placeholder:text-muted transition-colors focus-visible:outline-none focus-visible:border-gold-dark focus-visible:ring-2 focus-visible:ring-gold/40 disabled:opacity-60 aria-[invalid=true]:border-red-700";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy", className)}
      {...props}
    />
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, "h-12 border-line", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-32 border-line py-3", className)} {...props} />;
}

export function NativeSelect({
  className,
  children,
  wrapperClassName,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { wrapperClassName?: string }) {
  return (
    <div className={cn("relative", wrapperClassName)}>
      <select
        className={cn(fieldBase, "h-12 cursor-pointer appearance-none border-line pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-dark"
        aria-hidden
      />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  );
}
