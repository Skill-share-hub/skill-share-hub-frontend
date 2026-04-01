import React from "react";
import { useNavigate } from "react-router-dom";
import type { Application } from "../types/application.types";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

interface ApplicationRowProps {
  application: Application;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({ application }) => {
  const navigate = useNavigate();
  const { _id, fullName, tutorId, yearsOfExperience, status, createdAt } = application;

  const handleViewDetails = () => {
    navigate(`/admin/applications/${_id}`);
  };

  return (
    <tr className="border-b border-dark-borderLight hover:bg-white/[0.02] transition-colors">
      {/* Tutor */}
      <td className="px-4 py-3.5 align-middle">
        <div className="flex items-center gap-3">
          <Avatar name={fullName} src={tutorId.profilePhoto} size={36} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-dark-textPrimary leading-tight">
              {fullName}
            </span>
            <span className="text-xs text-dark-textMuted mt-0.5">
              {tutorId.email}
            </span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5 align-middle">
        <StatusBadge status={status} />
      </td>

      {/* Experience */}
      <td className="px-4 py-3.5 align-middle text-sm text-dark-textDim">
        {yearsOfExperience} yrs
      </td>

      {/* Applied */}
      <td className="px-4 py-3.5 align-middle text-sm text-dark-textDim">
        {formatDate(createdAt)}
      </td>

      {/* Action */}
      <td className="px-4 py-3.5 align-middle text-right">
        <button 
          onClick={handleViewDetails} 
          className="px-3.5 py-1.5 bg-transparent border border-dark-borderLight rounded-lg text-dark-textSecondary text-xs font-medium hover:border-dark-accentBlue transition-colors whitespace-nowrap"
        >
          View details ↗
        </button>
      </td>
    </tr>
  );
};

export default ApplicationRow;