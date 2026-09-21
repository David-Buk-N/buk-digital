import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/legal-page";
import { EntityDetails } from "@/components/legal/entity-details";
import { legalContact, legalEntity, resolved } from "@/lib/legal";

// DRAFT — prepared as a starting point, not as legal advice. The processing
// described here mirrors what the site actually does today (see
// app/api/book/route.ts, app/api/contact/route.ts, lib/google-calendar.ts and
// lib/email.ts). Keep it in step with the code, and have it reviewed against
// POPIA before relying on it.
//
// TODO: verify the Information Regulator's current contact details at
// https://inforegulator.org.za before publishing.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Buk Digital collects, uses and protects personal information under the Protection of Personal Information Act (POPIA).",
};

export default function PrivacyPage() {
  const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);
  const informationOfficer = resolved(legalEntity.informationOfficer);

  return (
    <LegalPage
      title="Privacy Policy"
      summary="How we collect, use, share and protect your personal information, in line with POPIA."
    >
      <h2 id="responsible-party">1. Who is responsible</h2>
      <p>
        For the purposes of the Protection of Personal Information Act 4 of
        2013 (POPIA), the responsible party is:
      </p>
      <EntityDetails />
      <p>
        {informationOfficer ? (
          <>
            Our Information Officer is {informationOfficer}, reachable at{" "}
            <a href={`mailto:${legalContact.privacy}`}>
              {legalContact.privacy}
            </a>
            .
          </>
        ) : (
          <>
            Privacy queries go to{" "}
            <a href={`mailto:${legalContact.privacy}`}>
              {legalContact.privacy}
            </a>
            .
          </>
        )}
      </p>

      <h2 id="what-we-collect">2. What we collect</h2>
      <p>
        We collect only what we need to answer you and deliver our services.
      </p>

      <h3>When you book a session</h3>
      <ul>
        <li>Your name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Company name, if you give one</li>
        <li>The service you are interested in</li>
        <li>Your preferred date and time</li>
        <li>The project brief you write</li>
        <li>Whether you opted in to marketing</li>
      </ul>

      <h3>When you use the contact form</h3>
      <ul>
        <li>Your name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Your message</li>
        <li>Whether you opted in to marketing</li>
      </ul>

      <h3>Automatically</h3>
      <p>
        Our hosting provider keeps standard server logs, which include IP
        addresses and browser details, to run and secure the site.
        {analyticsEnabled
          ? " We also use Google Analytics, described in section 6."
          : " We do not use analytics or advertising trackers on this site."}
      </p>
      <p>
        We do not ask for or store banking details, card numbers or
        identity-document numbers through this website.
      </p>

      <h2 id="why">3. Why we use it, and on what basis</h2>
      <table>
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Lawful basis under POPIA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Responding to your enquiry and scheduling sessions</td>
            <td>
              Steps to conclude or perform a contract with you (section 11(1)(b))
            </td>
          </tr>
          <tr>
            <td>Delivering, hosting and supporting the services you buy</td>
            <td>Performance of our contract (section 11(1)(b))</td>
          </tr>
          <tr>
            <td>Invoicing, accounting and tax records</td>
            <td>Compliance with a legal obligation (section 11(1)(c))</td>
          </tr>
          <tr>
            <td>Keeping the website and our systems secure</td>
            <td>Our legitimate interests (section 11(1)(f))</td>
          </tr>
          <tr>
            <td>Sending marketing updates</td>
            <td>Your consent, which you can withdraw at any time (section 69)</td>
          </tr>
        </tbody>
      </table>
      <p>
        Marketing is always optional. You can submit any enquiry or booking
        without agreeing to receive marketing, and we will not treat an
        enquiry as consent.
      </p>

      <h2 id="sharing">4. Who we share it with</h2>
      <p>
        We do not sell your personal information. We share it only with the
        service providers that run this site and our operations:
      </p>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>What it handles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel</td>
            <td>Website hosting and server logs</td>
          </tr>
          <tr>
            <td>Google (Calendar)</td>
            <td>
              Booking details are written into a calendar event so we can
              prepare for your session
            </td>
          </tr>
          <tr>
            <td>Google (Gmail)</td>
            <td>
              Sending your confirmation email and notifying us of your enquiry
            </td>
          </tr>
          {analyticsEnabled && (
            <tr>
              <td>Google Analytics</td>
              <td>Website usage statistics</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>
        We may also disclose information where the law requires it, or to
        establish or defend a legal claim.
      </p>

      <h2 id="cross-border">5. Information sent outside South Africa</h2>
      <p>
        The providers above process information on servers outside South
        Africa. POPIA permits these transfers where the recipient is subject to
        laws or binding agreements providing comparable protection, and these
        providers contract on terms that require it. By using this website you
        understand that your information is processed in this way.
      </p>

      <h2 id="cookies">6. Cookies and tracking</h2>
      {analyticsEnabled ? (
        <>
          <p>
            We use Google Analytics to understand how visitors use the site.
            It sets cookies that record pages viewed and approximate location.
            We do not use these for advertising.
          </p>
          <p>
            You can block cookies in your browser settings, or install
            Google&apos;s opt-out browser add-on, without losing access to any
            part of this site.
          </p>
        </>
      ) : (
        <p>
          This site does not set tracking or advertising cookies. Our forms work
          without them.
        </p>
      )}

      <h2 id="retention">7. How long we keep it</h2>
      <table>
        <thead>
          <tr>
            <th>Information</th>
            <th>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Enquiries that do not become projects</td>
            <td>Up to 12 months, then deleted</td>
          </tr>
          <tr>
            <td>Booking and calendar records</td>
            <td>Up to 12 months after the session</td>
          </tr>
          <tr>
            <td>Client contracts and project records</td>
            <td>For the engagement, then as long as legally required</td>
          </tr>
          <tr>
            <td>Invoices and accounting records</td>
            <td>Five years, as required by South African tax law</td>
          </tr>
          <tr>
            <td>Marketing contacts</td>
            <td>Until you unsubscribe or ask us to delete them</td>
          </tr>
          <tr>
            <td>Server logs</td>
            <td>Short retention periods set by our hosting provider</td>
          </tr>
        </tbody>
      </table>
      <p>
        Where another law requires us to keep a record, we keep it for that
        period even if you ask for deletion, and we will tell you when that
        applies.
      </p>

      <h2 id="security">8. How we protect it</h2>
      <p>
        We use reasonable technical and organisational safeguards, including
        encrypted connections (HTTPS) across the site, access controls and
        multi-factor authentication on the accounts that hold client data,
        credentials kept outside our source code, and limiting access to people
        who need it. No system is completely secure, and we cannot guarantee
        absolute security.
      </p>
      <p>
        If a security compromise affects your personal information, we will
        notify you and the Information Regulator as POPIA requires.
      </p>

      <h2 id="your-rights">9. Your rights</h2>
      <p>You may ask us to:</p>
      <ul>
        <li>Confirm what personal information we hold about you</li>
        <li>Give you a copy of it</li>
        <li>Correct or update it</li>
        <li>Delete it, where no law requires us to keep it</li>
        <li>Stop using it for a particular purpose</li>
        <li>Stop sending you marketing</li>
      </ul>
      <p>
        Email{" "}
        <a href={`mailto:${legalContact.privacy}`}>{legalContact.privacy}</a>{" "}
        and we will respond within a reasonable time. We may ask you to confirm
        your identity first. Requests are free, except that a fee may apply to
        a formal access request under PAIA, as set out in our{" "}
        <Link href="/paia">PAIA Manual</Link>.
      </p>

      <h2 id="complaints">10. Complaints</h2>
      <p>
        Please raise concerns with us first. If you are not satisfied, you may
        complain to the Information Regulator of South Africa, whose current
        contact details and complaint forms are published at{" "}
        <a
          href="https://inforegulator.org.za"
          target="_blank"
          rel="noopener noreferrer"
        >
          inforegulator.org.za
        </a>
        .
      </p>

      <h2 id="changes">11. Changes to this policy</h2>
      <p>
        We may update this policy as our services change. The date at the top
        shows when it last changed. Where a change materially affects how we
        use your information, we will tell you.
      </p>
    </LegalPage>
  );
}
