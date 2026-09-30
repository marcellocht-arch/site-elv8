"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, bookingHref } from "@/content/site";
import { Logo } from "./Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowRight, ArrowUpRight, Phone, Chat } from "@/components/ui/Icons";
import { gsap } from "@/lib/gsap";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture des menus au changement de page
  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Menu Services : clic extérieur + Échap
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  // Menu mobile : blocage du scroll + animation d'entrée + Échap
  useEffect(() => {
    const lenis = window.__lenis;
    const html = document.documentElement;
    if (mobileOpen) {
      lenis?.stop();
      html.style.overflow = "hidden";
      const items = panelRef.current?.querySelectorAll("[data-m-item]");
      if (items && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(items, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.045, duration: 0.9, ease: "expo.out", delay: 0.15 });
      }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileOpen(false);
          burgerRef.current?.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    lenis?.start();
    html.style.overflow = "";
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const servicesActive = [...nav.services.principal, ...nav.services.complementaire].some((l) => isActive(l.href));

  return (
    <header className="fixed inset-x-0 top-0 z-[120]">
      {/* Fond flouté sur un calque à part : un backdrop-filter sur le header casserait le menu mobile en position fixe */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[var(--header-h)] border-b transition-[opacity,border-color] duration-500 ${
          scrolled || mobileOpen ? "border-ivory/10 bg-deep/80 opacity-100 backdrop-blur-xl" : "border-transparent opacity-0"
        }`}
      />
      <div className="container-x relative flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo className="text-[2rem] md:text-[2.2rem]" />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.95rem]">
            <li ref={servicesRef} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="menu-services"
                onClick={() => setServicesOpen((v) => !v)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-colors hover:text-copper-light ${servicesActive ? "text-copper-light" : "text-ivory/90"}`}
              >
                {nav.services.label}
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}>
                  <path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              <div
                id="menu-services"
                className={`absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3 transition-all duration-300 ${
                  servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="grid grid-cols-[1.3fr_1fr] gap-6 rounded-[var(--radius-card)] border border-ivory/10 bg-deep p-6 shadow-2xl shadow-black/50">
                  <div>
                    <p className="eyebrow mb-3">Services principaux</p>
                    <ul className="space-y-1">
                      {nav.services.principal.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="group block rounded-xl p-3 transition-colors hover:bg-surface/70">
                            <span className="flex items-center justify-between font-display text-2xl leading-none">
                              {l.label}
                              <ArrowUpRight size={16} className="text-copper-light opacity-0 transition-opacity group-hover:opacity-100" />
                            </span>
                            <span className="mt-1.5 block text-sm text-grey">{l.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-l border-ivory/10 pl-6">
                    <p className="eyebrow mb-3">Complémentaires</p>
                    <ul className="space-y-1">
                      {nav.services.complementaire.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="block rounded-xl p-3 transition-colors hover:bg-surface/70">
                            <span className="block font-display text-xl leading-none">{l.label}</span>
                            <span className="mt-1.5 block text-sm text-grey">{l.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 px-3 text-xs leading-relaxed text-grey">Pilotés par ELV8co, réalisés avec notre réseau de freelances de confiance.</p>
                  </div>
                </div>
              </div>
            </li>
            {nav.main.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 transition-colors hover:text-copper-light ${isActive(l.href) ? "text-copper-light" : "text-ivory/90"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.25}>
            <Link
              href={bookingHref}
              {...(/^https?:\/\//.test(bookingHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group inline-flex items-center gap-2 rounded-full bg-copper-light px-4 py-2.5 text-sm font-semibold text-deep transition-colors hover:bg-ivory sm:px-5"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-deep/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-deep" />
              </span>
              <span className="max-[379px]:hidden">{nav.cta.label}</span>
              <span className="min-[380px]:hidden">Réserver</span>
            </Link>
          </Magnetic>
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-ivory/20 lg:hidden"
          >
            <span className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ease-out-expo ${mobileOpen ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ease-out-expo ${mobileOpen ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        ref={panelRef}
        data-lenis-prevent
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-deep transition-[clip-path] duration-700 ease-in-out-quart lg:hidden ${
          mobileOpen ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none invisible [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Navigation mobile" className="container-x flex min-h-full flex-col pb-10 pt-6">
          <p className="eyebrow mb-2">Services</p>
          <ul>
            {nav.services.principal.map((l) => (
              <li key={l.href} className="overflow-hidden">
                <Link data-m-item href={l.href} className="block py-1.5 font-display text-[2.1rem] leading-tight">
                  {l.label}
                </Link>
              </li>
            ))}
            {nav.services.complementaire.map((l) => (
              <li key={l.href} className="overflow-hidden">
                <Link data-m-item href={l.href} className="block py-1 font-display text-2xl leading-tight text-ivory/75">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-6 h-px bg-ivory/10" />
          <ul>
            {nav.main.map((l) => (
              <li key={l.href} className="overflow-hidden">
                <Link data-m-item href={l.href} className="flex items-center justify-between py-1.5 font-display text-[2.1rem] leading-tight">
                  {l.label}
                  <ArrowRight size={22} className="text-copper-light" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10 text-sm">
            <a href={site.contact.phoneHref} className="flex items-center gap-3 text-ivory/85">
              <Phone size={18} className="text-copper-light" /> {site.contact.phoneDisplay}
            </a>
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ivory/85">
              <Chat size={18} className="text-copper-light" /> WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
