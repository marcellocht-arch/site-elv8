"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { home } from "@/content/home";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Txt } from "@/components/ui/RichText";

// Positions finales (diagramme de Venn) et positions de départ (éclatées)
const circles = [
  { key: "a", cx: 300, cy: 205, from: { x: 0, y: -150 }, label: 0, lx: 300, ly: 135 },
  { key: "b", cx: 228, cy: 330, from: { x: -210, y: 110 }, label: 1, lx: 160, ly: 385 },
  { key: "c", cx: 372, cy: 330, from: { x: 210, y: 110 }, label: 2, lx: 440, ly: 385 },
];

/** Fusion des 3 services principaux : confiance + régularité + portée = clients. */
export function Synergy() {
  const ref = useRef<HTMLElement>(null);
  const s = home.synergy;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ desktop: `(min-width: 1024px) and ${MOTION_OK}`, mobile: `(max-width: 1023px) and ${MOTION_OK}` }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const tl = gsap.timeline({
          scrollTrigger: desktop
            ? { trigger: "[data-syn-stage]", start: "center center", end: "+=110%", pin: "[data-syn-pin]", scrub: 0.8, anticipatePin: 1 }
            : { trigger: "[data-syn-stage]", start: "top 80%", end: "bottom 55%", scrub: 0.8 },
        });
        circles.forEach((c) => {
          tl.from(`[data-c="${c.key}"]`, { x: c.from.x, y: c.from.y, scale: 0.7, svgOrigin: `${c.cx} ${c.cy}`, ease: "power2.out" }, 0);
        });
        tl.from("[data-center]", { opacity: 0, scale: 0.4, svgOrigin: "300 290", ease: "back.out(2)", duration: 0.4 }, 0.65)
          .from("[data-ring]", { opacity: 0, scale: 0.8, svgOrigin: "300 290", duration: 0.4 }, 0.7)
          .from("[data-pillar]", { opacity: 0.25, stagger: 0.12, duration: 0.3 }, 0.1);
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-24 md:py-36" aria-labelledby="synergie-title">
      <div className="halo left-1/2 top-1/3 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] -translate-x-1/2" aria-hidden />
      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-5">{s.eyebrow}</p>
          <SplitReveal as="h2" id="synergie-title" text={s.title} className="t-xl" />
        </div>

        <div data-syn-pin className="mt-12 lg:mt-4">
          <div data-syn-stage className="grid items-center gap-10 lg:min-h-[100svh] lg:grid-cols-[1fr_1.1fr]">
            <ul className="order-2 space-y-4 lg:order-1">
              {s.pillars.map((p, i) => (
                <li key={p.name} data-pillar className="card-surface flex gap-5 p-5 md:p-6">
                  <span className="font-display text-4xl text-copper-light">0{i + 1}</span>
                  <div>
                    <p className="font-display text-3xl leading-none">
                      {p.name} <span className="font-sans text-xs uppercase tracking-[0.14em] text-grey">· {p.service}</span>
                    </p>
                    <p className="mt-2 text-ivory/75">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <svg viewBox="0 0 600 560" className="order-1 mx-auto w-full max-w-[560px] lg:order-2" role="img" aria-label="Diagramme : confiance, régularité et portée se rejoignent au centre sur les clients">
              <defs>
                <radialGradient id="synFill" cx="50%" cy="45%" r="60%">
                  <stop offset="0" stopColor="#E09055" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#C87941" stopOpacity="0.12" />
                </radialGradient>
              </defs>
              {circles.map((c) => (
                <g key={c.key} data-c={c.key} style={{ mixBlendMode: "screen" }}>
                  <circle cx={c.cx} cy={c.cy} r="150" fill="url(#synFill)" stroke="#E09055" strokeOpacity="0.7" strokeWidth="1.2" />
                  <text x={c.lx} y={c.ly} textAnchor="middle" fill="#F3EEE6" fontFamily="var(--font-display)" fontSize="30">
                    {s.pillars[c.label].name}
                  </text>
                </g>
              ))}
              <circle data-ring cx="300" cy="290" r="54" fill="none" stroke="#F3EEE6" strokeOpacity="0.5" strokeDasharray="3 6" />
              <g data-center>
                <circle cx="300" cy="290" r="40" fill="#E09055" />
                <text x="300" y="297" textAnchor="middle" fill="#0D1B2A" fontFamily="var(--font-sans)" fontWeight="600" fontSize="17">
                  {s.center}
                </text>
              </g>
            </svg>
          </div>
        </div>

        <p className="t-lead mx-auto mt-16 max-w-3xl text-center text-ivory/80 lg:mt-0">
          <Txt>{s.conclusion}</Txt>
        </p>
      </div>
    </section>
  );
}
