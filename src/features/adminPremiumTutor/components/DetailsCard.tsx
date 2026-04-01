import React from "react";

interface DetailsCardProps {
  title: string;
  children: React.ReactNode;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ title, children }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5 md:p-6 mb-4">
      <h2 className="text-[11px] font-bold text-[#454d6d] uppercase tracking-[0.12em] mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
};

export default DetailsCard;
