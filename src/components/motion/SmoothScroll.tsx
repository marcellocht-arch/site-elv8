"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Défilement fluide (Lenis) synchronisé avec GSAP ScrollTrigger. Desktop uniquement ; désactivé si « réduire les animations ». */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Smooth scroll uniquement à la souris : sur écran tactile, le défilement natif est le meilleur
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -90 },
    });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Changement de page : retour en haut (ou vers l'ancre), puis recalcul des déclencheurs.
  useEffect(() => {
    const lenis = window.__lenis;
    const hash = window.location.hash;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -90, duration: 1.2 });
          else target.scrollIntoView();
        }
      }
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
