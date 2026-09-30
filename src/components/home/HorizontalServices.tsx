"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { home } from "@/content/home";
import { principalServices } from "@/content/services";
import { serviceIcons, ArrowRight, Check } from "@/components/ui/Icons";
import { Txt } from "@/components/ui/RichText";

/**
 * Section épinglée : les 3 services principaux défilent horizontalement (desktop).
 * Sur mobile ou si « réduire les animations » : empilement vertical classique.
 */
export function HorizontalServices() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          gsap.from(panel.querySelectorAll("[data-p-in]"), {
            y: 60,
            opacity: 0,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 75%", toggleActions: "play none none reverse" },
          });
          const big = panel.querySelector("[data-big]");
          if (big) gsap.fromTo(big, { xPercent: 12 }, { xPercent: -12, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        });
        gsap.fromTo("[data-hbar]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
      });
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative overflow-hidden bg-deep hz:h-[100svh]" aria-labelledby="services-title">
      <div ref={track} className="flex flex-col hz:h-full hz:w-max hz:flex-row">
        {/* Panneau d'intro */}
        <div className="container-x flex flex-col justify-center py-24 hz:w-[42vw] hz:max-w-none hz:py-0 hz:pl-[max(3rem,calc((100vw-1360px)/2+3rem))] hz:pr-16">
          <p className="eyebrow mb-5">{home.services.eyebrow}</p>
          <h2 id="services-title" className="t-xl">
            <Txt>{home.services.title}</Txt>
          </h2>
          <p className="t-lead mt-6 max-w-md text-grey">{home.services.intro}</p>
          <p aria-hidden className="mt-10 hidden items-center gap-3 text-xs uppercase tracking-[0.16em] text-grey hz:flex">
            Défilez <ArrowRight size={16} className="text-copper-light" />
          </p>
        </div>

        {principalServices.map((s, i) => {
          const Icon = serviceIcons[s.slug as keyof typeof serviceIcons];
          return (
            <article
              key={s.slug}
              data-panel
              className="relative flex min-h-[88svh] items-center overflow-hidden border-t border-ivory/10 hz:h-full hz:min-h-0 hz:w-[78vw] hz:border-l hz:border-t-0 xl:hz:w-[64vw]"
            >
              <span
                data-big
                aria-hidden
                className="stroke-text pointer-events-none absolute -bottom-[0.18em] left-0 select-none whitespace-nowrap font-display leading-none text-[34vw] lg:text-[22vw]"
              >
                {s.pillar}
              </span>
              <div className="container-x relative py-20 lg:px-16 lg:py-0">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
                  <div>
                    <p data-p-in className="flex items-center gap-4 text-copper-light">
                      <span className="font-display text-5xl">0{i + 1}</span>
                      <span className="eyebrow">{s.pillar}</span>
                    </p>
                    <h3 data-p-in className="mt-6 font-display text-[2.8rem] leading-[0.95] md:text-7xl">
                      {s.name}
                    </h3>
                    <p data-p-in className="t-lead mt-6 max-w-md text-ivory/80">
                      {s.tagline}
                    </p>
                    <Link
                      data-p-in
                      href={`/${s.slug}`}
                      data-cursor="Découvrir"
                      className="group mt-8 inline-flex items-center gap-3 rounded-full border border-ivory/25 px-5 py-3 transition-colors hover:border-copper-light hover:text-copper-light"
                    >
                      {home.services.cta} <span className="sr-only">{s.name}</span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div data-p-in className="card-surface self-center bg-night/70 p-6 backdrop-blur-sm md:p-8">
                    <Icon size={40} className="text-copper-light" />
                    <ul className="mt-6 space-y-3">
                      {s.included.items.slice(0, 4).map((it) => (
                        <li key={it.title} className="flex gap-3 text-ivory/85">
                          <Check size={18} className="mt-0.5 shrink-0 text-copper-light" />
                          {it.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div aria-hidden className="absolute bottom-0 left-0 right-0 hidden h-[2px] bg-ivory/10 hz:block">
        <div data-hbar className="h-full origin-left bg-copper-light" />
      </div>
    </section>
  );
}
