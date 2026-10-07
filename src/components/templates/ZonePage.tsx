import Link from "next/link";
import type { ZoneContent } from "@/content/types";
import { allZones } from "@/content/zones";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { CaseCards } from "@/components/sections/CaseCards";
import { ServiceLinks } from "@/components/sections/CrossLinks";
import { CityBand } from "@/components/sections/CityBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqList } from "@/components/ui/FaqList";
import { Paragraphs, Txt } from "@/components/ui/RichText";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight, Pin } from "@/components/ui/Icons";
import { faqLd, webPageLd } from "@/lib/seo";

/** Gabarit des pages zones (le contenu, lui, est propre à chaque zone). */
export function ZonePage({ z }: { z: ZoneContent }) {
  const path = `/zones/${z.slug}`;
  const others = allZones.filter((o) => o.slug !== z.slug);
  const bandName = z.slug === "province-de-luxembourg" ? "Luxembourg" : z.name;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Zones", path: "/zones" },
          { name: z.name, path },
        ]}
        eyebrow={z.hero.eyebrow}
        title={z.hero.h1}
        intro={z.hero.intro}
        secondary={{ label: "Nos services", href: "#services" }}
      />

      <CityBand name={bandName} communes={z.communes.list} />

      {/* Tissu économique */}
      <section className="container-x py-20 md:py-28" aria-labelledby="economie">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-5">Le tissu économique local</p>
            <SplitReveal as="h2" id="economie" text={z.economy.title} className="t-lg" />
          </div>
          <Reveal stagger={0.08} className="space-y-6 text-[1.075rem] leading-relaxed text-ivory/85">
            <Paragraphs items={z.economy.paragraphs} />
          </Reveal>
        </div>
      </section>

      {/* Entreprises */}
      <section className="bg-deep py-20 md:py-28" aria-labelledby="entreprises">
        <div className="container-x">
          <SectionHeader eyebrow="Qui nous accompagnons" title={z.businesses.title} id="entreprises" />
          <Reveal stagger={0.06} as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {z.businesses.items.map((b) => (
              <li key={b.title}>
                <TiltCard className="h-full rounded-[var(--radius-card)]">
                  <div className="card-surface h-full p-6 md:p-7">
                    <h3 className="font-display text-[1.7rem] leading-tight">{b.title}</h3>
                    <p className="mt-3 leading-relaxed text-ivory/75">
                      <Txt>{b.text}</Txt>
                    </p>
                  </div>
                </TiltCard>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Enjeux */}
      <section className="container-x py-20 md:py-28" aria-labelledby="enjeux">
        <SectionHeader eyebrow="Enjeux de visibilité" title={z.challenges.title} id="enjeux" />
        <Reveal stagger={0.08} as="ol" className="mt-12 grid gap-x-12 md:grid-cols-2">
          {z.challenges.items.map((c, i) => (
            <li key={c.title} className="flex gap-5 border-t border-ivory/12 py-7">
              <span className="font-display text-3xl text-copper-light">0{i + 1}</span>
              <div>
                <h3 className="font-display text-[1.7rem] leading-tight">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-ivory/75">
                  <Txt>{c.text}</Txt>
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Approche */}
      <section className="container-x pb-20 md:pb-28" aria-labelledby="approche">
        <div className="card-surface relative overflow-hidden p-7 md:p-14">
          <div className="halo right-[-10%] top-[-50%] h-[520px] w-[520px]" aria-hidden />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <SplitReveal as="h2" id="approche" text={z.approach.title} className="t-md" />
            <Reveal className="space-y-5 leading-relaxed text-ivory/85">
              <Paragraphs items={z.approach.paragraphs} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services (maillage) */}
      <section id="services" className="container-x pb-20 md:pb-28">
        <ServiceLinks suffix={` ${z.inName}`} title={`Nos services ${z.inName}`} />
      </section>

      {/* Communes */}
      <section className="border-y border-ivory/10 py-20 md:py-24" aria-labelledby="communes">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="communes" className="t-md">
              {z.communes.title}
            </h2>
            {z.communes.note && <p className="mt-4 text-grey">{z.communes.note}</p>}
          </div>
          <Reveal stagger={0.02} as="ul" className="flex flex-wrap gap-2">
            {z.communes.list.map((c) => (
              <li key={c} className="flex items-center gap-2 rounded-full border border-ivory/15 px-4 py-2 text-sm text-ivory/85">
                <Pin size={14} className="text-copper-light" />
                {c}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Études de cas */}
      <section className="container-x py-20 md:py-28" aria-labelledby="cas">
        <SectionHeader eyebrow="Études de cas" title="Des résultats *concrets*" id="cas" />
        <div className="mt-12">
          <CaseCards />
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x pb-24 md:pb-32" aria-labelledby="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" title={`Questions fréquentes *${z.inName}*`} id="faq" />
          <FaqList items={z.faq} />
        </div>
      </section>

      {/* Autres zones */}
      <section className="container-x pb-24" aria-labelledby="autres-zones">
        <h2 id="autres-zones" className="eyebrow mb-6">
          Autres zones d&apos;intervention
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/zones/${o.slug}`} className="group flex items-center justify-between rounded-2xl border border-ivory/12 px-5 py-4 transition-colors hover:border-copper-light/60">
                <span className="font-display text-2xl">{o.name}</span>
                <ArrowRight size={18} className="text-copper-light transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ContactSection title={z.cta.title} text={z.cta.text} />

      <JsonLd data={[webPageLd({ name: z.seo.title, description: z.seo.description, path }), faqLd(z.faq)]} />
    </>
  );
}
