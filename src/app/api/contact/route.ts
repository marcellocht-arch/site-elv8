import { NextResponse, type NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { rateLimited, validateContact } from "@/lib/contact";
import { confirmationEmail, internalEmail } from "@/lib/emails";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status });

export async function POST(req: NextRequest) {
  // 1. Origine : on n'accepte que les envois depuis le site lui-même
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return json(403, { ok: false, error: "Origine non autorisée." });
  }

  // 2. Limite de fréquence par adresse IP
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "inconnue";
  if (rateLimited(ip)) {
    return json(429, { ok: false, error: "Trop de demandes en peu de temps. Réessayez dans quelques minutes." });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, error: "Requête invalide." });
  }

  // 3. Pot de miel + délai minimal de remplissage : on fait semblant d'accepter
  const elapsed = Number(body.elapsed ?? 0);
  if ((typeof body.website === "string" && body.website.trim() !== "") || (elapsed > 0 && elapsed < 2500)) {
    return json(200, { ok: true });
  }

  // 4. Validation serveur
  const { data, fields } = validateContact(body);
  if (!data) {
    return json(422, { ok: false, error: "Certains champs sont à corriger.", fields });
  }

  // 5. Envoi via le SMTP one.com
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("[contact] SMTP_USER / SMTP_PASS manquants : voir .env.example");
    return json(500, { ok: false, error: "Le formulaire n'est pas encore configuré." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "send.one.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: true, // SSL
    auth: { user, pass },
  });

  const to = process.env.CONTACT_TO || site.contact.email;
  const from = `"${site.name}" <${user}>`;
  const internal = internalEmail(data, { page: req.headers.get("referer") ?? undefined });
  const confirm = confirmationEmail(data);

  try {
    await transporter.sendMail({ from, to, replyTo: `"${data.name}" <${data.email}>`, ...internal });
  } catch (err) {
    console.error("[contact] envoi interne impossible", err);
    return json(502, { ok: false, error: "L'envoi a échoué de notre côté." });
  }

  try {
    await transporter.sendMail({ from, to: data.email, replyTo: to, ...confirm });
  } catch (err) {
    // La demande est bien arrivée : on ne bloque pas le prospect pour la confirmation.
    console.error("[contact] confirmation au prospect impossible", err);
  }

  return json(200, { ok: true });
}

export function GET() {
  return json(405, { ok: false, error: "Méthode non autorisée." });
}
