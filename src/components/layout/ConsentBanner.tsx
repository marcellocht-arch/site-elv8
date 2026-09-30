"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Mesure d'audience + bandeau de consentement.
 *
 * Par défaut : AUCUN outil de mesure, aucun cookie, aucun bandeau.
 * Pour activer, renseignez NEXT_PUBLIC_ANALYTICS_PROVIDER ("plausible" ou "ga")
 * et l'identifiant correspondant (voir .env.example et README).
 * Le script n'est chargé qu'après acceptation explicite.
 */
const PROVIDER = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const KEY = "elv8-consent";

function loadAnalytics() {
  if (document.getElementById("elv8-analytics")) return;
  if (PROVIDER === "plausible" && PLAUSIBLE_DOMAIN) {
    const s = document.createElement("script");
    s.id = "elv8-analytics";
    s.defer = true;
    s.dataset.domain = PLAUSIBLE_DOMAIN;
    s.src = "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }
  if (PROVIDER === "ga" && GA_ID) {
    const s = document.createElement("script");
    s.id = "elv8-analytics";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
    document.head.appendChild(s);
    const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", GA_ID, { anonymize_ip: true });
  }
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!PROVIDER) return;
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch {}
    if (choice === "granted") loadAnalytics();
    else if (!choice) setOpen(true);

    const reopen = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-consent-open]")) setOpen(true);
    };
    document.addEventListener("click", reopen);
    return () => document.removeEventListener("click", reopen);
  }, []);

  if (!PROVIDER || !open) return null;

  const decide = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    if (value === "granted") loadAnalytics();
    setOpen(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies de mesure d'audience" className="fixed inset-x-3 bottom-3 z-[180] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md">
      <div className="card-surface bg-deep/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <p className="text-sm leading-relaxed text-ivory/90">
          Nous aimerions mesurer la fréquentation du site pour l&apos;améliorer. Rien n&apos;est activé sans votre accord.{" "}
          <Link href="/confidentialite" className="link-u">
            En savoir plus
          </Link>
        </p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => decide("granted")} className="rounded-full bg-copper-light px-4 py-2 text-sm font-semibold text-deep">
            Accepter
          </button>
          <button type="button" onClick={() => decide("denied")} className="rounded-full border border-ivory/25 px-4 py-2 text-sm">
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
