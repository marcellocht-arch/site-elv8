import { serviceOptions } from "@/content/site";

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  city: string;
  message: string;
  consent: boolean;
  variant: "full" | "short";
};

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

/** Validation serveur : ne jamais faire confiance au navigateur. */
export function validateContact(body: Record<string, unknown>): { data?: ContactPayload; fields?: Record<string, string> } {
  const variant = body.variant === "short" ? "short" : "full";
  const data: ContactPayload = {
    name: oneLine(clean(body.name, 120)),
    company: oneLine(clean(body.company, 160)),
    email: oneLine(clean(body.email, 200)).toLowerCase(),
    phone: oneLine(clean(body.phone, 40)),
    service: oneLine(clean(body.service, 80)),
    city: oneLine(clean(body.city, 100)),
    message: clean(body.message, 4000),
    consent: body.consent === true,
    variant,
  };

  const fields: Record<string, string> = {};
  if (data.name.length < 2) fields.name = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) fields.email = "Adresse e-mail invalide.";
  if (variant === "full" && data.company.length < 2) fields.company = "Indiquez le nom de votre entreprise.";
  if (variant === "full" && data.city.length < 2) fields.city = "Indiquez votre ville.";
  if (data.phone && !/^[+()\d\s./-]{6,40}$/.test(data.phone)) fields.phone = "Numéro de téléphone invalide.";
  if (data.service && !(serviceOptions as readonly string[]).includes(data.service)) fields.service = "Service inconnu.";
  if (data.message.length < 10) fields.message = "Quelques mots sur votre projet (10 caractères minimum).";
  if (!data.consent) fields.consent = "Votre accord est nécessaire pour vous répondre.";
  // Trop de liens = très probablement du spam
  if ((data.message.match(/https?:\/\//g) || []).length > 3) fields.message = "Merci de limiter le nombre de liens.";

  return Object.keys(fields).length ? { fields } : { data };
}

/* ------------------------------------------------------------------ */
/* Limite de fréquence (mémoire de l'instance serveur)                   */
/* ------------------------------------------------------------------ */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

export function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_HITS;
}
