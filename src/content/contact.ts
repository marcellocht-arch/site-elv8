import type { Seo } from "./types";

/** Page /contact — tous les textes. */
export const contact = {
  seo: {
    title: "Contact : réservez un appel de 30 min | ELV8co",
    description:
      "Contactez ELV8co à Liège : réservez un appel de 30 minutes pour parler de votre visibilité. E-mail, téléphone, WhatsApp ou formulaire.",
    keywords: { primary: "contact agence marketing Liège", variants: ["rendez-vous agence communication Liège", "ELV8co contact"] },
    ogTitle: "Prêt à devenir visible ?",
  } satisfies Seo,
  hero: {
    eyebrow: "Contact",
    h1: "Prêt à devenir *visible* ?",
    intro: "Un appel de 30 minutes suffit. Dites-nous en quelques mots où vous en êtes : nous revenons vers vous rapidement pour fixer un moment.",
  },
  formTitle: "Parlez-nous de votre projet",
  formIntro: "Plus vous nous en dites, plus l'appel sera utile. Mais quelques lignes suffisent.",
  expect: {
    title: "Ce qui se passe ensuite",
    steps: [
      "Nous lisons votre message personnellement.",
      "Nous vous recontactons pour fixer un appel de 30 minutes.",
      "Pendant l'appel, on parle de votre activité, de vos clients, de vos objectifs.",
      "Si nous pouvons vous aider, vous recevez une proposition claire. Sinon, on vous le dit.",
    ],
  },
  hours: "Disponible toute la journée. Le plus rapide : un message WhatsApp.",
  address: "Liège, Belgique. Nous nous déplaçons chez vous, ou nous vous recevons à Liège.",
};
