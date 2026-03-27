import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, X, ArrowRight, Receipt, Calendar, CreditCard, Wallet, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    _id: string;
    title: string;
    thumbnailUrl: string;
    price: number;
    courseType: string;
    creditCost?: number;
  };
  paymentDetails: {
    amount: number;
    method: string;
    date: string;
  };
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ isOpen, onClose, course, paymentDetails }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000); // 5 seconds auto-close
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    navigate(`/course-overview/${course._id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-emerald-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100"
          >
            {/* Success Header */}
            <div className="bg-emerald-600 p-8 text-center text-white relative">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg"
              >
                <CheckCircle2 size={48} className="text-emerald-600" />
              </motion.div>
              
              <h2 className="text-2xl font-black tracking-tight">Payment Successful!</h2>
              <p className="text-emerald-50 text-sm mt-1 opacity-90">Your enrollment is confirmed</p>
            </div>

            {/* Bill UI Content */}
            <div className="p-8 space-y-8 bg-gradient-to-b from-white to-emerald-50/30">
              
              {/* Course Info */}
              <div className="flex gap-4 items-start bg-white p-3 rounded-2xl border border-emerald-100 shadow-sm">
                <img 
                  src={course.thumbnailUrl} 
                  alt={course.title} 
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0 pt-1">
                  <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight">
                    {course.title}
                  </h3>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded">
                    {course.courseType} Course
                  </div>
                </div>
              </div>

              {/* Transaction details (Receipt style) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Receipt size={14} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Transaction Details</span>
                </div>
                
                <div className="space-y-3">
                   <DetailRow 
                    label="Transaction Date" 
                    value={paymentDetails.date} 
                    icon={<Calendar size={14} className="text-gray-400" />} 
                  />
                   <DetailRow 
                    label="Payment Method" 
                    value={paymentDetails.method === 'wallet' ? 'Wallet Balance' : 'Razorpay'} 
                    icon={paymentDetails.method === 'wallet' ? <Wallet size={14} className="text-emerald-600" /> : <CreditCard size={14} className="text-blue-600" />} 
                  />
                   <DetailRow 
                    label="Total Paid" 
                    value={<span className="flex items-center gap-1"><Coins size={14} className="text-amber-500" />{paymentDetails.amount} Credits</span>} 
                    isTotal
                  />
                </div>
              </div>

              {/* Footer Action */}
              <div className="pt-4">
                <button 
                  onClick={handleClose}
                  className="w-full group flex items-center justify-center gap-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 active:scale-[0.98]"
                >
                  Start Learning Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-gray-400 text-[10px] mt-4 font-medium italic">
                  Redirecting in 5 seconds...
                </p>
              </div>
            </div>

            {/* Bottom Notch Decor */}
            <div className="h-2 w-full bg-emerald-600/10 flex gap-1 px-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex-1 h-full bg-white rounded-t-full" />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DetailRow = ({ label, value, icon, isTotal }: { label: string, value: React.ReactNode, icon?: React.ReactNode, isTotal?: boolean }) => (
  <div className={`flex justify-between items-center ${isTotal ? 'pt-3 border-t border-dashed border-gray-200' : ''}`}>
    <div className="flex items-center gap-2">
      {icon}
      <span className={`text-[12px] ${isTotal ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}`}>{label}</span>
    </div>
    <span className={`text-sm ${isTotal ? 'text-lg font-black text-emerald-700' : 'font-bold text-gray-800'}`}>
      {value}
    </span>
  </div>
);

export default PaymentSuccessModal;
