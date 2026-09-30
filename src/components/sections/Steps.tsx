"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { TitledText } from "@/content/types";
import { Txt } from "@/components/ui/RichText";

/** Étapes numérotées reliées par une ligne cuivre qui se trace au scroll. */
export function Steps({ steps }: { steps: TitledText[] }) {
  const ref = useRef<HTMLOListElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: 0.5 } }
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
          gsap.from(el, { opacity: 0, x: 30, duration: 1, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          gsap.fromTo(
            el.querySelector("[data-dot]"),
            { backgroundColor: "rgba(224,144,85,0)", color: "#E09055" },
            { backgroundColor: "#E09055", color: "#0D1B2A", duration: 0.4, scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" } }
          );
        });
      });
    },
    { scope: ref }
  );
  return (
    <ol ref={ref} className="relative ml-5 md:ml-6">
      <span aria-hidden className="absolute bottom-6 left-0 top-6 w-px bg-ivory/12" />
      <span data-progress aria-hidden className="absolute bottom-6 left-0 top-6 w-px origin-top bg-copper-light" />
      {steps.map((s, i) => (
        <li data-step key={i} className="relative pb-12 pl-10 last:pb-0 md:pl-14">
          <span
            data-dot
            className="absolute left-0 top-0 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-copper-light bg-night font-display text-lg text-copper-light md:h-12 md:w-12"
          >
            {i + 1}
          </span>
          <h3 className="pt-1 font-display text-[1.8rem] leading-tight md:text-4xl">{s.title}</h3>
          <p className="mt-3 max-w-xl leading-relaxed text-ivory/75">
            <Txt>{s.text}</Txt>
          </p>
        </li>
      ))}
    </ol>
  );
}
