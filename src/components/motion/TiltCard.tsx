"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, FINE_POINTER, MOTION_OK } from "@/lib/gsap";

/** Carte avec profondeur au survol (inclinaison 3D + reflet). */
export function TiltCard({ children, className = "", max = 7 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${FINE_POINTER} and ${MOTION_OK}`, () => {
        const glare = el.querySelector<HTMLElement>("[data-glare]");
        gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * max * 2);
          rx(-py * max * 2);
          if (glare) {
            glare.style.opacity = "1";
            glare.style.background = `radial-gradient(420px circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(224,144,85,0.18), transparent 60%)`;
          }
        };
        const leave = () => {
          rx(0);
          ry(0);
          if (glare) glare.style.opacity = "0";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`relative will-change-transform ${className}`}>
      {children}
      <div data-glare aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500" />
    </div>
  );
}
