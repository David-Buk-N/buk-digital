import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PricingSection,
  QuoteCta,
  ServiceBlocks,
  WhyBukDigital,
} from "@/components/sections/pricing-section";
import { detectCurrency } from "@/lib/currency-server";
import { formatPrice, type Currency } from "@/lib/currency";
import { pricingModel } from "@/lib/services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// The page renders per request for currency, so the description quotes the
// same currency the visitor sees rather than advertising dollars to a South
// African searcher.
export async function generateMetadata(): Promise<Metadata> {
  const currency = await detectCurrency();
  const monthly = formatPrice(pricingModel.fromMonthly, currency);

  return {
    title: "Pricing",
    description: `Websites, digital presence, branding, automation and custom technology for growing businesses. Tailored solutions from ${monthly}/month, quoted around what your business needs.`,
  };
}

/**
 * Kept deliberately short. The design brief asks for a concise, service-led
 * page, but the ownership and billing answers are the ones clients ask before
 * paying — and the compliance review specifically wanted website ownership
 * spelled out — so four remain.
 */
function buildFaqs(currency: Currency) {
  const monthly = formatPrice(pricingModel.fromMonthly, currency);
  const setup = formatPrice(pricingModel.setup, currency);

  return [
    {
      question: "What does the setup fee cover?",
      answer: `The ${setup} setup fee covers implementation and initial setup — the work that gets your solution designed, built and live. It is a one-time fee, and the final amount depends on the scope of your project, which we confirm in your quote before any work starts.`,
    },
    {
      question: "What does the monthly fee cover?",
      answer: `From ${monthly} a month, depending on what you need: managed hosting, your SSL certificate, software and security updates, regular backups, uptime monitoring and small content updates like changing text, images or business hours. It is billed monthly in advance and you can cancel at any time.`,
    },
    {
      question: "Do I own my website and domain?",
      answer:
        "Yes. The domain is registered in your name and the website is yours once paid in full. If you ever choose to move, we'll hand over everything you need. Full detail is in our Terms & Conditions.",
    },
    {
      question: "Why is pricing quote-based?",
      answer:
        "Because a landing page and a client portal aren't the same job. Pricing depends on scope, complexity, the systems it must integrate with and any ongoing requirements. We scope it with you first, then give you a fixed quote before work starts — no surprises later.",
    },
  ];
}

export default async function PricingPage() {
  const currency = await detectCurrency();
  const monthly = formatPrice(pricingModel.fromMonthly, currency);
  const faqs = buildFaqs(currency);

  return (
    <div className="pt-20">
      {/* Hero. The headline carries the page, per the reference design system:
          display weight, tight tracking, one tinted word, left-aligned. */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h1 className="display-xl md:text-6xl">
            Digital solutions built around your{" "}
            <span className="text-primary">business</span>
          </h1>
          <p className="lead-text mt-6 max-w-2xl">
            Websites, digital presence, branding, automation and custom
            technology — built to help your business operate and grow online.
            Three ways to work with us: take one, or all three.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button size="lg" className="rounded-full" asChild>
              <Link href="/contact">
                Get a Quote Today
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Tailored to your business, from {monthly}/month.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <ServiceBlocks />
      </div>

      <PricingSection currency={currency} />

      <WhyBukDigital />

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="display-md">Common questions</h2>
          <Accordion type="single" collapsible className="lg:mt-0">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <QuoteCta />
    </div>
  );
}
