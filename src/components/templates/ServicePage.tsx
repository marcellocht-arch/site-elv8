import type { ServiceContent } from "@/content/types";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { CaseCards } from "@/components/sections/CaseCards";
import { ServiceLinks, ZoneLinks } from "@/components/sections/CrossLinks";
import { Steps } from "@/components/sections/Steps";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqList } from "@/components/ui/FaqList";
import { Paragraphs, Txt } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { PillarBadge } from "@/components/signatures/PillarBadge";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { ServiceSignature } from "@/components/signatures/ServiceSignature";
import { JsonLd } from "@/components/seo/JsonLd";
import { Check, serviceIcons } from "@/components/ui/Icons";
import { faqLd, serviceLd } from "@/lib/seo";

/** Gabarit commun aux 5 pages services. */
export function ServicePage({ s }: { s: ServiceContent }) {
  const Icon = serviceIcons[s.slug as keyof typeof serviceIcons];
  const complementary = s.kind === "complementaire";
  const formService = s.name === "Création de sites web" ? "Création de site web" : s.name;

  return (
    <>
      <PageHero
        crumbs={[{ name: s.name, path: `/${s.slug}` }]}
        eyebrow={s.hero.eyebrow}
        title={s.hero.h1}
        intro={s.hero.intro}
        aside={
          s.video ? (
            <div className="mx-auto w-[min(62vw,280px)] rotate-[4deg] lg:ml-auto lg:mr-6">
              <VideoFrame title={s.video.title} src={s.video.src} poster={s.video.poster} />
            </div>
          ) : (
            <PillarBadge word={s.pillar ?? "Réseau"} Icon={Icon} />
          )
        }
        secondary={{ label: "Voir les réalisations", href: "/realisations" }}
      />

      {/* Problème */}
      <section className="container-x py-20 md:py-28" aria-labelledby="probleme">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Le problème</p>
            <SplitReveal as="h2" id="probleme" text={s.problem.title} className="t-lg" />
            <Reveal className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-ivory/80">
              <Paragraphs items={s.problem.paragraphs} />
            </Reveal>
          </div>
          {s.problem.points && (
            <Reveal stagger={0.1} as="ul" className="self-end">
              {s.problem.points.map((p, i) => (
                <li key={i} className="flex gap-5 border-t border-ivory/12 py-5 last:border-b">
                  <span className="font-display text-2xl text-copper-light">0{i + 1}</span>
                  <span className="pt-1 text-ivory/90">
                    <Txt>{p}</Txt>
                  </span>
                </li>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {/* Animation signature */}
      <section className="overflow-hidden py-10 md:py-16" aria-label="Illustration animée">
        <div className="container-x">
          <ServiceSignature kind={s.signature} />
        </div>
      </section>

      {/* Solution */}
      <section className="container-x py-20 md:py-28" aria-labelledby="solution">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow mb-5">La solution ELV8co</p>
            <SplitReveal as="h2" id="solution" text={s.solution.title} className="t-lg" />
          </div>
          <Reveal stagger={0.08} className="space-y-6 text-[1.075rem] leading-relaxed text-ivory/85 [&>p:first-child]:text-[1.2rem] [&>p:first-child]:text-ivory">
            <Paragraphs items={s.solution.paragraphs} />
          </Reveal>
        </div>
      </section>

      {/* Inclus */}
      <section className="relative overflow-hidden bg-deep py-20 md:py-28" aria-labelledby="inclus">
        <div className="halo halo--soft right-[-20%] top-[10%] h-[50vw] w-[50vw]" aria-hidden />
        <div className="container-x relative">
          <SectionHeader eyebrow="Concrètement" title={s.included.title} intro={s.included.intro} id="inclus" />
          <Reveal stagger={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.included.items.map((it, i) => (
              <TiltCard key={i} className="h-full rounded-[var(--radius-card)]">
                <article className="card-surface h-full p-6 md:p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-copper-light/50 text-copper-light">
                    <Check size={18} />
                  </span>
                  <h3 className="mt-5 font-display text-[1.7rem] leading-tight">{it.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/75">
                    <Txt>{it.text}</Txt>
                  </p>
                </article>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Réseau de freelances (services complémentaires) */}
      {complementary && s.network && (
        <section className="container-x py-20 md:py-28" aria-labelledby="reseau">
          <div className="card-surface relative overflow-hidden p-7 md:p-14">
            <div className="halo left-[-10%] top-[-40%] h-[500px] w-[500px]" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="eyebrow mb-5">Piloté par ELV8co</p>
                <SplitReveal as="h2" id="reseau" text={s.network.title} className="t-md" />
              </div>
              <Reveal className="space-y-5 leading-relaxed text-ivory/85">
                <Paragraphs items={s.network.paragraphs} />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Déroulé */}
      <section className="container-x py-20 md:py-28" aria-labelledby="deroule">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader eyebrow="Le déroulé" title={s.process.title} id="deroule" />
          </div>
          <Steps steps={s.process.steps} />
        </div>
      </section>

      {/* Pour qui */}
      <section className="border-y border-ivory/10 py-20 md:py-28" aria-labelledby="pour-qui">
        <div className="container-x">
          <SectionHeader eyebrow="Pour qui" title={s.forWho.title} intro={s.forWho.intro} id="pour-qui" />
          <Reveal stagger={0.06} as="ul" className="mt-12">
            {s.forWho.profiles.map((p, i) => (
              <li key={i} className="group grid gap-2 border-t border-ivory/12 py-6 transition-colors last:border-b hover:bg-surface/30 md:grid-cols-[1fr_1.4fr] md:gap-10 md:px-4">
                <h3 className="font-display text-[1.75rem] leading-tight transition-colors group-hover:text-copper-light md:text-3xl">{p.title}</h3>
                <p className="leading-relaxed text-ivory/75 md:pt-1">
                  <Txt>{p.text}</Txt>
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Résultats */}
      <section className="container-x py-20 md:py-28" aria-labelledby="resultats">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Résultats</p>
            <SplitReveal as="h2" id="resultats" text={s.results.title} className="t-lg" />
            <Reveal className="mt-8 space-y-5 leading-relaxed text-ivory/85">
              <Paragraphs items={s.results.paragraphs} />
            </Reveal>
          </div>
          {s.results.points && (
            <Reveal stagger={0.08} as="ul" className="grid content-end gap-3">
              {s.results.points.map((p, i) => (
                <li key={i} className="card-surface flex items-center gap-4 px-5 py-4">
                  <Check size={20} className="shrink-0 text-copper-light" />
                  <Txt>{p}</Txt>
                </li>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {/* Études de cas */}
      <section className="bg-deep py-20 md:py-28" aria-labelledby="cas">
        <div className="container-x">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="Études de cas" title="Ce que ça donne *en vrai*" id="cas" />
            <Button href="/realisations" variant="ghost" magnetic={false}>
              Toutes les réalisations
            </Button>
          </div>
          <CaseCards slugs={s.relatedCases} />
        </div>
      </section>

      {/* Maillage zones + services */}
      <section className="container-x grid gap-16 py-20 md:py-28">
        <ZoneLinks serviceName={s.name} title={`${s.name} près de chez vous`} />
        <ServiceLinks exclude={s.slug} title="Les autres services" />
      </section>

      {/* FAQ */}
      <section className="container-x pb-24 md:pb-32" aria-labelledby="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" title="Vos questions" id="faq" />
          <FaqList items={s.faq} />
        </div>
      </section>

      <ContactSection title={s.cta.title} text={s.cta.text} defaultService={formService} />

      <JsonLd
        data={[
          serviceLd({ name: s.name, description: s.seo.description, path: `/${s.slug}`, serviceType: s.seo.keywords.primary }),
          faqLd(s.faq),
        ]}
      />
    </>
  );
}
