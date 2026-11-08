import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Buk Digital — phone, email or WhatsApp. We respond within one business day.",
};

const linkClass = "text-lg font-medium underline-offset-4 hover:text-primary hover:underline";

export default function ContactPage() {
  return (
    <div className="wrap grid gap-10 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
      <div>
        <h1 className="display-xl">Get in touch</h1>
        <p className="lead-text mt-6 max-w-lg">
          Questions about a project, a package or anything else — we&apos;re
          here to help.
        </p>

        <dl className="mt-10 border-t-2 border-foreground">
          <div className="border-b border-border py-4">
            <dt className="eyebrow text-muted-foreground">Phone</dt>
            <dd className="mt-1.5">
              <a href={siteConfig.phoneHref} className={linkClass}>
                {siteConfig.phone}
              </a>
            </dd>
          </div>
          <div className="border-b border-border py-4">
            <dt className="eyebrow text-muted-foreground">Email</dt>
            <dd className="mt-1.5">
              <a href={siteConfig.emailHref} className={`${linkClass} break-all`}>
                {siteConfig.email}
              </a>
            </dd>
          </div>
          <div className="border-b border-border py-4">
            <dt className="eyebrow text-muted-foreground">WhatsApp</dt>
            <dd className="mt-1.5">
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Chat with us on WhatsApp
              </a>
            </dd>
          </div>
          <div className="border-b border-border py-4">
            <dt className="eyebrow text-muted-foreground">Hours</dt>
            <dd className="mt-1.5 text-lg font-medium">
              Mon–Fri: 9:00–18:00
              <br />
              Sat: 10:00–16:00
            </dd>
          </div>
        </dl>
      </div>

      <div className="surface-card self-start">
        <ContactForm />
      </div>
    </div>
  );
}
