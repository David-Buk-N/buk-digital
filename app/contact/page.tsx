import type { Metadata } from "next";
import { Clock, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Buk Digital — phone, email or WhatsApp. We respond within one business day.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Questions about a project, a package or anything else — we&apos;re
            here to help.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div className="flex gap-4">
              <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">Phone</h2>
                <a
                  href={siteConfig.phoneHref}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">Email</h2>
                <a
                  href={siteConfig.emailHref}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <MessageCircle
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold">WhatsApp</h2>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Chat with us on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">Hours</h2>
                <p className="text-muted-foreground">
                  Mon–Fri: 9:00–18:00
                  <br />
                  Sat: 10:00–16:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
