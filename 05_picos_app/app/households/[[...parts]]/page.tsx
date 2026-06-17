import { FoundationRoutePage } from "@/features/foundation/components/FoundationPages";

export default async function Page({ params }: { params: Promise<{ parts?: string[] }> }) {
  const { parts } = await params;
  return <FoundationRoutePage configKey="households" parts={parts} />;
}
