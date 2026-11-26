import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@/lib/site";
import { startingMonthly } from "@/lib/services";
import { formatPrice, type Currency } from "@/lib/currency";

/** The questions people ask before booking. Shared by the home and services pages. */
function buildFaqs(currency: Currency) {
  const monthly = formatPrice(startingMonthly, currency);
  const { minutes, timeZoneNote } = siteConfig.consultation;

  return [
    {
      question: "Is the consultation really free?",
      answer: `Yes. It's a ${minutes}-minute video call on Google Meet, with no cost and no obligation. We'll get to know your business and give you honest advice on the best next step, whether or not you go on to work with us.`,
    },
    {
      question: "What happens after the consultation?",
      answer:
        "If we're a good fit, we send you a written proposal setting out the recommended solution, scope, timeline and price. Nothing starts, and nothing is charged, until you've accepted it.",
    },
    {
      question: "How much does a website cost?",
      answer: `Web design and hosting starts from ${monthly} a month. Your final price depends on what your website needs, such as the number of pages, features and integrations, and is confirmed in your proposal before any work starts. Monthly fees are billed in advance and you can cancel at any time.`,
    },
    {
      question: "Do I own my website and domain?",
      answer:
        "Yes. The domain is registered in your name and the website is yours once paid in full. If you ever choose to move, we'll hand over everything you need. Full detail is in our Terms & Conditions.",
    },
    {
      question: "Why are branding and custom solutions quoted?",
      answer:
        "Because no two businesses need the same thing. A logo refresh and a full brand identity aren't the same job, and neither are a simple automation and a client portal. We scope the work with you first, then give you a fixed quote before anything starts — no surprises later.",
    },
    {
      question: "Do you work with businesses outside South Africa?",
      answer: `Yes. We work with clients in South Africa and abroad, mainly in the United States and Europe. Consultations and project meetings run on Google Meet, and booking times are shown in ${timeZoneNote}. Outside South Africa our prices are shown in US dollars; invoices are issued in South African rand.`,
    },
  ];
}

export function FaqSection({ currency }: { currency: Currency }) {
  const faqs = buildFaqs(currency);

  return (
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
  );
}
