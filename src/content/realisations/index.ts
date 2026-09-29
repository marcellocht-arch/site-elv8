import akp from "./akp-kustom";
import solidas from "./solidas";
import dessy from "./dessy-immo";
import type { Seo } from "../types";

export const caseStudies = [akp, solidas, dessy];
export const caseBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);

/** Page /realisations (hub). */
export const realisationsHub = {
  seo: {
    title: "Réalisations et études de cas | ELV8co Liège",
    description:
      "Études de cas ELV8co : vidéos verticales, motion design et publicité Meta pour des entreprises locales. Des résultats concrets, sans chiffres inventés.",
    keywords: { primary: "études de cas agence marketing Liège", variants: ["réalisations agence vidéo Liège", "résultats publicité Meta Liège"] },
    ogTitle: "Réalisations",
  } satisfies Seo,
  hero: {
    eyebrow: "Réalisations",
    h1: "Des clients, *pas* des vues",
    intro:
      "Chaque projet est jugé sur la même question : est-ce que ça ramène des clients ? Voici ce que nous avons réalisé, avec les chiffres réels quand ils existent, et rien d'inventé quand ils n'existent pas.",
  },
  honesty:
    "Nos études de cas ne contiennent que des chiffres vérifiés. Quand un résultat n'est pas mesuré, nous ne l'affichons pas.",
};
