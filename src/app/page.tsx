import Link from "next/link";
import { home } from "@/content/home";
import { complementaryServices } from "@/content/services";
import { zones } from "@/content/zones";
import { buildMetadata, faqLd, webPageLd } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { TwoShops } from "@/components/home/TwoShops";
import { HorizontalServices } from "@/components/home/HorizontalServices";
import { Synergy } from "@/components/home/Synergy";
import { CaseCards } from "@/components/sections/CaseCards";
import { ContactSection } from "@/components/sections/ContactSection";
import { ZonesMap } from "@/components/sections/ZonesMap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqList } from "@/components/ui/FaqList";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight, ArrowUpRight, serviceIcons } from "@/components/ui/Icons";

export const metadata = buildMetadata(home.seo, "/", "accueil");

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TwoShops />
      <HorizontalServices />
      <Synergy />

      {/* Résultats en chiffres */}
      <section className="relative overflow-hidden border-y border-ivory/10 bg-deep py-24 md:py-32" aria-labelledby="resultats-title">
        <div className="container-x">
          <SectionHeader eyebrow={home.results.eyebrow} title={home.results.title} intro={home.results.intro} id="resultats-title" />
          <Reveal stagger={0.1} as="dl" className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-ivory/10 bg-ivory/10 lg:grid-cols-4">
            {home.results.stats.map((s) => (
              <div key={s.label} className="flex flex-col justify-between gap-6 bg-deep p-5 md:p-8">
                <dt className="order-2 text-sm leading-snug text-grey md:text-base">{s.label}</dt>
                <dd className="order-1 font-display text-[2.6rem] leading-none text-copper-light sm:text-6xl lg:text-7xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-ivory/80">{home.results.note}</p>
            <Link href="/realisations/akp-kustom" className="group inline-flex items-center gap-2 text-copper-light">
              {home.results.link}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Études de cas */}
      <section className="container-x py-24 md:py-32" aria-labelledby="cas-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader eyebrow={home.cases.eyebrow} title={home.cases.title} id="cas-title" />
          <Button href="/realisations" variant="ghost" magnetic={false}>
            {home.cases.cta}
          </Button>
        </div>
        <CaseCards />
      </section>

      {/* Services complémentaires */}
      <section className="container-x pb-24 md:pb-32" aria-labelledby="complementaires-title">
        <SectionHeader eyebrow={home.complementary.eyebrow} title={home.complementary.title} intro={home.complementary.intro} id="complementaires-title" />
        <Reveal stagger={0.1} className="mt-12 grid gap-5 md:grid-cols-2">
          {complementaryServices.map((s) => {
            const Icon = serviceIcons[s.slug as keyof typeof serviceIcons];
            return (
              <TiltCard key={s.slug} className="rounded-[var(--radius-card)]">
                <Link href={`/${s.slug}`} data-cursor="Découvrir" className="card-surface group flex h-full flex-col gap-6 p-7 md:p-9">
                  <div className="flex items-start justify-between">
                    <Icon size={40} className="text-copper-light" />
                    <span className="rounded-full border border-ivory/15 px-3 py-1 text-xs uppercase tracking-[0.12em] text-grey">Réseau de freelances</span>
                  </div>
                  <h3 className="font-display text-4xl leading-none md:text-5xl">{s.name}</h3>
                  <p className="text-ivory/75">{s.tagline}</p>
                  <span className="mt-auto flex items-center gap-2 text-sm text-copper-light">
                    En savoir plus <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </TiltCard>
            );
          })}
        </Reveal>
      </section>

      {/* Méthode */}
      <section className="border-t border-ivory/10 py-24 md:py-32" aria-labelledby="methode-title">
        <div className="container-x">
          <SectionHeader eyebrow={home.method.eyebrow} title={home.method.title} id="methode-title" />
          <Reveal stagger={0.1} as="ol" className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {home.method.steps.map((st, i) => (
              <li key={st.title} className="group relative bg-night p-6 transition-colors hover:bg-surface/60 md:p-8">
                <span aria-hidden data-n={`0${i + 1}`} className="block font-display text-6xl leading-none text-ivory/15 transition-colors after:content-[attr(data-n)] group-hover:text-copper-light" />
                <h3 className="mt-8 font-display text-3xl leading-tight">{st.title}</h3>
                <p className="mt-3 leading-relaxed text-ivory/75">{st.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Zones */}
      <section className="relative overflow-hidden bg-deep py-24 md:py-32" aria-labelledby="zones-title">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow={home.zones.eyebrow} title={home.zones.title} intro={home.zones.intro} id="zones-title" />
            <Reveal stagger={0.06} as="ul" className="mt-10">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link href={`/zones/${z.slug}`} className="group flex items-center justify-between gap-4 border-t border-ivory/12 py-5">
                    <span>
                      <span className="block font-display text-3xl leading-none transition-colors group-hover:text-copper-light">{z.name}</span>
                      <span className="mt-1.5 block text-sm text-grey">{z.cardSummary}</span>
                    </span>
                    <ArrowRight size={20} className="shrink-0 text-copper-light transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </Reveal>
          </div>
          <ZonesMap />
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-24 md:py-32" aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" title={home.faqTitle} id="faq-title" />
          <FaqList items={home.faq} />
        </div>
      </section>

      <ContactSection title={home.cta.title} text={home.cta.text} />

      <JsonLd data={[webPageLd({ name: home.seo.title, description: home.seo.description, path: "/" }), faqLd(home.faq)]} />
    </>
  );
}
