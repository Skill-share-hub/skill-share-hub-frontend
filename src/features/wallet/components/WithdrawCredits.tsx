import { useState } from 'react';
import { Landmark, ArrowRightLeft, CheckCircle2, QrCode, ArrowUpCircle } from 'lucide-react';

export function WithdrawCredits() {
  const [credits, setCredits] = useState<string>("500");
  const [step, setStep] = useState(1); // 1: Convert, 2: Withdraw
  const [method, setMethod] = useState<'bank' | 'upi'>('upi');

  const conversionRate = 0.10;
  const receivedAmount = Number(credits) * conversionRate;

  return (
    <div className="max-w-lg overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between px-5 py-4 bg-[#164e33]">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-white" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Earnings & Payout</h2>
        </div>
        <div className="px-2 py-0.5 bg-white/10 rounded-md text-[10px] font-bold text-white uppercase">
          Step {step} of 2
        </div>
      </div>

      <div className="p-5">
        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Credits to convert</label>
              <input
                type="number"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#164e33]/10 focus:border-[#164e33] outline-none transition-all font-bold text-gray-800"
              />
            </div>

            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100/50">
              <div className="flex justify-between text-xs">
                <span className="text-emerald-700 font-medium">Conversion Rate</span>
                <span className="text-emerald-800 font-bold">1 Credit = ₹{conversionRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t border-emerald-100">
                <span className="text-emerald-700 font-medium">You will receive</span>
                <span className="text-lg font-black text-[#164e33]">₹{receivedAmount.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full py-3 bg-[#164e33] text-white font-bold rounded-xl hover:bg-[#1a5d3d] transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-md shadow-[#164e33]/20"
            >
              Convert Credits
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Withdrawal Amount</span>
              <div className="text-2xl font-black text-gray-900">₹{receivedAmount.toLocaleString()}</div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Select Method</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setMethod('bank')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${method === 'bank' ? 'border-[#164e33] bg-[#f0f7f4] text-[#164e33]' : 'border-gray-100 text-gray-500'}`}
                >
                  <Landmark className="w-4 h-4" />
                  <span className="text-xs font-bold">Bank</span>
                </button>
                <button 
                  onClick={() => setMethod('upi')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${method === 'upi' ? 'border-[#164e33] bg-[#f0f7f4] text-[#164e33]' : 'border-gray-100 text-gray-500'}`}
                >
                  <QrCode className="w-4 h-4" />
                  <span className="text-xs font-bold">UPI</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full py-3 bg-[#164e33] text-white font-bold rounded-xl hover:bg-[#1a5d3d] transition-all shadow-md flex items-center justify-center gap-2">
                <ArrowUpCircle className="w-4 h-4" />
                Withdraw Now
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 text-[10px] text-gray-400 bg-gray-50 p-2 rounded-lg">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>System creates request for Admin approval</span>
        </div>
      </div>
    </div>
  );
}