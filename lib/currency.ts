/**
 * Currency display. Visitors in South Africa see rand; everyone else sees US
 * dollars. Invoices are always issued and collected in rand, so wherever a
 * dollar price is shown the rand amount is shown with it.
 *
 * Pure formatting only — no next/headers here, so client components can
 * import it. Detection lives in lib/currency-server.ts.
 */

export type Currency = "ZAR" | "USD";

/** An amount carried in both currencies. */
export interface Price {
  /** What we actually invoice. */
  zar: number;
  /** Shown to visitors outside South Africa, rounded to a clean price point. */
  usd: number;
}

/**
 * The rate the dollar prices were set against. They are deliberately round
 * numbers rather than a live conversion, so review them if the rand moves
 * far from this.
 */
export const USD_REFERENCE = {
  zarPerUsd: 16.41,
  setOn: "29 September 2026",
};

export const otherCurrency: Record<Currency, Currency> = {
  ZAR: "USD",
  USD: "ZAR",
};

/** Formats a bare number, e.g. 5000 -> "R5,000" or "$299". */
export function formatAmount(value: number, currency: Currency): string {
  const digits = value.toLocaleString("en-US");
  return currency === "ZAR" ? `R${digits}` : `$${digits}`;
}

export function formatPrice(price: Price, currency: Currency): string {
  return formatAmount(currency === "ZAR" ? price.zar : price.usd, currency);
}

export function formatMonthly(price: Price, currency: Currency): string {
  return `${formatPrice(price, currency)}/month`;
}

/**
 * The rand amount to show beside a dollar price, so a visitor always knows
 * what will appear on the invoice. Returns null when rand is already the
 * currency on display.
 */
export function billedInZar(
  price: Price,
  currency: Currency,
  suffix = ""
): string | null {
  if (currency === "ZAR") return null;
  return `${formatAmount(price.zar, "ZAR")}${suffix}`;
}
