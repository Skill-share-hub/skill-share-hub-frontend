import React from "react";
import { CreditCard } from "lucide-react";

interface PaymentOptionProps {
  coursePrice: number;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ coursePrice }) => {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
      <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg flex items-start gap-3">
        <div className="mt-0.5 p-1.5 bg-white rounded-md shadow-sm border border-blue-100 text-blue-600">
          <CreditCard className="w-4 h-4" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Direct Payment Processing</p>
          <p className="text-xs text-gray-600 leading-relaxed">
            You will be redirected to Razorpay's secure checkout gateway to process the full payment amount of <span className="font-bold text-gray-800">INR {coursePrice}</span>. Supports all major Credit Cards, UPI, and Netbanking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;
