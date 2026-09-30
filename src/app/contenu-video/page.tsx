import content from "@/content/services/contenu-video";
import { ServicePage } from "@/components/templates/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(content.seo, "/contenu-video", "contenu-video");

export default function Page() {
  return <ServicePage s={content} />;
}
