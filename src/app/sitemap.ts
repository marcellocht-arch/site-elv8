import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * sitemap.xml généré à partir du registre des pages (src/lib/routes.ts) :
 * toute page ajoutée au registre y apparaît automatiquement.
 * La date de modification n'est indiquée que quand elle est réellement connue (articles) :
 * une date qui change à chaque déploiement apprend à Google à l'ignorer.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    ...(r.lastModified ? { lastModified: r.lastModified } : {}),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
