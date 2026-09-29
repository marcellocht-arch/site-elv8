import Link from "next/link";
import { footer, site } from "@/content/site";
import { Chat, Mail, Phone } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-deep pt-20 md:pt-28">
      <div className="halo halo--soft left-[-10%] top-[-20%] h-[60vw] w-[60vw] max-w-[800px] max-h-[800px]" aria-hidden />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-display text-3xl leading-tight">{footer.pitch}</p>
            <ul className="mt-8 space-y-3 text-[0.95rem]">
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-3 text-ivory/85 transition-colors hover:text-copper-light">
                  <Mail size={18} className="text-copper-light" /> {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="inline-flex items-center gap-3 text-ivory/85 transition-colors hover:text-copper-light">
                  <Phone size={18} className="text-copper-light" /> {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-ivory/85 transition-colors hover:text-copper-light"
                >
                  <Chat size={18} className="text-copper-light" /> Écrire sur WhatsApp
                </a>
              </li>
            </ul>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="space-y-2.5 text-[0.95rem]">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ivory/80 transition-colors hover:text-copper-light">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Grand logo décoratif (SVG : purement graphique) */}
        <svg aria-hidden viewBox="0 0 1000 300" className="pointer-events-none mt-16 w-full select-none">
          <text x="500" y="262" textAnchor="middle" fontFamily="var(--font-display)" fontSize="340" letterSpacing="-16" fill="rgba(243,238,230,0.06)">
            ELV8<tspan fill="rgba(200,121,65,0.4)">.</tspan>
          </text>
        </svg>

        <div className="flex flex-col gap-4 border-t border-ivory/10 py-8 text-sm text-grey md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name} — Agence de visibilité locale basée à Liège, Belgique.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-copper-light">
                  {l.label}
                </Link>
              </li>
            ))}
            {process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ? (
              <li>
                <button type="button" data-consent-open className="transition-colors hover:text-copper-light">
                  Gérer les cookies
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
