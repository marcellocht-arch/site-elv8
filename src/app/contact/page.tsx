import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { buildMetadata, webPageLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/ui/ContactForm";
import { Txt } from "@/components/ui/RichText";
import { Chat, Mail, Phone, Pin } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata(contact.seo, "/contact", "contact");

export default function Page() {
  const c = contact;
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--header-h)+2rem)] md:pt-[calc(var(--header-h)+3.5rem)]">
        <div className="halo right-[-25%] top-[-30%] h-[80vw] w-[80vw] max-h-[900px] max-w-[900px]" aria-hidden />
        <div className="container-x relative">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
          <p className="eyebrow hero-fade mb-6 mt-10 md:mt-14" style={{ ["--d" as string]: "0.1s" }}>
            {c.hero.eyebrow}
          </p>
          <HeroTitle text={c.hero.h1} className="t-mega max-w-5xl" />
          <p className="t-lead hero-lead mt-8 max-w-2xl text-ivory/80" style={{ ["--d" as string]: "0.45s" }}>
            <Txt>{c.hero.intro}</Txt>
          </p>

          {/* Coordonnées : animation signature (gros liens magnétiques) */}
          <div className="hero-fade mt-12 grid gap-4 md:grid-cols-3" style={{ ["--d" as string]: "0.6s" }}>
            {[
              { href: `mailto:${site.contact.email}`, label: "E-mail", value: site.contact.email, Icon: Mail, ext: false },
              { href: site.contact.phoneHref, label: "Téléphone", value: site.contact.phoneDisplay, Icon: Phone, ext: false },
              { href: site.contact.whatsapp, label: "WhatsApp", value: "Écrire un message", Icon: Chat, ext: true },
            ].map(({ href, label, value, Icon, ext }) => (
              <Magnetic key={label} strength={0.12} className="block">
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card-surface group flex items-center gap-4 p-5 transition-colors hover:border-copper-light/60 md:p-6"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-copper-light text-deep transition-transform duration-500 group-hover:rotate-[-12deg]">
                    <Icon size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.14em] text-grey">{label}</span>
                    <span className="block truncate font-display text-2xl">{value}</span>
                  </span>
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </section>

      <section id="formulaire" className="container-x scroll-mt-28 pb-24 md:pb-32" aria-labelledby="form-title">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <Reveal className="card-surface p-5 sm:p-8 md:p-12">
            <h2 id="form-title" className="t-md">
              {c.formTitle}
            </h2>
            <p className="mb-8 mt-3 text-grey">{c.formIntro}</p>
            <ContactForm variant="full" idPrefix="full" />
          </Reveal>
          <Reveal stagger={0.1} className="space-y-10 lg:pt-8">
            <div>
              <h2 className="eyebrow mb-5">{c.expect.title}</h2>
              <ol className="space-y-5">
                {c.expect.steps.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-copper-light font-display text-copper-light">{i + 1}</span>
                    <span className="pt-1 text-ivory/85">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-3 border-t border-ivory/10 pt-8 text-sm text-ivory/80">
              <p className="flex items-start gap-3">
                <Pin size={18} className="mt-0.5 shrink-0 text-copper-light" />
                <Txt>{c.address}</Txt>
              </p>
              <p>
                <Txt>{c.hours}</Txt>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd data={webPageLd({ name: c.seo.title, description: c.seo.description, path: "/contact" })} />
    </>
  );
}
