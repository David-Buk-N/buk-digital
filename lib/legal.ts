import { siteConfig } from "@/lib/site";

/**
 * Business identity used across the legal pages and the footer.
 *
 * Values wrapped in [SQUARE BRACKETS] are not yet known. Anything still
 * bracketed is treated as unset: the footer omits it and the legal pages show
 * a "draft" notice instead of presenting themselves as final. Fill these in
 * and both behaviours switch off on their own.
 */
export const legalEntity = {
  tradingName: "Buk Digital",
  /** Registered name at CIPC, or your own full name if you trade as a sole proprietor. */
  legalName: "[REGISTERED LEGAL NAME]",
  /** CIPC registration number, e.g. 2024/123456/07. Leave bracketed if not incorporated. */
  registrationNumber: "[CIPC REGISTRATION NUMBER]",
  /** VAT number, or null if not VAT registered. Registration is compulsory above R1m turnover in 12 months. */
  vatNumber: null as string | null,
  addressLines: ["[STREET ADDRESS]", "[CITY, POSTAL CODE]", "South Africa"],
  /** Under POPIA the head of a private body is the Information Officer by default. */
  informationOfficer: "[INFORMATION OFFICER FULL NAME]",
  country: "South Africa",
  /** Courts of South Africa; named province helps a jurisdiction clause. */
  province: "[PROVINCE]",
} as const;

/** Addresses used for legal and privacy correspondence. */
export const legalContact = {
  general: siteConfig.email,
  privacy: siteConfig.email,
  phone: siteConfig.phone,
} as const;

/** The date shown on each policy. Update whenever a policy's wording changes. */
export const LEGAL_LAST_UPDATED = "21 September 2026";

/** True while a value is still a [BRACKETED] placeholder. */
export function isUnset(value: string | null | undefined): boolean {
  return !value || (value.startsWith("[") && value.endsWith("]"));
}

/** Returns the value, or undefined while it is still a placeholder. */
export function resolved(value: string | null | undefined): string | undefined {
  return isUnset(value) ? undefined : (value as string);
}

/** True while any identity detail is outstanding, which keeps the draft notice visible. */
export const hasUnsetDetails: boolean =
  isUnset(legalEntity.legalName) ||
  isUnset(legalEntity.registrationNumber) ||
  isUnset(legalEntity.informationOfficer) ||
  isUnset(legalEntity.province) ||
  legalEntity.addressLines.some(isUnset);

/** Address as a single line, or undefined while any part is a placeholder. */
export function addressOneLine(): string | undefined {
  return legalEntity.addressLines.some(isUnset)
    ? undefined
    : legalEntity.addressLines.join(", ");
}

/** The name to contract under: the registered name once known, else the trading name. */
export function contractingName(): string {
  return resolved(legalEntity.legalName) ?? legalEntity.tradingName;
}

export const legalPages = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refunds", label: "Refund & Cancellation" },
  { href: "/paia", label: "PAIA Manual" },
] as const;
