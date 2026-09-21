# Legal pages — before these go live

The pages at `/terms`, `/privacy`, `/refunds` and `/paia` are **drafts**. They
were written to match what this business and this codebase actually do, but
they are not legal advice and have not been reviewed by an attorney.

While any detail in `lib/legal.ts` is still a `[BRACKETED]` placeholder, every
policy page shows a "Draft — not yet in force" notice, and the footer omits the
business identity line. Filling in the details removes both automatically.

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

## 2. Verify before publishing

- [ ] **Information Regulator details** — confirm current contact details and
      complaint process at <https://inforegulator.org.za>
- [ ] **PAIA request form and fees** — form numbers and prescribed amounts have
      changed across successive regulations, so `/paia` points to the
      Regulator's page rather than naming them. Confirm what applies to you.
- [ ] **Information Officer registration** — registering with the Regulator is a
      separate step from naming one on this page
- [ ] **When Stitch is approved, set `payments.live = true`** in `lib/legal.ts`.
      That one flag switches three documents at once: the Terms name Stitch and
      describe the payment link, the Refund Policy says refunds are returned
      through Stitch, and the Privacy Policy adds Stitch as a recipient with a
      link to its privacy policy. Until then none of them claim Stitch processes
      anyone's data, which is what your compliance review asked for
- [ ] **Confirm Stitch's full registered name** and its current privacy policy
      URL before flipping that flag
- [ ] **On-site checkout** — there is still no checkout in the codebase, so the
      Terms describe paying by a link sent with the invoice. If you later add a
      checkout, set `payments.method` to `"checkout"` and revisit clause 5, plus
      the pre-payment disclosures in section 20 of the compliance review
- [ ] **Deposit split** — clause 5 says "a deposit before work begins, balance on
      completion" without percentages. Set your actual terms
- [ ] **Testing window** — clause 9 assumes 7 days; clause 5 assumes invoices are
      payable in 7 days. Change if yours differ
- [ ] **Retention periods** in `/privacy` section 7 — the 5-year accounting figure
      follows South African tax law, but confirm the rest match what you do
- [ ] **VAT wording** — `/terms` says each quote states whether VAT applies,
      which avoids claiming a VAT status. Revisit once registered

## 3. Have an attorney review

Priority order, highest risk first:

1. **PAIA manual** — content is prescribed by section 51, so a defective manual
   is a compliance problem in itself
2. **Terms & Conditions** — the liability, IP and cancellation clauses carry the
   most commercial risk
3. **Refund policy** — interacts with the Consumer Protection Act, which was
   amended in April 2026
4. **Privacy policy** — closest to accurate already, since it describes real
   processing, but the lawful-basis table deserves a check

## 4. Still outstanding from the compliance review

- Business email on the domain (`hello@bukdigital.co.za`) instead of Gmail
- Real portfolio and case studies, to replace the removed testimonials
- Cookie notice, only if analytics or tracking is switched on — `/privacy`
  already adapts its wording to whether `NEXT_PUBLIC_GA_ID` is set
- Social profile URLs in `lib/site.ts`, or the icons stay hidden
