import React from "react";

interface InfoItemProps {
  label: string;
  value: string | number | undefined | null;
  className?: string;
  align?: "left" | "right";
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value, className = "", align = "left" }) => {
  return (
    <div className={`flex items-center justify-between py-1 ${className}`}>
      <span className="text-[13px] text-dark-textMuted font-medium">
        {label}
      </span>
      <span className={`text-[13px] text-dark-textSecondary font-semibold ${align === "right" ? "text-right" : ""}`}>
        {value ?? "N/A"}
      </span>
    </div>
  );
};

export default InfoItem;
