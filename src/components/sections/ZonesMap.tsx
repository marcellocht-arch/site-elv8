"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { zones, zonesHub } from "@/content/zones";

/**
 * Carte schématique (positions approximatives) : les trajets partent de Liège
 * vers chaque zone et se tracent au scroll.
 */
export function ZonesMap({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const base = zones[0].map!; // Liège

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
        gsap.utils.toArray<SVGPathElement>("[data-route]").forEach((p, i) => {
          const len = p.getTotalLength();
          tl.fromTo(p, { strokeDasharray: `${len} ${len}`, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none" }, i * 0.15);
        });
        tl.from("[data-node]", { scale: 0, opacity: 0, stagger: 0.1, ease: "back.out(2)" }, 0.2);
      });
    },
    { scope: ref }
  );

  const curve = (x: number, y: number) => {
    const mx = (base.x + x) / 2 + (y - base.y) * 0.15;
    const my = (base.y + y) / 2 - (x - base.x) * 0.15;
    return `M${base.x},${base.y} Q${mx},${my} ${x},${y}`;
  };

  return (
    <div ref={ref} className={`relative mx-auto aspect-[1/1.05] w-full max-w-[560px] ${className}`}>
      <div className="absolute inset-0 rounded-[2rem] border border-ivory/10 bg-[radial-gradient(circle_at_60%_20%,rgba(224,144,85,0.12),transparent_60%)]" />
      <svg viewBox="0 0 100 105" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="dots" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="0.6" cy="0.6" r="0.35" fill="rgba(243,238,230,0.12)" />
          </pattern>
        </defs>
        <rect x="2" y="2" width="96" height="101" rx="6" fill="url(#dots)" />
        {zones.slice(1).map((z) => (
          <path key={z.slug} data-route d={curve(z.map!.x, z.map!.y)} fill="none" stroke="#E09055" strokeWidth="0.45" strokeLinecap="round" />
        ))}
        {zonesHub.mapTowns.map((t) => (
          <path key={t.name} data-route d={curve(t.x, t.y)} fill="none" stroke="#E09055" strokeOpacity="0.35" strokeWidth="0.3" strokeDasharray="0.8 1.2" />
        ))}
        {zonesHub.mapTowns.map((t) => (
          <g key={t.name} data-node style={{ transformOrigin: `${t.x}px ${t.y}px`, transformBox: "view-box" }}>
            <circle cx={t.x} cy={t.y} r="0.9" fill="#F3EEE6" fillOpacity="0.7" />
            <text x={t.x + 2} y={t.y + 0.9} fontSize="2.6" fill="#9FB0BF" fontFamily="var(--font-sans)">
              {t.name}
            </text>
          </g>
        ))}
        <circle cx={base.x} cy={base.y} r="4" fill="#E09055" fillOpacity="0.18">
          <animate attributeName="r" values="2;6;2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.35;0;0.35" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Liens accessibles positionnés sur la carte */}
      {zones.map((z, i) => (
        <Link
          key={z.slug}
          href={`/zones/${z.slug}`}
          data-node
          className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          style={{ left: `${z.map!.x}%`, top: `${(z.map!.y / 105) * 100}%` }}
        >
          <span className={`block rounded-full border-2 border-deep ${i === 0 ? "h-4 w-4 bg-copper-light" : "h-3 w-3 bg-ivory"} transition-transform group-hover:scale-150`} />
          <span
            className={`whitespace-nowrap rounded-full bg-deep/85 px-2.5 py-1 text-xs font-medium backdrop-blur transition-colors group-hover:text-copper-light sm:text-sm ${
              z.map!.x > 55 ? "absolute right-5" : ""
            }`}
          >
            {z.name === "Province de Luxembourg" ? "Prov. de Luxembourg" : z.name}
            {i === 0 && <span className="ml-1 text-copper-light">· base</span>}
          </span>
        </Link>
      ))}
    </div>
  );
}
