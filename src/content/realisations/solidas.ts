import type { CaseStudyContent } from "../types";

/** Page /realisations/solidas — aucun chiffre connu : ne rien inventer. */
const content: CaseStudyContent = {
  slug: "solidas",
  client: "Solidas",
  sector: "Courtier en assurances",
  location: "[À COMPLÉTER : ville]",
  services: ["contenu-video"],
  seo: {
    title: "Solidas : vidéos pédagogiques d'assurance | ELV8co",
    description:
      "Étude de cas Solidas, courtier en assurances : des vidéos pédagogiques en motion design, comme « comment déclarer un sinistre ».",
    keywords: { primary: "motion design courtier assurances", variants: ["vidéo pédagogique assurance", "Solidas courtier", "vidéo explicative sinistre"] },
    ogTitle: "Solidas · vidéos pédagogiques",
  },
  hero: {
    eyebrow: "Étude de cas · Courtage en assurances",
    h1: "Solidas : rendre l'assurance *enfin claire*",
    intro:
      "L'assurance est un métier de confiance, mais aussi un sujet que la plupart des gens trouvent compliqué. Pour Solidas, courtier en assurances, nous avons créé des vidéos pédagogiques en motion design qui expliquent simplement les démarches que les assurés redoutent.",
  },
  stats: [],
  context: [
    "Solidas est un courtier en assurances. Dans ce métier, la relation se joue souvent au pire moment pour le client : un dégât des eaux, un accident, un vol. C'est précisément là qu'un bon courtier fait la différence, en expliquant, en rassurant et en accompagnant.",
    "[À COMPLÉTER : présentation de Solidas (localisation, ancienneté, type de clientèle) et situation de départ].",
  ],
  objective: [
    "Démontrer l'expertise et la disponibilité du courtier en répondant, en vidéo, aux questions que ses clients se posent le plus souvent.",
    "[À COMPLÉTER : objectif précis fixé avec Solidas].",
  ],
  actions: [
    { title: "Choix des sujets", text: "Identification des démarches et questions qui reviennent le plus souvent chez les assurés, comme la déclaration d'un sinistre." },
    { title: "Motion design pédagogique", text: "Des vidéos animées, au format vertical, qui décomposent chaque démarche en étapes simples et visuelles. Exemple : « comment déclarer un sinistre »." },
    { title: "Diffusion", text: "[À COMPLÉTER : canaux de diffusion utilisés (réseaux sociaux, site, envoi aux clients…)]." },
  ],
  results: {
    paragraphs: [
      "Des contenus utiles, réutilisables dans la durée, que le courtier peut partager à ses clients au moment où ils en ont besoin et publier sur ses réseaux pour démontrer son expertise.",
      "[À COMPLÉTER : résultats observés (retours clients, demandes, statistiques), uniquement s'ils sont vérifiables].",
    ],
  },
  videos: [
    { title: "Comment déclarer un sinistre", caption: "Vidéo pédagogique en motion design. [À COMPLÉTER : ajouter le fichier vidéo]" },
    { title: "Vidéo pédagogique n° 2", caption: "[À COMPLÉTER : titre et fichier vidéo]" },
    { title: "Vidéo pédagogique n° 3", caption: "[À COMPLÉTER : titre et fichier vidéo]" },
  ],
  testimonial: { quote: "[À COMPLÉTER : témoignage réel du client, avec son accord]", author: "[À COMPLÉTER : nom et fonction]" },
  cardSummary: "Des vidéos pédagogiques en motion design pour expliquer simplement les démarches d'assurance, comme la déclaration d'un sinistre.",
};

export default content;
