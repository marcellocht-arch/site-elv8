import { home } from "@/content/home";
import { about } from "@/content/a-propos";
import { contact } from "@/content/contact";
import { allServices } from "@/content/services";
import { caseStudies, realisationsHub } from "@/content/realisations";
import { zones, localZones, zonesHub } from "@/content/zones";
import { offres } from "@/content/offres";
import { conseils, conseilsHub } from "@/content/conseils";
import mentions from "@/content/legal/mentions-legales";
import confidentialite from "@/content/legal/confidentialite";
import { plain } from "./seo";

export type SiteRoute = {
  path: string;
  /** Identifiant de l'image Open Graph (/og/<ogSlug>). */
  ogSlug: string;
  ogTitle: string;
  ogKicker: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Registre unique de toutes les pages : alimente le sitemap et les images Open Graph. */
export function allRoutes(): SiteRoute[] {
  const r = (path: string, ogSlug: string, ogTitle: string, ogKicker: string, priority: number, changeFrequency: SiteRoute["changeFrequency"] = "monthly"): SiteRoute => ({
    path,
    ogSlug,
    ogTitle: plain(ogTitle),
    ogKicker,
    priority,
    changeFrequency,
  });

  return [
    r("/", "accueil", home.seo.ogTitle ?? home.seo.title, "Agence de visibilité locale · Liège", 1, "weekly"),
    ...allServices.map((s) => r(`/${s.slug}`, s.slug, s.seo.ogTitle ?? s.name, s.kind === "principal" ? `Service · ${s.pillar}` : "Service complémentaire", 0.9)),
    r("/offres", "offres", offres.seo.ogTitle ?? "Nos formules", "Essentiel · Croissance · Pro · Sur mesure", 0.9),
    r("/realisations", "realisations", realisationsHub.seo.ogTitle ?? "Réalisations", "Études de cas", 0.8),
    ...caseStudies.map((c) => r(`/realisations/${c.slug}`, `realisations-${c.slug}`, c.seo.ogTitle ?? c.client, `Étude de cas · ${c.sector}`, 0.7)),
    r("/zones", "zones", zonesHub.seo.ogTitle ?? "Zones", "Liège · Namur · Verviers · Luxembourg", 0.8),
    ...zones.map((z) => r(`/zones/${z.slug}`, `zones-${z.slug}`, z.seo.ogTitle ?? z.name, "Zone d'intervention", 0.8)),
    ...localZones.map((z) => r(`/zones/${z.slug}`, `zones-${z.slug}`, z.seo.ogTitle ?? z.name, "Zone d'intervention", 0.7)),
    r("/conseils", "conseils", conseilsHub.seo.ogTitle ?? "Conseils", "Conseils visibilité locale", 0.7, "weekly"),
    ...conseils.map((a) => r(`/conseils/${a.slug}`, `conseils-${a.slug}`, a.seo.ogTitle ?? a.title, "Conseil", 0.6)),
    r("/a-propos", "a-propos", about.seo.ogTitle ?? "À propos", "L'agence", 0.6),
    r("/contact", "contact", contact.seo.ogTitle ?? "Contact", "Un appel de 30 minutes suffit", 0.7),
    r("/mentions-legales", "mentions-legales", mentions.seo.ogTitle ?? "Mentions légales", "Informations légales", 0.2, "yearly"),
    r("/confidentialite", "confidentialite", confidentialite.seo.ogTitle ?? "Confidentialité", "Vos données", 0.2, "yearly"),
  ];
}
