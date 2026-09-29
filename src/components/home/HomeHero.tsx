import { home } from "@/content/home";
import { bookingHref } from "@/content/site";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { HeroGLLoader } from "@/components/motion/HeroGLLoader";
import { Button } from "@/components/ui/Button";
import { Txt } from "@/components/ui/RichText";

export function HomeHero() {
  const h = home.hero;
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* Fond : dégradé CSS immédiat, puis WebGL liquide cuivre (chargé après l'affichage) */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,rgba(200,121,65,0.35),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(30,58,85,0.9),transparent_60%)] bg-deep" />
      <div className="halo right-[-30%] top-[10%] h-[90vw] w-[90vw] max-h-[900px] max-w-[900px]" aria-hidden />
      <div aria-hidden className="absolute inset-0">
        <HeroGLLoader />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-deep/40 via-transparent to-night" />

      <div className="container-x relative flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] md:pb-14">
        <h1 id="hero-title">
          <span className="eyebrow hero-fade mb-6 flex items-center gap-3 md:mb-8" style={{ ["--d" as string]: "0s" }}>
            <span aria-hidden className="h-px w-8 bg-copper-light" />
            {h.eyebrow}
          </span>
          <HeroTitle as="span" text={h.h1} className="t-mega block max-w-[14ch] text-balance md:max-w-none" />
        </h1>
        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[1.2fr_1fr] md:items-end">
          <p className="t-lead hero-lead max-w-xl text-ivory/85" style={{ ["--d" as string]: "0.55s" }}>
            <Txt>{h.intro}</Txt>
          </p>
          <div className="hero-fade flex flex-wrap gap-3 md:justify-end" style={{ ["--d" as string]: "0.7s" }}>
            <Button href={bookingHref} size="lg">
              {h.primary}
            </Button>
            <Button href="/realisations" variant="ghost" size="lg" magnetic={false}>
              {h.secondary}
            </Button>
          </div>
        </div>
        <div className="hero-fade mt-12 flex items-center justify-between border-t border-ivory/15 pt-5 text-xs uppercase tracking-[0.16em] text-grey md:mt-16" style={{ ["--d" as string]: "0.85s" }}>
          <span className="flex items-center gap-3">
            <span aria-hidden className="relative h-8 w-[1px] overflow-hidden bg-ivory/20">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-copper-light motion-reduce:animate-none" />
            </span>
            {h.scroll}
          </span>
          <span className="hidden sm:block">Liège · Namur · Verviers · Luxembourg</span>
        </div>
      </div>
    </section>
  );
}
