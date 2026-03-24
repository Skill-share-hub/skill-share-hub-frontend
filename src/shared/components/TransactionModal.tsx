import React from 'react';
import { X, Receipt, CheckCircle2, Clock, AlertCircle, CreditCard, Wallet, Coins } from 'lucide-react';
import type { Transaction } from '../../features/wallet/wallet.types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export default function TransactionModal({ isOpen, onClose, transaction }: ModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm p-4">
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

        <div className="p-6 space-y-6">
          <div className="text-center pb-4 border-b border-dashed border-gray-200">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Credits Transacted</p>
            <div className="flex items-center justify-center gap-2 mt-1">
                <Coins className="text-emerald-700" size={24} />
                <h2 className="text-4xl font-black text-gray-900">
                {transaction.amount.toLocaleString()}
                </h2>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 mt-4 rounded-full border text-[10px] font-black uppercase ${getStatusStyle(transaction.status)}`}>
              {transaction.status === 'completed' && <CheckCircle2 size={12} />}
              {transaction.status === 'pending' && <Clock size={12} />}
              {transaction.status === 'rejected' && <AlertCircle size={12} />}
              {transaction.status}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <DetailItem 
                    label="Paid Amount" 
                    value={`₹${transaction.currency.toLocaleString()}`} 
                />
            </div>

            <DetailItem label="Transaction Type" value={formatType(transaction.type)} />
            
            <DetailItem 
              label="Payment Method" 
              value={transaction.method === 'razor_pay' ? 'Razorpay' : 'Wallet'} 
              icon={transaction.method === 'razor_pay' ? <CreditCard size={14}/> : <Wallet size={14}/>}
            />

            <DetailItem label="Balance Before" value={`${transaction.creditBalance} Credits`} />
            
            <div className="pt-2 mt-2 space-y-3 border-t border-gray-50">
               <DetailItem label="Order ID" value={transaction.razorpayOrderId} isCode />
               {transaction.razorpayPaymentId && (
                 <DetailItem label="Payment ID" value={transaction.razorpayPaymentId} isCode />
               )}
               <DetailItem label="Date" value={new Date(transaction.createdAt).toLocaleString()} />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, isCode, icon }: { label: string, value: string, isCode?: boolean, icon?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        {icon && <span className="text-emerald-700">{icon}</span>}
        <span className={`text-sm font-bold text-gray-800 ${isCode ? 'font-mono text-[11px] bg-gray-100 px-2 py-0.5 rounded border border-gray-200' : ''}`}>
          {value}
        </span>
      </div>
    </div>
  );
}