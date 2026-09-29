import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { zoneBySlug, zones } from "@/content/zones";
import { ZonePage } from "@/components/templates/ZonePage";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return zones.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const z = zoneBySlug(slug);
  if (!z) return {};
  return buildMetadata(z.seo, `/zones/${z.slug}`, `zones-${z.slug}`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const z = zoneBySlug(slug);
  if (!z) notFound();
  return <ZonePage z={z} />;
}
