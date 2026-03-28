import React from "react";
import DetailsCard from "./DetailsCard";
import InfoItem from "./InfoItem";
import type { Application } from "../types/application.types";

interface TeachingDetailsSectionProps {
  application: Application;
}

const TeachingDetailsSection: React.FC<TeachingDetailsSectionProps> = ({ application }) => {
  return (
    <DetailsCard title="Teaching Details">
      <InfoItem label="Experience" value={`${application.yearsOfExperience} years`} align="right" />
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-[13px] text-dark-textMuted font-medium text-left">Subjects</span>
        <div className="flex flex-wrap gap-2 justify-end">
          {application.subjectsTaught?.map((sub, i) => (
            <span key={i} className="px-3 py-1 bg-dark-bg/60 border border-dark-borderLight rounded-full text-[12px] text-dark-textSecondary font-medium">
              {sub}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-[13px] text-dark-textMuted font-medium text-left">Languages</span>
        <div className="flex flex-wrap gap-2 justify-end">
          {application.teachingLanguages?.map((lang, i) => (
            <span key={i} className="px-3 py-1 bg-dark-bg/60 border border-dark-borderLight rounded-full text-[12px] text-dark-textSecondary font-medium">
              {lang}
            </span>
          ))}
        </div>
      </div>
    </DetailsCard>
  );
};

export default TeachingDetailsSection;
