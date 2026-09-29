import personalBranding from "./personal-branding";
import contenuVideo from "./contenu-video";
import publicite from "./publicite-meta-linkedin";
import siteWeb from "./creation-site-web";
import community from "./community-management";

export const principalServices = [personalBranding, contenuVideo, publicite];
export const complementaryServices = [siteWeb, community];
export const allServices = [...principalServices, ...complementaryServices];

export const serviceBySlug = (slug: string) => allServices.find((s) => s.slug === slug);
