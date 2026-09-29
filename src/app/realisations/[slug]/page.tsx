import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseBySlug, caseStudies } from "@/content/realisations";
import { CaseStudyPage } from "@/components/templates/CaseStudyPage";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) return {};
  return buildMetadata(c.seo, `/realisations/${c.slug}`, `realisations-${c.slug}`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();
  return <CaseStudyPage c={c} />;
}
