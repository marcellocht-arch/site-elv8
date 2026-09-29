import content from "@/content/services/community-management";
import { ServicePage } from "@/components/templates/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(content.seo, "/community-management", "community-management");

export default function Page() {
  return <ServicePage s={content} />;
}
