import { Cpu, Globe, Palette, type LucideIcon } from "lucide-react";

/**
 * The service catalogue, in the order clients move through it:
 * Business Development → Digital Presence → Custom Solutions.
 *
 * This is the single source of truth for the home page services section, the
 * pricing page, the footer links and the booking form's options (and the
 * server-side validation of those options), so the three categories cannot
 * drift apart.
 */

export interface ServicePackage {
  name: string;
  /** One-time fee, e.g. "R5,000". */
  onceOff: string;
  /** Recurring fee in rand per month, or null when nothing recurs. */
  monthly: string | null;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface ServiceCategory {
  id: string;
  number: string;
  /** Short label for the radial selector on the home page. */
  node: string;
  name: string;
  /** One line, used in the selector's centre readout. */
  tagline: string;
  /** Longer copy for the pricing page. */
  description: string;
  /** Headline price, e.g. "From R5,000" or "Quote based". */
  price: string;
  priceNote: string;
  /** Recurring cost, or null where there is none. */
  recurring: string | null;
  /** Qualifier shown after the recurring cost, e.g. "where support is needed". */
  recurringNote?: string;
  /** Compact once-off + recurring summary for the home page selector. */
  priceSummary: string;
  icon: LucideIcon;
  includes: string[];
  packages?: ServicePackage[];
  cta: { label: string; href: string };
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "business-development",
    number: "01",
    node: "Branding",
    name: "Business Development",
    tagline:
      "Branding and business foundations that make you look established from day one.",
    description:
      "Establish and strengthen your brand and business foundation — the identity, guidelines and paperwork a credible business runs on.",
    price: "From R5,000",
    priceNote: "once-off",
    recurring: null,
    priceSummary: "From R5,000 once-off",
    icon: Palette,
    includes: [
      "Branding and visual identity",
      "Logo design",
      "Business setup and digital foundations",
      "Brand guidelines",
      "Business documentation and related setup services",
    ],
    cta: { label: "Book a Session", href: "/book" },
  },
  {
    id: "digital-presence",
    number: "02",
    node: "Websites",
    name: "Digital Presence",
    tagline:
      "Your website, domain, email and hosting — built, secured and maintained.",
    description:
      "Everything needed to build and maintain your presence online, as a once-off build plus a monthly fee that keeps it fast, secure and up to date.",
    price: "From R5,000",
    priceNote: "once-off",
    recurring: "From R500/month",
    priceSummary: "From R5,000 + from R500/month",
    icon: Globe,
    includes: [
      "Website design and development",
      "Domain registration",
      "Professional email",
      "Web hosting",
      "SSL and security",
      "Website maintenance and updates",
      "Optional ongoing support",
    ],
    packages: [
      {
        name: "Starter",
        onceOff: "R5,000",
        monthly: "R500",
        description:
          "A professional online presence for small businesses that need to get found.",
        features: [
          "Up to 5 pages",
          "Mobile-responsive design",
          "Contact form",
          "Basic on-page SEO",
          "Professional email setup",
          "Domain registered for your first 12 months",
        ],
      },
      {
        name: "Professional",
        onceOff: "R10,000",
        monthly: "R750",
        description:
          "A custom-designed site with the integrations a growing business needs.",
        features: [
          "Up to 10–12 pages",
          "Custom design",
          "Advanced on-page SEO",
          "Analytics setup",
          "Integrations: booking, payments, CRM",
          "Professional email setup",
          "Domain registered for your first 12 months",
        ],
        highlighted: true,
      },
    ],
    cta: { label: "Get Started", href: "/contact" },
  },
  {
    id: "custom-solutions",
    number: "03",
    node: "Custom",
    name: "Custom Solutions",
    tagline:
      "For businesses that need more than standard branding or a website.",
    description:
      "Bespoke technology scoped around your business. Priced per project on scope, complexity, integrations, development time and ongoing requirements.",
    price: "Quote based",
    priceNote: "per project",
    recurring: "Quoted",
    recurringNote: "where support is needed",
    priceSummary: "Quoted per project",
    icon: Cpu,
    includes: [
      "Web applications",
      "Custom software",
      "CRM and automation",
      "Business management systems",
      "API integrations",
      "Custom dashboards",
      "Internal tools",
      "Other specialised business technology",
    ],
    cta: { label: "Book a Session for a Quote", href: "/book" },
  },
];

/**
 * Options in the booking form's service field. Kept here so the form and the
 * API that validates it can never disagree. "Not sure yet" lets an undecided
 * visitor book instead of abandoning the form.
 */
export const BOOKING_SERVICES = [
  ...serviceCategories.map((category) => category.name),
  "Not sure yet",
];

/** Footer links, pointing at each category on the pricing page. */
export const serviceLinks = serviceCategories.map((category) => ({
  href: `/pricing#${category.id}`,
  label: category.name,
}));
