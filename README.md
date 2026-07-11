# Buk Digital — Website

Marketing site for Buk Digital: custom web applications, software solutions,
consultations, and website design & hosting for South African SMEs.

Built with **Next.js (App Router) + Tailwind CSS + shadcn/ui + motion +
lucide-react**, assembled from 21st.dev-style community components
(Magic UI, Aceternity, KokonutUI, TWBlocks and vendored community pieces).

## Pages

| Route      | Purpose                                                        |
| ---------- | -------------------------------------------------------------- |
| `/`        | Hero (rotating headline + aurora), services bento, process, testimonials, CTA band |
| `/pricing` | Three ZAR tiers (Starter / Professional / Custom Web App) + FAQ |
| `/book`    | Booking form → Google Calendar event + confirmation email       |
| `/contact` | Contact form, phone/email/WhatsApp details                      |

A floating WhatsApp click-to-chat button appears site-wide.

## Getting started

```bash
npm install
npm run dev
```

## Configuration

Copy `.env.example` to `.env.local` and fill in the keys. Everything works
without keys (bookings/enquiries are logged to the server console), but to go
live you'll want:

1. **Google Calendar** — create a service account, enable the Calendar API,
   share your calendar with the service account email, and set
   `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID`.
   (OAuth2 variables are supported as an alternative — see `.env.example`.)
   All client details are written into the event description so each booking
   is self-contained.
2. **Email** — set `SMTP_USER` / `SMTP_PASS` (Gmail App Password) and
   `CONTACT_EMAIL` for booking confirmations and contact-form notifications.
3. **Analytics** — set `NEXT_PUBLIC_GA_ID` to activate Google Analytics.
4. **Site URL** — set `NEXT_PUBLIC_SITE_URL` for correct SEO/sitemap URLs.

## Editing content

- Contact details / WhatsApp number: `lib/site.ts`
- Testimonials: `components/sections/testimonials-section.tsx`
- Pricing tiers & fine print: `components/sections/pricing-section.tsx`
- FAQ: `app/pricing/page.tsx`
- Theme (accent colour, radius): `app/globals.css` (`.dark` block)

## Legacy

The previous Flask site is preserved untouched in `legacy-flask/`.
