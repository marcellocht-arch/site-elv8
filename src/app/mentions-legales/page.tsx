import content from "@/content/legal/mentions-legales";
import { LegalPage } from "@/components/templates/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(content.seo, "/mentions-legales", "mentions-legales");

export default function Page() {
  return <LegalPage c={content} path="/mentions-legales" />;
}
