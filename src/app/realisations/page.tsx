import { realisationsHub } from "@/content/realisations";
import { buildMetadata, webPageLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CaseCards } from "@/components/sections/CaseCards";
import { ContactSection } from "@/components/sections/ContactSection";
import { ServiceLinks } from "@/components/sections/CrossLinks";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata(realisationsHub.seo, "/realisations", "realisations");

export default function Page() {
  const h = realisationsHub.hero;
  return (
    <>
      <PageHero crumbs={[{ name: "Réalisations", path: "/realisations" }]} eyebrow={h.eyebrow} title={h.h1} intro={h.intro} size="mega" />
      <section className="container-x pb-20 md:pb-28" aria-label="Études de cas">
        <CaseCards headingLevel="h2" />
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-grey">{realisationsHub.honesty}</p>
      </section>
      <section className="container-x pb-24 md:pb-32">
        <ServiceLinks title="Les services derrière ces résultats" />
      </section>
      <ContactSection />
      <JsonLd data={webPageLd({ name: realisationsHub.seo.title, description: realisationsHub.seo.description, path: "/realisations" })} />
    </>
  );
}
