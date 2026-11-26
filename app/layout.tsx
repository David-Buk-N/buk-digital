import type { Metadata } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site";
import { homeTitle, structuredData } from "@/lib/seo";

const sans = Schibsted_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Defaults for any page that sets none of its own (such as the 404 page).
// Real pages build theirs with pageMetadata() in lib/seo.ts, which adds a
// canonical URL. There is deliberately no canonical here: it would be
// inherited by every page and point them all at the home page.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "digital consulting",
    "branding",
    "web design",
    "managed web hosting",
    "custom software",
    "business automation",
    "South Africa",
  ],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <script
          type="application/ld+json"
          // Escaping "<" keeps the JSON from ever closing the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
