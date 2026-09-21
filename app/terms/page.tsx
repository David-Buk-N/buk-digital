import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { EntityDetails } from "@/components/legal/entity-details";
import { contractingName, legalContact, legalEntity, resolved } from "@/lib/legal";

// DRAFT — prepared as a starting point, not as legal advice. Have a South
// African attorney review this against the business's actual contracts, tax
// position and the Consumer Protection Act before relying on it.

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms on which Buk Digital provides websites, hosting, custom software and consulting services to South African businesses.",
};

export default function TermsPage() {
  const province = resolved(legalEntity.province);

  return (
    <LegalPage
      title="Terms & Conditions"
      summary="These terms govern the services we provide and the agreement between us."
    >
      <h2 id="who-we-are">1. Who you are contracting with</h2>
      <EntityDetails />

      <h2 id="acceptance">2. These terms</h2>
      <p>
        These terms apply when you accept a quote, place an order, or use our
        services. Where a signed proposal or service agreement covers the same
        subject, that document takes precedence over these terms.
      </p>
      <p>
        In these terms, <strong>&ldquo;we&rdquo;</strong> and{" "}
        <strong>&ldquo;us&rdquo;</strong> mean {contractingName()}, trading as{" "}
        {legalEntity.tradingName}, and <strong>&ldquo;you&rdquo;</strong> means
        the client.
      </p>

      <h2 id="services">3. Services</h2>
      <p>We provide some or all of the following, as set out in your quote:</p>
      <ul>
        <li>Website design, development and launch</li>
        <li>Website hosting, maintenance and support</li>
        <li>Custom web applications and business software</li>
        <li>Workflow automation and system integrations</li>
        <li>Technology consulting and digital audits</li>
      </ul>

      <h2 id="quotes">4. Quotes and proposals</h2>
      <ul>
        <li>Quotes are valid for 30 days from the date of issue.</li>
        <li>
          A quote covers only the scope it describes. Anything not listed is not
          included.
        </li>
        <li>
          Every quote states whether VAT applies and whether any third-party
          costs are payable separately.
        </li>
        <li>
          Third-party costs may include domain registration and renewal,
          premium plugins or themes, email hosting, stock media, premium fonts,
          payment gateway fees, CRM or booking platforms, and API usage
          charges. These are billed at cost or paid by you directly.
        </li>
      </ul>

      <h2 id="payment">5. Payment</h2>
      <ul>
        <li>
          Unless your quote says otherwise, a deposit is payable before work
          begins and the balance is payable on completion, before launch.
        </li>
        <li>
          Payment is by electronic funds transfer to the bank account shown on
          the invoice, unless we agree another method in writing.
        </li>
        <li>Invoices are payable within 7 days of the invoice date.</li>
        <li>
          Hosting and maintenance is billed monthly in advance and continues
          until cancelled under clause 13.
        </li>
        <li>
          If an invoice remains unpaid, we may pause work and, after written
          notice and a reasonable opportunity to pay, suspend hosted services.
          We will always give you notice before suspending a live website.
        </li>
      </ul>
      <p>
        Current package prices are published on our{" "}
        <Link href="/pricing">pricing page</Link>.
      </p>

      <h2 id="process">6. How a project runs</h2>
      <ol>
        <li>Discovery — we agree what is being built and why.</li>
        <li>Design — we present the layout and visual direction for approval.</li>
        <li>Development — we build the approved design.</li>
        <li>Review — you test the work and give consolidated feedback.</li>
        <li>Launch — we deploy the approved work.</li>
      </ol>
      <p>
        The number of revision rounds included is stated in your quote or
        package. Further rounds are quoted separately.
      </p>

      <h2 id="your-responsibilities">7. What we need from you</h2>
      <p>The timeline assumes you provide, without undue delay:</p>
      <ul>
        <li>Accurate business information</li>
        <li>Text content, images and other assets</li>
        <li>Access to domains, hosting and third-party accounts where needed</li>
        <li>Approvals and consolidated feedback at each review stage</li>
      </ul>
      <p>
        You confirm that content you supply is yours to use and does not
        infringe anyone&apos;s rights or breach any law.
      </p>

      <h2 id="scope-changes">8. Changes to scope</h2>
      <p>
        Work outside the agreed scope requires a written change request, a
        revised quote and your approval before we start it. Timelines move to
        reflect approved changes.
      </p>

      <h2 id="acceptance-testing">9. Delivery, testing and acceptance</h2>
      <p>
        On delivery you have 7 days to test the work and report defects. We fix
        defects in delivered functionality at no charge. A request for
        behaviour the agreed scope did not include is a new feature and is
        quoted separately. Work is accepted once the testing period passes
        without reported defects, or once the site goes live.
      </p>
      <p>
        Delays caused by outstanding content, access or approvals extend our
        delivery dates by a matching period.
      </p>

      <h2 id="ip">10. Ownership and intellectual property</h2>
      <p>
        <strong>You own</strong> the content you supply, and the custom work
        produced specifically for your project, from the date we receive
        payment in full.
      </p>
      <p>
        <strong>We keep</strong> ownership of the reusable components,
        frameworks, libraries, templates, internal tools and know-how we bring
        to or develop for general use, including anything of that kind used in
        your project. You get a perpetual licence to keep using those
        components as part of your delivered work.
      </p>
      <p>
        <strong>Third-party software</strong> stays with its owner. Open-source
        software, plugins, themes, fonts and hosted platforms remain subject to
        their own licences, which we cannot transfer to you.
      </p>

      <h2 id="domains">11. Domain names</h2>
      <ul>
        <li>
          Where a package includes a domain, that covers one standard
          registration for the first 12 months, subject to availability and
          registry rules.
        </li>
        <li>
          Renewal fees apply from the second year and are your responsibility.
        </li>
        <li>
          Premium domains, transfers and special extensions may carry
          additional charges, quoted before registration.
        </li>
        <li>
          On request we will register the domain in your name, or transfer it
          to you once all amounts owing are settled, subject to registry
          transfer rules.
        </li>
      </ul>

      <h2 id="hosting">12. Hosting and maintenance</h2>
      <p>
        Hosting and maintenance is a monthly service. What it includes is set
        out in your package and typically covers hosting, an SSL certificate,
        software updates, routine backups and reasonable support during
        business hours.
      </p>
      <p>
        It does not include new pages, new features, redesigns, content
        production or third-party subscription fees. We will quote those
        separately.
      </p>
      <p>
        We take reasonable care to keep sites available but cannot guarantee
        uninterrupted service, since hosting depends on infrastructure we do
        not control.
      </p>

      <h2 id="third-party">13. Third-party services</h2>
      <p>
        Your project may rely on services we do not operate, such as hosting
        platforms, payment providers, email providers, CRM platforms and
        messaging services. We are not responsible for their outages, pricing
        changes, policy changes or discontinuation, though we will help you
        respond to them.
      </p>

      <h2 id="cancellation">14. Cancellation</h2>
      <p>
        You may cancel a project or a monthly service by written notice. What
        becomes payable on cancellation, and how refunds are calculated, is set
        out in our{" "}
        <Link href="/refunds">Refund &amp; Cancellation Policy</Link>.
      </p>
      <p>
        We may cancel if an invoice stays unpaid after notice, if instructions
        would require unlawful work, or if the working relationship breaks down
        to the point where we cannot deliver. We will give reasonable notice
        and hand over the work you have paid for.
      </p>

      <h2 id="consumer-rights">15. Your rights as a consumer</h2>
      <p>
        Nothing in these terms limits any right you have under the Consumer
        Protection Act 68 of 2008, the Electronic Communications and
        Transactions Act 25 of 2002, or any other law, where those rights
        cannot lawfully be excluded.
      </p>

      <h2 id="liability">16. Liability</h2>
      <p>
        We are liable only for loss that results directly from our failure to
        provide the services with reasonable care and skill. We are not liable
        for indirect or consequential loss, including lost profits, lost
        revenue, lost data or business interruption, except where the law does
        not permit that exclusion. Our total liability for any claim is limited
        to the amount you paid us for the service the claim relates to in the
        12 months before the claim arose.
      </p>
      <p>
        Nothing here excludes liability for fraud, gross negligence, death or
        personal injury, or any other liability that cannot lawfully be
        excluded.
      </p>

      <h2 id="indemnity">17. Indemnity</h2>
      <p>
        You indemnify us against claims arising from content or materials you
        supply, including claims of copyright infringement, unlawful or
        misleading content, and the misuse of third-party data or credentials.
      </p>

      <h2 id="confidentiality">18. Confidentiality</h2>
      <p>
        Each of us will keep the other&apos;s confidential information private
        and use it only to perform the agreement. This covers business
        information, credentials, customer data, source code and commercial
        terms, and continues after the agreement ends.
      </p>

      <h2 id="personal-information">19. Personal information</h2>
      <p>
        How we handle personal information is set out in our{" "}
        <Link href="/privacy">Privacy Policy</Link>. Where we process personal
        information on your behalf, for example data held in a system we build
        or host for you, we do so on your instructions and apply reasonable
        security safeguards as required by POPIA.
      </p>

      <h2 id="security">20. Security</h2>
      <p>
        We apply reasonable technical and organisational measures to protect
        systems and data in our care. No system is completely secure, and we
        cannot guarantee that a site or system will never be compromised.
      </p>

      <h2 id="force-majeure">21. Events beyond our control</h2>
      <p>
        Neither of us is responsible for delays or failures caused by events
        outside our reasonable control, including network or infrastructure
        failures, load shedding, natural disasters, civil unrest or the failure
        of a third-party provider.
      </p>

      <h2 id="complaints">22. Complaints and disputes</h2>
      <ol>
        <li>
          Contact us first at{" "}
          <a href={`mailto:${legalContact.general}`}>{legalContact.general}</a>.
          We aim to acknowledge complaints within one business day.
        </li>
        <li>
          If that does not resolve matters, we will escalate internally and
          respond in writing.
        </li>
        <li>
          If a dispute still stands, both of us will consider mediation before
          starting legal proceedings.
        </li>
        <li>
          Failing that, the dispute may be referred to the courts of South
          Africa
          {province ? ` having jurisdiction in ${province}` : ""}.
        </li>
      </ol>

      <h2 id="governing-law">23. Governing law</h2>
      <p>
        These terms are governed by the laws of {legalEntity.country}.
      </p>

      <h2 id="changes">24. Changes to these terms</h2>
      <p>
        We may update these terms. The version published on this page when you
        accept a quote applies to that project. Material changes affecting an
        ongoing monthly service take effect one calendar month after we notify
        you by email.
      </p>
    </LegalPage>
  );
}
