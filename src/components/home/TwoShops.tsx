"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { home } from "@/content/home";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Txt } from "@/components/ui/RichText";

/** « Deux commerces, même rue » : au scroll, l'un s'éteint, l'autre attire les passants. */
export function TwoShops() {
  const p = home.problem;
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-street]", start: "top 75%", end: "bottom 55%", scrub: 0.8 },
        });
        tl.to("[data-shop-a]", { opacity: 0.45, filter: "saturate(0.2)", scale: 0.97, ease: "none" }, 0)
          .fromTo("[data-glow]", { opacity: 0 }, { opacity: 1, ease: "none" }, 0)
          .fromTo("[data-sign-b]", { color: "#9FB0BF" }, { color: "#E09055", ease: "none" }, 0)
          .fromTo(
            "[data-walker]",
            { x: (i) => (i % 2 ? -40 : -120), opacity: 0 },
            { x: (i) => 60 + (i % 3) * 30, opacity: 1, stagger: 0.08, ease: "power1.out" },
            0.1
          );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="container-x py-24 md:py-36" aria-labelledby="probleme-title">
      <p className="eyebrow mb-5">{p.eyebrow}</p>
      <SplitReveal as="h2" id="probleme-title" text={p.title} className="t-xl" />
      <p className="t-lead mt-6 max-w-2xl text-grey">
        <Txt>{p.intro}</Txt>
      </p>

      <div data-street className="relative mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-8">
        {/* Trottoir */}
        <div aria-hidden className="pointer-events-none absolute -bottom-6 left-0 right-0 hidden h-px bg-ivory/15 md:block" />

        <article data-shop-a className="card-surface relative p-6 md:p-9">
          <div className="flex items-center justify-between">
            <p className="font-display text-3xl text-grey md:text-4xl">{p.left.label}</p>
            <span className="rounded-full border border-ivory/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-grey">Invisible</span>
          </div>
          <ul className="mt-6 space-y-3">
            {p.left.lines.map((l) => (
              <li key={l} className="flex gap-3 text-ivory/75">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-grey" />
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-ivory/10 pt-5 font-display text-2xl text-ivory/70">{p.left.verdict}</p>
        </article>

        <article className="card-surface relative overflow-hidden p-6 md:p-9">
          <div data-glow aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(224,144,85,0.28),transparent_60%)]" />
          <div className="relative flex items-center justify-between">
            <p data-sign-b className="font-display text-3xl text-copper-light md:text-4xl">
              {p.right.label}
            </p>
            <span className="rounded-full bg-copper-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-deep">Visible</span>
          </div>
          <ul className="relative mt-6 space-y-3">
            {p.right.lines.map((l) => (
              <li key={l} className="flex gap-3 text-ivory/90">
                <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-copper-light" />
                {l}
              </li>
            ))}
          </ul>
          <p className="relative mt-8 border-t border-ivory/10 pt-5 font-display text-2xl text-ivory">{p.right.verdict}</p>
          <div aria-hidden className="relative mt-6 flex h-6 items-end gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} data-walker className="h-3 w-3 rounded-full bg-copper-light/80" style={{ opacity: 1 }} />
            ))}
          </div>
        </article>
      </div>

      <p className="t-md mx-auto mt-20 max-w-3xl text-center md:mt-28">
        <Txt>{p.conclusion}</Txt>
      </p>
    </section>
  );
}
