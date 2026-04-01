import React from "react";
import type { ApplicationStatus } from "../types/application.types";

interface AdminActionsProps {
  status: ApplicationStatus;
  onApprove: () => void;
  onReject: () => void;
  isProcessing: boolean;
}

const AdminActions: React.FC<AdminActionsProps> = ({ status, onApprove, onReject, isProcessing }) => {
  if (status !== "pending") return null;

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-5 md:p-6 mb-4">
      <h2 className="text-[11px] font-bold text-[#454d6d] uppercase tracking-[0.12em] mb-4">
        Admin Action
      </h2>
      <div className="flex gap-4">
        <button
          onClick={onApprove}
          disabled={isProcessing}
          className="flex-1 py-3 px-6 bg-emerald-600/10 border border-emerald-600/40 rounded-xl text-emerald-500 font-bold text-sm hover:bg-emerald-600/20 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all uppercase tracking-widest"
        >
          Approve
        </button>
        <button
          onClick={onReject}
          disabled={isProcessing}
          className="flex-1 py-3 px-6 bg-rose-600/10 border border-rose-600/40 rounded-xl text-rose-500 font-bold text-sm hover:bg-rose-600/20 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all uppercase tracking-widest"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default AdminActions;
