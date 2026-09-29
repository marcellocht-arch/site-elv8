import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Txt } from "./RichText";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
  align?: "left" | "center";
  size?: "lg" | "xl";
};

/** En-tête de section : sur-titre, H2 révélé ligne par ligne, chapeau. */
export function SectionHeader({ eyebrow, title, intro, id, className = "", align = "left", size = "lg" }: Props) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-4xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
          <span aria-hidden className="h-px w-8 bg-copper-light" />
          {eyebrow}
        </p>
      )}
      <SplitReveal as="h2" id={id} text={title} className={size === "xl" ? "t-xl" : "t-lg"} />
      {intro && (
        <Reveal delay={0.15}>
          <p className={`t-lead mt-6 max-w-2xl text-grey ${center ? "mx-auto" : ""}`}>
            <Txt>{intro}</Txt>
          </p>
        </Reveal>
      )}
    </div>
  );
}
