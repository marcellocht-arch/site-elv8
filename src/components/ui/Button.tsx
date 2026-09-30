import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-copper-light text-deep hover:bg-ivory",
  ghost: "border border-ivory/25 text-ivory hover:border-copper-light hover:text-copper-light",
  light: "bg-ivory text-deep hover:bg-copper-light",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: boolean;
  magnetic?: boolean;
  className?: string;
  external?: boolean;
  size?: "md" | "lg";
  cursor?: string;
};

/** Bouton-lien avec effet magnétique et flèche animée. */
export function Button({ href, children, variant = "primary", icon = true, magnetic = true, className = "", external, size = "md", cursor }: Props) {
  const cls = `group relative inline-flex items-center gap-3 rounded-full font-medium transition-colors duration-300 ${
    size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-[0.95rem]"
  } ${styles[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="relative grid h-5 w-5 place-items-center overflow-hidden" aria-hidden>
          <ArrowRight size={18} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-6" />
          <ArrowRight size={18} className="absolute -translate-x-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
        </span>
      )}
    </>
  );

  const link = external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer" data-cursor={cursor}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls} data-cursor={cursor}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
