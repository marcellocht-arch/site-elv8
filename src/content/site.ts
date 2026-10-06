/**
 * Informations générales de l'agence : coordonnées, navigation, pied de page.
 * Tout ce qui apparaît sur toutes les pages se modifie ici.
 */
export const site = {
  name: "ELV8co",
  logo: "ELV8",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://elv8co.be").replace(/\/$/, ""),
  locale: "fr_BE",
  baseline: "Agence de visibilité locale à Liège",
  positioning: "Seuls, ils fonctionnent. Ensemble, ils changent tout.",
  hook: "Prêt à devenir visible ? Un appel de 30 minutes suffit.",
  defaultDescription:
    "ELV8co, agence liégeoise : personal branding, vidéo verticale et publicité Meta & LinkedIn pour attirer des clients à Liège, Namur, Verviers et Luxembourg.",

  contact: {
    email: "contact@elv8co.be",
    phoneDisplay: "+32 470 35 43 90",
    phoneHref: "tel:+32470354390",
    whatsapp: "https://wa.me/32470354390",
    /** Lien de prise de rendez-vous (Calendly, Cal.com…). Vide = renvoi vers /contact. */
    bookingUrl: "https://wa.me/32470354390?text=Bonjour%20ELV8co%2C%20j%27aimerais%20r%C3%A9server%20un%20appel%20de%2030%20minutes.",
  },

  /** Adresse et données légales (laisser vide ce qui ne doit pas être publié). */
  legal: {
    companyName: "",
    legalForm: "",
    bce: "",
    vat: "",
    street: "",
    postalCode: "",
    city: "Liège",
    country: "BE",
  },

  /** Réseaux sociaux : laissez vide ce qui n'existe pas encore. */
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
    tiktok: "",
  },

  areaServed: ["Liège", "Seraing", "Herstal", "Ans", "Huy", "Visé", "Namur", "Verviers", "Province de Luxembourg"],
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const nav = {
  services: {
    label: "Services",
    principal: [
      { label: "Personal branding", href: "/personal-branding", description: "Devenir la personne de confiance de votre secteur." },
      { label: "Contenu vidéo vertical", href: "/contenu-video", description: "Être présent chaque semaine, sans y passer vos soirées." },
      { label: "Publicité Meta & LinkedIn", href: "/publicite-meta-linkedin", description: "Toucher les bonnes personnes, près de chez vous." },
    ] satisfies NavLink[],
    complementaire: [
      { label: "Création de sites web", href: "/creation-site-web", description: "Un site qui transforme la visite en appel." },
      { label: "Community management", href: "/community-management", description: "Vos réseaux tenus, vos messages traités." },
    ] satisfies NavLink[],
  },
  main: [
    { label: "Offres", href: "/offres" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Zones", href: "/zones" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  cta: { label: "Réserver un appel", href: "/contact#formulaire" },
};

export const footer = {
  pitch: "Nous aidons les entreprises locales à devenir visibles et à attirer des clients. Pas des vues : des clients.",
  columns: [
    {
      title: "Services",
      links: [...nav.services.principal, ...nav.services.complementaire].map(({ label, href }) => ({ label, href })),
    },
    {
      title: "Zones",
      links: [
        { label: "Liège", href: "/zones/liege" },
        { label: "Namur", href: "/zones/namur" },
        { label: "Verviers", href: "/zones/verviers" },
        { label: "Province de Luxembourg", href: "/zones/province-de-luxembourg" },
      ],
    },
    {
      title: "Agence",
      links: [
        { label: "Nos formules", href: "/offres" },
        { label: "Réalisations", href: "/realisations" },
        { label: "Conseils", href: "/conseils" },
        { label: "À propos", href: "/a-propos" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
};

/** Options du champ « service souhaité » du formulaire. */
export const serviceOptions = [
  "Personal branding",
  "Contenu vidéo vertical",
  "Publicité Meta & LinkedIn",
  "Les 3 services combinés",
  "Formule Essentiel",
  "Formule Croissance",
  "Formule Pro",
  "Sur mesure",
  "Création de site web",
  "Community management",
  "Je ne sais pas encore",
] as const;

export const bookingHref = site.contact.bookingUrl || nav.cta.href;
