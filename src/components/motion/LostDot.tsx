"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** 404 : « 4 0 4 » dont le point cuivre s'échappe et suit la souris. */
export function LostDot() {
  const dot = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = dot.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = gsap.quickTo(el, "x", { duration: 1.2, ease: "elastic.out(1, 0.5)" });
    const y = gsap.quickTo(el, "y", { duration: 1.2, ease: "elastic.out(1, 0.5)" });
    const move = (e: PointerEvent) => {
      const r = el.parentElement!.getBoundingClientRect();
      x(gsap.utils.clamp(-160, 160, (e.clientX - r.right) * 0.25));
      y(gsap.utils.clamp(-120, 120, (e.clientY - r.bottom) * 0.25));
    };
    const idle = gsap.to(el, { y: -18, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    const onFirst = () => idle.kill();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointermove", onFirst, { once: true });
    return () => {
      idle.kill();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointermove", onFirst);
    };
  }, []);
  return (
    <p aria-hidden className="font-display leading-none tracking-[-0.05em] text-ivory/90 text-[30vw] md:text-[16rem]">
      404
      <span ref={dot} className="inline-block text-copper">
        .
      </span>
    </p>
  );
}
