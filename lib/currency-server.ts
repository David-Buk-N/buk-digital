import { headers } from "next/headers";
import type { Currency } from "@/lib/currency";

/**
 * Picks the display currency from the visitor's country.
 *
 * Vercel sets x-vercel-ip-country on every request. Reading a request header
 * is a request-time API, so any page calling this renders dynamically rather
 * than being prerendered — the reason only the two pages that show prices use
 * it. Off Vercel (local dev) the header is absent and we fall back to dollars,
 * which is also the default for any visitor whose country we cannot determine.
 */
export async function detectCurrency(): Promise<Currency> {
  const country = (await headers()).get("x-vercel-ip-country");
  return country === "ZA" ? "ZAR" : "USD";
}
