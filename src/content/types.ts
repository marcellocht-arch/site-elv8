/**
 * Types partagés par les fichiers de contenu.
 *
 * Mise en forme possible dans les textes :
 *   *mot*            → mot mis en valeur (cuivre, italique)
 *   [À COMPLÉTER …]  → emplacement signalé visuellement, à remplacer
 */

export type Seo = {
  /** Balise <title> : moins de 60 caractères. */
  title: string;
  /** Meta description : moins de 155 caractères. */
  description: string;
  /** Mot-clé principal + variantes (référence éditoriale, non affiché). */
  keywords: { primary: string; variants: string[] };
  /** Titre court affiché sur l'image Open Graph. */
  ogTitle?: string;
};

export type Faq = { q: string; a: string };

export type TitledText = { title: string; text: string };

export type Cta = { title: string; text: string; button?: string };

export type ServiceSignature = "branding" | "video" | "ads" | "web" | "community";

export type Video = { title: string; src: string; poster?: string; caption?: string };

export type ServiceContent = {
  slug: string;
  kind: "principal" | "complementaire";
  /** Nom court (menu, cartes). */
  name: string;
  /** Pilier dans la synergie (services principaux). */
  pillar?: string;
  /** Phrase courte (menu, cartes). */
  tagline: string;
  seo: Seo;
  hero: { eyebrow: string; h1: string; intro: string };
  /** Vidéo 9:16 affichée dans le hero (remplace le badge du pilier). */
  video?: Video;
  signature: ServiceSignature;
  problem: { title: string; paragraphs: string[]; points?: string[] };
  solution: { title: string; paragraphs: string[] };
  included: { title: string; intro?: string; items: TitledText[] };
  network?: { title: string; paragraphs: string[] };
  process: { title: string; steps: TitledText[] };
  forWho: { title: string; intro: string; profiles: TitledText[] };
  results: { title: string; paragraphs: string[]; points?: string[] };
  faq: Faq[];
  cta: Cta;
  /** Études de cas liées (slugs). */
  relatedCases: string[];
};

export type CaseStudyContent = {
  slug: string;
  client: string;
  sector: string;
  location: string;
  services: string[]; // slugs de services
  seo: Seo;
  hero: { eyebrow: string; h1: string; intro: string };
  /** Chiffres réels uniquement. Vide si aucun chiffre connu. */
  stats: { value: number; prefix?: string; suffix?: string; label: string; decimals?: number }[];
  context: string[];
  objective: string[];
  actions: TitledText[];
  results: { paragraphs: string[]; points?: string[] };
  videos: { title: string; src?: string; poster?: string; caption: string }[];
  testimonial?: { quote: string; author: string };
  cardSummary: string;
};

export type ZoneContent = {
  slug: string;
  name: string;
  /** Nom utilisé dans les phrases (« à Liège », « en province de Luxembourg »). */
  inName: string;
  seo: Seo;
  hero: { eyebrow: string; h1: string; intro: string };
  /** Portrait économique local. */
  economy: { title: string; paragraphs: string[] };
  /** Types d'entreprises accompagnées dans la zone. */
  businesses: { title: string; items: TitledText[] };
  /** Enjeux de visibilité propres à la zone. */
  challenges: { title: string; items: TitledText[] };
  /** Comment ELV8co travaille concrètement dans la zone. */
  approach: { title: string; paragraphs: string[] };
  communes: { title: string; list: string[]; note?: string };
  faq: Faq[];
  cta: Cta;
  /** Coordonnées approximatives (carte schématique du hub). */
  map: { x: number; y: number };
  cardSummary: string;
};

export type LegalSection = { title: string; paragraphs?: string[]; list?: string[] };
export type LegalContent = { seo: Seo; h1: string; updated: string; intro?: string; sections: LegalSection[] };
