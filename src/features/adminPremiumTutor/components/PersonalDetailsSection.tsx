import React from "react";
import DetailsCard from "./DetailsCard";
import InfoItem from "./InfoItem";

interface PersonalDetailsSectionProps {
  dob?: string;
  nationalIdNumber?: string;
  appliedOn: string;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ dob, nationalIdNumber, appliedOn }) => {
  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DetailsCard title="Personal Info">
      <InfoItem label="Date of birth" value={dob ? formatDate(dob) : "N/A"} align="right" />
      <InfoItem label="National ID" value={nationalIdNumber} align="right" />
      <InfoItem label="Applied on" value={formatDate(appliedOn)} align="right" />
    </DetailsCard>
  );
};

export default PersonalDetailsSection;
