import type { Metadata } from "next";
import { site } from "@/content/site";
import { ArrowUpRight, Chat, Mail } from "@/components/ui/Icons";

/**
 * Page « liens » : cible du QR code des cartes de visite.
 * Site, WhatsApp, e-mail et réseaux renseignés dans src/content/site.ts (social).
 * Non indexée : elle n'a pas vocation à sortir sur Google.
 */
export const metadata: Metadata = {
  title: { absolute: "Marcel Locht | ELV8co" },
  description: "Le site, le WhatsApp et les réseaux d'ELV8co, agence vidéo et réseaux sociaux à Liège.",
  robots: { index: false, follow: true },
};

const labels: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  tiktok: "TikTok",
};

export default function Page() {
  const socials = Object.entries(site.social).filter(([, url]) => !!url) as [string, string][];
  const links = [
    { href: site.contact.whatsapp, label: "WhatsApp", value: site.contact.phoneDisplay, Icon: Chat, primary: true },
    { href: "/", label: "Le site", value: "elv8co.be", Icon: ArrowUpRight, primary: false },
    ...socials.map(([key, url]) => ({ href: url, label: labels[key] ?? key, value: "Suivre ELV8co", Icon: ArrowUpRight, primary: false })),
    { href: `mailto:${site.contact.email}`, label: "E-mail", value: site.contact.email, Icon: Mail, primary: false },
  ];

  return (
    <section className="container-x flex min-h-[100svh] flex-col items-center justify-center pb-20 pt-[calc(var(--header-h)+2rem)]">
      <div className="w-full max-w-md text-center">
        <p className="font-display text-6xl leading-none tracking-[-0.03em]">
          ELV8<span className="text-copper">.</span>
        </p>
        <h1 className="mt-6 font-display text-3xl">Marcel Locht</h1>
        <p className="mt-2 text-grey">Fondateur d&apos;ELV8co, agence vidéo et réseaux sociaux à Liège</p>

        <ul className="mt-10 grid gap-3 text-left">
          {links.map(({ href, label, value, Icon, primary }) => {
            const ext = href.startsWith("http");
            return (
              <li key={label}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`flex items-center gap-4 rounded-[var(--radius-card)] border p-4 transition-colors ${
                    primary
                      ? "border-copper-light bg-copper-light text-deep hover:bg-copper"
                      : "border-surface bg-surface/60 hover:border-copper-light/60"
                  }`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-deep/10">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-xs uppercase tracking-[0.14em] ${primary ? "text-deep/70" : "text-grey"}`}>{label}</span>
                    <span className="block truncate font-display text-xl">{value}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
