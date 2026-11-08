import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import {
  LegalTabs,
  LegalToc,
  type LegalTocItem,
} from "@/components/legal/legal-nav";

/**
 * Shared shell for the policy pages: document tabs, heading, effective date, a
 * clause index and the prose styling defined by .legal-prose in globals.css.
 *
 * The index is read from the document's own numbered h2s, so the policy files
 * stay the single source of their wording and the index cannot drift from it.
 * Each number is only separated out for styling; the text is unchanged.
 */
function indexClauses(children: ReactNode) {
  const toc: LegalTocItem[] = [];

  const body = Children.toArray(children).map((child) => {
    if (
      !isValidElement<{ id?: string; children?: ReactNode }>(child) ||
      child.type !== "h2"
    ) {
      return child;
    }

    const { id, children: heading } = child.props;
    const match = typeof heading === "string" && /^(\d+)\.\s+(.+)$/.exec(heading);
    if (!id || !match) return child;

    const [, number, title] = match;
    toc.push({ id, number, title });
    return cloneElement(
      child,
      undefined,
      <span className="legal-num">{number}.</span>,
      " ",
      <span>{title}</span>
    );
  });

  return { toc, body };
}

export function LegalPage({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: ReactNode;
}) {
  const { toc, body } = indexClauses(children);

  return (
    <div className="wrap pt-6 pb-20 sm:pb-28">
      <div className="print:hidden">
        <LegalTabs />
      </div>

      <header className="pt-12 pb-12 sm:pt-16">
        <h1 className="display-xl max-w-4xl">{title}</h1>
        <p className="lead-text mt-5 max-w-2xl">{summary}</p>
        <p className="eyebrow mt-5 text-muted-foreground">
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 print:hidden">
          <LegalToc items={toc} />
        </div>
        <article className="surface-card legal-prose max-w-[52rem] sm:!p-14 print:border-0 print:!p-0">
          {body}
        </article>
      </div>
    </div>
  );
}
