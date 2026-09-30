import content from "@/content/services/personal-branding";
import { ServicePage } from "@/components/templates/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(content.seo, "/personal-branding", "personal-branding");

export default function Page() {
  return <ServicePage s={content} />;
}
