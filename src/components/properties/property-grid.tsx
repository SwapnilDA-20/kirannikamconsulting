import type { Property } from "@/types/property";
import { PropertyCard } from "./property-card";

export function PropertyGrid({ items }: { items: Property[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((p) => (
        <li key={p.id}>
          <PropertyCard property={p} />
        </li>
      ))}
    </ul>
  );
}
