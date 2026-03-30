import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertCircle } from 'lucide-react';

interface AdminConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  title: string;
  description: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  isProcessing?: boolean;
}

const AdminConfirmDialog: React.FC<AdminConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  placeholder = "Enter rejection reason...",
  confirmText = "Reject Application",
  cancelText = "Back",
  isProcessing = false
}) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (reason.trim().length < 10) {
      setError("Please provide a reason (at least 10 characters).");
      return;
    }
    setError("");
    onConfirm(reason);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0d1117]/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-[#151823] border border-[#1e2330] p-8 shadow-2xl shadow-black/40 font-['Inter',_sans-serif]"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center text-rose-500 transform rotate-3 shadow-lg">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#f9fafb] tracking-tight">{title}</h3>
                  <p className="text-[#9ca3af] text-sm font-medium mt-1">{description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#6b7280] hover:text-[#f9fafb] hover:bg-[#1a1f2e] rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content (Textarea) */}
            <div className="space-y-4">
              <div className="relative group">
                <textarea
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={placeholder}
                  rows={4}
                  className={`w-full bg-[#0d1117] border ${error ? 'border-rose-500/50' : 'border-[#1e2330] group-hover:border-[#3b82f6]/50'} rounded-2xl p-4 text-[#e5e7eb] text-sm outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/10 transition-all resize-none placeholder:text-[#6b7280]`}
                />
                <div className="absolute bottom-3 right-4 text-[10px] font-bold text-[#6b7280] uppercase tracking-widest italic flex items-center gap-2">
                   {reason.length < 10 && <span className="text-rose-500">Min 10</span>}
                   <span>{reason.length} / 500</span>
                </div>
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="text-xs font-bold text-rose-500 flex items-center gap-2 ml-1"
                >
                  <AlertCircle size={14} /> {error}
                </motion.p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={onClose}
                disabled={isProcessing}
                className="flex-1 px-6 py-4 text-sm font-bold text-[#f9fafb] bg-transparent border border-[#1e2330] rounded-2xl hover:bg-[#1a1f2e] transition-all active:scale-95 disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="flex-[2] px-6 py-4 text-sm font-black text-white bg-rose-600 rounded-2xl shadow-lg shadow-rose-900/20 hover:bg-rose-500 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    {confirmText}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminConfirmDialog;
