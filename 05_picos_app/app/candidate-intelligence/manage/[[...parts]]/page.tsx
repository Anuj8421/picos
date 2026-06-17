import { ManagerRoutePage } from "@/features/data-management/components/ManagerRoutePage";

type SearchParams = Record<string, string | string[] | undefined>;

const candidateTypeLabels: Record<string, string> = {
  achievement: "Achievement",
  ai_insight: "AI insight",
  biography: "Biography milestone",
  candidate_dossier: "Dossier brief",
  candidate_profile: "Candidate profile",
  community_support: "Community support signal",
  election: "Election history",
  evidence: "Evidence note",
  geography: "Geographic support note",
  media: "Media mention",
  opportunity: "Opportunity",
  organization: "Organization",
  perception: "Perception update",
  relationship: "Family relationship",
  risk: "Risk",
  speech: "Speech",
  statement: "Public statement",
  swot: "SWOT item"
};

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ parts?: string[] }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ parts }, query] = await Promise.all([params, searchParams]);
  const type = firstQueryValue(query.type);
  const initialValues = type ? { type: candidateTypeLabels[type] ?? type } : undefined;

  return <ManagerRoutePage configKey="candidate-manage" initialValues={initialValues} parts={parts} />;
}

function firstQueryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
