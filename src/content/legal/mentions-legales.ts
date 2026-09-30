import type { LegalContent } from "../types";

/** Page /mentions-legales — conforme au Code de droit économique belge (livres III et XII). */
const content: LegalContent = {
  seo: {
    title: "Mentions légales | ELV8co",
    description: "Mentions légales du site elv8co.be : éditeur, numéro d'entreprise, hébergement, propriété intellectuelle et droit applicable.",
    keywords: { primary: "mentions légales ELV8co", variants: [] },
    ogTitle: "Mentions légales",
  },
  h1: "Mentions légales",
  updated: "[À COMPLÉTER : date de mise à jour]",
  intro:
    "Conformément au Code de droit économique belge (notamment ses articles III.74 et XII.7), voici les informations relatives à l'éditeur et à l'hébergeur du site elv8co.be.",
  sections: [
    {
      title: "Éditeur du site",
      list: [
        "Nom commercial : ELV8co",
        "Dénomination sociale : [À COMPLÉTER : dénomination légale]",
        "Forme juridique : [À COMPLÉTER : forme juridique (SRL, personne physique…)]",
        "Siège social : [À COMPLÉTER : adresse complète], Belgique",
        "Numéro d'entreprise (BCE) : [À COMPLÉTER : numéro BCE]",
        "Numéro de TVA : [À COMPLÉTER : numéro de TVA]",
        "E-mail : contact@elv8co.be",
        "Téléphone : +32 470 35 43 90",
        "Responsable de la publication : [À COMPLÉTER : nom du responsable]",
      ],
    },
    {
      title: "Hébergement",
      paragraphs: [
        "Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis — vercel.com.",
        "Le nom de domaine et la messagerie électronique sont gérés par one.com. [À COMPLÉTER : vérifier la dénomination et l'adresse exactes du prestataire one.com figurant sur votre contrat].",
      ],
    },
    {
      title: "Activité",
      paragraphs: [
        "ELV8co est une agence de visibilité locale proposant des services de personal branding, de production de contenu vidéo, de gestion de publicité en ligne, ainsi que, via un réseau de freelances, de création de sites web et de community management.",
        "Les prix et conditions des prestations font l'objet d'une proposition écrite personnalisée. [À COMPLÉTER : lien vers les conditions générales, le cas échéant].",
      ],
    },
    {
      title: "Propriété intellectuelle",
      paragraphs: [
        "L'ensemble des éléments du site (textes, logo, graphismes, vidéos, photographies, code) est protégé par le droit d'auteur et le droit des marques. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable d'ELV8co est interdite.",
        "Les vidéos et visuels présentés dans les études de cas sont reproduits avec l'accord des clients concernés. [À COMPLÉTER : confirmer l'accord écrit de chaque client]. Les marques citées appartiennent à leurs propriétaires respectifs.",
      ],
    },
    {
      title: "Responsabilité",
      paragraphs: [
        "ELV8co met tout en œuvre pour fournir des informations exactes et à jour, sans pouvoir garantir l'absence d'erreur. Les informations du site sont données à titre indicatif et ne constituent pas une offre contractuelle.",
        "Le site peut contenir des liens vers des sites tiers, sur lesquels ELV8co n'exerce aucun contrôle et pour lesquels elle décline toute responsabilité.",
        "Les résultats présentés dans les études de cas sont réels et propres à chaque client. Ils ne constituent pas une garantie de résultat pour d'autres projets.",
      ],
    },
    {
      title: "Données personnelles et cookies",
      paragraphs: [
        "Le traitement des données personnelles collectées via ce site est décrit dans notre politique de confidentialité. Par défaut, le site n'utilise aucun cookie de suivi ou publicitaire.",
      ],
    },
    {
      title: "Droit applicable",
      paragraphs: [
        "Le présent site et ses mentions légales sont soumis au droit belge. En cas de litige, et à défaut de solution amiable, les tribunaux de l'arrondissement judiciaire de Liège sont compétents, sous réserve des règles impératives protégeant les consommateurs.",
      ],
    },
  ],
};

export default content;
