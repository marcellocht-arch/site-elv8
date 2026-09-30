import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, type Crumb } from "@/lib/seo";

/** Fil d'Ariane visible + données structurées BreadcrumbList. */
export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const all: Crumb[] = [{ name: "Accueil", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Fil d'Ariane" className={`hero-fade text-sm text-grey ${className}`} style={{ ["--d" as string]: "0s" }}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ivory/85">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="transition-colors hover:text-copper-light">
                      {c.name}
                    </Link>
                    <span aria-hidden className="text-copper">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
