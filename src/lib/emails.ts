import { colors } from "@/theme/tokens";
import { site } from "@/content/site";
import type { ContactPayload } from "./contact";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

function layout(title: string, body: string) {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${colors.deep};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.deep};padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${colors.night};border-radius:18px;overflow:hidden;border:1px solid rgba(243,238,230,0.08);">
<tr><td style="padding:32px 36px 8px 36px;font-family:Georgia,'Times New Roman',serif;font-size:40px;line-height:1;color:${colors.ivory};">ELV8<span style="color:${colors.copper};">.</span></td></tr>
<tr><td style="padding:0 36px;"><div style="height:1px;background:${colors.copper};width:64px;margin:16px 0 8px 0;"></div></td></tr>
<tr><td style="padding:8px 36px 36px 36px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:${colors.ivory};">${body}</td></tr>
<tr><td style="padding:20px 36px;background:${colors.deep};font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:${colors.grey};">
${site.name} · Liège, Belgique<br>
<a href="mailto:${site.contact.email}" style="color:${colors.copperLight};text-decoration:none;">${site.contact.email}</a> ·
<a href="${site.contact.phoneHref}" style="color:${colors.copperLight};text-decoration:none;">${site.contact.phoneDisplay}</a> ·
<a href="${site.url}" style="color:${colors.copperLight};text-decoration:none;">${site.url.replace(/^https?:\/\//, "")}</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

const row = (k: string, v: string) =>
  v
    ? `<tr><td style="padding:6px 12px 6px 0;color:${colors.grey};font-size:13px;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap;">${esc(k)}</td><td style="padding:6px 0;color:${colors.ivory};">${nl2br(v)}</td></tr>`
    : "";

/** E-mail reçu par l'agence. */
export function internalEmail(d: ContactPayload, meta: { page?: string }) {
  const subject = `Nouvelle demande — ${d.name}${d.company ? ` (${d.company})` : ""}`;
  const html = layout(
    subject,
    `<p style="margin:0 0 18px 0;font-size:20px;">Nouvelle demande depuis le site</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;">
${row("Nom", d.name)}${row("Entreprise", d.company)}${row("E-mail", d.email)}${row("Téléphone", d.phone)}${row("Service", d.service)}${row("Ville", d.city)}${row("Page", meta.page ?? "")}
</table>
<div style="margin-top:20px;padding:18px;border-radius:12px;background:${colors.surface};">${nl2br(d.message)}</div>
<p style="margin-top:18px;font-size:13px;color:${colors.grey};">Consentement RGPD donné le ${new Date().toLocaleString("fr-BE", { timeZone: "Europe/Brussels" })}. Répondez directement à cet e-mail pour écrire au prospect.</p>`
  );
  const text = `Nouvelle demande\n\nNom: ${d.name}\nEntreprise: ${d.company}\nE-mail: ${d.email}\nTéléphone: ${d.phone}\nService: ${d.service}\nVille: ${d.city}\n\n${d.message}`;
  return { subject, html, text };
}

/** Confirmation automatique envoyée au prospect. */
export function confirmationEmail(d: ContactPayload) {
  const first = d.name.split(" ")[0] || d.name;
  const subject = "Votre demande est bien arrivée — ELV8co";
  const html = layout(
    subject,
    `<p style="margin:0 0 16px 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;">Merci ${esc(first)},<br><span style="color:${colors.copperLight};font-style:italic;">on a bien reçu votre message.</span></p>
<p style="margin:0 0 14px 0;">Nous le lisons personnellement et revenons vers vous rapidement pour fixer un appel de 30 minutes. L'objectif de cet appel est simple : comprendre votre activité, vos clients, et voir si nous pouvons vous aider à devenir plus visible.</p>
<p style="margin:0 0 14px 0;">Pour gagner du temps, vous pouvez déjà réfléchir à ces trois questions :</p>
<ul style="margin:0 0 18px 18px;padding:0;color:${colors.ivory};">
<li style="margin-bottom:6px;">Qui sont vos meilleurs clients aujourd'hui ?</li>
<li style="margin-bottom:6px;">Comment vous trouvent-ils, en général ?</li>
<li>Combien de nouveaux clients par mois changeraient vraiment la donne pour vous ?</li>
</ul>
<p style="margin:0 0 6px 0;color:${colors.grey};font-size:14px;">Récapitulatif de votre demande :</p>
<div style="padding:16px;border-radius:12px;background:${colors.surface};font-size:14px;color:${colors.ivory};">${d.service ? `<strong>${esc(d.service)}</strong><br>` : ""}${nl2br(d.message)}</div>
<p style="margin:22px 0 0 0;">Besoin d'une réponse plus rapide ? Écrivez-nous sur <a href="${site.contact.whatsapp}" style="color:${colors.copperLight};">WhatsApp</a> ou appelez le <a href="${site.contact.phoneHref}" style="color:${colors.copperLight};">${site.contact.phoneDisplay}</a>.</p>
<p style="margin:22px 0 0 0;">À très vite,<br>L'équipe ${site.name}</p>`
  );
  const text = `Merci ${first},\n\nNous avons bien reçu votre message et revenons vers vous rapidement pour fixer un appel de 30 minutes.\n\nVotre message :\n${d.message}\n\nBesoin d'une réponse plus rapide ? WhatsApp : ${site.contact.whatsapp} — Tél. : ${site.contact.phoneDisplay}\n\nL'équipe ${site.name}`;
  return { subject, html, text };
}
