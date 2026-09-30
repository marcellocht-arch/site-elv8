import { Fragment, type ElementType, type ReactNode } from "react";
import { frTypo } from "@/components/ui/RichText";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Index de départ (pour enchaîner plusieurs lignes). */
  startIndex?: number;
};

/**
 * Titre révélé mot par mot avec des masques (animation CSS, sans attendre le JS :
 * lisible immédiatement par Google et rapide à l'affichage).
 * La syntaxe *mot* ou *plusieurs mots* met en valeur (cuivre italique).
 * Un « / » isolé force un retour à la ligne (à partir de la tablette).
 */
export function HeroTitle({ text, as: Tag = "h1", className = "", id, startIndex = 0 }: Props) {
  let accent = false;
  let idx = startIndex;
  // Découpe sur les espaces normales uniquement : les insécables restent collées au mot
  const chunks = frTypo(text).split(/ +/).filter(Boolean);

  return (
    <Tag className={className} id={id}>
      {chunks.map((chunk, c) => {
        if (chunk === "/") return <br key={c} className="hidden md:block" />;
        // Découpe le mot selon les astérisques : chaque bascule change l'état « mis en valeur »
        const parts: ReactNode[] = [];
        chunk.split("*").forEach((seg, k) => {
          if (k > 0) accent = !accent;
          if (!seg) return;
          parts.push(accent ? <span key={k} className="accent">{seg}</span> : <Fragment key={k}>{seg}</Fragment>);
        });
        const i = idx++;
        return (
          <Fragment key={c}>
            <span className="hw">
              <span style={{ ["--i" as string]: i }}>{parts}</span>
            </span>{" "}
          </Fragment>
        );
      })}
    </Tag>
  );
}
