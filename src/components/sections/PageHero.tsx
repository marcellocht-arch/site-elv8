import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Button } from "@/components/ui/Button";
import { Txt } from "@/components/ui/RichText";
import { bookingHref } from "@/content/site";
import type { Crumb } from "@/lib/seo";

type Props = {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  /** Visuel à droite (animation signature). */
  aside?: ReactNode;
  cta?: { label: string; href: string } | false;
  secondary?: { label: string; href: string };
  size?: "xl" | "mega";
};

/** Hero des pages intérieures : fil d'Ariane, H1 révélé mot par mot, chapeau, appels à l'action. */
export function PageHero({ crumbs, eyebrow, title, intro, aside, cta, secondary, size = "xl" }: Props) {
  const primary = cta === false ? null : cta ?? { label: "Réserver un appel de 30 min", href: bookingHref };
  return (
    <section className="relative overflow-x-clip pb-16 pt-[calc(var(--header-h)+2rem)] md:pb-24 md:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="halo right-[-25%] top-[-30%] h-[80vw] w-[80vw] max-h-[900px] max-w-[900px]" aria-hidden />
      <div className="halo halo--blue bottom-[-40%] left-[-30%] h-[70vw] w-[70vw] max-h-[800px] max-w-[800px]" aria-hidden style={{ animationDelay: "-4s" }} />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-10 grid items-end gap-12 md:mt-14 ${aside ? "lg:grid-cols-[1.35fr_1fr]" : ""}`}>
          <div>
            <p className="eyebrow hero-fade mb-6 flex items-center gap-3" style={{ ["--d" as string]: "0.1s" }}>
              <span aria-hidden className="h-px w-8 bg-copper-light" />
              {eyebrow}
            </p>
            <HeroTitle text={title} className={`${size === "mega" ? "t-mega" : "t-xl"} max-w-5xl text-balance`} />
            <p className="t-lead hero-lead mt-8 max-w-2xl text-ivory/80" style={{ ["--d" as string]: "0.45s" }}>
              <Txt>{intro}</Txt>
            </p>
            {(primary || secondary) && (
              <div className="hero-fade mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "0.6s" }}>
                {primary && (
                  <Button href={primary.href} size="lg">
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button href={secondary.href} variant="ghost" size="lg" magnetic={false}>
                    {secondary.label}
                  </Button>
                )}
              </div>
            )}
          </div>
          {aside && (
            <div className="hero-fade" style={{ ["--d" as string]: "0.5s" }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
