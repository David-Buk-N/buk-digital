import {
  addressOneLine,
  legalContact,
  legalEntity,
  resolved,
} from "@/lib/legal";

/**
 * The supplier-identity block required of an electronic supplier under ECTA
 * section 43. Only details that are actually known are shown, so unfinished
 * placeholders never reach a visitor.
 */
export function EntityDetails() {
  const legalName = resolved(legalEntity.legalName);
  const registration = resolved(legalEntity.registrationNumber);
  const address = addressOneLine();

  return (
    <ul>
      <li>
        <strong>Trading name:</strong> {legalEntity.tradingName}
      </li>
      {legalName && (
        <li>
          <strong>Registered name:</strong> {legalName}
        </li>
      )}
      {registration && (
        <li>
          <strong>Registration number:</strong> {registration}
        </li>
      )}
      {legalEntity.vatNumber && (
        <li>
          <strong>VAT number:</strong> {legalEntity.vatNumber}
        </li>
      )}
      {address && (
        <li>
          <strong>Address:</strong> {address}
        </li>
      )}
      <li>
        <strong>Email:</strong>{" "}
        <a href={`mailto:${legalContact.general}`}>{legalContact.general}</a>
      </li>
      <li>
        <strong>Telephone:</strong> {legalContact.phone}
      </li>
      <li>
        <strong>Website:</strong>{" "}
        <a href="https://www.bukdigital.co.za">www.bukdigital.co.za</a>
      </li>
      <li>
        <strong>Country:</strong> {legalEntity.country}
      </li>
    </ul>
  );
}
