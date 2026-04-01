import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PurchaseSuccessModalProps {
  isOpen: boolean;
  course: any; // Pack metadata here: { title, thumbnailUrl, category, price, creditsUsed, totalPaid, prevBalance, deducted, remaining }
  onStartNow: () => void;
  onLater: () => void;
  onClose: () => void;
}

const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({ 
  isOpen, 
  course, 
  onStartNow, 
  onLater, 
  onClose 
}) => {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Destructure with fallbacks for safety
  const { 
    title = "Course Enrollment",
    thumbnailUrl = "",
    category = "Skill Share",
    price = 0,
    creditsUsed = 0,
    totalPaid = 0,
    prevBalance = 0,
    deducted = 0,
    remaining = 0
  } = course || {};

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Card (Premium Bill Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-xl px-5 py-6 flex flex-col z-[110]"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle2 size={24} className="text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Enrollment Successful</h2>
            <p className="text-sm text-gray-500">You're all set to start learning</p>
          </div>

          <div className="space-y-5">
             {/* COURSE INFO CARD */}
             <div className="bg-gray-50 rounded-xl p-3 flex gap-3 relative">
                <img 
                  src={thumbnailUrl} 
                  alt={title} 
                  className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-medium">
                      {category}
                    </span>
                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                      Enrolled
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 truncate mt-1">
                    {title}
                  </h3>
                </div>
             </div>

             {/* PAYMENT SUMMARY */}
             <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Price</span>
                  <span className="text-gray-900 font-medium">{price} Credits</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Credits Used</span>
                  <span className="text-red-500 font-medium">-{creditsUsed}</span>
                </div>
                <div className="border-t border-gray-100 my-2 pt-2 flex justify-between items-center">
                   <span className="text-sm font-semibold text-gray-900">Total Paid</span>
                   <span className="text-base font-bold text-gray-900">
                     {totalPaid} Credits
                   </span>
                </div>
             </div>

             {/* WALLET SUMMARY */}
             <div className="bg-gray-50/50 rounded-xl p-3 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Previous Balance</span>
                  <span className="text-gray-700">{prevBalance}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Deducted Credits</span>
                  <span className="text-red-500">-{deducted}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold pt-1 border-t border-gray-100">
                   <span className="text-gray-600">Remaining Balance</span>
                   <span className="text-green-600">{remaining} Credits</span>
                </div>
             </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-6">
             <button 
               onClick={onLater}
               className="w-full sm:flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
             >
               Later
             </button>
             <button 
               onClick={onStartNow}
               className="w-full sm:flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
             >
               Start Now
               <ArrowRight size={16} />
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PurchaseSuccessModal;
