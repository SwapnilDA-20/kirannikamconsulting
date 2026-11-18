export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "Buy", href: "/buy-property" },
  { label: "Rent", href: "/rent-property" },
  { label: "Areas We Serve", href: "/areas" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceNav: NavItem[] = [
  { label: "Buy a Property", href: "/buy-property" },
  { label: "Rent a Property", href: "/rent-property" },
  { label: "Sell Your Property", href: "/sell-property" },
  { label: "Lease Commercial Space", href: "/lease-property" },
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];
