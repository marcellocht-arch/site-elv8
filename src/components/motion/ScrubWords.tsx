"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useNear } from "@/lib/useNear";
import { Txt } from "@/components/ui/RichText";

/** Manifeste : les mots s'allument un à un au rythme du scroll. */
export function ScrubWords({ text, as: Tag = "p", className = "" }: { text: string; as?: ElementType; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const near = useNear(ref);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !near) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // aria "none" : le texte reste lu normalement ; couleur de départ lisible (contraste > 3:1 en grand corps)
        const split = SplitText.create(el, { type: "words", wordsClass: "scrub-word", aria: "none" });
        gsap.fromTo(
          split.words,
          { color: "#6F8396" },
          {
            color: "#F3EEE6",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          }
        );
        return () => split.revert();
      });
    },
    { scope: ref, dependencies: [near] }
  );

  return (
    <Tag ref={ref} className={className}>
      <Txt>{text}</Txt>
    </Tag>
  );
}
