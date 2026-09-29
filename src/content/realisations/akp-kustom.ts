import type { CaseStudyContent } from "../types";

/** Page /realisations/akp-kustom — chiffres réels fournis par ELV8co, à ne pas modifier sans source. */
const content: CaseStudyContent = {
  slug: "akp-kustom",
  client: "AKP Kustom",
  sector: "Atelier textile",
  location: "Liège",
  services: ["contenu-video", "publicite-meta-linkedin"],
  seo: {
    title: "AKP Kustom : 20 € de pub, 780 € de CA | ELV8co",
    description:
      "Étude de cas AKP Kustom, atelier textile à Liège : une vidéo à 24 900 vues en organique et 20 € de publicité qui ont rapporté 780 € et 2 clients.",
    keywords: { primary: "étude de cas vidéo atelier textile Liège", variants: ["AKP Kustom", "publicité Instagram atelier Liège", "vidéo virale entreprise Liège"] },
    ogTitle: "AKP Kustom · 39× la mise",
  },
  hero: {
    eyebrow: "Étude de cas · Atelier textile · Liège",
    h1: "AKP Kustom : *20 €* de publicité, *780 €* de chiffre d'affaires",
    intro:
      "Un atelier textile liégeois, un savoir-faire très visuel, et une question simple : comment le faire connaître au-delà du cercle de clients existants ? La réponse est passée par la vidéo verticale, puis par un petit budget publicitaire très ciblé.",
  },
  stats: [
    { value: 24900, label: "vues sur une seule vidéo, en organique" },
    { value: 20, suffix: " €", label: "investis en publicité" },
    { value: 780, suffix: " €", label: "de chiffre d'affaires généré" },
    { value: 2, label: "clients signés" },
    { value: 39, suffix: "×", label: "la mise publicitaire" },
  ],
  context: [
    "AKP Kustom est un atelier textile basé à Liège. Son métier se prête parfaitement à la vidéo : la matière, les gestes, les étapes de fabrication et le résultat final sont visuels et satisfaisants à regarder.",
    "Comme beaucoup d'artisans, l'atelier dépendait largement du bouche-à-oreille. [À COMPLÉTER : situation de départ précise d'AKP Kustom (présence en ligne, nombre d'abonnés, canaux utilisés)].",
  ],
  objective: [
    "Faire découvrir l'atelier à un public plus large, principalement dans la région liégeoise, et transformer cette visibilité en commandes concrètes.",
    "[À COMPLÉTER : objectif chiffré éventuel fixé avec le client].",
  ],
  actions: [
    { title: "Contenu vidéo vertical", text: "Tournage et montage de vidéos courtes montrant le travail de l'atelier, pensées pour Instagram, TikTok et Facebook. L'une d'elles a atteint 24 900 vues en organique, sans aucun budget publicitaire." },
    { title: "Publicité Meta ciblée", text: "Une campagne avec un budget volontairement réduit (20 €), ciblée sur une audience précise, pour vérifier que la visibilité pouvait se transformer en ventes." },
    { title: "Suivi des résultats", text: "Mesure de ce qui compte : les demandes reçues, les clients signés et le chiffre d'affaires généré, pas seulement les vues." },
  ],
  results: {
    paragraphs: [
      "La vidéo la plus performante a été vue 24 900 fois en organique. Mais le résultat le plus parlant est ailleurs : 20 € investis en publicité ont généré 780 € de chiffre d'affaires et 2 clients signés, soit 39 fois la mise.",
      "Ce cas illustre parfaitement notre approche : les vues sont un moyen, pas une fin. La vraie question reste de savoir si la visibilité ramène des clients. Ici, la réponse est oui.",
    ],
  },
  videos: [
    { title: "Vidéo à 24 900 vues", caption: "La vidéo organique la plus vue. [À COMPLÉTER : ajouter le fichier vidéo]" },
    { title: "Annonce publicitaire", caption: "La vidéo utilisée pour la campagne à 20 €. [À COMPLÉTER : confirmer et ajouter le fichier]" },
    { title: "Coulisses de l'atelier", caption: "[À COMPLÉTER : titre et fichier vidéo]" },
  ],
  testimonial: { quote: "[À COMPLÉTER : témoignage réel du client, avec son accord]", author: "[À COMPLÉTER : nom et fonction]" },
  cardSummary: "Une vidéo à 24 900 vues en organique, puis 20 € de publicité transformés en 780 € de chiffre d'affaires.",
};

export default content;
