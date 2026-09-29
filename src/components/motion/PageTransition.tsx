"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";

/**
 * Transition entre les pages : un rideau bleu profond (filet cuivre) couvre l'écran,
 * la page suivante se charge, puis le rideau se retire.
 * Fonctionne avec tous les liens internes <Link> / <a> sans les modifier.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (reduce.matches || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // même page (ancre) : comportement normal
      if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return; // fichiers

      e.preventDefault();
      pending.current = true;
      const el = curtain.current;
      if (!el) {
        router.push(url.pathname + url.search + url.hash);
        return;
      }
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { yPercent: 100, visibility: "visible" },
        {
          yPercent: 0,
          duration: 0.55,
          ease: "expo.inOut",
          onComplete: () => router.push(url.pathname + url.search + url.hash),
        }
      );
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [router]);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Après une navigation client : les titres attendent le rideau, pas l'intro.
    document.documentElement.classList.add("intro-done");
    if (!pending.current) return;
    pending.current = false;
    const el = curtain.current;
    if (!el) return;
    gsap.to(el, { yPercent: -100, duration: 0.75, ease: "expo.inOut", delay: 0.05, onComplete: () => gsap.set(el, { visibility: "hidden" }) });
  }, [pathname]);

  return <div ref={curtain} className="page-curtain" aria-hidden />;
}
