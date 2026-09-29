"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useNear } from "@/lib/useNear";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Anime les enfants directs un par un plutôt que le bloc entier. */
  stagger?: number;
  y?: number;
  delay?: number;
  start?: string;
};

/** Apparition en fondu vers le haut au scroll. */
export function Reveal({ children, as: Tag = "div", className = "", stagger, y = 40, delay = 0, start = "top 88%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const near = useNear(ref);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !near) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger !== undefined ? Array.from(el.children) : el;
        gsap.from(targets, {
          y,
          opacity: 0,
          duration: 1.1,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
    },
    { scope: ref, dependencies: [near] }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
