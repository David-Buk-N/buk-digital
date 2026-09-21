import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { legalContact } from "@/lib/legal";

// DRAFT — prepared as a starting point, not as legal advice. Refund terms
// interact with the Consumer Protection Act; have this reviewed before relying
// on it, and note the CPA amendment published in April 2026.

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "How cancellations, deposits and refunds work for Buk Digital projects, hosting and consultations.",
};

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      summary="What happens if you cancel, and how any refund is worked out."
    >
      <h2 id="principle">1. The principle</h2>
      <p>
        Our work is bespoke: time spent designing and building for you cannot
        be resold. So refunds are based on work already performed and costs
        already committed, rather than a flat rule. We would always rather fix
        a problem than end a project, so please talk to us first.
      </p>
      <p>
        This policy works together with our{" "}
        <Link href="/terms">Terms &amp; Conditions</Link>.
      </p>

      <h2 id="cancelling">2. How to cancel</h2>
      <p>
        Email{" "}
        <a href={`mailto:${legalContact.general}`}>{legalContact.general}</a>{" "}
        with your name and what you are cancelling. Cancellation takes effect
        on the date we receive your notice, and we will confirm in writing.
      </p>

      <h2 id="projects">3. Website and software projects</h2>
      <h3>Before work begins</h3>
      <p>
        If you cancel before we start, we refund your deposit less any
        third-party costs already committed on your behalf, such as a
        registered domain, and less any work already done at your request, such
        as a discovery session.
      </p>

      <h3>After work begins</h3>
      <p>
        We invoice for work completed up to the cancellation date and for
        committed third-party costs. Anything you have paid beyond that is
        refunded. On request we will provide a breakdown of the work performed.
      </p>

      <h3>After delivery or launch</h3>
      <p>
        Once work is delivered and accepted, fees for that work are not
        refundable. Our obligation to fix defects in what we delivered
        continues as set out in the Terms. A request for functionality the
        agreed scope never included is a new project, not a defect.
      </p>

      <h2 id="hosting">4. Hosting and maintenance</h2>
      <ul>
        <li>
          Hosting and maintenance is billed monthly in advance and you may
          cancel at any time.
        </li>
        <li>
          Cancellation takes effect at the end of the month you have paid for.
          Part-months are not refunded.
        </li>
        <li>
          We will help you move your website to another provider and will
          provide a copy of your site files and content.
        </li>
        <li>
          Once the service ends, we stop hosting, backups and updates. Keep your
          own copy of anything you need.
        </li>
        <li>
          Domain renewals are separate from hosting. A cancelled hosting service
          does not cancel or renew your domain.
        </li>
      </ul>

      <h2 id="consultations">5. Consultations</h2>
      <ul>
        <li>
          Reschedule or cancel at least 24 hours before the session and any fee
          paid is refunded or credited in full.
        </li>
        <li>
          Cancel with less notice, or miss the session, and the fee may be
          retained.
        </li>
        <li>
          Once a consultation has taken place and its findings delivered, the
          fee is not refundable.
        </li>
      </ul>

      <h2 id="third-party">6. Third-party and domain costs</h2>
      <p>
        Domains, premium plugins, themes, fonts, stock media and subscriptions
        bought for your project are generally non-refundable, because the
        provider charges us on purchase. Where we can recover a cost, we pass
        the recovery on to you.
      </p>

      <h2 id="our-cancellation">7. If we cancel</h2>
      <p>
        If we end a project for a reason that is not your fault, we refund
        amounts you have paid for work not yet performed, and hand over the
        work you have paid for.
      </p>

      <h2 id="payment-problems">8. Duplicate and failed payments</h2>
      <p>
        Tell us about a duplicate or incorrect payment and we will refund it in
        full once confirmed, normally within 7 business days. Refunds go back to
        the account the payment came from.
      </p>

      <h2 id="timing">9. Refund timing</h2>
      <p>
        Approved refunds are paid by electronic funds transfer within 14 days of
        agreeing the amount. We will confirm the amount and the date in writing.
      </p>

      <h2 id="consumer-rights">10. Your rights as a consumer</h2>
      <p>
        This policy does not limit rights you have under the Consumer
        Protection Act 68 of 2008 or other law that cannot lawfully be
        excluded, including any right to cancel certain electronic transactions
        or to services performed with reasonable care and skill.
      </p>

      <h2 id="disputes">11. If you disagree with a decision</h2>
      <p>
        Email us and we will review it and respond in writing. If we still
        disagree, the complaints process in our{" "}
        <Link href="/terms">Terms &amp; Conditions</Link> applies.
      </p>
    </LegalPage>
  );
}
