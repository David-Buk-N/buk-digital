import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/pricing-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three service categories: Business Development from R5,000, Digital Presence website packages from R5,000 plus monthly hosting, and Custom Solutions quoted per project. All prices in ZAR.",
};

const faqs = [
  {
    question: "What's the difference between the three categories?",
    answer:
      "Business Development covers your brand and business foundations — identity, logo, guidelines and setup. Digital Presence is your website and everything that keeps it running: domain, email, hosting, security and maintenance. Custom Solutions is for software built around your business, like portals, dashboards, CRM and automation. Many clients start with one and add another later.",
  },
  {
    question: "Which costs are once-off and which are monthly?",
    answer:
      "Business Development is once-off, from R5,000, with no monthly fee. Digital Presence has a once-off build fee (R5,000 for Starter, R10,000 for Professional) plus a monthly hosting, maintenance and support fee (R500 or R750). Custom Solutions is quoted per project, and where a project needs ongoing support or hosting, that monthly amount is quoted with it so there are no surprises.",
  },
  {
    question: "What does the monthly hosting & maintenance fee cover?",
    answer:
      "Fast, secure managed hosting, your SSL certificate, software and security updates, regular backups, uptime monitoring, and small content tweaks like updating text, images or business hours. It is billed monthly in advance and you can cancel at any time.",
  },
  {
    question: "How long does it take?",
    answer:
      "Branding work in Business Development typically takes 1–2 weeks. A Starter site usually launches within 1–2 weeks of receiving your content, and a Professional site takes 2–4 weeks depending on integrations. Custom Solutions are scoped individually — you'll get a realistic timeline in your discovery session before committing.",
  },
  {
    question: "Can I upgrade from Starter to Professional later?",
    answer:
      "Yes. Many clients start with Starter and upgrade as they grow. You pay the difference in the once-off fee, and your hosting moves to the new monthly rate — no rebuild from scratch and no lost content.",
  },
  {
    question: "What do I need to provide before we start?",
    answer:
      "Your business details, plus the text and images you'd like on the site. If you don't have a logo or brand yet, that's exactly what Business Development is for, and we can do it first. Not sure what to write? Most clients finalise their content in a single call with us.",
  },
  {
    question: "Do I own my website and domain?",
    answer:
      "Yes. The domain is registered in your name and the website is yours once paid in full. If you ever choose to move, we'll hand over everything you need. Full detail is in our Terms & Conditions.",
  },
  {
    question: "Why is Custom Solutions quote-based?",
    answer:
      "Because a two-week internal tool and a six-month client portal aren't the same job. Pricing depends on scope, complexity, the systems it must integrate with, development time and any ongoing requirements. We scope it in a discovery session and give you a fixed quote before any work starts.",
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Simple, honest pricing
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Three ways to work with us, in the order most businesses need them —
          brand first, then your website, then anything custom. All prices in
          ZAR.
        </p>
      </div>

      <PricingSection />

      <section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Frequently asked questions
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
    </div>
  );
}
