import Link from "next/link";
import { conseils, conseilsHub } from "@/content/conseils";
import { buildMetadata, webPageLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowUpRight } from "@/components/ui/Icons";

export const metadata = buildMetadata(conseilsHub.seo, "/conseils", "conseils");

export default function Page() {
  const h = conseilsHub.hero;
  return (
    <>
      <PageHero crumbs={[{ name: "Conseils", path: "/conseils" }]} eyebrow={h.eyebrow} title={h.h1} intro={h.intro} cta={false} />
      <section className="container-x pb-24 md:pb-32" aria-label="Articles">
        <Reveal stagger={0.08} as="ul" className="grid gap-5 md:grid-cols-2">
          {conseils.map((a) => (
            <li key={a.slug}>
              <TiltCard className="h-full rounded-[var(--radius-card)]">
                <Link href={`/conseils/${a.slug}`} data-cursor="Lire" className="card-surface group flex h-full min-h-[260px] flex-col p-7 md:p-9">
                  <span className="eyebrow">{a.category} · {a.readMinutes} min</span>
                  <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">{a.title}</h2>
                  <p className="mt-4 text-ivory/75">{a.excerpt}</p>
                  <span className="mt-auto flex items-center justify-between border-t border-ivory/10 pt-4 text-sm">
                    Lire l&apos;article
                    <ArrowUpRight size={18} className="text-copper-light transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </li>
          ))}
        </Reveal>
      </section>
      <ContactSection />
      <JsonLd data={webPageLd({ name: conseilsHub.seo.title, description: conseilsHub.seo.description, path: "/conseils" })} />
    </>
  );
}
