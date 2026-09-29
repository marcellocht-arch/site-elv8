import { Fragment, type ReactNode } from "react";

const TOKEN = /(\[À COMPLÉTER[^\]]*\]|\*[^*]+\*)/g;

/** Typographie française : espaces insécables (« ? ! : ; € × % », nombres) et apostrophes typographiques. */
export const frTypo = (s: string) =>
  s
    .replace(/ ([?!:;»€×%])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/(\d) (\d{3})/g, "$1\u00a0$2")
    .replace(/([A-Za-zÀ-ÿ])'([A-Za-zÀ-ÿ])/g, "$1’$2");

/**
 * Affiche un texte de contenu :
 *  - *mot*           → mis en valeur (cuivre, italique)
 *  - [À COMPLÉTER …] → pastille visible signalant une info manquante
 */
export function Txt({ children }: { children: string }): ReactNode {
  const parts = frTypo(children).split(TOKEN);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("[À COMPLÉTER")) {
      return (
        <mark key={i} className="todo" title="Information à compléter">
          {part}
        </mark>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="accent">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Paragraphes successifs. */
export function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i} className={className}>
          <Txt>{p}</Txt>
        </p>
      ))}
    </>
  );
}
