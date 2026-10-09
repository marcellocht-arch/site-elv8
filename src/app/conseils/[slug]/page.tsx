import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { conseils, articleBySlug } from "@/content/conseils";
import { buildMetadata, faqLd, absoluteUrl } from "@/lib/seo";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqList } from "@/components/ui/FaqList";
import { Button } from "@/components/ui/Button";
import { Txt } from "@/components/ui/RichText";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight } from "@/components/ui/Icons";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return conseils.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return buildMetadata(a.seo, `/conseils/${a.slug}`, `conseils-${a.slug}`);
}

const fmt = (d: string) => new Date(d).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const path = `/conseils/${a.slug}`;
  const others = conseils.filter((o) => o.slug !== a.slug);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.seo.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    inLanguage: "fr-BE",
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(`/og/conseils-${a.slug}`),
    author: { "@type": "Person", name: "Marcel Locht", url: absoluteUrl("/a-propos") },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <PageHero
        crumbs={[{ name: "Conseils", path: "/conseils" }, { name: a.title, path }]}
        eyebrow={`${a.category} · ${a.readMinutes} min de lecture · ${fmt(a.date)}${a.updated && a.updated !== a.date ? ` · mis à jour le ${fmt(a.updated)}` : ""}`}
        title={a.title}
        intro={a.intro}
        cta={false}
      />
      <article className="container-x pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl space-y-14">
          {a.sections.map((s) => (
            <Reveal key={s.h2} as="section">
              <h2 className="t-md">{s.h2}</h2>
              <div className="mt-5 space-y-5 text-[1.075rem] leading-relaxed text-ivory/85">
                {s.paragraphs.map((p) => (
                  <p key={p}>
                    <Txt>{p}</Txt>
                  </p>
                ))}
                {s.list && (
                  <ul className="space-y-2 pl-5">
                    {s.list.map((li) => (
                      <li key={li} className="list-disc marker:text-copper-light">
                        <Txt>{li}</Txt>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
          <div className="card-surface flex flex-col items-start gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-9">
            <p className="font-display text-2xl leading-tight">Envie qu&apos;on s&apos;en occupe pour vous ?</p>
            <Button href={a.related.href}>{a.related.label}</Button>
          </div>
        </div>
      </article>
      {a.faq && (
        <section className="container-x pb-20 md:pb-28" aria-labelledby="faq">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeader eyebrow="FAQ" title="Questions *fréquentes*" id="faq" />
            <FaqList items={a.faq} />
          </div>
        </section>
      )}
      <section className="container-x pb-24" aria-labelledby="autres">
        <h2 id="autres" className="eyebrow mb-6">
          Autres conseils
        </h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/conseils/${o.slug}`} className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-ivory/12 px-5 py-4 transition-colors hover:border-copper-light/60">
                <span className="font-display text-xl leading-snug">{o.title}</span>
                <ArrowRight size={18} className="shrink-0 text-copper-light transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ContactSection />
      <JsonLd data={a.faq ? [articleLd, faqLd(a.faq)] : articleLd} />
    </>
  );
}
