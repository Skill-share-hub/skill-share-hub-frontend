import React from "react";
import DetailsCard from "./DetailsCard";
import InfoItem from "./InfoItem";
import type { Application } from "../types/application.types";

interface QualificationsSectionProps {
  application: Application;
}

const QualificationsSection: React.FC<QualificationsSectionProps> = ({ application }) => {
  return (
    <DetailsCard title="Qualifications">
      <InfoItem label="Degree" value={application.highestDegree} align="right" />
      <InfoItem label="Field" value={application.fieldOfStudy} align="right" />
      <InfoItem label="Institution" value={application.institution} align="right" />
      <InfoItem label="Graduated" value={application.graduationYear} align="right" />
    </DetailsCard>
  );
};

export default QualificationsSection;
