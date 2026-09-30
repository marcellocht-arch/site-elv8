"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { serviceOptions, site } from "@/content/site";
import { gsap } from "@/lib/gsap";
import { ArrowRight } from "./Icons";

type Status = "idle" | "sending" | "success" | "error";

type Props = {
  variant?: "full" | "short";
  defaultService?: string;
  /** Identifiant unique si plusieurs formulaires sur une page. */
  idPrefix?: string;
};

const field =
  "peer w-full rounded-xl border border-ivory/15 bg-deep/50 px-4 pb-3 pt-6 text-[1rem] text-ivory placeholder-transparent outline-none transition-colors focus:border-copper-light focus:bg-deep/80 aria-[invalid=true]:border-red-400";
const label =
  "pointer-events-none absolute left-4 top-2 text-[0.72rem] uppercase tracking-[0.14em] text-grey transition-all peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-[0.95rem] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[0.72rem] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-copper-light";

export function ContactForm({ variant = "full", defaultService = "", idPrefix = "cf" }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const full = variant === "full";
  const id = (n: string) => `${idPrefix}-${n}`;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (status === "success" && successRef.current) {
      successRef.current.focus();
      if (!reduce) {
        const tl = gsap.timeline();
        tl.from(successRef.current.querySelectorAll("[data-s]"), { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: "expo.out" });
        tl.fromTo(successRef.current.querySelector("[data-check]"), { strokeDashoffset: 40 }, { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" }, 0.2);
      }
    }
    if (status === "error" && errorRef.current && !reduce) {
      gsap.fromTo(errorRef.current, { x: -8 }, { x: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    }
  }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email ?? "")) errs.email = "Adresse e-mail invalide.";
    if (full && !data.company?.trim()) errs.company = "Indiquez le nom de votre entreprise.";
    if (full && !data.city?.trim()) errs.city = "Indiquez votre ville.";
    if (!data.message || data.message.trim().length < 10) errs.message = "Quelques mots sur votre projet (10 caractères minimum).";
    if (!data.consent) errs.consent = "Votre accord est nécessaire pour vous répondre.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: !!data.consent, variant, elapsed: Date.now() - startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Record<string, string> };
      if (!res.ok || !json.ok) {
        if (json.fields) setErrors(json.fields);
        throw new Error(json.error || "L'envoi a échoué.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "L'envoi a échoué.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="card-surface flex flex-col items-start gap-5 p-8 outline-none md:p-10">
        <span data-s className="grid h-16 w-16 place-items-center rounded-full bg-copper-light text-deep">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path data-check d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" />
          </svg>
        </span>
        <p data-s className="t-md">Merci, votre message est bien arrivé.</p>
        <p data-s className="max-w-md text-ivory/80">
          Nous vous répondons rapidement. Un e-mail de confirmation vient de partir vers votre boîte (pensez à vérifier les indésirables).
        </p>
        <button data-s type="button" onClick={() => setStatus("idle")} className="link-u text-sm">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const err = (n: string) =>
    errors[n] ? (
      <p id={id(`${n}-err`)} className="mt-1.5 text-sm text-red-300">
        {errors[n]}
      </p>
    ) : null;
  const aria = (n: string) => ({ "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? id(`${n}-err`) : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-4" aria-busy={status === "sending"}>
      {/* Pot de miel anti-spam : invisible pour les humains */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden opacity-0 [clip:rect(0,0,0,0)]">
        <label htmlFor={id("website")}>Ne pas remplir</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="relative">
            <input id={id("name")} name="name" type="text" autoComplete="name" placeholder="Nom" required maxLength={120} className={field} {...aria("name")} />
            <label htmlFor={id("name")} className={label}>
              Nom et prénom *
            </label>
          </div>
          {err("name")}
        </div>
        <div>
          <div className="relative">
            <input
              id={id("company")}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Entreprise"
              required={full}
              maxLength={160}
              className={field}
              {...aria("company")}
            />
            <label htmlFor={id("company")} className={label}>
              Entreprise{full ? " *" : ""}
            </label>
          </div>
          {err("company")}
        </div>
        <div>
          <div className="relative">
            <input id={id("email")} name="email" type="email" autoComplete="email" placeholder="E-mail" required maxLength={200} className={field} {...aria("email")} />
            <label htmlFor={id("email")} className={label}>
              E-mail *
            </label>
          </div>
          {err("email")}
        </div>
        <div>
          <div className="relative">
            <input id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="Téléphone" maxLength={40} className={field} />
            <label htmlFor={id("phone")} className={label}>
              Téléphone (optionnel)
            </label>
          </div>
        </div>
        <div className="relative">
          <select id={id("service")} name="service" defaultValue={defaultService} className={`${field} appearance-none pr-10`}>
            <option value="">Choisir…</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <label htmlFor={id("service")} className="pointer-events-none absolute left-4 top-2 text-[0.72rem] uppercase tracking-[0.14em] text-grey">
            Service souhaité
          </label>
          <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-grey" width="12" height="12" viewBox="0 0 10 10" aria-hidden>
            <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </div>
        <div>
          <div className="relative">
            <input
              id={id("city")}
              name="city"
              type="text"
              autoComplete="address-level2"
              placeholder="Ville"
              required={full}
              maxLength={100}
              className={field}
              {...aria("city")}
            />
            <label htmlFor={id("city")} className={label}>
              Ville{full ? " *" : ""}
            </label>
          </div>
          {err("city")}
        </div>
      </div>

      <div>
        <div className="relative">
          <textarea
            id={id("message")}
            name="message"
            placeholder="Message"
            required
            rows={full ? 6 : 4}
            maxLength={4000}
            className={`${field} resize-y`}
            {...aria("message")}
          />
          <label htmlFor={id("message")} className={label}>
            Votre projet, en quelques mots *
          </label>
        </div>
        {err("message")}
      </div>

      <div>
        <label htmlFor={id("consent")} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ivory/80">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            value="oui"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-copper-light)]"
            {...aria("consent")}
          />
          <span>
            J&apos;accepte que {site.name} utilise ces informations pour répondre à ma demande, conformément à la{" "}
            <Link href="/confidentialite" className="link-u">
              politique de confidentialité
            </Link>
            . *
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex min-w-[220px] shrink-0 items-center whitespace-nowrap justify-center gap-3 overflow-hidden rounded-full bg-copper-light px-7 py-4 font-semibold text-deep transition-colors hover:bg-ivory disabled:cursor-wait"
        >
          <span className={`flex items-center gap-3 transition-all duration-500 ${status === "sending" ? "-translate-y-10 opacity-0" : ""}`}>
            Envoyer ma demande <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
          </span>
          <span
            aria-hidden={status !== "sending"}
            className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 ${status === "sending" ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-deep/30 border-t-deep" />
            Envoi en cours…
          </span>
        </button>
        <p className="text-xs text-grey">* champs obligatoires · réponse personnelle, jamais automatisée</p>
      </div>

      <div aria-live="assertive">
        {status === "error" && (
          <p ref={errorRef} className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error} Vous pouvez aussi nous écrire à{" "}
            <a className="link-u" href={`mailto:${site.contact.email}`}>
              {site.contact.email}
            </a>{" "}
            ou sur{" "}
            <a className="link-u" href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
