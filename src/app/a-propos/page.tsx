import Link from "next/link";
import { about } from "@/content/a-propos";
import { buildMetadata, webPageLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Paragraphs, Txt } from "@/components/ui/RichText";
import { ScrubWords } from "@/components/motion/ScrubWords";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";

export const metadata = buildMetadata(about.seo, "/a-propos", "a-propos");

export default function Page() {
  const a = about;
  return (
    <>
      <PageHero crumbs={[{ name: "À propos", path: "/a-propos" }]} eyebrow={a.hero.eyebrow} title={a.hero.h1} intro={a.hero.intro} />

      {/* Manifeste : animation signature (les mots s'allument au scroll) */}
      <section className="container-x py-20 md:py-32" aria-label="Manifeste">
        <p className="eyebrow mb-8">Manifeste</p>
        <ScrubWords text={a.manifesto} className="max-w-5xl font-display text-[2rem] leading-[1.15] md:text-[3.4rem]" />
      </section>

      {/* L'agence */}
      <section className="bg-deep py-20 md:py-28" aria-labelledby="agence">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">{a.story.title}</p>
            <SplitReveal as="h2" id="agence" text="Une agence *liégeoise*, tournée vers les entreprises d'ici" className="t-lg" />
            <Reveal className="mt-8 space-y-5 leading-relaxed text-ivory/85">
              <Paragraphs items={a.story.paragraphs} />
            </Reveal>
          </div>
          <Reveal>
            <figure className="card-surface overflow-hidden">
              <div className="relative grid aspect-[4/5] place-items-center bg-gradient-to-br from-surface to-deep">
                <div className="halo halo--soft inset-[10%]" aria-hidden />
                <mark className="todo relative">[À COMPLÉTER : photo du fondateur]</mark>
              </div>
              <figcaption className="p-6">
                <p className="font-display text-3xl">
                  <Txt>{a.story.founder.name}</Txt>
                </p>
                <p className="mt-1 text-sm text-copper-light">
                  <Txt>{a.story.founder.role}</Txt>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">
                  <Txt>{a.story.founder.bio}</Txt>
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="container-x py-20 md:py-28" aria-labelledby="vision">
        <SectionHeader eyebrow="Ce qui nous guide" title={a.vision.title} id="vision" />
        <Reveal stagger={0.08} className="mt-12 grid gap-5 sm:grid-cols-2">
          {a.vision.items.map((v, i) => (
            <TiltCard key={v.title} className="rounded-[var(--radius-card)]">
              <article className="card-surface h-full p-7 md:p-9">
                <span className="font-display text-4xl text-copper-light">0{i + 1}</span>
                <h3 className="mt-4 font-display text-3xl leading-tight">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ivory/75">{v.text}</p>
              </article>
            </TiltCard>
          ))}
        </Reveal>
      </section>

      {/* Méthode */}
      <section className="border-y border-ivory/10 py-20 md:py-28" aria-labelledby="methode">
        <div className="container-x">
          <SectionHeader eyebrow="La méthode" title={a.method.title} intro={a.method.intro} id="methode" />
          <Reveal stagger={0.1} as="ul" className="mt-12">
            {a.method.pillars.map((p, i) => (
              <li key={p.name}>
                <Link href={p.href} data-cursor="Voir" className="group grid items-center gap-3 border-t border-ivory/12 py-8 md:grid-cols-[80px_1fr_1.2fr_40px] md:gap-8">
                  <span className="font-display text-4xl text-copper-light">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-5xl leading-none transition-colors group-hover:text-copper-light md:text-6xl">{p.name}</span>
                    <span className="mt-2 block text-sm uppercase tracking-[0.14em] text-grey">{p.service}</span>
                  </span>
                  <span className="text-ivory/80">{p.text}</span>
                  <ArrowUpRight size={24} className="hidden text-copper-light transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:block" />
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Réseau de freelances */}
      <section className="container-x py-20 md:py-28" aria-labelledby="reseau">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Le réseau</p>
            <SplitReveal as="h2" id="reseau" text={a.network.title} className="t-lg" />
            <Reveal className="mt-8 space-y-5 leading-relaxed text-ivory/85">
              <Paragraphs items={a.network.paragraphs} />
            </Reveal>
          </div>
          <Reveal stagger={0.1} className="grid content-center gap-4">
            {a.network.roles.map((r) => (
              <Link key={r.title} href={r.href} className="card-surface group flex items-center justify-between gap-6 p-6 md:p-8">
                <span>
                  <span className="block font-display text-3xl leading-tight">{r.title}</span>
                  <span className="mt-2 block text-ivory/75">{r.text}</span>
                </span>
                <ArrowRight size={22} className="shrink-0 text-copper-light transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
            <p className="px-2 text-sm text-grey">
              {a.network.join}{" "}
              <a href="mailto:contact@elv8co.be" className="link-u">
                contact@elv8co.be
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <ContactSection title={a.cta.title} text={a.cta.text} />
      <JsonLd data={webPageLd({ name: a.seo.title, description: a.seo.description, path: "/a-propos" })} />
    </>
  );
}
