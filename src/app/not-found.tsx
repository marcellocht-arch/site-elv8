import Link from "next/link";
import type { Metadata } from "next";
import { notFound as nf } from "@/content/not-found";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Txt } from "@/components/ui/RichText";
import { LostDot } from "@/components/motion/LostDot";

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | ELV8co" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div className="halo left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[800px] max-w-[800px] -translate-x-1/2 -translate-y-1/2" aria-hidden />
      <div className="container-x relative py-20">
        <LostDot />
        <HeroTitle text={nf.title} className="t-xl mt-6 max-w-4xl" />
        <p className="t-lead hero-fade mt-6 max-w-xl text-ivory/80" style={{ ["--d" as string]: "0.4s" }}>
          <Txt>{nf.text}</Txt>
        </p>
        <ul className="hero-fade mt-10 flex flex-wrap gap-3" style={{ ["--d" as string]: "0.55s" }}>
          {nf.links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`inline-flex rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                  i === 0 ? "bg-copper-light text-deep hover:bg-ivory" : "border border-ivory/25 hover:border-copper-light hover:text-copper-light"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
