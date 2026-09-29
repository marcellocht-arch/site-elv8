import Link from "next/link";
import { caseStudies } from "@/content/realisations";
import { serviceBySlug } from "@/content/services";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Txt } from "@/components/ui/RichText";

const numberFr = (n: number) => new Intl.NumberFormat("fr-BE").format(n);

/** Cartes des études de cas (avec profondeur au survol). */
export function CaseCards({ slugs, headingLevel = "h3" }: { slugs?: string[]; headingLevel?: "h2" | "h3" }) {
  const items = slugs ? slugs.map((s) => caseStudies.find((c) => c.slug === s)!).filter(Boolean) : caseStudies;
  const H = headingLevel;
  return (
    <Reveal stagger={0.12} className={`grid gap-5 ${items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      {items.map((c, i) => {
        const stat = c.stats[0];
        return (
          <TiltCard key={c.slug} className="h-full rounded-[var(--radius-card)]">
            <Link
              href={`/realisations/${c.slug}`}
              data-cursor="Voir"
              className="card-surface group relative flex h-full min-h-[380px] flex-col overflow-hidden p-6 md:p-7"
            >
              <span aria-hidden data-n={`0${i + 1}`} className="absolute right-5 top-4 font-display text-[5.5rem] leading-none text-ivory/[0.06] after:content-[attr(data-n)]" />
              <span className="eyebrow">{c.sector}</span>
              <H className="mt-3 font-display text-[2.3rem] leading-none">{c.client}</H>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ivory/75">
                <Txt>{c.cardSummary}</Txt>
              </p>
              <div className="mt-auto pt-8">
                {stat ? (
                  <p className="font-display text-5xl text-copper-light">
                    {numberFr(stat.value)}
                    {stat.suffix}
                    <span className="mt-1 block font-sans text-xs uppercase tracking-[0.14em] text-grey">{stat.label}</span>
                  </p>
                ) : (
                  <p className="flex flex-wrap gap-2">
                    {(c.services.length ? c.services : []).map((s) => (
                      <span key={s} className="rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/80">
                        {serviceBySlug(s)?.name}
                      </span>
                    ))}
                  </p>
                )}
                <span className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-4 text-sm">
                  Lire l&apos;étude de cas
                  <ArrowUpRight size={18} className="text-copper-light transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </TiltCard>
        );
      })}
    </Reveal>
  );
}
