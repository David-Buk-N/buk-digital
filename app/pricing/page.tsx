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
import { startingMonthly } from "@/lib/services";
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
  const monthly = formatPrice(startingMonthly, currency);

  return {
    title: "Pricing",
    description: `Websites, digital presence, branding, automation and custom technology for growing businesses. Plans from ${monthly}/month, or a custom web app quoted around what your business needs.`,
  };
}

/**
 * The ownership and billing answers are the ones clients ask before paying,
 * and the compliance review specifically wanted website ownership spelled out.
 */
function buildFaqs(currency: Currency) {
  const monthly = formatPrice(startingMonthly, currency);

  return [
    {
      question: "What does the monthly fee cover?",
      answer: `From ${monthly} a month, depending on your plan: everything listed on it, plus your SSL certificate, software and security updates, regular backups, uptime monitoring and small content updates like changing text, images or business hours. It is billed monthly in advance and you can cancel at any time.`,
    },
    {
      question: "Do I own my website and domain?",
      answer:
        "Yes. The domain is registered in your name and the website is yours once paid in full. If you ever choose to move, we'll hand over everything you need. Full detail is in our Terms & Conditions.",
    },
    {
      question: "Why is a custom web app quoted?",
      answer:
        "Because a landing page and a client portal aren't the same job. Pricing depends on scope, complexity, the systems it must integrate with and any ongoing requirements. We scope it with you first, then give you a fixed quote before work starts — no surprises later.",
    },
  ];
}

export default async function PricingPage() {
  const currency = await detectCurrency();
  const monthly = formatPrice(startingMonthly, currency);
  const faqs = buildFaqs(currency);

  return (
    <>
      <section className="wrap grid gap-8 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:gap-24">
        <h1 className="display-xl">
          Digital solutions built around your{" "}
          <span className="text-primary">business</span>
        </h1>
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Websites, digital presence, branding, automation and custom
            technology — built to help your business operate and grow online.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get a Quote Today
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Plans from {monthly}/month.
            </p>
          </div>
        </div>
      </section>

      <PricingSection currency={currency} />

      <ServiceBlocks />

      <div className="mt-8">
        <WhyBukDigital />
      </div>

      <section className="wrap py-20 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-24">
          <h2 className="display-lg">Common questions</h2>
          <Accordion type="single" collapsible className="border-t-2 border-foreground">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border-b">
                <AccordionTrigger className="py-5 text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
