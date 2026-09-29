"use client";

import { useEffect, useRef } from "react";
import { gsap, FINE_POINTER } from "@/lib/gsap";

/**
 * Curseur personnalisé (point + anneau), uniquement sur desktop avec souris.
 * Ajoutez data-cursor="Voir" sur un élément pour afficher un libellé dans l'anneau.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER);
    if (!mq.matches || !dot.current || !ring.current) return;
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.1, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: reduce ? 0.1 : 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: reduce ? 0.1 : 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      html.classList.add("has-cursor");
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: Event) => {
      const t = (e.target as Element | null)?.closest?.("a, button, [data-cursor], input, textarea, select, label");
      const r = ring.current!;
      const txt = t?.getAttribute("data-cursor");
      r.classList.toggle("is-label", !!txt);
      r.classList.toggle("is-hover", !!t && !txt);
      if (label.current) label.current.textContent = txt ?? "";
    };
    const leave = () => html.classList.remove("has-cursor");

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      html.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring hidden md:grid" aria-hidden>
        <span ref={label} className="font-medium" />
      </div>
      <div ref={dot} className="cursor-dot hidden md:block" aria-hidden />
    </>
  );
}
