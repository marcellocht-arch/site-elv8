import type { Seo } from "./types";

/** Page /a-propos — tous les textes. */
export const about = {
  seo: {
    title: "À propos : agence de visibilité liégeoise | ELV8co",
    description:
      "ELV8co, agence liégeoise : notre vision, notre méthode en trois piliers et notre réseau de freelances pour le web et le community management.",
    keywords: { primary: "agence marketing Liège", variants: ["agence communication liégeoise", "ELV8co", "agence visibilité locale"] },
    ogTitle: "À propos d'ELV8co",
  } satisfies Seo,

  hero: {
    eyebrow: "À propos",
    h1: "Nous rendons visibles *ceux qui font* bien leur métier",
    intro:
      "ELV8co est une agence liégeoise qui aide les entreprises locales à devenir visibles et à attirer des clients. ELV8, comme « elevate » : élever votre présence, votre image et votre activité.",
  },

  manifesto:
    "Trop d'entreprises excellentes restent invisibles. Pas parce qu'elles travaillent mal, mais parce que personne ne les voit. Pendant ce temps, d'autres, parfois moins bonnes, prennent toute la place. Nous pensons que ce n'est pas une fatalité. Que la visibilité se construit, avec méthode, avec régularité, avec honnêteté. Et qu'elle doit se juger sur une seule chose : les *clients* qu'elle vous ramène.",

  story: {
    title: "L'agence",
    paragraphs: [
      "ELV8co est basée à Liège et travaille avec les entreprises de Liège, Namur, Verviers et de la province de Luxembourg. Nous accompagnons des commerces, des artisans, des courtiers, des restaurants, des agences immobilières et des PME.",
      "ELV8co est née en 2026. Son fondateur, Marcel Locht, a toujours voulu entreprendre, sans savoir tout de suite dans quel domaine : curieux, il aimait toucher à tout. Pendant ses études, il a commencé à aider gratuitement des commerçants de son quartier et des amis indépendants à se rendre visibles : quelques vidéos, une fiche Google mieux tenue, une première publicité.",
      "Il y a pris un vrai plaisir, et les résultats ont suivi. ELV8co est la suite logique : faire de cette envie d'aider les entreprises locales un vrai métier, avec la même proximité qu'au premier jour.",
    ],
    founder: {
      name: "Marcel Locht",
      role: "Fondateur",
      bio: "« J'ai toujours voulu entreprendre, et j'aime toucher à tout : la vidéo, la publicité, le web, le design. En aidant les commerçants de mon quartier, j'ai compris ce qui me plaisait vraiment : voir une entreprise locale gagner des clients grâce à ce qu'on a construit ensemble. »",
    },
  },

  vision: {
    title: "Notre vision",
    items: [
      { title: "Des clients, pas des vues", text: "Les vues, les « J'aime » et les abonnés sont des moyens. Nous mesurons ce qui compte vraiment pour vous : les demandes, les rendez-vous, les ventes." },
      { title: "La clarté avant tout", text: "Pas de jargon, pas de promesses floues. Nous expliquons ce que nous faisons, pourquoi, et ce que vous pouvez en attendre." },
      { title: "L'humain au centre", text: "Les entreprises locales se choisissent pour les personnes qui les font vivre. Nous mettons ces personnes en avant." },
      { title: "L'honnêteté", text: "Si un service n'est pas adapté à votre situation, nous vous le disons. Et nous n'affichons jamais de chiffres inventés." },
    ],
  },

  method: {
    title: "Notre méthode : *trois piliers*",
    intro: "Seuls, ils fonctionnent. Ensemble, ils changent tout.",
    pillars: [
      { name: "Confiance", service: "Personal branding", href: "/personal-branding", text: "Faire de vous le visage reconnu et respecté de votre entreprise." },
      { name: "Régularité", service: "Contenu vidéo vertical", href: "/contenu-video", text: "Être présent chaque semaine, avec des contenus qui ressemblent à votre travail." },
      { name: "Portée", service: "Publicité Meta & LinkedIn", href: "/publicite-meta-linkedin", text: "Faire découvrir votre entreprise aux bonnes personnes, près de chez vous." },
    ],
  },

  network: {
    title: "Notre réseau de *freelances*",
    paragraphs: [
      "Nous avons fait un choix : nous concentrer sur ce que nous faisons le mieux (personal branding, vidéo et publicité) et nous entourer de spécialistes pour le reste.",
      "Pour la création de sites web et le community management, nous travaillons avec un réseau restreint de freelances de confiance : développeurs, designers et community managers que nous connaissons et dont nous contrôlons le travail. ELV8co pilote chaque projet et reste votre interlocuteur unique.",
    ],
    roles: [
      { title: "Développeurs et designers web", text: "Pour des sites rapides, clairs et bien référencés.", href: "/creation-site-web" },
      { title: "Community managers", text: "Pour animer vos réseaux et répondre à vos messages au quotidien.", href: "/community-management" },
    ],
    join: "Vous êtes freelance et partagez notre exigence ? Écrivez-nous.",
  },

  cta: { title: "Faisons *connaissance*", text: "Un appel de 30 minutes, sans engagement." },
};
