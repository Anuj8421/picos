import { getManagerConfig } from "@/features/data-management/manager-config";
import { ManagerListPage } from "@/features/data-management/components/ManagerPages";

export default function OwnershipRegistryListPage() {
  return <ManagerListPage config={getManagerConfig("ownership-registry")} />;
}
