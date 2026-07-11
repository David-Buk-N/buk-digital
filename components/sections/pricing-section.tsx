import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingTier {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "R5,000",
    priceNote: "once-off",
    description:
      "A professional online presence for small businesses that need to get found.",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic on-page SEO",
      "Hosting & maintenance: R500/month — first month FREE",
      "FREE domain for the first year",
    ],
    cta: { label: "Get Started", href: "/contact" },
  },
  {
    name: "Professional",
    price: "R10,000",
    priceNote: "once-off",
    description:
      "A custom-designed site with the integrations a growing business needs.",
    features: [
      "Up to 10–12 pages",
      "Custom design",
      "Advanced SEO",
      "Analytics setup",
      "Integrations: booking, payments, CRM",
      "Hosting & maintenance: R750/month — first month FREE",
      "FREE domain for the first year",
    ],
    cta: { label: "Get Started", href: "/contact" },
    highlighted: true,
  },
  {
    name: "Custom Web App",
    price: "Quoted",
    priceNote: "per project",
    description:
      "Bespoke functionality scoped through a discovery session — built around your business.",
    features: [
      "Bespoke functionality (portals, dashboards, booking systems, CRMs)",
      "Scoped through a discovery session",
      "Custom hosting architecture",
      "SLA-based support",
    ],
    cta: { label: "Book a Session for a Quote", href: "/book" },
  },
];

export function PricingSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                // overflow-visible: the base Card clips overflowing children,
                // which cuts the floating "Most Popular" badge in half
                "relative flex flex-col overflow-visible",
                tier.highlighted &&
                  "ring-primary shadow-lg shadow-primary/10 lg:-my-3"
              )}
            >
              {tier.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tier.priceNote}
                  </span>
                </div>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href={tier.cta.href}>{tier.cta.label}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted-foreground">
          Hosting billing begins in month 2. Domain renews at the standard rate
          after year 1. All prices in ZAR.
        </p>
      </div>
    </section>
  );
}
