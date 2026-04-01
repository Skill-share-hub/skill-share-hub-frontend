import React from "react";
import { useAppSelector } from "../../../shared/hooks/redux";
import ApplicationRow from "./ApplicationRow";

const COLUMNS = ["TUTOR", "STATUS", "EXP", "APPLIED", "ACTION"];

const ApplicationTable: React.FC = () => {
  const { applications, loading, error, meta } = useAppSelector(
    (s) => s.applications
  );

  return (
    <div className="bg-dark-card border-none rounded-none overflow-hidden">
      {/* Table header */}
      <div className="px-5 py-4 border-b border-dark-borderLight">
        <span className="text-sm font-semibold text-dark-textPrimary">
          {meta.total} applications
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className={`px-4 py-2.5 text-[11px] font-semibold tracking-widest text-[#4b5563] uppercase border-b border-dark-borderLight whitespace-nowrap ${
                    col === "ACTION" ? "text-right" : "text-left"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-dark-borderLight">
                  {COLUMNS.map((col) => (
                    <td key={col} className="p-4">
                      <div className="h-3.5 bg-dark-border rounded animate-pulse w-full max-w-[100px]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={COLUMNS.length} className="p-10 text-center text-sm">
                  <span className="text-red-500 font-medium">Error: {error}</span>
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="p-10 text-center text-sm text-dark-textMuted">
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <ApplicationRow key={app._id} application={app} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;