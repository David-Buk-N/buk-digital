# Legal pages — status

The wording of `/terms`, `/privacy`, `/refunds` and `/paia` was confirmed as
verified and ready to publish by the business owner on 6 November 2026, and the
"Draft" notice has been removed. Have any change to that wording re-checked.

Details in `lib/legal.ts` that are still a `[BRACKETED]` placeholder are left
out of the pages and the footer until they are filled in.

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
