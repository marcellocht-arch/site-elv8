"use client";

import { useEffect, useRef } from "react";
import { Play } from "./Icons";
import { Txt } from "./RichText";

type Props = {
  title: string;
  caption?: string;
  /** Chemin de la vidéo dans /public (ex. /videos/akp-kustom-1.mp4). Vide = emplacement à compléter. */
  src?: string;
  /** Image d'aperçu (ex. /images/akp-kustom-1.jpg). */
  poster?: string;
  className?: string;
};

/**
 * Cadre vidéo vertical 9:16.
 * La vidéo n'est chargée que lorsqu'elle approche de l'écran, et joue en boucle, sans son.
 */
export function VideoFrame({ title, caption, src, poster, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          if (!reduce) v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <figure className={`group ${className}`}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] border border-ivory/12 bg-gradient-to-b from-surface to-deep shadow-2xl shadow-black/40">
        {src ? (
          <video
            ref={ref}
            className="h-full w-full object-cover"
            poster={poster}
            muted
            loop
            playsInline
            controls
            preload="none"
            aria-label={title}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="halo halo--soft left-1/2 top-1/3 h-56 w-56 -translate-x-1/2" aria-hidden />
            <span className="relative grid h-14 w-14 place-items-center rounded-full border border-copper-light/60 text-copper-light">
              <Play size={20} />
            </span>
            <p className="relative text-sm text-ivory/80">{title}</p>
            <mark className="todo relative">[À COMPLÉTER : vidéo 9:16]</mark>
          </div>
        )}
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-2.5 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/40" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-grey">
          <Txt>{caption}</Txt>
        </figcaption>
      )}
    </figure>
  );
}
