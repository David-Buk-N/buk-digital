import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { serviceCategories } from "@/lib/services";

export const homeTitle =
  "Buk Digital | Digital Consulting, Branding, Websites & Custom Solutions";

/**
 * Title, description, canonical URL and social cards for one page.
 *
 * Next.js merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's whole `openGraph` object rather than extending it. So each page
 * passes through here to get a complete set, with its own URL, instead of
 * inheriting the home page's.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page title. Pass `homeTitle` for the home page; others get "| Buk Digital". */
  title: string;
  description: string;
  /** Path from the site root, e.g. "/services". Resolved against metadataBase. */
  path: string;
}): Metadata {
  const isHome = title === homeTitle;
  const fullTitle = isHome ? title : `${title} | ${siteConfig.name}`;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * Organisation and website structured data. Only facts the site already
 * states: no ratings, reviews or address while the address is unconfirmed.
 */
export function structuredData() {
  const url = siteConfig.url;
  const organisationId = `${url}/#organization`;
  const sameAs = Object.values(siteConfig.social).filter(
    (link): link is string => Boolean(link)
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organisationId,
        name: siteConfig.name,
        url,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone.replace(/\s/g, ""),
        address: { "@type": "PostalAddress", addressCountry: "ZA" },
        areaServed: ["South Africa", "United States", "Europe"],
        ...(sameAs.length > 0 && { sameAs }),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: serviceCategories.map((category) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: category.name,
              description: category.description,
              url: `${url}/services#${category.id}`,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name: siteConfig.name,
        url,
        inLanguage: "en",
        publisher: { "@id": organisationId },
      },
    ],
  };
}
