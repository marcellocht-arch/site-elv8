"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { VideoFrame } from "@/components/ui/VideoFrame";
import type { CaseStudyContent } from "@/content/types";

/** Galerie de vidéos 9:16 en parallaxe (chaque colonne défile à sa propre vitesse). */
export function ParallaxVideos({ videos }: { videos: CaseStudyContent["videos"] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(`(min-width: 768px) and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-par]").forEach((el, i) => {
          const speed = [60, -40, 90][i % 3];
          gsap.fromTo(el, { y: speed }, { y: -speed, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className="grid grid-cols-1 gap-8 xs:grid-cols-2 md:grid-cols-3 md:gap-8 md:py-16">
      {videos.map((v, i) => (
        <div key={i} data-par className={`mx-auto w-full max-w-[320px] ${i === 1 ? "md:mt-24" : ""}`}>
          <VideoFrame title={v.title} caption={v.caption} src={v.src} poster={v.poster} />
        </div>
      ))}
    </div>
  );
}
