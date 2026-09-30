import { Cpu, Globe, Palette, type LucideIcon } from "lucide-react";
import type { Price } from "@/lib/currency";

/**
 * The service catalogue, in the order clients move through it:
 * Business Development → Digital Presence → Custom Solutions.
 *
 * This is the single source of truth for the home page services section, the
 * pricing page, the footer links and the booking form's options (and the
 * server-side validation of those options), so the three categories cannot
 * drift apart.
 *
 * Pricing is deliberately not per category. Work is scoped and quoted per
 * client off one entry point — a monthly fee from `pricingModel.fromMonthly`
 * plus a one-time `pricingModel.setup` — rather than fixed packages.
 */

/** The single pricing model quoted across the site. */
export const pricingModel = {
  /** Entry point for ongoing work; final amount depends on scope. */
  fromMonthly: { zar: 499, usd: 29 } as Price,
  /** One-time implementation and initial setup. */
  setup: { zar: 5000, usd: 299 } as Price,
};

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
  icon: LucideIcon;
  includes: string[];
  /** Call to action on the home page selector. */
  cta: { label: string; href: string };
  /** Call to action on the pricing page, where every route leads to a quote. */
  quoteCta: { label: string; href: string };
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
      "Help establishing a strong foundation — the identity, strategy and paperwork a credible business runs on.",
    icon: Palette,
    includes: [
      "Business setup support",
      "Branding",
      "Logo and visual identity",
      "Business documentation",
      "Digital strategy",
      "Online business setup",
    ],
    cta: { label: "Book a Session", href: "/book" },
    quoteCta: { label: "Build My Business", href: "/contact" },
  },
  {
    id: "digital-presence",
    number: "02",
    node: "Websites",
    name: "Digital Presence",
    tagline:
      "Your website, domain, email and hosting — built, secured and maintained.",
    description:
      "Build and maintain the systems customers use to find and interact with your business.",
    icon: Globe,
    includes: [
      "Business websites",
      "Landing pages",
      "Domain setup",
      "Business email",
      "Website hosting",
      "Website maintenance",
      "Google Business Profile",
      "WhatsApp integration",
      "Basic SEO",
      "Analytics and tracking",
    ],
    cta: { label: "Get Started", href: "/contact" },
    quoteCta: { label: "Build My Digital Presence", href: "/contact" },
  },
  {
    id: "custom-solutions",
    number: "03",
    node: "Custom",
    name: "Custom Solutions",
    tagline:
      "For businesses that need something beyond a standard website.",
    description:
      "Bespoke technology scoped around your business, priced on scope, complexity, integrations and ongoing requirements.",
    icon: Cpu,
    includes: [
      "Web applications",
      "Business software",
      "CRM systems",
      "Workflow automation",
      "API integrations",
      "AI solutions",
      "Custom dashboards",
      "Internal business tools",
      "Custom integrations",
    ],
    cta: { label: "Book a Session for a Quote", href: "/book" },
    quoteCta: { label: "Discuss My Project", href: "/contact" },
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
