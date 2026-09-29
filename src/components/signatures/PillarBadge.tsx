import type { ComponentType, SVGProps } from "react";

type Props = { word: string; Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }> };

/** Médaillon rotatif (texte circulaire + icône en trait fin) pour les heros de services. */
export function PillarBadge({ word, Icon }: Props) {
  const text = `${word} · ${word} · ${word} · `.toUpperCase();
  return (
    <div className="relative mx-auto aspect-square w-[min(52vw,340px)] lg:ml-auto lg:mr-0" aria-hidden>
      <div className="halo halo--soft inset-[-15%]" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id={`c-${word}`} d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
        </defs>
        <text fill="#E09055" fontSize="12.5" letterSpacing="4.2" fontFamily="var(--font-sans)">
          <textPath href={`#c-${word}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-[22%] grid place-items-center rounded-full border border-ivory/15 bg-gradient-to-br from-surface to-deep shadow-2xl shadow-black/40">
        <Icon size={72} className="text-ivory" />
      </div>
    </div>
  );
}
