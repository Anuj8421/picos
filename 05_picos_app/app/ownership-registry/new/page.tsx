import { getManagerConfig } from "@/features/data-management/manager-config";
import { ManagerFormPage } from "@/features/data-management/components/ManagerPages";

export default function OwnershipRegistryCreatePage() {
  return <ManagerFormPage config={getManagerConfig("ownership-registry")} mode="new" />;
}
