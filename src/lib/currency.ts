/**
 * Indian Rupee formatting helpers.
 * Lakh = 1,00,000   Crore = 1,00,00,000
 */
const LAKH = 100_000;
const CRORE = 10_000_000;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** "₹1,25,00,000" */
export function formatINR(amount: number): string {
  return inr.format(amount);
}

function trim(n: number): string {
  return n.toFixed(2).replace(/\.?0+$/, "");
}

/** Compact Indian notation: "₹1.25 Cr", "₹85 L", "₹45,000" */
export function formatINRCompact(amount: number): string {
  if (amount >= CRORE) return `₹${trim(amount / CRORE)} Cr`;
  if (amount >= LAKH) return `₹${trim(amount / LAKH)} L`;
  return formatINR(amount);
}

export function formatArea(sqft: number): string {
  return `${new Intl.NumberFormat("en-IN").format(sqft)} sq ft`;
}
