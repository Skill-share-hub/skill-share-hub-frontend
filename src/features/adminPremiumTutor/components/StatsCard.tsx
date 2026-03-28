import React from "react";

interface StatsCardProps {
  label: string;
  count: number;
  accent?: "yellow" | "green" | "red" | "blue";
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, count, accent = "blue", loading }) => {
  const getAccentClass = () => {
    switch (accent) {
      case "yellow":
        return "bg-dark-accentYellow";
      case "green":
        return "bg-dark-accentGreen";
      case "red":
        return "bg-dark-accentRed";
      default:
        return "bg-dark-accentBlue";
    }
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-4 md:p-5 flex gap-4 flex-1 min-w-[160px]">
      <div className={`w-1 rounded ${getAccentClass()}`} />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-dark-textMuted">
          {label}
        </span>
        {loading ? (
          <div className="h-7 w-15 bg-dark-borderLight rounded animate-pulse" />
        ) : (
          <span className="text-2xl font-bold text-dark-textPrimary">
            {count.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
