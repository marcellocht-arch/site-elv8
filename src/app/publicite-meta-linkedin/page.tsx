import content from "@/content/services/publicite-meta-linkedin";
import { ServicePage } from "@/components/templates/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(content.seo, "/publicite-meta-linkedin", "publicite-meta-linkedin");

export default function Page() {
  return <ServicePage s={content} />;
}
