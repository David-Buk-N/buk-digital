# Legal pages — status

The wording of `/terms`, `/privacy`, `/refunds` and `/paia` was confirmed as
verified and ready to publish by the business owner on 6 November 2026, and the
"Draft" notice has been removed. Have any change to that wording re-checked.

**Wording changed on 26 November 2026, not yet re-checked: see section 0.**

Details in `lib/legal.ts` that are still a `[BRACKETED]` placeholder are left
out of the pages and the footer until they are filled in.

## 0. Changes to re-check (26 November 2026)

The site stopped selling packages, replaced `/pricing` with `/services`, and
now books consultations through Google Calendar appointment scheduling instead
of its own booking form. These changes keep the policies accurate. Nothing else
in the four policies was changed. The "last updated" date is shared, so all
four now show 26 November 2026.

### Terms & Conditions (`app/terms/page.tsx`)

| Clause | Was | Now |
| --- | --- | --- |
| 3 | Business Development; Digital Presence | Company Branding & Setup; Web Design & Hosting (service names only) |
| 5 | Current package prices are published on our pricing page. | Our services page shows a starting price for some services. The price you pay is the one in your accepted quote or proposal. |
| 6 | …stated in your quote or package. | …stated in your quote or proposal. |
| 11 | Where a package includes a domain… | Where your service includes a domain… |
| 12 | …set out in your package… | …set out in your quote or proposal… |
| Page description | …to South African businesses. | …to businesses in South Africa and abroad. |

### Privacy Policy (`app/privacy/page.tsx`)

- **Section 2, "When you book a consultation"** (was "When you book a
  session"): booking now happens on Google's booking page. What we receive is
  now name, email, phone, answers to any other booking-form questions, and the
  chosen time. "Whether you opted in to marketing" is removed, because the
  Google form does not ask. A new sentence says Google also processes the form
  under its own privacy policy.
- **Section 3:** "scheduling sessions" is now "scheduling consultations". The
  marketing note now says a booking, like an enquiry, is never treated as
  consent.
- **Section 4, processors:**
  - Google (Calendar) now runs the booking page and the Google Meet call, adds
    the consultation to our calendar, and sends the confirmation and
    cancellation emails.
  - Google (Gmail) now covers contact-form notifications and email
    correspondence. The site no longer sends booking confirmations itself.
- **Section 6, cookies:** a new paragraph says the booking page embeds
  Google's booking tool, which sets Google's own cookies. In testing it set a
  reCAPTCHA cookie (`_GRECAPTCHA` on google.com). No other page loads it.
- **Section 7:** "after the session" is now "after the consultation".

### Not changed, but worth a look

- **Refund Policy section 5 (Consultations)** still describes fees for
  consultations. It reads correctly alongside free consultations ("any fee
  paid"), so it was left alone.
- **Clients in the United States and Europe.** The Privacy Policy is written
  for POPIA. Handling personal information of people in the EU or UK may also
  bring the GDPR / UK GDPR into play. Ask the reviewer whether the policy needs
  a section for it.

## 1. Fill in `lib/legal.ts`

| Field | What's needed |
| --- | --- |
| `legalName` | Registered CIPC name, or your full name if you trade as a sole proprietor |
| `registrationNumber` | CIPC registration number, e.g. `2024/123456/07` |
| `vatNumber` | Your VAT number, or leave `null` if not registered |
| `addressLines` | Physical business address (a PO box is not enough under ECTA) |
| `informationOfficer` | Under POPIA this is the head of the body by default — likely you |
| `province` | Used in the jurisdiction clause of the Terms |

Also update `LEGAL_LAST_UPDATED` whenever a policy's wording changes.

## 2. When Stitch is approved

Confirm Stitch's full registered name and its current privacy policy URL, then
set `payments.live = true` in `lib/legal.ts`. That one flag switches the Terms,
the Refund Policy and the Privacy Policy to the Stitch wording together.

## 3. Still outstanding from the compliance review

- Business email on the domain (`hello@bukdigital.co.za`) instead of Gmail
- Real portfolio and case studies, to replace the removed testimonials
- Cookie notice, only if analytics or tracking is switched on — `/privacy`
  already adapts its wording to whether `NEXT_PUBLIC_GA_ID` is set
- Social profile URLs in `lib/site.ts`, or the icons stay hidden
