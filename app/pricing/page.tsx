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
    "Website design packages from R5,000 once-off with managed hosting, plus custom web applications quoted per project. All prices in ZAR.",
};

const faqs = [
  {
    question: "How long does it take to build my website?",
    answer:
      "A Starter site typically launches within 1–2 weeks of receiving your content. Professional sites take 2–4 weeks depending on integrations. Custom web applications are scoped individually — we'll give you a realistic timeline in your discovery session.",
  },
  {
    question: "What does the monthly hosting & maintenance fee cover?",
    answer:
      "Fast, secure managed hosting, SSL certificate, software and security updates, regular backups, uptime monitoring, and small content tweaks (like updating text, images or business hours). Your first month is free, and billing only begins in month 2.",
  },
  {
    question: "Can I upgrade from Starter to Professional later?",
    answer:
      "Absolutely. Many clients start with a Starter site and upgrade as they grow. You only pay the difference in the once-off fee, and your hosting moves to the new plan — no rebuild from scratch and no lost content.",
  },
  {
    question: "What do I need to provide before we start?",
    answer:
      "Your logo (or we can arrange one), your business details, and the text and images you'd like on the site. Not sure what to write? We'll guide you through it — most clients finalise content in a single call.",
  },
  {
    question: "Do I own my website and domain?",
    answer:
      "Yes. The domain is registered in your name and the website is yours. If you ever choose to move, we'll hand over everything you need.",
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
          Professionally designed websites with managed hosting — or a custom
          web application scoped around your business. All prices in ZAR.
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
