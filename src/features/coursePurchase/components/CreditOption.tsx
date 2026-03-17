import React from "react";
import { Link } from "react-router-dom";
import { Wallet, AlertCircle } from "lucide-react";

interface CreditOptionProps {
  userCredits: number;
  creditsApplied: number;
  canAfford: boolean;
}

const CreditOption: React.FC<CreditOptionProps> = ({ userCredits, creditsApplied, canAfford }) => {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 flex items-center gap-1.5">
          <Wallet className="w-4 h-4 text-emerald-600" />
          Available Wallet Credits:
        </span>
        <span className="font-bold text-gray-900">{userCredits}</span>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Credits Required for Course:</span>
        <span className="font-bold text-red-600">-{creditsApplied}</span>
      </div>

      <div className="h-px bg-gray-100 my-1"></div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-800 font-semibold">Remaining Balance:</span>
        <span className="font-bold text-emerald-700">
          {canAfford ? userCredits - creditsApplied : 0}
        </span>
      </div>

      {!canAfford && (
        <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-xs text-red-800">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold mb-1">Insufficient Credits</p>
            <p className="mb-2">You don't have enough credits in your wallet to cover the full cost of this course.</p>
            <Link 
              to="/wallet" 
              className="inline-flex items-center text-red-700 font-medium hover:text-red-900 border-b border-red-700 hover:border-red-900 pb-0.5 transition-colors"
            >
              Deposit credits to Wallet
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditOption;
