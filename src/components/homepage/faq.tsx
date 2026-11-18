import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLd } from "@/components/shared/json-ld";
import { faqs } from "@/data/content";
import { faqJsonLd } from "@/lib/seo";

export function Faq() {
  return (
    <section className="on-light bg-ivory py-24 sm:py-32" aria-labelledby="faq-heading">
      <div className="container-luxe grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQs" title={<span id="faq-heading">Questions, answered.</span>} />
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t border-line">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`faq-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <JsonLd data={faqJsonLd([...faqs])} />
    </section>
  );
}
