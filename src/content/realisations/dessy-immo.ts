import type { CaseStudyContent } from "../types";

/** Page /realisations/dessy-immo — mission d'audit, aucun chiffre publié. */
const content: CaseStudyContent = {
  slug: "dessy-immo",
  client: "Dessy Immo",
  sector: "Immobilier",
  location: "Liège",
  services: ["publicite-meta-linkedin"],
  seo: {
    title: "Dessy Immo : audit GEO et ciblage Meta | ELV8co",
    description:
      "Étude de cas Dessy Immo : un audit de visibilité GEO et du ciblage publicitaire Meta pour qu'une agence immobilière touche les bons vendeurs, au bon endroit.",
    keywords: { primary: "audit marketing agence immobilière", variants: ["ciblage publicité Meta immobilier", "Dessy Immo", "audit GEO immobilier"] },
    ogTitle: "Dessy Immo · audit",
  },
  hero: {
    eyebrow: "Étude de cas · Immobilier · Liège",
    h1: "Dessy Immo : un audit pour viser *juste*",
    intro:
      "Dans l'immobilier, la visibilité se joue bien avant la mise en vente : le jour où un propriétaire décide de vendre, il contacte l'agent auquel il pense en premier. Pour Dessy Immo, nous avons réalisé un audit GEO (visibilité dans les moteurs de recherche IA) et de ciblage publicitaire Meta.",
  },
  stats: [],
  context: [
    "Le marché immobilier local est très concurrentiel : de nombreuses agences se partagent les mêmes quartiers, et les propriétaires choisissent souvent l'agent qu'ils connaissent déjà, de nom ou de visage.",
    "Avant d'investir davantage en communication, il fallait savoir où en était l'agence, et si ses publicités touchaient vraiment les bonnes personnes.",
  ],
  objective: ["Obtenir un diagnostic clair de la visibilité de l'agence et des priorités concrètes pour mieux cibler ses publicités sur Facebook et Instagram."],
  actions: [
    { title: "Audit GEO", text: "Le GEO, c'est le référencement pour les moteurs de recherche à base d'intelligence artificielle (ChatGPT, Gemini, les réponses IA de Google…). Nous avons analysé comment l'agence y apparaît, et ce qu'il faut corriger pour qu'elle soit citée quand on cherche une agence immobilière." },
    { title: "Audit du ciblage Meta", text: "Revue des audiences, des zones géographiques et des annonces utilisées sur Facebook et Instagram, pour concentrer le budget sur les propriétaires et acheteurs réellement concernés." },
    { title: "Recommandations", text: "Un plan d'action clair et priorisé, que l'agence peut appliquer elle-même ou avec nous." },
  ],
  results: {
    paragraphs: [
      "Une vision claire de ce qui fonctionne, de ce qui freine la visibilité de l'agence et de la manière de mieux utiliser son budget publicitaire.",
    ],
  },
  videos: [],
  cardSummary: "Un audit GEO et de ciblage publicitaire Meta pour qu'une agence immobilière touche les bons propriétaires, au bon endroit.",
};

export default content;
