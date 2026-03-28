import React from "react";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import type { ApplicationStatus } from "../types/application.types";

interface ApplicationProfileHeaderProps {
  fullName: string;
  email: string;
  status: ApplicationStatus;
  profilePhoto?: string;
}

const ApplicationProfileHeader: React.FC<ApplicationProfileHeaderProps> = ({ fullName, email, status, profilePhoto }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-8 md:p-10 mb-6 flex flex-col items-center justify-center gap-4 text-center text-dark-textPrimary">
      <Avatar name={fullName} src={profilePhoto} size={80} />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight">
          {fullName}
        </h1>
        <span className="text-sm text-dark-textMuted font-medium">
          {email}
        </span>
      </div>
      <StatusBadge status={status} />
    </div>
  );
};

export default ApplicationProfileHeader;
