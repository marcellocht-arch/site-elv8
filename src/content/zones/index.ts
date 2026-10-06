import liege from "./liege";
import namur from "./namur";
import verviers from "./verviers";
import luxembourg from "./province-de-luxembourg";
import seraing from "./seraing";
import herstal from "./herstal";
import ans from "./ans";
import huy from "./huy";
import vise from "./vise";
import type { Seo } from "../types";

export const zones = [liege, namur, verviers, luxembourg];
/** Pages par commune (hors carte du hub). */
export const localZones = [seraing, herstal, ans, huy, vise];
export const allZones = [...zones, ...localZones];
export const zoneBySlug = (slug: string) => allZones.find((z) => z.slug === slug);

/** Page /zones (hub). */
export const zonesHub = {
  seo: {
    title: "Zones d'intervention : Liège, Namur, Luxembourg | ELV8co",
    description:
      "ELV8co accompagne les entreprises locales à Liège, Namur, Verviers et en province de Luxembourg : personal branding, vidéo et publicité Meta.",
    keywords: { primary: "agence marketing Wallonie", variants: ["agence visibilité locale Wallonie", "agence marketing Liège Namur Verviers Luxembourg"] },
    ogTitle: "Zones d'intervention",
  } satisfies Seo,
  hero: {
    eyebrow: "Zones d'intervention",
    h1: "Proches de vous, *partout* en Wallonie de l'Est",
    intro:
      "Basée à Liège, ELV8co intervient dans quatre zones que nous connaissons bien. Chacune a son tissu économique, ses habitudes et ses enjeux de visibilité. Nous adaptons notre méthode à chacune.",
  },
  /** Villes secondaires affichées sur la carte schématique (positions approximatives). */
  mapTowns: [
    { name: "Arlon", x: 75.6, y: 89.6 },
    { name: "Marche", x: 46.3, y: 45.6 },
    { name: "Bastogne", x: 70, y: 64 },
    { name: "Libramont", x: 48.8, y: 70.4 },
  ],
  outside:
    "Votre entreprise se trouve ailleurs en Belgique ? Une grande partie de notre travail (stratégie, montage, publicité) se fait à distance. Parlons-en.",
};
