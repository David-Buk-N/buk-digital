# Buk Digital — Website

Marketing site for Buk Digital, a digital consulting and solutions partner:
company branding and setup, web design and hosting, and custom solutions, all
sold through a free consultation.

Built with **Next.js (App Router) + Tailwind CSS + shadcn/ui + motion +
lucide-react**, assembled from 21st.dev-style community components
(Magic UI, Aceternity, KokonutUI, TWBlocks and vendored community pieces).

## Pages

| Route       | Purpose                                                        |
| ----------- | -------------------------------------------------------------- |
| `/`         | Hero, services, why Buk Digital, process, FAQ, CTA band         |
| `/services` | The three services in full, the starting price, FAQ            |
| `/book`    | Booking form → Google Calendar event + confirmation email       |
| `/contact` | Contact form, phone/email/WhatsApp details                      |

`/pricing` redirects to `/services` with a 301 (`next.config.ts`).

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

- Services, their lists, calls to action and the starting price:
  `lib/services.ts`
- Contact details / WhatsApp number: `lib/site.ts`
- Billing fine print on `/services`: `components/sections/service-blocks.tsx`
- Why Buk Digital: `components/sections/why-section.tsx`
- FAQ (home and `/services`): `components/sections/faq-section.tsx`
- Page titles, canonical URLs and structured data: `lib/seo.ts`
- Theme (accent colour, radius): `app/globals.css` (`.dark` block)

## Legacy

The previous Flask site is preserved untouched in `legacy-flask/`.
