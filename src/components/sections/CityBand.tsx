"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/** Signature des pages zones : le nom de la ville glisse, les communes défilent en sens inverse. */
export function CityBand({ name, communes }: { name: string; communes: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo("[data-city]", { xPercent: 8 }, { xPercent: -18, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo("[data-city-fill]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "center 40%", scrub: true } });
      });
    },
    { scope: ref }
  );
  const row = [...communes, ...communes];
  return (
    <div ref={ref} className="relative overflow-hidden py-10 md:py-16" aria-hidden>
      <div data-city className="relative whitespace-nowrap font-display leading-[0.85] tracking-[-0.045em] text-[24vw] lg:text-[18vw]">
        <span className="stroke-text">{name}</span>
        <span data-city-fill className="absolute inset-0 text-ivory [clip-path:inset(0_0%_0_0)]">
          {name}
          <span className="text-copper">.</span>
        </span>
      </div>
      <div className="mt-6 border-y border-ivory/10 py-4">
        <div className="marquee gap-10 text-lg text-grey md:text-2xl" style={{ ["--marquee-duration" as string]: "60s" }}>
          {row.map((c, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              {c}
              <span className="text-copper">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
