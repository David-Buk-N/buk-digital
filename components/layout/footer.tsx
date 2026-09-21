import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  addressOneLine,
  legalEntity,
  legalPages,
  resolved,
} from "@/lib/legal";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M13.5 21.9v-7.4h2.5l.4-2.9h-2.9V9.7c0-.8.2-1.4 1.4-1.4h1.6V5.7c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2h-2.6v2.9h2.6v7.4h3.2z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const serviceLinks = [
  { href: "/#services", label: "Custom Web Applications" },
  { href: "/#services", label: "Software Solutions" },
  { href: "/book", label: "Consultations" },
  { href: "/pricing", label: "Website Design & Hosting" },
];

const companyLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/book", label: "Book a Session" },
  { href: "/contact", label: "Contact" },
];

// Only profiles with a URL in siteConfig are rendered — no dead links.
const socialLinks = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
].filter((link): link is typeof link & { href: string } => Boolean(link.href));

export function Footer() {
  // Supplier identity (ECTA s43). Built from whichever details are known, and
  // omitted entirely until at least one of them is filled in.
  const identityLine = [
    resolved(legalEntity.legalName),
    resolved(legalEntity.registrationNumber) &&
      `Reg. No. ${resolved(legalEntity.registrationNumber)}`,
    legalEntity.vatNumber && `VAT No. ${legalEntity.vatNumber}`,
    addressOneLine(),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="text-primary"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
              <span>Buk Digital</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Custom web applications, software solutions and business websites
              for growing South African businesses.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-3 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2">
              {legalPages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone className="h-4 w-4" /> {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" /> {siteConfig.email}
                </a>
              </li>
              <li>Mon–Fri: 9:00–18:00</li>
              <li>Sat: 10:00–16:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6">
          {identityLine && (
            <p className="text-xs text-muted-foreground">{identityLine}</p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            We process personal information submitted through this website in
            line with the Protection of Personal Information Act (POPIA). See
            our{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>{" "}
            for what we collect, who we share it with and how to access,
            correct or delete it.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {legalEntity.tradingName}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
