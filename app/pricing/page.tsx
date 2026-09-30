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
    <div className="pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Digital solutions built around your business
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Websites, digital presence, branding, automation and custom
          technology — built to help your business operate and grow online.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/contact">
              Get a Quote Today
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Plans can be tailored to your business needs, with solutions starting
          from {monthly}/month.
        </p>
      </section>

      {/* What we do */}
      <section className="mx-auto mt-24 max-w-2xl px-4 text-center sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
          What we do
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Three ways we work with businesses
        </h2>
        <p className="mt-4 text-muted-foreground">
          From getting your brand and foundations in order, to the website
          customers find you through, to custom software when off-the-shelf
          won&apos;t do. Take one, or all three.
        </p>
      </section>

      <div className="mt-20">
        <ServiceBlocks />
      </div>

      <PricingSection currency={currency} />

      <WhyBukDigital />

      <section className="mx-auto max-w-3xl px-4 pt-20 sm:px-6">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Common questions
        </h2>
        <Accordion type="single" collapsible className="mt-8">
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
      </section>

      <QuoteCta />
    </div>
  );
}
