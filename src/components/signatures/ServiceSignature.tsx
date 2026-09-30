"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import type { ServiceSignature as Kind } from "@/content/types";
import { Check } from "@/components/ui/Icons";

/* ------------------------------------------------------------------ */
/* Personal branding : le mot CONFIANCE se remplit de cuivre au scroll  */
/* ------------------------------------------------------------------ */
function Branding() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-fill]",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: 0.5 } }
        );
        gsap.from("[data-signal]", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 60%", once: true },
        });
      });
    },
    { scope: ref }
  );
  const word = "Confiance";
  return (
    <div ref={ref} className="relative">
      <p aria-hidden className="relative select-none text-center font-display leading-[0.85] tracking-[-0.045em] text-[18vw] lg:text-[15vw]">
        <span className="stroke-text">{word}</span>
        <span data-fill className="absolute inset-0 text-copper-light [clip-path:inset(0_0%_0_0)]">
          {word}
        </span>
      </p>
      <ul className="mt-10 grid gap-3 sm:grid-cols-3">
        {["Un visage que l'on reconnaît", "Une expertise démontrée", "Une recommandation naturelle"].map((s) => (
          <li data-signal key={s} className="card-surface flex items-center gap-3 px-5 py-4 text-ivory/90">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-copper-light text-deep">
              <Check size={16} />
            </span>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contenu vidéo : une pile de vidéos verticales qui se déploie         */
/* ------------------------------------------------------------------ */
const reels = [
  { label: "Coulisses", tone: "from-[#2a4a6b] to-[#12263a]" },
  { label: "Conseil d'expert", tone: "from-[#c87941] to-[#6b3a1a]" },
  { label: "Avant / après", tone: "from-[#1e3a55] to-[#0d1b2a]" },
  { label: "L'équipe", tone: "from-[#e09055] to-[#8a4a22]" },
  { label: "Réalisation", tone: "from-[#35597c] to-[#162c42]" },
];
function Video() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ all: "(min-width: 0px)", ok: MOTION_OK, wide: "(min-width: 768px)" }, (ctx) => {
        const { ok, wide } = ctx.conditions as { ok: boolean; wide: boolean };
        const cards = gsap.utils.toArray<HTMLElement>("[data-reel]");
        const spread = wide ? 190 : 62;
        const final = (i: number) => ({ x: (i - 2) * spread, rotation: (i - 2) * (wide ? 5 : 7), y: Math.abs(i - 2) * (wide ? 22 : 14) });
        if (!ok) {
          cards.forEach((c, i) => gsap.set(c, final(i)));
          return;
        }
        cards.forEach((c, i) => {
          gsap.fromTo(
            c,
            { x: 0, rotation: (i - 2) * 1.5, y: 0 },
            { ...final(i), ease: "none", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "center 45%", scrub: 0.6 } }
          );
        });
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className="relative flex h-[380px] items-center justify-center md:h-[520px]" aria-hidden>
      {reels.map((r, i) => (
        <div
          key={r.label}
          data-reel
          className={`absolute aspect-[9/16] w-[118px] rounded-[1.1rem] border border-ivory/15 bg-gradient-to-b ${r.tone} p-3 shadow-2xl shadow-black/50 md:w-[210px] md:rounded-[1.6rem] md:p-4`}
          style={{ zIndex: 10 - Math.abs(i - 2) }}
        >
          <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-ivory/85 md:text-xs ${i > 2 ? "justify-end" : ""}`}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" /> Rec
          </span>
          <span className={`absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4 ${i > 2 ? "text-right" : ""}`}>
            <span className={`mb-2 block h-1 w-2/3 rounded-full bg-ivory/30 ${i > 2 ? "ml-auto" : ""}`} />
            <span className="block font-display text-base leading-tight md:text-2xl">{r.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Publicité : la courbe 20 € → 780 € se dessine (cas réel AKP Kustom)  */
/* ------------------------------------------------------------------ */
function Ads() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const path = ref.current?.querySelector<SVGPathElement>("[data-line]");
        if (!path) return;
        const len = path.getTotalLength();
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
        tl.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none" })
          .fromTo("[data-area]", { opacity: 0 }, { opacity: 1, ease: "none" }, 0.3)
          .fromTo("[data-end]", { scale: 0, opacity: 0, transformOrigin: "center" }, { scale: 1, opacity: 1, ease: "back.out(2)" }, 0.8);
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className="card-surface relative overflow-hidden p-5 md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Cas réel · AKP Kustom</p>
          <p className="mt-2 font-display text-3xl md:text-5xl">
            20 € <span className="text-grey">→</span> <span className="text-copper-light">780 €</span>
          </p>
        </div>
        <p className="font-display text-5xl text-copper-light md:text-7xl">39×</p>
      </div>
      <svg viewBox="0 0 600 220" className="mt-6 h-auto w-full" role="img" aria-label="Courbe illustrant 20 euros investis transformés en 780 euros de chiffre d'affaires">
        <defs>
          <linearGradient id="adsArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E09055" stopOpacity="0.35" />
            <stop offset="1" stopColor="#E09055" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 90, 140, 190].map((y) => (
          <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="rgba(243,238,230,0.08)" />
        ))}
        <path data-area d="M10,200 C120,196 200,188 280,160 C360,130 430,80 590,22 L590,210 L10,210 Z" fill="url(#adsArea)" />
        <path data-line d="M10,200 C120,196 200,188 280,160 C360,130 430,80 590,22" fill="none" stroke="#E09055" strokeWidth="3" strokeLinecap="round" />
        <circle cx="10" cy="200" r="6" fill="#F3EEE6" />
        <g data-end>
          <circle cx="590" cy="22" r="14" fill="rgba(224,144,85,0.25)" />
          <circle cx="590" cy="22" r="7" fill="#E09055" />
        </g>
      </svg>
      <div className="mt-2 flex justify-between text-xs uppercase tracking-[0.14em] text-grey">
        <span>Budget investi</span>
        <span>Chiffre d&apos;affaires · 2 clients signés</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Site web : les blocs de la page se mettent en place                  */
/* ------------------------------------------------------------------ */
function Web() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const blocks = gsap.utils.toArray<HTMLElement>("[data-block]");
        blocks.forEach((b, i) => {
          gsap.from(b, {
            x: gsap.utils.random(-140, 140) * (i % 2 ? 1 : -1),
            y: gsap.utils.random(60, 160),
            rotation: gsap.utils.random(-14, 14),
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 85%", end: "center 50%", scrub: 0.7 },
          });
        });
        gsap.fromTo("[data-cta-glow]", { boxShadow: "0 0 0 0 rgba(224,144,85,0)" }, { boxShadow: "0 0 0 10px rgba(224,144,85,0.18)", repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut" });
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className="mx-auto max-w-4xl" aria-hidden>
      <div className="overflow-hidden rounded-2xl border border-ivory/15 bg-deep shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-ivory/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-ivory/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-copper" />
          <span className="ml-3 h-6 flex-1 rounded-full bg-surface/80 px-3 text-[11px] leading-6 text-grey">votre-entreprise.be</span>
        </div>
        <div className="grid gap-4 p-5 md:p-8">
          <div data-block className="flex items-center justify-between">
            <span className="h-4 w-20 rounded bg-ivory/80" />
            <span className="hidden gap-3 sm:flex">
              <span className="h-2.5 w-12 rounded bg-ivory/25" />
              <span className="h-2.5 w-12 rounded bg-ivory/25" />
              <span className="h-2.5 w-12 rounded bg-ivory/25" />
            </span>
          </div>
          <div data-block className="mt-4 space-y-3">
            <span className="block h-7 w-4/5 rounded bg-ivory/85 md:h-10" />
            <span className="block h-7 w-3/5 rounded bg-copper-light/90 md:h-10" />
          </div>
          <div data-block className="space-y-2">
            <span className="block h-2.5 w-2/3 rounded bg-ivory/25" />
            <span className="block h-2.5 w-1/2 rounded bg-ivory/25" />
          </div>
          <div data-block>
            <span data-cta-glow className="inline-flex rounded-full bg-copper-light px-5 py-2.5 text-sm font-semibold text-deep">
              Appeler maintenant
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div data-block key={i} className="h-20 rounded-xl border border-ivory/10 bg-surface md:h-28" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Community management : la conversation s'anime                       */
/* ------------------------------------------------------------------ */
const chat = [
  { from: "client", text: "Bonjour ! Vous êtes ouverts dimanche ?" },
  { from: "you", text: "Bonjour ! Oui, de 10 h à 14 h. Au plaisir de vous voir 🙂" },
  { from: "client", text: "Top, et vous faites aussi des devis pour les entreprises ?" },
  { from: "you", text: "Bien sûr. Je transmets à notre gérant qui vous rappelle aujourd'hui." },
];
function Community() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } });
        gsap.utils.toArray<HTMLElement>("[data-msg]").forEach((m, i) => {
          const typing = m.previousElementSibling as HTMLElement | null;
          if (typing?.dataset.typing !== undefined) {
            tl.fromTo(typing, { opacity: 0, height: 0 }, { opacity: 1, height: "auto", duration: 0.3 }, i === 0 ? 0 : "+=0.2").to(typing, { opacity: 0, height: 0, duration: 0.2 }, "+=0.6");
          }
          tl.from(m, { y: 20, opacity: 0, scale: 0.9, transformOrigin: m.dataset.side === "you" ? "right bottom" : "left bottom", duration: 0.6, ease: "back.out(1.6)" }, i === 0 ? 0.2 : "-=0.05");
        });
        tl.from("[data-answered]", { opacity: 0, y: 10, duration: 0.5 }, "+=0.2");
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className="mx-auto max-w-md">
      <div className="card-surface overflow-hidden p-4 md:p-6" aria-label="Exemple de conversation traitée par un community manager">
        <div className="mb-4 flex items-center gap-3 border-b border-ivory/10 pb-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-copper-light font-display text-lg text-deep">V</span>
          <div>
            <p className="text-sm font-semibold">Votre entreprise</p>
            <p className="text-xs text-grey">Répond en général dans l&apos;heure</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {chat.map((m, i) => (
            <div key={i} className="contents">
              {m.from === "you" && (
                <span data-typing className="ml-auto flex h-0 gap-1 overflow-hidden rounded-full px-3 opacity-0" aria-hidden>
                  <span className="my-2 h-1.5 w-1.5 animate-bounce rounded-full bg-grey" />
                  <span className="my-2 h-1.5 w-1.5 animate-bounce rounded-full bg-grey [animation-delay:.15s]" />
                  <span className="my-2 h-1.5 w-1.5 animate-bounce rounded-full bg-grey [animation-delay:.3s]" />
                </span>
              )}
              <p
                data-msg
                data-side={m.from}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-snug ${
                  m.from === "you" ? "ml-auto rounded-br-md bg-copper-light text-deep" : "rounded-bl-md bg-surface text-ivory"
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>
        <p data-answered className="mt-4 flex items-center justify-end gap-2 text-xs text-grey">
          <Check size={14} className="text-copper-light" /> Demande transmise au gérant
        </p>
      </div>
    </div>
  );
}

const map: Record<Kind, () => React.JSX.Element> = { branding: Branding, video: Video, ads: Ads, web: Web, community: Community };

/** Animation signature d'une page service. */
export function ServiceSignature({ kind }: { kind: Kind }) {
  const C = map[kind];
  return <C />;
}
