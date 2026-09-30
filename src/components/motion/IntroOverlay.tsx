"use client";

import { useEffect, useRef } from "react";

/**
 * Intro : le logo ELV8. se construit lettre par lettre, puis le rideau révèle la page.
 * Animation 100 % CSS (voir globals.css) : elle démarre avant le JavaScript et ne bloque jamais l'affichage.
 * Jouée une seule fois par session ; ignorée si « réduire les animations ».
 */
export function IntroOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const done = (e: AnimationEvent) => {
      if (e.target !== el) return;
      el.style.display = "none";
    };
    el.addEventListener("animationend", done);
    return () => el.removeEventListener("animationend", done);
  }, []);

  const chars = ["E", "L", "V", "8"];
  return (
    <div ref={ref} className="intro" aria-hidden>
      <div className="intro__logo">
        {chars.map((c, i) => (
          <span key={c} className="intro__char">
            <span style={{ ["--i" as string]: i }}>{c}</span>
          </span>
        ))}
        <span className="intro__dot">.</span>
      </div>
      <span className="intro__line" />
    </div>
  );
}

/** Script inline exécuté avant l'affichage : décide si l'intro est jouée. */
export const introScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(r||sessionStorage.getItem('elv8-intro')){d.classList.add('intro-skip')}else{sessionStorage.setItem('elv8-intro','1')}}catch(e){}})();`;
