"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useNear } from "@/lib/useNear";
import { Txt } from "@/components/ui/RichText";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  delay?: number;
};

/** Texte révélé ligne par ligne (masques) à l'entrée dans l'écran. */
export function SplitReveal({ text, as: Tag = "h2", className = "", id, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const near = useNear(ref);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !near) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              rotate: 2,
              duration: 1.15,
              stagger: 0.09,
              delay,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });
    },
    { scope: ref, dependencies: [near] }
  );

  return (
    <Tag ref={ref} className={className} id={id}>
      <Txt>{text}</Txt>
    </Tag>
  );
}
