import Link from "next/link";
import { zones, localZones, zonesHub } from "@/content/zones";
import { buildMetadata, webPageLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { ServiceLinks } from "@/components/sections/CrossLinks";
import { ZonesMap } from "@/components/sections/ZonesMap";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowUpRight } from "@/components/ui/Icons";

export const metadata = buildMetadata(zonesHub.seo, "/zones", "zones");

export default function Page() {
  const h = zonesHub.hero;
  return (
    <>
      <PageHero crumbs={[{ name: "Zones", path: "/zones" }]} eyebrow={h.eyebrow} title={h.h1} intro={h.intro} aside={<ZonesMap />} />
      <section className="container-x pb-20 md:pb-28" aria-label="Nos zones">
        <Reveal stagger={0.1} className="grid gap-5 md:grid-cols-2">
          {zones.map((z, i) => (
            <TiltCard key={z.slug} className="rounded-[var(--radius-card)]">
              <Link href={`/zones/${z.slug}`} data-cursor="Voir" className="card-surface group flex h-full min-h-[260px] flex-col p-7 md:p-9">
                <span className="eyebrow">Zone 0{i + 1}</span>
                <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">{z.name}</h2>
                <p className="mt-4 max-w-md text-ivory/75">{z.cardSummary}</p>
                <p className="mt-4 text-sm text-grey">{z.communes.list.slice(0, 6).join(" · ")}…</p>
                <span className="mt-auto flex items-center justify-between border-t border-ivory/10 pt-4 text-sm">
                  Découvrir la zone
                  <ArrowUpRight size={18} className="text-copper-light transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </Link>
            </TiltCard>
          ))}
        </Reveal>
        <div className="mt-16">
          <h2 className="eyebrow mb-6">Pages dédiées par commune</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {localZones.map((z) => (
              <li key={z.slug}>
                <Link href={`/zones/${z.slug}`} className="group flex h-full flex-col rounded-2xl border border-ivory/12 px-5 py-4 transition-colors hover:border-copper-light/60">
                  <span className="flex items-center justify-between font-display text-2xl">
                    {z.name}
                    <ArrowUpRight size={16} className="text-copper-light transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-1 text-sm text-grey">{z.cardSummary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 max-w-2xl text-grey">{zonesHub.outside}</p>
      </section>
      <section className="container-x pb-24 md:pb-32">
        <ServiceLinks title="Nos services, partout dans ces zones" />
      </section>
      <ContactSection />
      <JsonLd data={webPageLd({ name: zonesHub.seo.title, description: zonesHub.seo.description, path: "/zones" })} />
    </>
  );
}
