/** Renders JSON-LD structured data. Content is generated from trusted config only. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped so it cannot close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
