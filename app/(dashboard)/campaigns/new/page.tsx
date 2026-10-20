import CampaignBuilder from "@/components/campaign-builder";
import { getCampaignTemplate } from "@/lib/templates/campaign-templates";

export default async function NewCampaignPage({ searchParams }: {
  searchParams: Promise<{ template?: string }>;
}) {
  const { template } = await searchParams;
  return <CampaignBuilder mode="new" initialTemplate={getCampaignTemplate(template)} />;
}
