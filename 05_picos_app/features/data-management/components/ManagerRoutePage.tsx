import { getManagerConfig } from "../manager-config";
import { ManagerDetailPage, ManagerFormPage, ManagerListPage } from "./ManagerPages";
import type { ManagerRecord } from "../types";

export function ManagerRoutePage({
  configKey,
  parts,
  initialValues
}: {
  configKey: string;
  parts?: string[];
  initialValues?: ManagerRecord["values"];
}) {
  const config = getManagerConfig(configKey);
  const pathParts = parts ?? [];

  if (pathParts.length === 0) return <ManagerListPage config={config} />;
  if (pathParts[0] === "new") return <ManagerFormPage config={config} initialValues={initialValues} mode="new" />;
  if (pathParts.length === 1) return <ManagerDetailPage config={config} id={pathParts[0]} />;
  if (pathParts.length === 2 && pathParts[1] === "edit") {
    return <ManagerFormPage config={config} id={pathParts[0]} mode="edit" />;
  }

  return <ManagerListPage config={config} />;
}
