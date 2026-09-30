import type { LegalContent } from "../types";

/** Page /confidentialite — politique de confidentialité (RGPD + loi belge du 30 juillet 2018). */
const content: LegalContent = {
  seo: {
    title: "Politique de confidentialité | ELV8co",
    description: "Comment ELV8co collecte et protège vos données personnelles : formulaire de contact, finalités, durée de conservation, droits RGPD, cookies.",
    keywords: { primary: "politique de confidentialité ELV8co", variants: [] },
    ogTitle: "Confidentialité",
  },
  h1: "Politique de confidentialité",
  updated: "30 septembre 2026",
  intro:
    "La protection de vos données personnelles est importante pour nous. Cette politique explique quelles données nous collectons, pourquoi, combien de temps nous les conservons et quels sont vos droits, conformément au Règlement général sur la protection des données (RGPD, UE 2016/679) et à la loi belge du 30 juillet 2018 relative à la protection des personnes physiques à l'égard des traitements de données à caractère personnel.",
  sections: [
    {
      title: "1. Responsable du traitement",
      list: [
        "ELV8co, dénomination commerciale de [À COMPLÉTER : dénomination légale et forme juridique]",
        "Adresse : [À COMPLÉTER : adresse du siège], Belgique",
        "Numéro d'entreprise (BCE) : [À COMPLÉTER : numéro BCE]",
        "Contact pour toute question relative à vos données : contact@elv8co.be",
      ],
    },
    {
      title: "2. Données collectées",
      paragraphs: ["Nous collectons uniquement les données que vous nous transmettez volontairement via le formulaire de contact, par e-mail, par téléphone ou via WhatsApp :"],
      list: [
        "nom et prénom, nom de l'entreprise ;",
        "adresse e-mail et, si vous le souhaitez, numéro de téléphone ;",
        "service souhaité, ville et contenu de votre message ;",
        "la date de votre consentement.",
      ],
    },
    {
      title: "3. Finalités et bases légales",
      list: [
        "Répondre à votre demande et organiser un appel : mesures précontractuelles prises à votre demande (art. 6.1.b RGPD) et votre consentement (art. 6.1.a RGPD).",
        "Vous envoyer un e-mail de confirmation de votre demande : mesures précontractuelles (art. 6.1.b RGPD).",
        "Assurer la sécurité du site et lutter contre le spam (limitation du nombre d'envois, détection automatique) : intérêt légitime (art. 6.1.f RGPD).",
        "Si vous devenez client : exécution du contrat (art. 6.1.b RGPD) et respect de nos obligations comptables et fiscales (art. 6.1.c RGPD).",
      ],
      paragraphs: ["Nous n'utilisons pas vos données à des fins de prospection sans votre accord, et nous ne les vendons jamais."],
    },
    {
      title: "4. Destinataires et sous-traitants",
      paragraphs: [
        "Vos données sont destinées exclusivement à ELV8co. Elles transitent par les prestataires techniques suivants, liés par des obligations de confidentialité et de sécurité :",
      ],
      list: [
        "one.com : hébergement de la messagerie électronique (Union européenne). [À COMPLÉTER : vérifier la dénomination exacte du prestataire].",
        "Vercel Inc. : hébergement du site. Le formulaire est traité par les serveurs de Vercel ; les transferts éventuels vers les États-Unis sont encadrés par le cadre de protection des données UE–États-Unis (Data Privacy Framework) et/ou les clauses contractuelles types de la Commission européenne.",
        "Le cas échéant, les freelances de notre réseau chargés d'un projet vous concernant, uniquement pour les données nécessaires à ce projet et sous obligation de confidentialité.",
      ],
    },
    {
      title: "5. Durée de conservation",
      list: [
        "Demandes de contact sans suite : 3 ans à compter du dernier échange.",
        "Données clients : pendant la durée de la relation contractuelle, puis pendant les délais légaux de conservation comptable et fiscale.",
        "Journaux techniques de l'hébergeur : durée limitée définie par l'hébergeur.",
      ],
    },
    {
      title: "6. Vos droits",
      paragraphs: [
        "Vous disposez à tout moment d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité de vos données et d'opposition au traitement. Lorsque le traitement repose sur votre consentement, vous pouvez le retirer à tout moment, sans que cela remette en cause la licéité du traitement effectué avant ce retrait.",
        "Pour exercer vos droits, écrivez-nous à contact@elv8co.be. Nous vous répondrons dans un délai d'un mois maximum. Une preuve d'identité peut vous être demandée en cas de doute raisonnable.",
        "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l'Autorité de protection des données (APD), rue de la Presse 35, 1000 Bruxelles — www.autoriteprotectiondonnees.be — contact@apd-gba.be.",
      ],
    },
    {
      title: "7. Cookies et mesure d'audience",
      paragraphs: [
        "Par défaut, ce site ne dépose aucun cookie de suivi, de mesure d'audience ou publicitaire.",
        "Le site utilise uniquement le stockage local de votre navigateur pour des fonctions strictement nécessaires : ne pas rejouer l'animation d'introduction à chaque page pendant votre visite, et mémoriser votre choix en matière de cookies le cas échéant. Ces informations ne quittent pas votre appareil.",
        "Si un outil de mesure d'audience (par exemple Plausible ou Google Analytics) est activé à l'avenir, il ne sera chargé qu'après votre consentement explicite, recueilli via un bandeau. Vous pourrez modifier votre choix à tout moment via le lien « Gérer les cookies » en bas de page.",
      ],
    },
    {
      title: "8. Sécurité",
      paragraphs: [
        "Le site est accessible uniquement en connexion chiffrée (HTTPS). Les e-mails sont envoyés via une connexion sécurisée (SSL). Les identifiants techniques ne sont jamais stockés dans le code du site. Nous mettons en œuvre des mesures raisonnables pour protéger vos données contre la perte, l'accès non autorisé ou la divulgation.",
      ],
    },
    {
      title: "9. Modifications",
      paragraphs: ["Cette politique peut être mise à jour. La date de dernière mise à jour figure en haut de cette page."],
    },
  ],
};

export default content;
