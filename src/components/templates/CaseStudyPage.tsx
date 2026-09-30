import Link from "next/link";
import type { CaseStudyContent } from "@/content/types";
import { caseStudies } from "@/content/realisations";
import { serviceBySlug } from "@/content/services";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { CaseCards } from "@/components/sections/CaseCards";
import { ServiceLinks } from "@/components/sections/CrossLinks";
import { ParallaxVideos } from "@/components/sections/ParallaxVideos";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Paragraphs, Txt } from "@/components/ui/RichText";
import { VideoFrame } from "@/components/ui/VideoFrame";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageLd } from "@/lib/seo";

/** Gabarit des études de cas. */
export function CaseStudyPage({ c }: { c: CaseStudyContent }) {
  const others = caseStudies.filter((x) => x.slug !== c.slug).map((x) => x.slug);
  const path = `/realisations/${c.slug}`;
  const videos = c.videos.filter((v) => v.src);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Réalisations", path: "/realisations" },
          { name: c.client, path },
        ]}
        eyebrow={c.hero.eyebrow}
        title={c.hero.h1}
        intro={c.hero.intro}
        cta={false}
        aside={
          videos[0] ? (
            <div className="mx-auto w-[min(62vw,280px)] rotate-[4deg] lg:ml-auto lg:mr-6">
              <VideoFrame title={videos[0].title} src={videos[0].src} poster={videos[0].poster} />
            </div>
          ) : undefined
        }
      />

      {/* Fiche + chiffres */}
      <section className="container-x pb-20 md:pb-28" aria-label="Fiche du projet">
        <Reveal as="dl" stagger={0.06} className="grid grid-cols-2 gap-6 border-y border-ivory/12 py-8 md:grid-cols-4">
          <div>
            <dt className="eyebrow">Client</dt>
            <dd className="mt-2 font-display text-2xl">{c.client}</dd>
          </div>
          <div>
            <dt className="eyebrow">Secteur</dt>
            <dd className="mt-2 font-display text-2xl">{c.sector}</dd>
          </div>
          <div>
            <dt className="eyebrow">Localisation</dt>
            <dd className="mt-2 font-display text-2xl">
              <Txt>{c.location}</Txt>
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Services</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {c.services.length ? (
                c.services.map((s) => (
                  <Link key={s} href={`/${s}`} className="rounded-full border border-ivory/20 px-3 py-1 text-sm transition-colors hover:border-copper-light hover:text-copper-light">
                    {serviceBySlug(s)?.name}
                  </Link>
                ))
              ) : (
                <mark className="todo">[À COMPLÉTER : services réalisés]</mark>
              )}
            </dd>
          </div>
        </Reveal>

        {c.stats.length > 0 ? (
          <Reveal stagger={0.08} as="dl" className={`mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-ivory/10 ${c.stats.length === 4 ? "md:grid-cols-4" : c.stats.length > 2 ? "md:grid-cols-3 lg:grid-cols-5" : ""}`}>
            {c.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-4 bg-night p-5 md:p-6">
                <dd className="font-display text-5xl leading-none text-copper-light md:text-6xl">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </dd>
                <dt className="text-sm text-grey">{s.label}</dt>
              </div>
            ))}
          </Reveal>
        ) : (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-grey">
            Aucun chiffre n&apos;est publié pour ce projet : nous n&apos;affichons que des résultats mesurés et vérifiés.
          </p>
        )}
      </section>

      {/* Contexte + objectif */}
      <section className="container-x grid gap-14 pb-20 md:pb-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-5">Contexte</p>
          <SplitReveal as="h2" text="Le point de *départ*" className="t-lg" />
          <Reveal className="mt-8 space-y-5 leading-relaxed text-ivory/85">
            <Paragraphs items={c.context} />
          </Reveal>
        </div>
        <div>
          <p className="eyebrow mb-5">Objectif</p>
          <SplitReveal as="h2" text="Ce qu'il fallait *obtenir*" className="t-lg" />
          <Reveal className="mt-8 space-y-5 leading-relaxed text-ivory/85">
            <Paragraphs items={c.objective} />
          </Reveal>
        </div>
      </section>

      {/* Actions */}
      <section className="bg-deep py-20 md:py-28" aria-labelledby="actions">
        <div className="container-x">
          <SectionHeader eyebrow="Ce qu'on a fait" title="Notre *intervention*" id="actions" />
          <Reveal stagger={0.08} as="ol" className="mt-12 grid gap-5 md:grid-cols-3">
            {c.actions.map((a, i) => (
              <li key={i} className="card-surface p-6 md:p-7">
                <span className="font-display text-4xl text-copper-light">0{i + 1}</span>
                <h3 className="mt-4 font-display text-[1.7rem] leading-tight">
                  <Txt>{a.title}</Txt>
                </h3>
                <p className="mt-3 leading-relaxed text-ivory/75">
                  <Txt>{a.text}</Txt>
                </p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Vidéos 9:16 (affichées seulement si au moins une vidéo est disponible) */}
      {videos.length > 0 && (
        <section className="container-x py-20 md:py-28" aria-labelledby="videos">
          <SectionHeader eyebrow="En images" title="Les *vidéos*" intro="Formats verticaux 9:16, pensés pour Instagram, TikTok, Facebook et YouTube Shorts." id="videos" />
          <div className="mt-12">
            <ParallaxVideos videos={videos} />
          </div>
        </section>
      )}

      {/* Résultats */}
      <section className="border-y border-ivory/10 py-20 md:py-28" aria-labelledby="resultats">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Résultats</p>
            <SplitReveal as="h2" id="resultats" text="Ce que ça a *donné*" className="t-lg" />
          </div>
          <Reveal className="space-y-5 text-[1.075rem] leading-relaxed text-ivory/85">
            <Paragraphs items={c.results.paragraphs} />
          </Reveal>
        </div>
        {c.testimonial && (
          <Reveal className="container-x mt-16">
            <figure className="card-surface p-7 md:p-12">
              <blockquote className="t-md">
                « <Txt>{c.testimonial.quote}</Txt> »
              </blockquote>
              <figcaption className="mt-5 text-sm text-grey">
                — <Txt>{c.testimonial.author}</Txt>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </section>

      {/* Autres cas + services */}
      <section className="container-x py-20 md:py-28" aria-labelledby="autres">
        <SectionHeader eyebrow="Continuer" title="Autres *études de cas*" id="autres" />
        <div className="mt-12">
          <CaseCards slugs={others} />
        </div>
        <div className="mt-20">
          <ServiceLinks title="Les services mobilisés chez nous" />
        </div>
      </section>

      <ContactSection title="Et si le prochain cas, *c'était vous* ?" text="Un appel de 30 minutes suffit." />

      <JsonLd data={webPageLd({ name: c.seo.title, description: c.seo.description, path })} />
    </>
  );
}
