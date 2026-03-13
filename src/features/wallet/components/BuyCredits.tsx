import { useState } from 'react';
import { Plus, Sparkles, ArrowRight } from 'lucide-react';

export function BuyCredits() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");

  const presets = [
    { credits: 100, price: 10 },
    { credits: 200, price: 20 },
    { credits: 300, price: 30 },
    { credits: 400, price: 40 },
  ];

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const customVal = Number(customAmount);
  const hasValue = selectedAmount !== null || (customVal > 0);
  const showConversion = customAmount !== "" && customVal > 0;

  return (
    <div className="max-w-xl overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between px-5 py-5 bg-[#164e33]">
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-white" />
          <h2 className="text-lg font-semibold text-white uppercase tracking-wider">Buy Credits</h2>
        </div>
        <Sparkles className="w-4 h-4 text-white/40" />
      </div>

      <div className="p-4">
        <div className="flex gap-4">
          {presets.map((pkg) => (
            <button
              key={pkg.credits}
              onClick={() => handlePresetClick(pkg.credits)}
              className={`flex flex-col items-center py-2 px-5 mb-4 transition-all border border-gray-300 cursor-pointer rounded-xl ${
                selectedAmount === pkg.credits
                  ? "border-[#164e33] bg-[#f0f7f4] ring-1 ring-[#164e33]"
                  : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
              }`}
            >
              <span className={`text-[10px] font-bold uppercase ${selectedAmount === pkg.credits ? "text-[#164e33]" : "text-gray-500"}`}>
                {pkg.credits}
              </span>
              <span className={`text-xs font-black ${selectedAmount === pkg.credits ? "text-[#164e33]" : "text-gray-900"}`}>
                ₹{pkg.price}
              </span>
            </button>
          ))}
        </div>

        <div className="relative flex flex-col gap-2">
          <div className="relative flex items-center">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              placeholder="Custom amount..."
              className="w-full pl-3 pr-20 py-2.5 text-sm border border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#164e33]/10 focus:border-[#164e33] transition-all"
            />
            
            {showConversion && (
              <div className="absolute right-2 flex items-center gap-1.5 px-2 py-1 bg-[#164e33] rounded-lg animate-in fade-in zoom-in duration-200">
                <span className="text-[10px] font-bold text-white/80">Pay:</span>
                <span className="text-xs font-bold text-white">₹{customVal / 10}</span>
              </div>
            )}
          </div>

          <div className={`max-h-16 transition-all duration-300 overflow-hidden ${
            hasValue ? "cursor-pointer" : "pointer-events-none opacity-70"
          }`}>
            <button className="w-full py-2.5 font-bold text-white bg-[#164e33] rounded-xl hover:bg-[#1a5d3d] transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm shadow-md shadow-[#164e33]/20">
              Buy Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}