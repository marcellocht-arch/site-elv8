import type { CaseStudyContent } from "../types";

/** Page /realisations/solidas — chiffres fournis par ELV8co, à ne pas modifier sans source. */
const content: CaseStudyContent = {
  slug: "solidas",
  client: "Solidas",
  sector: "Courtier en assurances",
  location: "[À COMPLÉTER : ville]",
  services: ["contenu-video", "personal-branding", "publicite-meta-linkedin"],
  seo: {
    title: "Solidas : vidéos et publicité pour un courtier | ELV8co",
    description:
      "Étude de cas Solidas, courtier en assurances : motion design pédagogique, vidéos de personal branding et un tunnel Meta qui signe un contrat obsèques par mois.",
    keywords: { primary: "marketing courtier assurances", variants: ["motion design assurance", "Solidas courtier", "publicité Meta assurance obsèques"] },
    ogTitle: "Solidas · 1 contrat par mois",
  },
  hero: {
    eyebrow: "Étude de cas · Courtage en assurances",
    h1: "Solidas : rendre l'assurance *claire*, et la faire *choisir*",
    intro:
      "L'assurance est un métier de confiance, mais aussi un sujet que la plupart des gens trouvent compliqué. Pour Solidas, nous avons combiné motion design pédagogique, vidéos de personal branding au nom de l'entreprise et un tunnel publicitaire dédié à l'assurance obsèques.",
  },
  stats: [
    { value: 1, label: "contrat obsèques signé par mois en moyenne" },
    { value: 60, suffix: " €", label: "de publicité Meta par mois" },
  ],
  context: [
    "Solidas est un courtier en assurances. Dans ce métier, la relation se joue souvent au pire moment pour le client : un dégât des eaux, un accident, un décès. C'est précisément là qu'un bon courtier fait la différence, en expliquant, en rassurant et en accompagnant.",
    "Encore faut-il que les clients sachent qui est derrière l'entreprise, et qu'ils pensent à elle au bon moment.",
  ],
  objective: [
    "Démontrer l'expertise et la disponibilité du courtier en répondant, en vidéo, aux questions que ses clients se posent le plus souvent.",
    "Générer régulièrement de nouveaux contrats d'assurance obsèques avec un petit budget publicitaire maîtrisé.",
  ],
  actions: [
    { title: "Motion design pédagogique", text: "Des vidéos animées, au format vertical, qui décomposent les démarches que les assurés redoutent en étapes simples et visuelles. Exemple : « comment déclarer un sinistre »." },
    { title: "Personal branding", text: "Des vidéos au nom de l'entreprise pour mettre un visage et une voix sur Solidas, et installer la confiance avant même le premier contact." },
    { title: "Tunnel publicitaire Meta", text: "Une campagne Facebook et Instagram dédiée à l'assurance obsèques, qui renvoie vers un formulaire de demande simple (Tally). Chaque demande arrive directement chez le courtier." },
  ],
  results: {
    paragraphs: [
      "Avec environ 60 € de publicité par mois, le tunnel dédié à l'assurance obsèques permet de signer en moyenne un nouveau contrat chaque mois.",
      "À côté, les vidéos pédagogiques restent utiles dans la durée : le courtier peut les partager à ses clients au moment où ils en ont besoin et les publier sur ses réseaux pour démontrer son expertise.",
    ],
  },
  videos: [],
  cardSummary: "Motion design, vidéos de personal branding et un tunnel Meta à 60 € par mois qui signe un contrat obsèques par mois.",
};

export default content;
