import content from "@/content/services/creation-site-web";
import { ServicePage } from "@/components/templates/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(content.seo, "/creation-site-web", "creation-site-web");

export default function Page() {
  return <ServicePage s={content} />;
}
