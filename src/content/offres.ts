import type { Faq, Seo } from "./types";

/** Page /offres — formules d'accompagnement (sans prix : tout est sur devis). */
export type Pack = {
  id: string;
  name: string;
  tagline: string;
  forWho: string;
  /** Rappel de la formule précédente (« Tout Essentiel, plus : »). */
  base?: string;
  features: string[];
  highlight?: boolean;
};

export const offres = {
  seo: {
    title: "Nos formules : Essentiel, Croissance, Pro | ELV8co Liège",
    description:
      "Formules d'accompagnement ELV8co sur devis : vidéo courte, personal branding et publicité Meta, avec Instagram, Facebook, TikTok et LinkedIn gérés.",
    keywords: {
      primary: "agence réseaux sociaux Liège tarifs",
      variants: ["formule community management Liège", "pack vidéo réseaux sociaux entreprise", "agence marketing Liège devis", "gestion réseaux sociaux PME Liège"],
    },
    ogTitle: "Nos formules",
  } satisfies Seo,

  hero: {
    eyebrow: "Nos formules",
    h1: "Une formule *pour chaque étape* de votre visibilité",
    intro:
      "Chaque accompagnement est sur devis. Le nombre de vidéos et le rythme de publication se décident ensemble, après un premier appel de 30 minutes. Dans toutes les formules, nous gérons vos quatre réseaux : Instagram, Facebook, TikTok et LinkedIn.",
  },

  allIncluded: {
    title: "Dans *toutes* les formules",
    items: [
      { title: "Vos 4 réseaux gérés", text: "Instagram, Facebook, TikTok et LinkedIn : une fois le contenu tourné, autant qu'il travaille partout." },
      { title: "Tournage chez vous", text: "Nous venons sur place, dans votre commerce, votre atelier ou sur vos chantiers. Vous n'avez rien à préparer." },
      { title: "Montage professionnel", text: "Format vertical, sous-titres, rythme : des vidéos pensées pour être regardées jusqu'au bout." },
      { title: "Un rythme sur mesure", text: "Le nombre de vidéos et la fréquence de publication sont fixés ensemble, selon votre activité et votre temps." },
    ],
  },

  packs: [
    {
      id: "essentiel",
      name: "Essentiel",
      tagline: "Être présent, simplement.",
      forWho: "Pour les commerces et indépendants qui veulent enfin exister sur les réseaux, sans y passer leurs soirées.",
      features: [
        "Une demi-journée de tournage par mois",
        "Vidéos courtes montées, en nombre convenu ensemble",
        "Publication sur Instagram, Facebook, TikTok et LinkedIn",
        "Optimisation de votre fiche Google",
        "Un bilan chaque mois",
      ],
    },
    {
      id: "croissance",
      name: "Croissance",
      tagline: "Être choisi, pas seulement vu.",
      forWho: "Pour les entreprises qui veulent transformer leur visibilité en demandes concrètes.",
      base: "Tout Essentiel, plus :",
      features: [
        "Une ligne éditoriale de personal branding",
        "Une campagne de publicité Meta pilotée",
        "Le suivi de votre fiche Google : publications et avis",
        "Un bilan mensuel avec appel",
      ],
      highlight: true,
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "Devenir la référence locale.",
      forWho: "Pour celles et ceux qui veulent occuper le terrain et devenir le nom qu'on cite dans leur secteur.",
      base: "Tout Croissance, plus :",
      features: [
        "Deux demi-journées de tournage par mois",
        "Une stratégie de personal branding complète",
        "Plusieurs campagnes Meta, avec reciblage",
        "La gestion de vos messages et commentaires",
        "Des vidéos en motion design pour vos temps forts",
      ],
    },
    {
      id: "sur-mesure",
      name: "Sur mesure",
      tagline: "Un besoin précis ? On le construit.",
      forWho: "Pour un projet ponctuel, ou en complément d'une formule.",
      features: [
        "Site vitrine, livré en 2 jours à 2 semaines",
        "Audit de visibilité : référencement Google et moteurs IA",
        "Vidéos en motion design",
        "Campagne publicitaire ponctuelle",
        "Cartes de visite et supports imprimés",
      ],
    },
  ] satisfies Pack[],

  /** Tableau comparatif (true = inclus, string = précision). */
  compare: {
    columns: ["Essentiel", "Croissance", "Pro"],
    rows: [
      { label: "Tournage chez vous", values: ["1 demi-journée / mois", "1 demi-journée / mois", "2 demi-journées / mois"] },
      { label: "Vidéos courtes montées", values: ["Selon le rythme convenu", "Selon le rythme convenu", "Selon le rythme convenu"] },
      { label: "Instagram, Facebook, TikTok, LinkedIn", values: [true, true, true] },
      { label: "Fiche Google", values: ["Optimisation", "Optimisation et suivi", "Optimisation et suivi"] },
      { label: "Personal branding", values: [false, "Ligne éditoriale", "Stratégie complète"] },
      { label: "Publicité Meta", values: [false, "1 campagne", "Campagnes et reciblage"] },
      { label: "Messages et commentaires", values: [false, false, true] },
      { label: "Motion design", values: [false, false, true] },
      { label: "Bilan", values: ["Mensuel", "Mensuel et appel", "Mensuel et appel"] },
    ] as { label: string; values: (boolean | string)[] }[],
  },

  start: {
    title: "Pour commencer : *deux semaines offertes*",
    text: "Avant de choisir une formule, vous pouvez juger sur pièce : nous tournons chez vous, montons trois vidéos prêtes à publier et regardons ensemble les résultats. Sans engagement.",
  },

  faq: [
    { q: "Pourquoi les prix ne sont-ils pas affichés ?", a: "Parce que deux entreprises n'ont jamais exactement les mêmes besoins. Le nombre de vidéos, le rythme de publication et le budget publicitaire changent tout. Après l'appel de 30 minutes, vous recevez une proposition claire et chiffrée, sans engagement." },
    { q: "Combien de vidéos par mois ?", a: "Nous le décidons ensemble après l'appel, selon votre activité, vos objectifs et le temps dont vous disposez. Une demi-journée de tournage permet en général de produire plusieurs semaines de contenu." },
    { q: "Le budget publicitaire est-il compris ?", a: "Non. Le budget de diffusion est payé directement à Meta, ce qui vous garde la main. Nous vous conseillons sur le montant de départ et le faisons évoluer selon les résultats." },
    { q: "Pourquoi gérer les quatre réseaux dans chaque formule ?", a: "Une fois le contenu tourné et monté, le publier sur Instagram, Facebook, TikTok et LinkedIn multiplie sa portée pour un effort minime. Chaque réseau touche un public différent : autant en profiter." },
    { q: "Peut-on changer de formule en cours de route ?", a: "Oui. La formule évolue avec vous : nous en reparlons à chaque bilan, pour monter en puissance ou alléger selon votre activité." },
    { q: "Je veux seulement un site ou une vidéo ponctuelle. C'est possible ?", a: "Bien sûr, c'est l'objet de la formule Sur mesure : site vitrine, motion design, audit de visibilité ou campagne ponctuelle, avec ou sans accompagnement mensuel." },
  ] satisfies Faq[],

  cta: { title: "Quelle formule *pour vous* ?", text: "Un appel de 30 minutes pour en parler, et une proposition claire ensuite." },
};
