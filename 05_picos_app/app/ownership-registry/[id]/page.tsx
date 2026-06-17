import { getManagerConfig } from "@/features/data-management/manager-config";
import { ManagerDetailPage } from "@/features/data-management/components/ManagerPages";

export default async function OwnershipRegistryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ManagerDetailPage config={getManagerConfig("ownership-registry")} id={id} />;
}
