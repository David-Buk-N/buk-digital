import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Globe,
  Lightbulb,
  Workflow,
} from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const services = [
  {
    icon: AppWindow,
    title: "Custom Web Applications",
    description:
      "Client portals, dashboards, booking systems, internal tools and CRMs — built around how your business actually works, so your team stops fighting spreadsheets.",
    cta: { href: "/book", label: "Book a Session" },
    className: "md:col-span-2",
  },
  {
    icon: Workflow,
    title: "Software Solutions",
    description:
      "Automation, systems integration and workflow tooling that removes the repetitive admin and connects the tools you already use.",
    cta: { href: "/book", label: "Book a Session" },
    className: "md:col-span-1",
  },
  {
    icon: Lightbulb,
    title: "Consultations",
    description:
      "Technical strategy sessions, digital audits and solution scoping — get a clear, honest roadmap before you spend a rand on development.",
    cta: { href: "/book", label: "Book a Session" },
    className: "md:col-span-1",
  },
  {
    icon: Globe,
    title: "Website Design & Hosting",
    description:
      "Professionally designed business websites with managed hosting and maintenance — launch fast, look credible and stay online without lifting a finger.",
    cta: { href: "/pricing", label: "View Packages" },
    className: "md:col-span-2",
  },
];

export function ServicesBento() {
  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            What we build
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four ways Buk Digital helps your business run smoother, look
            sharper and grow faster.
          </p>
        </div>

        <BentoGrid className="mt-14 md:auto-rows-[20rem]">
          {services.map((service) => (
            <SpotlightCard
              key={service.title}
              className={`group/bento flex flex-col justify-between p-6 transition duration-200 ${service.className}`}
            >
              <service.icon
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              />
              <div className="transition duration-200 group-hover/bento:translate-x-2">
                <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href={service.cta.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {service.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
