import type { Faq, Seo } from "./types";

/** Page d'accueil — tous les textes. */
export const home = {
  seo: {
    title: "ELV8co | Agence de visibilité locale à Liège",
    description:
      "Personal branding, vidéo verticale et publicité Meta & LinkedIn pour commerces, artisans et PME à Liège, Namur, Verviers et Luxembourg.",
    keywords: {
      primary: "agence marketing digital Liège",
      variants: ["agence personal branding Liège", "agence vidéo réseaux sociaux Liège", "agence publicité Meta Liège", "visibilité entreprise locale Wallonie"],
    },
    ogTitle: "Devenez visible. Attirez des clients.",
  } satisfies Seo,

  hero: {
    eyebrow: "Agence de visibilité locale à Liège",
    // « / » force un retour à la ligne sur grand écran
    h1: "Devenez *visible*. / Attirez des clients.",
    intro:
      "ELV8co aide les commerces, artisans, courtiers, restaurants, agences immobilières et PME à se faire connaître, et surtout à se faire choisir. Personal branding, vidéo verticale et publicité : trois leviers, une seule question. Est-ce que ça vous ramène des clients ?",
    primary: "Réserver un appel de 30 min",
    secondary: "Voir nos réalisations",
    scroll: "Défiler",
  },

  problem: {
    eyebrow: "Le problème",
    title: "Deux commerces, *même rue*.",
    intro: "Même qualité, mêmes prix, même emplacement. Pourtant, l'un est plein et l'autre attend ses clients.",
    left: {
      label: "Le commerce A",
      lines: [
        "Travaille très bien, depuis des années",
        "Compte sur le bouche-à-oreille",
        "Dernière publication : il y a huit mois",
        "Introuvable quand on cherche son métier sur Google",
      ],
      verdict: "On passe devant sans le voir.",
    },
    right: {
      label: "Le commerce B",
      lines: [
        "Le patron montre son métier en vidéo, chaque semaine",
        "Les habitants du quartier le reconnaissent",
        "Une publicité ciblée annonce chaque nouveauté",
        "Premier résultat quand on cherche son métier",
      ],
      verdict: "On entre, parce qu'on a l'impression de déjà le connaître.",
    },
    conclusion:
      "La différence n'est pas la qualité du travail. C'est la *visibilité*. Et la visibilité, ça se construit.",
  },

  services: {
    eyebrow: "Trois services principaux",
    title: "Trois leviers pour être *vu, reconnu, choisi*.",
    intro: "Chacun fonctionne seul. Ensemble, ils changent tout.",
    cta: "Découvrir",
  },

  synergy: {
    eyebrow: "La synergie",
    title: "Seuls, ils fonctionnent. *Ensemble*, ils changent tout.",
    pillars: [
      { name: "Confiance", service: "Personal branding", text: "On vous connaît, on vous reconnaît, on vous fait confiance." },
      { name: "Régularité", service: "Contenu vidéo", text: "On vous voit chaque semaine : vous êtes le premier à qui l'on pense." },
      { name: "Portée", service: "Publicité", text: "Les bonnes personnes vous découvrent, près de chez vous." },
    ],
    center: "Clients",
    conclusion:
      "Une publicité sans confiance coûte cher. Une marque personnelle sans régularité s'oublie. Un contenu régulier sans portée reste confidentiel. Réunis, les trois piliers se renforcent : c'est là que les clients arrivent.",
  },

  results: {
    eyebrow: "Résultats réels",
    title: "On ne mesure pas des vues. On compte des *clients*.",
    intro: "Des chiffres vérifiés, issus d'un projet réel : AKP Kustom, atelier textile à Liège.",
    stats: [
      { value: 24900, label: "vues en organique sur une seule vidéo" },
      { value: 20, suffix: " €", label: "investis en publicité" },
      { value: 780, suffix: " €", label: "de chiffre d'affaires généré" },
      { value: 39, suffix: "×", label: "la mise publicitaire" },
    ],
    note: "Et 2 clients signés. Aucun chiffre n'est arrondi ni inventé.",
    link: "Lire l'étude de cas",
  },

  cases: {
    eyebrow: "Études de cas",
    title: "Ils sont devenus *visibles*.",
    cta: "Toutes les réalisations",
  },

  complementary: {
    eyebrow: "Services complémentaires",
    title: "Et pour aller *plus loin*.",
    intro:
      "Pour les besoins qui dépassent nos trois piliers, nous pilotons des projets réalisés avec un réseau de freelances de confiance. Vous gardez un seul interlocuteur.",
  },

  showreel: {
    eyebrow: "En 30 secondes",
    title: "Trois leviers, *une seule* question.",
    text: "Personal branding, contenu vidéo et publicité : chacun fonctionne seul, mais c'est ensemble qu'ils ramènent des clients. La preuve en 30 secondes.",
    video: { title: "Les trois leviers ELV8co en 30 secondes", src: "/videos/elv8co-04-les-trois-ensemble.mp4", poster: "/images/elv8co-04-les-trois-ensemble.jpg" },
  },

  method: {
    eyebrow: "La méthode",
    title: "Simple, clair, *sans jargon*.",
    steps: [
      { title: "Appel de 30 minutes", text: "On écoute. Votre activité, vos clients, ce que vous avez déjà essayé. On vous dit franchement si on peut vous aider." },
      { title: "Diagnostic et plan", text: "On analyse votre présence actuelle et vos concurrents, puis on vous propose un plan d'action concret, avec des priorités." },
      { title: "Production et diffusion", text: "Tournages, montage, profils, campagnes : on s'occupe de tout, vous validez l'essentiel." },
      { title: "Mesure et ajustement", text: "On suit ce qui ramène vraiment des clients, et on ajuste. Chaque mois, on répond à la même question." },
    ],
  },

  zones: {
    eyebrow: "Zones d'intervention",
    title: "De Liège à *Arlon*.",
    intro: "Basés à Liège, nous accompagnons les entreprises de quatre zones que nous connaissons bien.",
    cta: "Toutes les zones",
  },

  faqTitle: "Questions *fréquentes*",
  faq: [
    { q: "Qu'est-ce qui différencie ELV8co d'une agence de communication classique ?", a: "Nous ne vendons pas de la visibilité pour la visibilité. Nos trois services (personal branding, vidéo verticale et publicité) sont pensés pour fonctionner ensemble, avec un seul objectif : vous ramener des clients. Et nous parlons clairement, sans jargon." },
    { q: "Avec quels types d'entreprises travaillez-vous ?", a: "Avec des entreprises locales : commerces, artisans, courtiers, restaurants, agences immobilières, professions libérales et PME, principalement à Liège, Namur, Verviers et en province de Luxembourg." },
    { q: "Faut-il prendre les trois services ?", a: "Non. Chaque service fonctionne seul, et nous commençons souvent par celui qui aura le plus d'impact pour vous. Mais c'est leur combinaison qui produit les meilleurs résultats : confiance, régularité et portée se renforcent." },
    { q: "Combien coûte un accompagnement ?", a: "Cela dépend de vos objectifs, du rythme de production et du budget publicitaire éventuel. Nos accompagnements sont sur devis, à partir de 300 € par mois. Après l'appel de 30 minutes, nous vous envoyons une proposition claire, sans engagement." },
    { q: "Combien de temps faut-il pour voir des résultats ?", a: "La publicité peut produire des demandes dès les premières semaines. Le personal branding et le contenu vidéo construisent une réputation qui se renforce sur plusieurs mois. Nous faisons des points réguliers pour mesurer ce qui fonctionne." },
    { q: "Je n'aime pas être filmé. Est-ce rédhibitoire ?", a: "Pas du tout. La plupart de nos clients n'aimaient pas ça au départ. Nous préparons les tournages, vous guidons et ne gardons que le meilleur. Et certains formats, comme le motion design, ne nécessitent pas d'apparaître à l'écran." },
  ] satisfies Faq[],

  cta: { title: "Prêt à devenir *visible* ?", text: "Un appel de 30 minutes suffit." },
};
