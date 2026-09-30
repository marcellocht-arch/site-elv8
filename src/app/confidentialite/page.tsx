import content from "@/content/legal/confidentialite";
import { LegalPage } from "@/components/templates/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(content.seo, "/confidentialite", "confidentialite");

export default function Page() {
  return <LegalPage c={content} path="/confidentialite" />;
}
