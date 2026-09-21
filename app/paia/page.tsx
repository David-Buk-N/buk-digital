import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { EntityDetails } from "@/components/legal/entity-details";
import { legalContact, legalEntity, resolved } from "@/lib/legal";

// DRAFT — prepared as a starting point, not as legal advice. A PAIA manual has
// prescribed content under section 51 of the Promotion of Access to Information
// Act, and the Information Regulator publishes a template. Have this checked
// against the current requirements for this entity before publishing.
//
// TODO before publishing: confirm the current prescribed request form and the
// prescribed fees at https://inforegulator.org.za/paia/ — form numbers and
// amounts have changed with successive regulations, so they are referenced
// here rather than reproduced.

export const metadata: Metadata = {
  title: "PAIA Manual",
  description:
    "Buk Digital's manual under the Promotion of Access to Information Act 2 of 2000, including how to request access to records.",
};

export default function PaiaPage() {
  const head = resolved(legalEntity.informationOfficer);

  return (
    <LegalPage
      title="PAIA Manual"
      summary="Our manual under the Promotion of Access to Information Act 2 of 2000 (PAIA), and how to request a record."
    >
      <h2 id="about">1. About this manual</h2>
      <p>
        PAIA gives everyone the right to request access to records held by a
        private body where the record is required to exercise or protect a
        right. This manual explains what records we hold and how to ask for
        one.
      </p>

      <h2 id="details">2. Our details</h2>
      <EntityDetails />
      <p>
        {head ? (
          <>
            The head of the body for PAIA purposes is {head}. Send requests to{" "}
            <a href={`mailto:${legalContact.general}`}>
              {legalContact.general}
            </a>
            .
          </>
        ) : (
          <>
            Send requests to{" "}
            <a href={`mailto:${legalContact.general}`}>
              {legalContact.general}
            </a>
            , marked for the attention of the head of the body.
          </>
        )}
      </p>

      <h2 id="guide">3. The Information Regulator&apos;s guide</h2>
      <p>
        The Information Regulator publishes a guide on how to use PAIA, in
        terms of section 10. It is available free from{" "}
        <a
          href="https://inforegulator.org.za/paia/"
          target="_blank"
          rel="noopener noreferrer"
        >
          inforegulator.org.za/paia
        </a>
        , which also carries the prescribed request forms and current fees.
      </p>

      <h2 id="automatic">4. Records available without a formal request</h2>
      <p>
        Some information is already published and needs no request, including
        our services and prices, our{" "}
        <Link href="/terms">Terms &amp; Conditions</Link>, our{" "}
        <Link href="/privacy">Privacy Policy</Link>, our{" "}
        <Link href="/refunds">Refund &amp; Cancellation Policy</Link> and our
        contact details. Clients can ask us for copies of their own contracts,
        quotes and invoices at any time, without using this procedure.
      </p>
      <p>
        We have not published a notice under section 52(2) listing categories of
        records automatically available.
      </p>

      <h2 id="categories">5. Categories of records we hold</h2>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Categories of records</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clients and projects</td>
            <td>
              Quotes, proposals, contracts, project briefs, correspondence,
              specifications, designs and handover documents
            </td>
          </tr>
          <tr>
            <td>Enquiries</td>
            <td>Website enquiry and booking submissions, and related emails</td>
          </tr>
          <tr>
            <td>Finance</td>
            <td>Invoices, payment records, accounting and tax records</td>
          </tr>
          <tr>
            <td>Suppliers</td>
            <td>
              Hosting, domain, software and other supplier agreements and
              invoices
            </td>
          </tr>
          <tr>
            <td>Technical</td>
            <td>
              Source code, configuration, hosting and backup records for systems
              we build or maintain
            </td>
          </tr>
          <tr>
            <td>Statutory</td>
            <td>
              Registration, tax and other records kept under legislation such as
              the Companies Act, the Income Tax Act and the Value-Added Tax Act
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Not every record is available on request. PAIA sets out grounds on which
        access must or may be refused, including the privacy of a third party,
        commercial information of a third party and legally privileged records.
      </p>

      <h2 id="personal-information">6. Personal information we process</h2>
      <p>
        The categories of personal information we process, why we process them,
        who receives them, whether they leave South Africa, and how long we keep
        them are set out in our <Link href="/privacy">Privacy Policy</Link>. The
        data subjects concerned are prospective clients, clients and their staff,
        suppliers and our own personnel.
      </p>

      <h2 id="how-to-request">7. How to make a request</h2>
      <ol>
        <li>
          Use the prescribed request form for a private body, available from the
          Information Regulator&apos;s PAIA page.
        </li>
        <li>
          Provide enough detail to identify the record and to let us contact
          you, and state the right you are seeking to exercise or protect and
          why the record is required for it.
        </li>
        <li>
          Email the completed form to{" "}
          <a href={`mailto:${legalContact.general}`}>{legalContact.general}</a>,
          or deliver it to our address above.
        </li>
        <li>
          Pay the prescribed request fee where one applies. We will tell you the
          amount, and any access fee for searching, preparing and copying the
          record, before we process the request.
        </li>
      </ol>

      <h2 id="decision">8. How we respond</h2>
      <p>
        We will decide within 30 days of receiving a complete request and tell
        you the outcome in writing. That period may be extended by up to a
        further 30 days where the request covers a large number of records or a
        search through records held elsewhere, and we will tell you if that
        happens. If we refuse, we will give reasons and explain your remedies.
      </p>

      <h2 id="remedies">9. If we refuse</h2>
      <p>
        There is no internal appeal against a decision of a private body. You
        may lodge a complaint with the Information Regulator, or apply to a
        court, within the period PAIA allows. The Regulator&apos;s complaint
        procedure is published at{" "}
        <a
          href="https://inforegulator.org.za"
          target="_blank"
          rel="noopener noreferrer"
        >
          inforegulator.org.za
        </a>
        .
      </p>

      <h2 id="availability">10. Availability of this manual</h2>
      <p>
        This manual is available on this page at no charge, and we will email a
        copy on request. Tell us if you need it in another format.
      </p>
    </LegalPage>
  );
}
