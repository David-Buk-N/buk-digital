import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { legalPages } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/pricing`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/book`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    ...legalPages.map((page) => ({
      url: `${siteConfig.url}${page.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
