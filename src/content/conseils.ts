import type { Faq, Seo } from "./types";

/** Articles de conseils (/conseils) : contenus éditoriaux pour le référencement local et IA. */
export type ArticleSection = { h2: string; paragraphs: string[]; list?: string[] };
export type Article = {
  slug: string;
  title: string;
  seo: Seo;
  excerpt: string;
  /** Date de publication (AAAA-MM-JJ). */
  date: string;
  readMinutes: number;
  category: string;
  intro: string;
  sections: ArticleSection[];
  faq?: Faq[];
  /** Service le plus lié (slug), pour le lien en fin d'article. */
  related: { label: string; href: string };
};

export const conseilsHub = {
  seo: {
    title: "Conseils visibilité locale pour commerces | ELV8co Liège",
    description:
      "Conseils concrets pour les commerces, artisans et indépendants de Liège : vidéo courte, réseaux sociaux, fiche Google et référencement IA.",
    keywords: { primary: "conseils marketing commerce local", variants: ["se faire connaître commerce Liège", "réseaux sociaux artisan conseils", "fiche Google conseils"] },
    ogTitle: "Conseils",
  } satisfies Seo,
  hero: {
    eyebrow: "Conseils",
    h1: "Des conseils *concrets* pour être vu près de chez vous",
    intro: "Vidéo courte, réseaux sociaux, fiche Google, référencement IA : ce qui marche vraiment pour un commerce ou un indépendant, expliqué simplement.",
  },
};

