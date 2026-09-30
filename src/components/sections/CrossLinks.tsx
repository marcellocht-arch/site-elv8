import Link from "next/link";
import { zones } from "@/content/zones";
import { allServices } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, Pin, serviceIcons } from "@/components/ui/Icons";

/** Maillage interne : un service → toutes les zones. */
export function ZoneLinks({ serviceName, title = "Où intervenons-nous ?" }: { serviceName: string; title?: string }) {
  return (
    <div>
      <h2 className="t-md">{title}</h2>
      <Reveal stagger={0.06} className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {zones.map((z) => (
          <Link
            key={z.slug}
            href={`/zones/${z.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-ivory/12 px-5 py-4 transition-colors hover:border-copper-light/60 hover:bg-surface/40"
          >
            <span className="flex items-center gap-3">
              <Pin size={18} className="shrink-0 text-copper-light" />
              <span>
                {serviceName} <span className="text-ivory/60">{z.inName}</span>
              </span>
            </span>
            <ArrowRight size={16} className="shrink-0 text-copper-light transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </Reveal>
    </div>
  );
}

/** Maillage interne : une zone (ou un service) → les services. */
export function ServiceLinks({ exclude, suffix = "", title = "Nos services" }: { exclude?: string; suffix?: string; title?: string }) {
  const list = allServices.filter((s) => s.slug !== exclude);
  return (
    <div>
      <h2 className="t-md">{title}</h2>
      <Reveal stagger={0.06} className={`mt-6 grid gap-3 sm:grid-cols-2 ${list.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {list.map((s) => {
          const Icon = serviceIcons[s.slug as keyof typeof serviceIcons];
          return (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-ivory/12 p-5 transition-colors hover:border-copper-light/60 hover:bg-surface/40"
            >
              <Icon size={28} className="mt-0.5 shrink-0 text-copper-light" />
              <span>
                <span className="block font-display text-2xl leading-tight">
                  {s.name}
                  {suffix}
                </span>
                <span className="mt-1 block text-sm text-grey">{s.tagline}</span>
                {s.kind === "complementaire" && <span className="mt-2 inline-block text-[0.7rem] uppercase tracking-[0.14em] text-copper-light">Avec notre réseau</span>}
              </span>
            </Link>
          );
        })}
      </Reveal>
    </div>
  );
}
