"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useNear } from "@/lib/useNear";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
};

const format = (n: number, decimals: number) =>
  new Intl.NumberFormat("fr-BE", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

/** Chiffre animé de 0 à sa valeur réelle quand il entre dans l'écran. */
export function Counter({ value, prefix = "", suffix = "", decimals = 0, className = "", duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const near = useNear(ref);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !near) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { n: 0 };
        const render = () => (el.textContent = `${prefix}${format(state.n, decimals)}${suffix}`);
        render();
        gsap.to(state, {
          n: value,
          duration,
          ease: "power3.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
        return () => {
          state.n = value;
          render();
        };
      });
    },
    { scope: ref, dependencies: [near] }
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
