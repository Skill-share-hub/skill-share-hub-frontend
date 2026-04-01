import React from "react";
import { LayoutList, Wallet, CreditCard } from "lucide-react";

interface MixedPaymentOptionProps {
  userCredits: number;
  creditsApplied: number;
  paymentAmount: number;
}

const MixedPaymentOption: React.FC<MixedPaymentOptionProps> = ({ userCredits, creditsApplied, paymentAmount }) => {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 flex items-center gap-1.5">
          <Wallet className="w-4 h-4 text-emerald-600" />
          Available Wallet Credits:
        </span>
        <span className="font-bold text-gray-900">{userCredits}</span>
      </div>

      <div className="flex justify-between items-center text-sm mt-1">
        <span className="text-gray-600 flex items-center gap-1.5 ml-5">
          <LayoutList className="w-3.5 h-3.5 text-gray-400" />
          Auto-applied to Order:
        </span>
        <span className="font-bold text-emerald-600">-{creditsApplied} Credits</span>
      </div>

      <div className="h-px bg-gray-100 my-1"></div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-800 font-semibold flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-emerald-700" />
          Remaining Balance to Pay:
        </span>
        <span className="font-bold text-gray-900 text-base">INR {paymentAmount}</span>
      </div>
      
      <div className="mt-1 p-3 bg-emerald-50/50 border border-emerald-100/50 rounded-lg">
        <p className="text-xs text-emerald-800 leading-relaxed">
          Your maximum available credits have been applied towards the total cost. The remaining INR {paymentAmount} will be securely processed through Razorpay.
        </p>
      </div>

    </div>
  );
};

export default MixedPaymentOption;
