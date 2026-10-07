import { offres } from "@/content/offres";
import { buildMetadata, webPageLd, faqLd, absoluteUrl } from "@/lib/seo";
import { site, bookingHref } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqList } from "@/components/ui/FaqList";
import { Button } from "@/components/ui/Button";
import { Txt } from "@/components/ui/RichText";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Check } from "@/components/ui/Icons";

export const metadata = buildMetadata(offres.seo, "/offres", "offres");

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check size={18} className="mx-auto text-copper-light" aria-label="Inclus" />;
  if (v === false) return <span className="text-grey/50" aria-label="Non inclus">–</span>;
  return <span className="text-ivory/85">{v}</span>;
}

export default function Page() {
  const h = offres.hero;
  const offerLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Formules ELV8co",
    url: absoluteUrl("/offres"),
    itemListElement: offres.packs.map((p) => ({
      "@type": "Offer",
      name: `Formule ${p.name}`,
      description: `${p.tagline} ${p.forWho}`,
      seller: { "@type": "Organization", name: site.name, url: site.url },
      priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR", description: "Sur devis" },
      itemOffered: { "@type": "Service", name: `Formule ${p.name}`, areaServed: "Province de Liège" },
    })),
  };

  return (
    <>
      <PageHero crumbs={[{ name: "Offres", path: "/offres" }]} eyebrow={h.eyebrow} title={h.h1} intro={h.intro} />

      {/* Formules */}
      <section className="container-x pb-20 md:pb-28" aria-label="Nos formules">
        <Reveal stagger={0.08} as="ul" className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {offres.packs.map((p, i) => (
            <li key={p.id} id={p.id} className="scroll-mt-32">
              <TiltCard className="h-full rounded-[var(--radius-card)]">
                <div
                  className={`relative flex h-full flex-col rounded-[var(--radius-card)] p-7 md:p-8 ${
                    p.highlight ? "bg-copper-light text-deep" : "card-surface"
                  }`}
                >
                  {p.highlight && (
                    <span className="absolute right-5 top-5 rounded-full bg-deep px-3 py-1 text-xs font-medium text-copper-light">Le plus choisi</span>
                  )}
                  <span className={`eyebrow ${p.highlight ? "!text-deep/70" : ""}`}>Formule 0{i + 1}</span>
                  <h2 className="mt-4 font-display text-5xl leading-none">{p.name}</h2>
                  <p className={`mt-3 font-display text-xl italic ${p.highlight ? "text-deep" : "text-copper-light"}`}>{p.tagline}</p>
                  <p className={`mt-4 text-[0.95rem] leading-relaxed ${p.highlight ? "text-deep/80" : "text-ivory/75"}`}>
                    <Txt>{p.forWho}</Txt>
                  </p>
                  <div className={`my-6 h-px ${p.highlight ? "bg-deep/20" : "bg-ivory/10"}`} />
                  {p.base && <p className={`mb-3 text-sm font-medium ${p.highlight ? "text-deep" : "text-ivory"}`}>{p.base}</p>}
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[0.95rem] leading-snug">
                        <Check size={18} className={`mt-0.5 shrink-0 ${p.highlight ? "text-deep" : "text-copper-light"}`} />
                        <span className={p.highlight ? "text-deep" : "text-ivory/85"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button
                      href={bookingHref}
                      variant={p.highlight ? "light" : "ghost"}
                      magnetic={false}
                      external={/^https?:/.test(bookingHref)}
                      className="w-full justify-between"
                    >
                      Demander un devis
                    </Button>
                  </div>
                </div>
              </TiltCard>
            </li>
          ))}
        </Reveal>
        <p className="mt-8 text-sm text-grey">Toutes les formules sont sur devis. Le budget de diffusion publicitaire est payé directement à Meta.</p>
      </section>

      {/* Inclus partout */}
      <section className="bg-deep py-20 md:py-28" aria-labelledby="inclus">
        <div className="container-x">
          <SectionHeader eyebrow="La base" title={offres.allIncluded.title} id="inclus" />
          <Reveal stagger={0.06} as="ul" className="mt-12 grid gap-x-10 md:grid-cols-2">
            {offres.allIncluded.items.map((it, i) => (
              <li key={it.title} className="flex gap-5 border-t border-ivory/12 py-7">
                <span className="font-display text-3xl text-copper-light">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-[1.7rem] leading-tight">{it.title}</h3>
                  <p className="mt-2 leading-relaxed text-ivory/75">
                    <Txt>{it.text}</Txt>
                  </p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Comparatif */}
      <section className="container-x py-20 md:py-28" aria-labelledby="comparatif">
        <SectionHeader eyebrow="Comparatif" title="Les formules *côte à côte*" id="comparatif" />
        <Reveal className="mt-12 overflow-x-auto rounded-[var(--radius-card)] border border-ivory/10">
          <table className="w-full min-w-[640px] text-left text-[0.95rem]">
            <thead>
              <tr className="border-b border-ivory/10 bg-surface/50">
                <th scope="col" className="p-5 font-medium text-grey">
                  <span className="sr-only">Prestation</span>
                </th>
                {offres.compare.columns.map((c) => (
                  <th key={c} scope="col" className="p-5 text-center font-display text-2xl font-normal">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offres.compare.rows.map((r) => (
                <tr key={r.label} className="border-b border-ivory/10 last:border-0">
                  <th scope="row" className="p-5 font-normal text-ivory/85">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className="p-5 text-center">
                      <Cell v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* Démarrage */}
      <section className="container-x pb-20 md:pb-28">
        <div className="card-surface relative overflow-hidden p-7 md:p-14">
          <div className="halo right-[-10%] top-[-50%] h-[520px] w-[520px]" aria-hidden />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
            <SectionHeader title={offres.start.title} />
            <div>
              <p className="leading-relaxed text-ivory/85">
                <Txt>{offres.start.text}</Txt>
              </p>
              <Button href={bookingHref} className="mt-6" external={/^https?:/.test(bookingHref)}>
                En parler sur WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x pb-24 md:pb-32" aria-labelledby="faq">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader eyebrow="FAQ" title="Vos questions sur *les formules*" id="faq" />
          <FaqList items={offres.faq} />
        </div>
      </section>

      <ContactSection title={offres.cta.title} text={offres.cta.text} />
      <JsonLd data={[webPageLd({ name: offres.seo.title, description: offres.seo.description, path: "/offres" }), faqLd(offres.faq), offerLd]} />
    </>
  );
}
