import type { Price } from "@/lib/currency";

/**
 * The service catalogue: the single source of truth for the home page
 * services section, the services page and the footer links.
 *
 * Every service is sold through a free consultation, so every call to action
 * leads to the booking page. Only Web Design & Hosting shows a price, and only
 * as a starting point: scope and final price are agreed after the
 * consultation.
 */

/**
 * The starting monthly price for Web Design & Hosting. The rand price is what
 * we invoice; the dollar price is shown to visitors outside South Africa.
 */
export const startingMonthly: Price = { zar: 499.99, usd: 29.99 };

export interface ServiceCategory {
  id: string;
  number: string;
  name: string;
  /** One line: under the name on the home page, the heading on /services. */
  tagline: string;
  /** Longer copy for the services page. */
  description: string;
  includes: string[];
  /**
   * How the price is communicated. "from" shows the starting monthly price;
   * "quoted" shows the line given; null shows no price at all.
   */
  pricing: { kind: "from" } | { kind: "quoted"; text: string } | null;
  cta: { label: string; href: string };
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "company-branding",
    number: "01",
    name: "Company Branding & Setup",
    tagline:
      "A professional, credible brand that looks established from day one.",
    description:
      "For new and existing businesses: we build a consistent brand identity and set up the email, domain and digital basics a credible business runs on.",
    includes: [
      "Brand strategy and consultation",
      "Logo design",
      "Corporate identity development",
      "Brand guidelines",
      "Colour palettes and typography",
      "Business profiles and presentations",
      "Digital business setup",
      "Professional email setup",
      "Domain registration and configuration",
      "Social media branding",
      "Brand repositioning",
    ],
    pricing: null,
    cta: { label: "Let's Build Your Brand", href: "/book" },
  },
  {
    id: "web-design-hosting",
    number: "02",
    name: "Web Design & Hosting",
    tagline:
      "A professional online presence, without the hassle of running it yourself.",
    description:
      "We design, build, host and look after your website, so you never have to manage your own digital infrastructure.",
    includes: [
      "Professional website design and development",
      "Responsive, mobile-friendly websites",
      "Managed web hosting",
      "Domain management",
      "Business email solutions",
      "Website maintenance",
      "Security and SSL certificates",
      "Website performance optimisation",
      "Search engine optimisation foundations",
      "Ongoing technical support",
    ],
    pricing: { kind: "from" },
    cta: { label: "Let's Build Your Website", href: "/book" },
  },
  {
    id: "custom-solutions",
    number: "03",
    name: "Custom Solutions",
    tagline: "Technology built around the way your business works.",
    description:
      "Tell us the problem, not the technology. We'll work out what solves it — from automating a single workflow to building a full client portal.",
    includes: [
      "Custom software development",
      "Web applications",
      "CRM implementation",
      "Business process automation",
      "AI-powered business solutions",
      "Client portals",
      "Booking and scheduling systems",
      "Custom dashboards and reporting",
      "API integrations",
      "Internal business management systems",
      "Digital transformation consulting",
      "Workflow optimisation",
    ],
    pricing: {
      kind: "quoted",
      text: "Tailored solutions. Quoted according to your specific business needs.",
    },
    cta: { label: "Let's Discuss Your Project", href: "/book" },
  },
];

/** Footer links, pointing at each category on the services page. */
export const serviceLinks = serviceCategories.map((category) => ({
  href: `/services#${category.id}`,
  label: category.name,
}));

/** Options in the old booking form's service field, until it is replaced. */
export const BOOKING_SERVICES = [
  ...serviceCategories.map((category) => category.name),
  "Not sure yet",
];
