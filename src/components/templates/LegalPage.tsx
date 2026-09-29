import type { LegalContent } from "@/content/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Txt } from "@/components/ui/RichText";

/** Gabarit des pages légales : lisibilité avant tout. */
export function LegalPage({ c, path }: { c: LegalContent; path: string }) {
  return (
    <article className="container-x pb-24 pt-[calc(var(--header-h)+2rem)] md:pb-32 md:pt-[calc(var(--header-h)+3.5rem)]">
      <Breadcrumbs items={[{ name: c.h1, path }]} />
      <HeroTitle text={c.h1} className="t-xl mt-10 md:mt-14" />
      <p className="hero-fade mt-6 text-sm text-grey" style={{ ["--d" as string]: "0.3s" }}>
        Dernière mise à jour : <Txt>{c.updated}</Txt>
      </p>
      <div className="prose-elv8 hero-lead mt-12 max-w-3xl" style={{ ["--d" as string]: "0.4s" }}>
        {c.intro && (
          <p>
            <Txt>{c.intro}</Txt>
          </p>
        )}
        {c.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            {s.paragraphs?.map((p, i) => (
              <p key={i}>
                <Txt>{p}</Txt>
              </p>
            ))}
            {s.list && (
              <ul>
                {s.list.map((l, i) => (
                  <li key={i}>
                    <Txt>{l}</Txt>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
