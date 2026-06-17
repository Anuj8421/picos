import { ManagerRoutePage } from "@/features/data-management/components/ManagerRoutePage";

export default async function Page({ params }: { params: Promise<{ parts?: string[] }> }) {
  const { parts } = await params;
  return <ManagerRoutePage configKey="intelligence-inbox" parts={parts} />;
}
