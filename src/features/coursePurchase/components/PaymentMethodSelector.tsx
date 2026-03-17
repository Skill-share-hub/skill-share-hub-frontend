import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import CreditOption from "./CreditOption";
import PaymentOption from "./PaymentOption";
import MixedPaymentOption from "./MixedPaymentOption";

interface PaymentMethodSelectorProps {
  selectedMethod: "credit" | "payment" | "credit_payment";
  onSelectMethod: (method: "credit" | "payment" | "credit_payment") => void;
  courseType: "paid" | "credit";
  userCredits: number;
  coursePrice: number;
  creditsApplied: number;
  paymentAmount: number;
  canAffordWithCredits: boolean;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  courseType,
  userCredits,
  coursePrice,
  creditsApplied,
  paymentAmount,
  canAffordWithCredits,
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Select Payment Method</h2>
      
      <div className="space-y-4">
        {/* Credit Option */}
        <label 
          className={`block relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
            selectedMethod === "credit"
              ? "border-emerald-600 bg-emerald-50/10 shadow-sm"
              : "border-gray-100 hover:border-gray-200 bg-white"
          }`}
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 relative">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={selectedMethod === "credit"}
                  onChange={() => onSelectMethod("credit")}
                  className="sr-only"
                />
                {selectedMethod === "credit" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-300" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span className={`font-semibold ${selectedMethod === "credit" ? "text-emerald-900" : "text-gray-900"}`}>
                    Credit Balance
                  </span>
                  {selectedMethod === "credit" && (
                    <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">Pay using your available SkillShareHub Wallet credits.</p>
                
                {selectedMethod === "credit" && (
                  <CreditOption 
                    userCredits={userCredits} 
                    creditsApplied={creditsApplied} 
                    canAfford={canAffordWithCredits} 
                  />
                )}
              </div>
            </div>
          </div>
        </label>

        {/* Direct Payment Option (Only for paid courses) */}
        {courseType === "paid" && (
          <label 
            className={`block relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
              selectedMethod === "payment"
                ? "border-emerald-600 bg-emerald-50/10 shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-white"
            }`}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 relative">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payment"
                    checked={selectedMethod === "payment"}
                    onChange={() => onSelectMethod("payment")}
                    className="sr-only"
                  />
                  {selectedMethod === "payment" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className={`font-semibold ${selectedMethod === "payment" ? "text-emerald-900" : "text-gray-900"}`}>
                      Direct Checkout
                    </span>
                    {selectedMethod === "payment" && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Pay securely directly via Razorpay.</p>
                  
                  {selectedMethod === "payment" && (
                    <PaymentOption coursePrice={coursePrice} />
                  )}
                </div>
              </div>
            </div>
          </label>
        )}

        {/* Mixed Payment Option (Credit + Razorpay) */}
        {courseType === "paid" && userCredits > 0 && (
          <label 
            className={`block relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
              selectedMethod === "credit_payment"
                ? "border-emerald-600 bg-emerald-50/10 shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-white"
            }`}
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 relative">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_payment"
                    checked={selectedMethod === "credit_payment"}
                    onChange={() => onSelectMethod("credit_payment")}
                    className="sr-only"
                  />
                  {selectedMethod === "credit_payment" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className={`font-semibold ${selectedMethod === "credit_payment" ? "text-emerald-900" : "text-gray-900"}`}>
                      Split Payment (Credits + Card)
                    </span>
                    {selectedMethod === "credit_payment" && (
                      <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Use all available credits and pay the remaining balance via Razorpay.</p>
                  
                  {selectedMethod === "credit_payment" && (
                    <MixedPaymentOption 
                      userCredits={userCredits} 
                      creditsApplied={creditsApplied} 
                      paymentAmount={paymentAmount} 
                    />
                  )}
                </div>
              </div>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
