/**
 * GENUINE CLIENT TESTIMONIALS ONLY.
 *
 * Add a testimonial only when:
 *   - It was genuinely given by a real client, and
 *   - The client has consented to it being published (and to how their name is shown).
 *
 * While this list is empty, the testimonials section is hidden automatically.
 * Never write, paraphrase or embellish testimonials.
 */
export interface Testimonial {
  /** As approved by the client, e.g. "Priya S." */
  name: string;
  /** Optional context, e.g. "Bought a 2 BHK in Kandivali East" */
  context?: string;
  quote: string;
  /** ISO date consent was received — required */
  consentReceivedOn: string;
}

export const testimonials: Testimonial[] = [];
