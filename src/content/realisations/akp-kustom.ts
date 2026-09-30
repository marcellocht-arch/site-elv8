import type { CaseStudyContent } from "../types";

/** Page /realisations/akp-kustom — chiffres réels fournis par ELV8co, à ne pas modifier sans source. */
const content: CaseStudyContent = {
  slug: "akp-kustom",
  client: "AKP Kustom",
  sector: "Atelier textile",
  location: "Liège",
  services: ["contenu-video", "publicite-meta-linkedin"],
  seo: {
    title: "AKP Kustom : +100 000 vues et 39× la mise | ELV8co",
    description:
      "Étude de cas AKP Kustom, atelier textile à Liège : plus de 100 000 vues en organique et une publicité qui a rapporté 39 fois son coût, avec 2 clients signés.",
    keywords: { primary: "étude de cas vidéo atelier textile Liège", variants: ["AKP Kustom", "publicité Instagram atelier Liège", "vidéo virale entreprise Liège"] },
    ogTitle: "AKP Kustom · 39× la mise",
  },
  hero: {
    eyebrow: "Étude de cas · Atelier textile · Liège",
    h1: "AKP Kustom : *+100 000 vues* et une pub rentabilisée *39 fois*",
    intro:
      "Un atelier textile liégeois, un savoir-faire très visuel, et une question simple : comment le faire connaître au-delà du cercle de clients existants ? La réponse est passée par la vidéo verticale, puis par une publicité très ciblée.",
  },
  stats: [
    { value: 100000, prefix: "+", label: "vues cumulées en organique" },
    { value: 24900, label: "vues sur une seule vidéo" },
    { value: 39, suffix: "×", label: "chaque euro de publicité en a rapporté 39" },
    { value: 2, label: "clients signés dès le premier test" },
  ],
  context: [
    "AKP Kustom est un atelier liégeois de personnalisation textile et d'impression DTF. Son métier se prête parfaitement à la vidéo : la matière, les gestes, les étapes de fabrication et le résultat final sont visuels et satisfaisants à regarder.",
    "Comme beaucoup d'artisans, l'atelier dépendait largement du bouche-à-oreille.",
  ],
  objective: [
    "Faire découvrir l'atelier à un public plus large, principalement dans la région liégeoise, et transformer cette visibilité en commandes concrètes.",
  ],
  actions: [
    { title: "Contenu vidéo vertical", text: "Tournage et montage de vidéos courtes montrant le travail de l'atelier, pensées pour Instagram, TikTok et Facebook. L'une d'elles a atteint 24 900 vues en organique, sans aucun budget publicitaire." },
    { title: "Publicité Meta ciblée", text: "Un premier test publicitaire ciblé sur une audience précise, renvoyant vers un formulaire de demande simple (Tally), pour vérifier que la visibilité pouvait se transformer en ventes." },
    { title: "Suivi des résultats", text: "Mesure de ce qui compte : les demandes reçues, les clients signés et le chiffre d'affaires généré, pas seulement les vues." },
  ],
  results: {
    paragraphs: [
      "Les vidéos de l'atelier cumulent plus de 100 000 vues en organique, dont 24 900 pour la plus performante. Mais le résultat le plus parlant est ailleurs : dès le premier test publicitaire, chaque euro investi en a rapporté 39 en chiffre d'affaires, avec 2 clients signés.",
      "Ce cas illustre parfaitement notre approche : les vues sont un moyen, pas une fin. La vraie question reste de savoir si la visibilité ramène des clients. Ici, la réponse est oui.",
    ],
  },
  videos: [],
  cardSummary: "Plus de 100 000 vues en organique, et une publicité qui a rapporté 39 fois son coût dès le premier test.",
};

export default content;
