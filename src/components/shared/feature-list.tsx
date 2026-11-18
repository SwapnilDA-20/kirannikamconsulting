import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  body: string;
}

/** Numbered editorial list used on service pages. */
export function FeatureList({ items, tone = "light", columns = 3 }: { items: Feature[]; tone?: "light" | "dark"; columns?: 2 | 3 | 4 }) {
  const dark = tone === "dark";
  return (
    <ul
      className={cn(
        "grid gap-px",
        dark ? "bg-ivory/10" : "bg-line",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {items.map((f, i) => (
        <li key={f.title} className={dark ? "bg-navy" : "bg-white"}>
          <Reveal delay={i * 0.05} className="h-full p-8">
            <span className={cn("font-serif text-lg", dark ? "text-gold" : "text-gold-dark")}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={cn("mt-4 text-2xl", dark ? "text-ivory" : "text-navy")}>{f.title}</h3>
            <p className={cn("mt-3 leading-relaxed", dark ? "text-ivory/70" : "text-muted-dark")}>{f.body}</p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
