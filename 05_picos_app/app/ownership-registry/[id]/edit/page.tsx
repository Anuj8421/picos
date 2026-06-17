import { getManagerConfig } from "@/features/data-management/manager-config";
import { ManagerFormPage } from "@/features/data-management/components/ManagerPages";

export default async function OwnershipRegistryEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ManagerFormPage config={getManagerConfig("ownership-registry")} id={id} mode="edit" />;
}
