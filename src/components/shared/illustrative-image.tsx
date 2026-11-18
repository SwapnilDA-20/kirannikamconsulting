import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * Wraps design imagery that does NOT depict an actual listed property.
 * Always shows a visible "Illustrative" label so visitors are never misled.
 */
export function IllustrativeImage({
  className,
  labelPosition = "bottom-left",
  alt,
  ...props
}: ImageProps & { labelPosition?: "bottom-left" | "top-right" | "bottom-right" }) {
  const pos = {
    "bottom-left": "bottom-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-right": "bottom-3 right-3",
  }[labelPosition];
  return (
    <>
      <Image alt={`Illustrative image: ${alt}`} className={cn("object-cover", className)} {...props} />
      <span
        className={cn(
          "pointer-events-none absolute z-10 bg-navy/75 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ivory/90 backdrop-blur-sm",
          pos,
        )}
      >
        Illustrative image
      </span>
    </>
  );
}
