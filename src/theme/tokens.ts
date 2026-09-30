/**
 * THÈME ELV8co — couleurs, polices et rayons.
 *
 * Ce fichier alimente les contextes « hors CSS » : images Open Graph,
 * e-mails, couleur de thème du navigateur, WebGL.
 * Les mêmes valeurs sont déclarées pour Tailwind dans src/styles/theme.css :
 * si vous modifiez une couleur ici, modifiez-la aussi là-bas.
 */
export const colors = {
  night: "#1A2E45", // bleu nuit — fond principal
  deep: "#0D1B2A", // bleu profond — fonds sombres, pied de page
  surface: "#1E3A55", // surface — cartes, champs
  copper: "#C87941", // cuivre
  copperLight: "#E09055", // cuivre clair — chiffres, mots clés, boutons
  ivory: "#F3EEE6", // ivoire — texte principal
  grey: "#9FB0BF", // gris — texte secondaire
} as const;

export const fonts = {
  display: "Instrument Serif", // titres
  body: "Inter", // texte courant
} as const;

export const theme = { colors, fonts } as const;
export default theme;
