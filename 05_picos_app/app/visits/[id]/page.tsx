import { VisitDetailPage } from "@/features/visits/components/VisitIntelligenceManager";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VisitDetailPage id={id} />;
}
