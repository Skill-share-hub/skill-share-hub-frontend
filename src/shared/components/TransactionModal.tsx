import React from 'react';
import { X, Receipt, CheckCircle2, Clock, AlertCircle, CreditCard, Wallet, Coins, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Transaction } from '../../features/wallet/wallet.types';
import { useEnrollmentStatus } from '../hooks/useEnrollmentStatus';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  creditConst : number ;
}

export default function TransactionModal({ isOpen, onClose, transaction , creditConst }: ModalProps) {
  const navigate = useNavigate();
  const { isEnrolled, isLoading } = useEnrollmentStatus(transaction?.courseId);

  if (!isOpen || !transaction) return null;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending':
      case 'initialized': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatType = (type: string) => type.replace('_', ' ').toUpperCase();

  const handleOpenCourse = () => {
    if (transaction.courseId) {
      onClose();
      if (isEnrolled) {
        navigate(`/my-activity/${transaction.courseId}`);
      } else {
        navigate(`/courses/${transaction.courseId}`);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Receipt className="text-emerald-900" size={20} />
            <h3 className="text-lg font-semibold text-emerald-950">Transaction Details</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
          {transaction.courseSnapshot && (
            <div className="bg-emerald-50/30 rounded-2xl p-4 border border-emerald-100/50">
              <div className="flex gap-4 items-start">
                <img 
                  src={transaction.courseSnapshot.thumbnail} 
                  alt={transaction.courseSnapshot.title} 
                  className="w-20 h-20 rounded-xl object-cover shadow-md shrink-0 ring-4 ring-white"
                />
                <div className="flex-1 min-w-0 pt-1">
                  <h4 className="font-black text-gray-900 line-clamp-2 leading-tight text-base">
                    {transaction.courseSnapshot.title}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-emerald-600 text-white rounded-md shadow-sm">
                      {transaction.courseSnapshot.courseType}
                    </span>
                    {transaction.courseSnapshot.creditCost && (
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-white border border-emerald-200 text-emerald-700 rounded-md shadow-sm flex items-center gap-1">
                        <Coins size={10} /> {transaction.courseSnapshot.creditCost} Credits
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center pb-4 border-b border-dashed border-gray-200">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Credits Transacted</p>
            <div className={`flex items-center justify-center gap-2 mt-2 ${transaction.type === 'credit_purchase' || transaction.type === 'tutor_earning' ? 'text-emerald-600' : 'text-gray-900'}`}>
                <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 shadow-inner">
                  <Coins className={transaction.type === 'credit_purchase' || transaction.type === 'tutor_earning' ? 'text-emerald-500' : 'text-gray-400'} size={28} />
                </div>
                <h2 className="text-5xl font-black tracking-tighter">
                  {transaction.type === 'credit_purchase' || transaction.type === 'tutor_earning' ? '+' : '-'}{transaction.amount.toLocaleString()}
                </h2>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 mt-5 rounded-full border text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusStyle(transaction.status)}`}>
              {transaction.status === 'completed' && <CheckCircle2 size={12} />}
              {transaction.status === 'pending' && <Clock size={12} />}
              {transaction.status === 'rejected' && <AlertCircle size={12} />}
              {transaction.status}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
                <DetailItem 
                    label="Amount Paid" 
                    value={`₹${transaction.currency.toLocaleString()}`} 
                    isLarge
                />
                <DetailItem 
                    label="Platform Commision" 
                    value={`₹${transaction.amount * creditConst}`} 
                    isLarge
                />
            </div>

            <div className="space-y-4 px-1">
              <DetailItem label="Transaction Type" value={formatType(transaction.type)} />
              
              <DetailItem 
                label="Payment Method" 
                value={transaction.method === 'razor_pay' ? 'Razorpay' : 'Wallet'} 
                icon={transaction.method === 'razor_pay' ? <CreditCard size={14}/> : <Wallet size={14}/>}
              />

              <DetailItem label="Credit Balance Before" value={`${transaction.creditBalance} Credits`} />
            </div>
            
            {!transaction.courseSnapshot && transaction.type !== 'credit_purchase' && (
              <div className="text-center py-3 px-4 bg-amber-50 rounded-xl text-[10px] text-amber-700 font-bold uppercase tracking-wider border border-amber-100 shadow-sm">
                "This is a wallet transaction"
              </div>
            )}

            <div className="pt-4 mt-2 space-y-3 border-t border-gray-100">
               <DetailItem label="Order ID" value={transaction.razorpayOrderId} isCode />
               <DetailItem label="Date" value={new Date(transaction.createdAt).toLocaleString()} />
            </div>
          </div>
        </div>

        <div className="px-6 py-5 bg-gray-50 flex gap-4 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
          >
            Close
          </button>
          {transaction.courseId && (
            <button 
              onClick={handleOpenCourse}
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-200 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  {isEnrolled ? 'Go to Course' : 'View Details'}
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, isCode, icon, isLarge }: { label: string, value: React.ReactNode, isCode?: boolean, icon?: React.ReactNode, isLarge?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        {icon && <span className="text-emerald-600">{icon}</span>}
        <span className={`text-gray-900 ${isLarge ? 'text-lg font-black' : 'text-xs font-bold'} ${isCode ? 'font-mono text-[10px] bg-gray-50 px-2 py-0.5 rounded border border-gray-200' : ''}`}>
          {value}
        </span>
      </div>
    </div>
  );
}