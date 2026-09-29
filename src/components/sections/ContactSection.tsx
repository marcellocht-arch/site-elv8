import { site } from "@/content/site";
import { ContactForm } from "@/components/ui/ContactForm";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Chat, Mail, Phone } from "@/components/ui/Icons";
import { Txt } from "@/components/ui/RichText";

type Props = {
  title?: string;
  text?: string;
  defaultService?: string;
};

/** Appel à l'action + formulaire court, en bas de chaque page. */
export function ContactSection({ title = "Prêt à devenir *visible* ?", text = "Un appel de 30 minutes suffit.", defaultService }: Props) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-ivory/10 bg-gradient-to-b from-night to-deep py-24 md:py-36">
      <div className="halo left-1/2 top-[10%] h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] -translate-x-1/2" aria-hidden />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <p className="eyebrow mb-6">Parlons de vos clients</p>
          <SplitReveal as="h2" id="cta-title" text={title} className={title.length > 32 ? "t-lg" : "t-xl"} />
          <Reveal delay={0.2}>
            <p className="t-lead mt-6 max-w-md text-ivory/80">
              <Txt>{text}</Txt> On regarde ensemble où vous en êtes, ce qui bloque, et ce qui pourrait vous ramener des clients. Sans engagement.
            </p>
          </Reveal>
          <Reveal stagger={0.08} className="mt-10 flex flex-col gap-3">
            <Magnetic strength={0.15}>
              <a href={`mailto:${site.contact.email}`} data-cursor="Écrire" className="group inline-flex items-center gap-4 font-display text-[1.7rem] leading-none sm:text-4xl">
                <Mail size={26} className="text-copper-light" />
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
                  {site.contact.email}
                </span>
              </a>
            </Magnetic>
            <a href={site.contact.phoneHref} className="inline-flex items-center gap-4 text-lg text-ivory/85 transition-colors hover:text-copper-light">
              <Phone size={22} className="text-copper-light" /> {site.contact.phoneDisplay}
            </a>
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-lg text-ivory/85 transition-colors hover:text-copper-light">
              <Chat size={22} className="text-copper-light" /> Écrire sur WhatsApp
            </a>
          </Reveal>
        </div>
        <Reveal className="card-surface p-5 sm:p-8 md:p-10">
          <ContactForm variant="short" defaultService={defaultService} idPrefix="short" />
        </Reveal>
      </div>
    </section>
  );
}
