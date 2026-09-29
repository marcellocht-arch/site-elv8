import Link from "next/link";

/** Logo texte « ELV8. » — Instrument Serif, point cuivre. */
export function Logo({ className = "", asLink = true }: { className?: string; asLink?: boolean }) {
  const mark = (
    <span className={`font-display leading-none tracking-[-0.03em] ${className}`}>
      ELV8<span className="text-copper">.</span>
    </span>
  );
  if (!asLink) return mark;
  return (
    <Link href="/" aria-label="ELV8co — accueil" className="inline-flex items-baseline">
      {mark}
    </Link>
  );
}
