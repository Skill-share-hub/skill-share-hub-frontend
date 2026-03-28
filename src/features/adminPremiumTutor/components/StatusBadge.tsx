import React from "react";
import type { ApplicationStatus } from "../types/application.types";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const config: Record<ApplicationStatus, string> = {
  pending: "text-amber-600 bg-amber-600/10",
  approved: "text-emerald-600 bg-emerald-600/10",
  rejected: "text-red-600 bg-red-600/10",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const badgeClass = config[status] || "text-gray-500 bg-gray-500/10";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide ${badgeClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;