import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Loader2, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { ReportReason } from '../types/report.types';
import { reportService } from '../services/reportService';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'course' | 'review';
  targetId: string;
  courseId: string; // Required for review reports
  onSuccess?: () => void;
}

const REASONS: ReportReason[] = [
  "Inappropriate Content",
  "Spam or Misleading",
  "Offensive Language",
  "Low Quality Content",
  "Copyright Issue",
  "Other"
];

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, type, targetId, courseId, onSuccess }) => {
  const [reason, setReason] = useState<ReportReason | "">("");
  const [customReason, setCustomReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear form when modal closes or opens
  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setCustomReason("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      toast.error("Please select a reason");
      return;
    }

    if (reason === "Other" && !customReason.trim()) {
      toast.error("Please specify your reason");
      return;
    }

    try {
      setIsSubmitting(true);
      if (type === 'course') {
        await reportService.reportCourse(targetId, reason, customReason);
      } else {
        await reportService.reportReview(targetId, courseId, reason, customReason);
      }
      toast.success(`Report submitted successfully`);
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to submit report";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header - Compact */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-red-50 text-red-500 rounded-lg">
              <AlertTriangle size={18} />
            </div>
            <h3 className="text-base font-bold text-gray-900 tracking-tight">Report Issue</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
          {/* Reason Select */}
          <div className="space-y-1.5">
            <label htmlFor="report-reason" className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
              Select Reason
            </label>
            <div className="relative group">
              <select
                id="report-reason"
                autoFocus
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                className="w-full appearance-none bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:bg-white focus:border-red-500 outline-none transition-all cursor-pointer pr-10"
              >
                <option value="" disabled>Choose a reason...</option>
                {REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 transition-transform group-focus-within:rotate-180">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Conditional Textarea */}
          {reason === "Other" && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 duration-300">
              <label htmlFor="custom-reason" className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-1">
                Details
              </label>
              <textarea
                id="custom-reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Explain the issue in detail..."
                className="w-full h-24 p-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white text-sm font-medium text-gray-900 transition-all resize-none shadow-inner"
              />
            </div>
          )}

          {/* Actions - Compact Row */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !reason}
              className="flex-[1.5] py-3 bg-red-600 text-white text-sm font-black rounded-xl shadow-lg shadow-red-200/50 hover:bg-red-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Submit Report"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
