import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, CheckCircle2 } from 'lucide-react';

interface TutorConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger' | 'warning';
}

const TutorConfirmDialog: React.FC<TutorConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning'
}) => {
  const styles = {
    primary: {
      icon: <CheckCircle2 size={24} />,
      iconBg: 'bg-green-100 text-green-600',
      btn: 'bg-[#166534] hover:bg-green-800 text-white shadow-green-900/10'
    },
    danger: {
      icon: <AlertTriangle size={24} />,
      iconBg: 'bg-red-100 text-red-600',
      btn: 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/10'
    },
    warning: {
      icon: <AlertTriangle size={24} />,
      iconBg: 'bg-amber-100 text-amber-600',
      btn: 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-900/10'
    }
  }[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl border border-gray-100"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className={`w-14 h-14 ${styles.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-sm transform -rotate-3`}>
                {styles.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
              <p className="mt-3 text-sm text-gray-500 font-medium leading-relaxed">
                {description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 text-sm font-bold text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
                >
                  {cancelText}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex-[1.5] px-6 py-3.5 text-sm font-black rounded-xl shadow-lg transition-all active:scale-95 ${styles.btn}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TutorConfirmDialog;
