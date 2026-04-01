import React from "react";
import DetailsCard from "./DetailsCard";

interface ExperienceDescriptionProps {
  experience?: string;
}

const ExperienceDescription: React.FC<ExperienceDescriptionProps> = ({ experience }) => {
  return (
    <DetailsCard title="Experience Description">
      <div className="p-6 bg-dark-bg/20 border border-dark-borderLight rounded-xl">
        <p className="text-sm text-dark-textMuted leading-[1.6] italic font-medium">
          {experience || "No description provided."}
        </p>
      </div>
    </DetailsCard>
  );
};

export default ExperienceDescription;