export const conseils: Article[] = [
  {
    slug: "faire-connaitre-son-commerce-a-liege",
    title: "Comment faire connaître son commerce à Liège : 7 actions concrètes",
    category: "Visibilité locale",
    date: "2026-10-06",
    readMinutes: 6,
    seo: {
      title: "Faire connaître son commerce à Liège : 7 actions | ELV8co",
      description: "Fiche Google, vidéo courte, publicité locale, personal branding : 7 actions concrètes pour faire connaître un commerce ou une entreprise à Liège.",
      keywords: { primary: "faire connaître son commerce Liège", variants: ["visibilité commerce local", "attirer clients commerce Liège", "marketing commerce de proximité"] },
      ogTitle: "Faire connaître son commerce à Liège",
    },
    excerpt: "Les clients ne peuvent pas choisir un commerce qu'ils ne connaissent pas. Voici sept actions simples, dans le bon ordre, pour devenir visible localement.",
    intro:
      "Un bon produit et un bon accueil ne suffisent plus : avant de pousser une porte, la plupart des clients cherchent, comparent et regardent. Bonne nouvelle : pour un commerce local, quelques actions bien menées suffisent à faire une vraie différence. Voici les sept que nous recommandons, dans l'ordre.",
    sections: [
      {
        h2: "1. Soigner sa fiche Google",
        paragraphs: [
          "C'est souvent le premier contact entre un client et votre commerce : une recherche « boulangerie près de moi » ou « garage Ans » affiche d'abord la carte et les fiches Google. Une fiche complète, avec des horaires à jour, de vraies photos et des réponses aux avis, inspire immédiatement confiance.",
        ],
      },
      {
        h2: "2. Montrer les visages derrière le comptoir",
        paragraphs: [
          "Entre deux commerces qui vendent la même chose, on choisit celui dont on connaît le patron. Se montrer en vidéo, raconter son parcours et son savoir-faire, c'est ce qu'on appelle le personal branding. C'est l'avantage que les grandes enseignes ne pourront jamais copier.",
        ],
      },
      {
        h2: "3. Publier des vidéos courtes, régulièrement",
        paragraphs: [
          "Les vidéos verticales (Reels, TikTok, Shorts) sont aujourd'hui le format le plus diffusé par les réseaux. Inutile de publier tous les jours : mieux vaut un rythme tenu dans la durée qu'une semaine intense puis plus rien.",
          "L'astuce pour tenir le rythme : regrouper les tournages. Une demi-journée bien préparée permet de produire plusieurs semaines de contenu.",
        ],
      },
      {
        h2: "4. Être présent sur plusieurs réseaux",
        paragraphs: [
          "Une même vidéo peut être publiée sur Instagram, Facebook, TikTok et LinkedIn. Chaque réseau touche un public différent : les plus jeunes sur TikTok, les habitants du quartier sur Facebook, les professionnels sur LinkedIn.",
        ],
      },
      {
        h2: "5. Cibler une publicité autour de chez vous",
        paragraphs: [
          "La publicité Facebook et Instagram permet de toucher les personnes qui vivent ou travaillent dans un rayon précis autour de votre adresse. Avec un petit budget de test, on mesure vite ce qui fonctionne avant d'investir davantage.",
        ],
      },
      {
        h2: "6. Faire parler ses clients",
        paragraphs: [
          "Demandez un avis Google à vos clients satisfaits, répondez à chaque avis, partagez leurs retours. La recommandation reste le premier moteur du commerce local, et elle se joue désormais aussi en ligne.",
        ],
      },
      {
        h2: "7. Mesurer et ajuster",
        paragraphs: [
          "Chaque mois, posez-vous une seule question : est-ce que ça ramène des clients ? Appels, messages, demandes de devis, passages en boutique : ce sont ces chiffres-là qui comptent, pas les likes.",
        ],
      },
    ],
    faq: [
      { q: "Par quoi commencer quand on n'a jamais communiqué ?", a: "Par la fiche Google, puis par quelques vidéos qui montrent votre commerce et votre équipe. Ce sont les deux actions qui produisent le plus d'effet pour le moins d'effort." },
      { q: "Faut-il un gros budget ?", a: "Non. L'essentiel est la régularité. La publicité peut commencer avec un budget test modeste, ajusté ensuite selon les résultats." },
    ],
    related: { label: "Découvrir nos formules", href: "/offres" },
  },
  {
    slug: "reels-tiktok-facebook-quel-reseau-commerce-local",
    title: "Reels, TikTok ou Facebook : quel réseau pour un commerce local ?",
    category: "Réseaux sociaux",
    date: "2026-10-06",
    readMinutes: 5,
    seo: {
      title: "Reels, TikTok ou Facebook : quel réseau choisir ? | ELV8co",
      description: "Instagram, TikTok, Facebook ou LinkedIn : quel réseau social choisir pour un commerce, un artisan ou un indépendant à Liège ? Nos conseils.",
      keywords: { primary: "quel réseau social pour commerce local", variants: ["TikTok pour artisan", "Instagram Reels commerce", "Facebook commerce local"] },
      ogTitle: "Reels, TikTok ou Facebook ?",
    },
    excerpt: "Chaque réseau a son public. Bonne nouvelle : avec la vidéo verticale, un seul tournage peut les nourrir tous.",
    intro:
      "« Je dois être sur TikTok ? » C'est l'une des questions qu'on nous pose le plus. La réponse courte : il ne faut pas choisir. La réponse longue, réseau par réseau, la voici.",
    sections: [
      {
        h2: "Facebook : le réseau des habitants",
        paragraphs: [
          "Facebook reste incontournable pour toucher une clientèle locale et familiale. Les groupes de quartier et de commune y font circuler les recommandations. C'est aussi là que la publicité locale est la plus simple à cibler.",
        ],
      },
      {
        h2: "Instagram : la vitrine visuelle",
        paragraphs: [
          "Instagram est idéal pour les commerces qui ont quelque chose à montrer : restauration, mode, beauté, décoration, artisanat. Les Reels y sont le format le plus mis en avant.",
        ],
      },
      {
        h2: "TikTok : la portée, même sans abonnés",
        paragraphs: [
          "TikTok peut montrer une vidéo à beaucoup de monde même quand le compte débute. Les coulisses, les avant/après et les démonstrations y fonctionnent particulièrement bien. C'est aussi le réseau où se trouve une grande partie des moins de 30 ans.",
        ],
      },
      {
        h2: "LinkedIn : la crédibilité professionnelle",
        paragraphs: [
          "Pour les courtiers, agents immobiliers, entreprises du bâtiment ou PME qui travaillent avec d'autres professionnels, LinkedIn renforce la crédibilité et aide à recruter.",
        ],
      },
      {
        h2: "La solution : tourner une fois, publier partout",
        paragraphs: [
          "Une vidéo verticale bien montée peut être publiée sur les quatre réseaux, avec un texte adapté à chacun. C'est la méthode la plus efficace pour un commerce qui n'a pas de temps à perdre : un seul tournage, quatre publics.",
        ],
        list: ["Facebook pour les habitants et la publicité locale", "Instagram pour la vitrine", "TikTok pour la portée", "LinkedIn pour la crédibilité"],
      },
    ],
    faq: [
      { q: "TikTok, est-ce sérieux pour une entreprise ?", a: "Oui, à condition d'y publier des contenus authentiques : coulisses, savoir-faire, conseils. Le réseau touche aujourd'hui un public bien plus large que les adolescents." },
      { q: "Faut-il adapter chaque vidéo à chaque réseau ?", a: "Le format vertical convient aux quatre. On adapte surtout le texte, les hashtags et parfois la durée." },
    ],
    related: { label: "Notre service de contenu vidéo", href: "/contenu-video" },
  },
  {
    slug: "fiche-google-reglages-commerce-local",
    title: "Fiche Google : 8 réglages pour être trouvé près de chez vous",
    category: "Google",
    date: "2026-10-06",
    readMinutes: 5,
    seo: {
      title: "Fiche Google Business : 8 réglages essentiels | ELV8co",
      description: "Catégories, photos, avis, publications : 8 réglages simples de votre fiche Google Business Profile pour être trouvé par les clients de votre région.",
      keywords: { primary: "optimiser fiche Google Business", variants: ["fiche Google commerce", "Google Business Profile conseils", "référencement local Google Liège"] },
      ogTitle: "Fiche Google : 8 réglages",
    },
    excerpt: "Votre fiche Google est souvent vue avant votre site. Huit réglages simples pour qu'elle travaille pour vous.",
    intro:
      "Quand un client cherche un service près de chez lui, Google affiche d'abord une carte et quelques fiches d'établissements. Être dans ces premiers résultats ne dépend pas que de la chance : voici les huit réglages que nous vérifions systématiquement.",
    sections: [
      { h2: "1. La bonne catégorie principale", paragraphs: ["C'est le réglage le plus important. Choisissez la catégorie qui décrit le plus précisément votre activité, puis ajoutez quelques catégories secondaires pertinentes."] },
      { h2: "2. Un nom sans mots-clés ajoutés", paragraphs: ["Utilisez le vrai nom de votre établissement. Ajouter des mots-clés au nom est contraire aux règles de Google et peut entraîner une suspension."] },
      { h2: "3. Des horaires toujours à jour", paragraphs: ["Pensez aux horaires exceptionnels : jours fériés, congés, fêtes. Un client qui trouve porte close ne revient pas."] },
      { h2: "4. Une zone desservie si vous vous déplacez", paragraphs: ["Artisans et prestataires qui travaillent chez le client peuvent masquer leur adresse et indiquer les communes desservies."] },
      { h2: "5. De vraies photos, régulièrement", paragraphs: ["Votre équipe, vos locaux, vos réalisations : des photos authentiques et récentes rassurent bien plus qu'une image de banque d'images. Les vidéos courtes sont aussi acceptées."] },
      { h2: "6. Des avis, et des réponses", paragraphs: ["Demandez un avis à chaque client satisfait et répondez à tous, y compris aux critiques, avec calme et courtoisie. Les futurs clients lisent les réponses autant que les avis."] },
      { h2: "7. Des publications", paragraphs: ["Nouveautés, offres, événements : publier de temps en temps montre que l'établissement est actif."] },
      { h2: "8. Un lien vers votre site et votre prise de contact", paragraphs: ["Ajoutez votre site et le moyen de contact que vous préférez réellement, par exemple WhatsApp, pour transformer la visite en demande."] },
    ],
    related: { label: "Voir la formule Essentiel", href: "/offres#essentiel" },
  },
  {
    slug: "referencement-ia-chatgpt-entreprise-locale",
    title: "Être recommandé par ChatGPT : le référencement IA expliqué aux indépendants",
    category: "Référencement IA",
    date: "2026-10-06",
    readMinutes: 5,
    seo: {
      title: "Référencement IA (GEO) pour entreprises locales | ELV8co",
      description: "ChatGPT, Perplexity, Gemini : comment une entreprise locale peut être citée par les moteurs de recherche IA. Le GEO expliqué simplement.",
      keywords: { primary: "référencement IA entreprise locale", variants: ["GEO generative engine optimization", "être cité par ChatGPT", "SEO IA Liège"] },
      ogTitle: "Être recommandé par ChatGPT",
    },
    excerpt: "De plus en plus de clients demandent conseil à une IA plutôt qu'à Google. Comment faire partie des réponses ?",
    intro:
      "« Quel bon électricien près de Herstal ? » Cette question, de plus en plus de gens la posent à ChatGPT, Perplexity ou Gemini. Ces assistants ne listent pas dix liens : ils citent quelques noms. Le référencement IA, parfois appelé GEO, consiste à augmenter vos chances d'en faire partie.",
    sections: [
      {
        h2: "Comment une IA choisit-elle qui recommander ?",
        paragraphs: [
          "Les assistants IA s'appuient sur ce qu'ils trouvent en ligne : votre site, votre fiche Google, les annuaires, les avis, les articles qui parlent de vous. Plus ces informations sont claires, cohérentes et répétées à plusieurs endroits, plus l'IA peut vous citer avec confiance.",
        ],
      },
      {
        h2: "Les bases à mettre en place",
        paragraphs: ["Bonne nouvelle : ce qui aide les IA aide aussi Google. Les fondations sont les mêmes."],
        list: [
          "Un site qui dit clairement qui vous êtes, ce que vous faites et où",
          "Les mêmes nom, adresse et téléphone partout en ligne",
          "Une fiche Google complète et des avis réguliers",
          "Une page de questions fréquentes, rédigée simplement",
          "Des données structurées sur votre site, lisibles par les machines",
        ],
      },
      {
        h2: "Le contenu qui fait la différence",
        paragraphs: [
          "Les IA aiment les réponses précises. Des pages qui expliquent vos services commune par commune, des conseils concrets dans votre domaine, des études de cas avec des faits vérifiables : tout cela augmente la probabilité d'être cité.",
        ],
      },
      {
        h2: "Et la vidéo dans tout ça ?",
        paragraphs: [
          "Une présence active sur les réseaux renforce votre notoriété, et donc le nombre de mentions de votre entreprise en ligne. Vidéo, fiche Google et site travaillent ensemble.",
        ],
      },
    ],
    faq: [
      { q: "Le référencement IA remplace-t-il le SEO classique ?", a: "Non, il le prolonge. Les mêmes fondations (site clair, fiche Google, avis, contenu utile) servent aux deux." },
      { q: "Peut-on garantir d'être cité par ChatGPT ?", a: "Non, personne ne peut le garantir. On peut en revanche mettre toutes les chances de son côté avec des informations claires et cohérentes." },
    ],
    related: { label: "Demander un audit de visibilité", href: "/offres#sur-mesure" },
  },
];

export const articleBySlug = (slug: string) => conseils.find((a) => a.slug === slug);
