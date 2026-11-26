import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const { minutes, bookingUrl, timeZoneNote } = siteConfig.consultation;

export const metadata: Metadata = pageMetadata({
  title: "Book a Free Consultation",
  description: `Book a free ${minutes}-minute consultation with Buk Digital on Google Meet. We'll get to know your business, understand your challenges and recommend the right next steps.`,
  path: "/book",
});

const agenda = [
  "Understand your business and objectives",
  "Discuss your challenges and requirements",
  "Explore suitable digital solutions",
  "Agree the recommended next steps",
];

/**
 * The one booking experience every consultation call to action leads to.
 *
 * Booking runs on Google Calendar appointment scheduling, embedded below: it
 * shows real free/busy slots from the calendar, prevents double bookings,
 * adds a Google Meet link and sends the confirmation and cancellation emails.
 * It loads only on this page, and lazily, so it never slows the home page.
 */
export default function BookPage() {
  return (
    <div className="wrap grid gap-10 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20">
      <div>
        <h1 className="display-xl">Let&apos;s talk about your business</h1>
        <p className="lead-text mt-6 max-w-lg">
          Whether you&apos;re starting a new business, improving your online
          presence or looking for a custom technology solution, we&apos;re here
          to help.
        </p>
        <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
          Book a complimentary consultation with Buk Digital. We&apos;ll get to
          know your business, understand your challenges and explore how we can
          help you move forward.
        </p>

        <h2 className="eyebrow mt-10 text-primary">During the consultation, we&apos;ll</h2>
        <ul className="hairline-list mt-4 max-w-lg">
          {agenda.map((item) => (
            <li key={item}>
              <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          {minutes} minutes on Google Meet · Free · No obligation
        </p>
      </div>

      <div className="self-start">
        <div className="surface-card overflow-hidden p-3 sm:p-4">
          {/*
            Google's booking page is about 1,650px tall when narrower than
            600px and about 900px when wider. The heights track the frame's
            width at each breakpoint so the page fits without a scrollbar of
            its own: full width below lg, the narrower grid column from lg,
            and wide enough again from xl.
          */}
          <iframe
            src={`${bookingUrl}?gv=true`}
            title={`Book a ${minutes}-minute consultation with Buk Digital`}
            loading="lazy"
            className="block h-[1680px] w-full border-0 md:h-[940px] lg:h-[1680px] xl:h-[940px]"
          />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Times are shown in {timeZoneNote}. Calendar not loading?{" "}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Open it in a new tab
          </a>
          , or{" "}
          <Link href="/contact" className="underline underline-offset-2">
            contact us
          </Link>{" "}
          instead.
        </p>
      </div>
    </div>
  );
}
