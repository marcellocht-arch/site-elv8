"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/types";
import { Txt } from "./RichText";
import { Plus } from "./Icons";

/** Accordéon de questions fréquentes (le contenu reste dans le HTML pour Google). */
export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="border-t border-ivory/12">
      {items.map((f, i) => {
        const isOpen = open === i;
        const btn = `${uid}-q-${i}`;
        const panel = `${uid}-a-${i}`;
        return (
          <div key={i} className="faq-item border-b border-ivory/12" data-open={isOpen}>
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className="font-display text-[1.45rem] leading-snug transition-colors group-hover:text-copper-light md:text-[1.75rem]">
                  <Txt>{f.q}</Txt>
                </span>
                <span className="faq-icon mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ivory/20 text-copper-light transition-transform duration-500 ease-out-expo">
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} className="faq-panel">
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 pr-12 leading-relaxed text-ivory/80">
                  <Txt>{f.a}</Txt>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
