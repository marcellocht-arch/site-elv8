"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroGL = dynamic(() => import("./HeroGL"), { ssr: false });

/** Charge l'effet WebGL après l'affichage initial (desktop), pour ne jamais retarder le contenu. */
export function HeroGLLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Effet réservé aux écrans avec souris (il réagit au pointeur) et aux connexions normales
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches || nav.connection?.saveData) return;
    const go = () => setReady(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const t = window.setTimeout(() => {
      if (w.requestIdleCallback) w.requestIdleCallback(go, { timeout: 1500 });
      else go();
    }, 900);
    return () => window.clearTimeout(t);
  }, []);

  return ready ? <HeroGL /> : null;
}
