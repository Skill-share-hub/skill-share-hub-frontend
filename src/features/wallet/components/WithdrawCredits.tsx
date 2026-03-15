import { useState } from 'react';
import { ArrowRightLeft, CheckCircle2, QrCode, ArrowUpCircle, ShieldCheck, User, RefreshCw, Coins } from 'lucide-react';

export function WithdrawCredits() {
  const [linkedUpi, setLinkedUpi] = useState<string>(""); 
  const [verifiedName, setVerifiedName] = useState<string>("");
  const [step, setStep] = useState(linkedUpi ? 2 : 1);
  
  const [upiInput, setUpiInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [credits, setCredits] = useState<number>(500);
  const conversionRate = 0.10;

  const handleVerifyUpi = () => {
    if (!upiInput.includes('@')) return;
    setIsVerifying(true);
    setTimeout(() => {
      setVerifiedName("John Doe");
      setLinkedUpi(upiInput);
      setIsVerifying(false);
    }, 1200);
  };

  return (
    <div className="max-w-md overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-lg">
      {/* Header - Scaled Down */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#164e33]">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-white" />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Withdrawal</h2>
        </div>
        <span className="text-[9px] font-bold text-white/70 bg-black/20 px-2 py-0.5 rounded-full uppercase">
          Step {step}/2
        </span>
      </div>

      <div className="p-5">
        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in duration-400">
            <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-xl border border-blue-100/30">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <p className="text-[11px] text-blue-800 leading-tight">
                Link a valid UPI ID to enable payouts.
              </p>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">UPI ID</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="username@bank"
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:border-[#164e33] outline-none transition-all font-semibold"
                />
                <QrCode className="absolute right-3 top-3 w-4 h-4 text-gray-300" />
              </div>
              
              {/* Simplified Name Verification */}
              {verifiedName && (
                <div className="mt-2 ml-1 flex items-center gap-1.5 animate-in slide-in-from-top-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-bold text-emerald-700">Verified: {verifiedName}</span>
                </div>
              )}
            </div>

            {!verifiedName ? (
              <button
                onClick={handleVerifyUpi}
                disabled={!upiInput || isVerifying}
                className="w-full py-2.5 bg-[#164e33] text-white text-xs font-bold rounded-xl hover:bg-[#1a5d3d] disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isVerifying ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Verify ID"}
              </button>
            ) : (
              <button
                onClick={() => setStep(2)}
                className="w-full py-2.5 bg-[#164e33] text-white text-xs font-bold rounded-xl transition-all"
              >
                Continue
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-in slide-in-from-right-2 duration-400">
            {/* Minimal Linked Preview */}
            <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-[#164e33]" />
                <span className="text-[11px] font-bold text-gray-700 truncate max-w-[150px]">{linkedUpi}</span>
              </div>
              <button onClick={() => setStep(1)} className="text-[9px] font-bold text-[#164e33] hover:underline uppercase">Change</button>
            </div>

            {/* Compact Conversion Inputs */}
            <div className="grid grid-cols-1 gap-2">
              <div className="relative">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Credits</label>
                <div className="mt-1 relative flex items-center">
                  <input
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(Number(e.target.value))}
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-black text-gray-800 focus:border-[#164e33] outline-none"
                  />
                  <Coins className="absolute right-3 w-4 h-4 text-amber-500" />
                </div>
              </div>

              <div className="relative">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Receiving (₹)</label>
                <div className="mt-1 relative flex items-center">
                  <input
                    readOnly
                    value={(credits * conversionRate).toFixed(2)}
                    className="w-full px-3 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-lg font-black text-emerald-700 outline-none"
                  />
                  <span className="absolute right-3 text-sm font-bold text-emerald-600">₹</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => alert('Processing...')}
              className="w-full py-3 bg-[#164e33] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#164e33]/10 flex items-center justify-center gap-2"
            >
              <ArrowUpCircle className="w-4 h-4" />
              Confirm Withdrawal
            </button>
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 text-[9px] text-gray-400 p-2 bg-gray-50/50 rounded-lg">
          <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
          <p>Request sent to admin. Payouts take 24-48 hours.</p>
        </div>
      </div>
    </div>
  );
}