import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** sitemap.xml généré à partir du registre des pages (src/lib/routes.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return allRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
