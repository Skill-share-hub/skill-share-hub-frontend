import React from "react";
import type { PurchaseSummaryResponse } from "../services/purchaseApi";

interface PurchaseSummaryPanelProps {
  summary: PurchaseSummaryResponse | null;
  loading: boolean;
  onContinue: () => void;
  continueDisabled: boolean;
  buttonLabel: string;
}

const PurchaseSummaryPanel: React.FC<PurchaseSummaryPanelProps> = ({
  summary,
  loading,
  onContinue,
  continueDisabled,
  buttonLabel,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Order Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Course Base Price</span>
          <span className="font-semibold text-gray-900">
            {loading || !summary ? "..." : `INR ${summary.coursePrice}`}
          </span>
        </div>

        {summary && summary.creditsApplied > 0 && (
          <div className="flex justify-between items-center text-sm animate-in fade-in slide-in-from-top-1">
            <span className="text-emerald-700 font-medium">Wallet Credits Applied</span>
            <span className="font-semibold text-emerald-600">
              - INR {(summary.creditsApplied * 0.5).toFixed(2)}
            </span>
          </div>
        )}

        <div className="h-px bg-gray-100 w-full"></div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 mb-1">Total Amount</span>
            {summary && summary.paymentRequired ? (
              <span className="text-xs text-gray-500">Includes all taxes and fees</span>
            ) : null}
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">
              {loading || !summary ? "..." : `INR ${summary.paymentAmount}`}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={continueDisabled || loading}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-300 transform ${
          continueDisabled || loading
            ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-[0_4px_14px_0_rgba(4,120,87,0.39)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.23)] hover:-translate-y-0.5"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Calculating...
          </span>
        ) : (
          buttonLabel
        )}
      </button>

      <div className="mt-6 flex flex-col items-center gap-3">
        <p className="text-[10px] text-center text-gray-500 max-w-[200px]">
          By proceeding, you adhere to the SkillShareHub Terms of Service.
        </p>
        <div className="flex justify-center items-center gap-2 grayscale opacity-40">
           <svg className="h-4" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z" fill="#0A2540"/><path d="M21.734 19.518c0-1.879-1.527-2.618-3.085-2.618-1.559 0-2.822.42-3.837.957v-1.636c1.111-.568 2.65-.957 4.144-.957 2.617 0 4.606 1.343 4.606 4.102v3.315c0 .762.33 1.18.966 1.18.172 0 .4-.029.566-.089v1.28c-.352.179-1.01.278-1.58.278-1.393 0-1.85-.717-1.85-2.001v-.385c-.958.824-2.5 1.393-4.045 1.393-2.14 0-3.698-1.282-3.698-3.376 0-2.348 2.05-3.352 4.636-3.352 1.189 0 2.222.28 3.167.75v-1.045c.01-.06.011-.129.011-.197zm0 1.942a4.91 4.91 0 00-3.013-.986c-1.42 0-2.585.556-2.585 1.948 0 1.304 1.096 1.912 2.378 1.912 1.252 0 2.35-.448 3.037-1.12.138-.133.183-.243.183-.418V21.46zM11.536 15.016v-1.378H8.84V10.42H6.98v3.218H5V15.016h1.98v5.185c0 1.905.742 2.949 2.997 2.949.774 0 1.543-.168 1.988-.39l-.316-1.543c-.276.126-.818.196-1.314.196-1.077 0-1.493-.5-1.493-1.64v-4.757h2.714z" fill="#FFF"/></g></svg>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummaryPanel;
