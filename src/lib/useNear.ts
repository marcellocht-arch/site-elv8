"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Passe à true quand l'élément approche de l'écran.
 * Sert à préparer les animations coûteuses (découpage de texte) au dernier moment,
 * pour ne rien bloquer au chargement de la page.
 */
export function useNear(ref: RefObject<Element | null>, margin = "400px 0px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}
