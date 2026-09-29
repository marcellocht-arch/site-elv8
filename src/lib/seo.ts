import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Faq, Seo } from "@/content/types";

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

const isFilled = (v?: string) => !!v && !v.includes("[À COMPLÉTER");

/** Retire la syntaxe de mise en forme (*mot*, [À COMPLÉTER …]) d'un texte. */
export const plain = (s: string) =>
  s
    .replace(/\[À COMPLÉTER[^\]]*\]/g, "")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

/** Construit les métadonnées d'une page : title, description, canonical, Open Graph. */
export function buildMetadata(seo: Seo, path: string, ogSlug: string): Metadata {
  const url = absoluteUrl(path);
  const image = `/og/${ogSlug}`;
  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url,
      title: seo.title,
      description: seo.description,
      images: [{ url: image, width: 1200, height: 630, alt: seo.ogTitle ?? seo.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

/* ------------------------------------------------------------------ */
/* Données structurées JSON-LD                                          */
/* ------------------------------------------------------------------ */
const ORG_ID = `${site.url}/#organization`;
const BUSINESS_ID = `${site.url}/#business`;

const areaServed = [
  { "@type": "City", name: "Liège" },
  { "@type": "City", name: "Namur" },
  { "@type": "City", name: "Verviers" },
  { "@type": "AdministrativeArea", name: "Province de Luxembourg" },
];

const sameAs = () => Object.values(site.social).filter(Boolean);

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/apple-icon"),
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
    ...(isFilled(site.legal.vat) ? { vatID: site.legal.vat } : {}),
  };
}

export function localBusinessLd() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: site.legal.city,
    addressRegion: "Liège",
    addressCountry: site.legal.country,
  };
  if (isFilled(site.legal.street)) address.streetAddress = site.legal.street;
  if (isFilled(site.legal.postalCode)) address.postalCode = site.legal.postalCode;

  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: site.name,
    description: site.defaultDescription,
    url: site.url,
    image: absoluteUrl("/og/accueil"),
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    address,
    areaServed,
    parentOrganization: { "@id": ORG_ID },
    knowsLanguage: ["fr"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services ELV8co",
      itemListElement: [
        ["Personal branding", "/personal-branding"],
        ["Contenu vidéo vertical", "/contenu-video"],
        ["Publicité Meta & LinkedIn", "/publicite-meta-linkedin"],
        ["Création de sites web", "/creation-site-web"],
        ["Community management", "/community-management"],
      ].map(([name, path]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, url: absoluteUrl(path) },
      })),
    },
    ...(sameAs().length ? { sameAs: sameAs() } : {}),
  };
}

export function serviceLd(opts: { name: string; description: string; path: string; serviceType: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": BUSINESS_ID },
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absoluteUrl("/contact"),
      servicePhone: site.contact.phoneHref.replace("tel:", ""),
    },
  };
}

export function faqLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: plain(f.q),
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function webPageLd(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    inLanguage: "fr-BE",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    publisher: { "@id": ORG_ID },
  };
}
