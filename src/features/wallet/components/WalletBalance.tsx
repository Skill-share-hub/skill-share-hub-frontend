import { RefreshCcw, HandCoins, BookMarked, Wallet, TrendingUp } from 'lucide-react';
import type { QueryType, Wallet as WalletType } from '../wallet.types';

export function WalletBalance({
  loading,
  wallet,
  setForm,
}: {
  loading: boolean;
  wallet: WalletType;
  setForm: (pre: any) => void;
}) {
  return (
    <div className="relative overflow-hidden bg-[#164e33] border border-white/5 rounded-3xl p-5 md:p-6 shadow-2xl shadow-black/20">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col gap-4">
        
        {/* Header Section */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl border border-white/10">
              <Wallet className="w-4 h-4 text-emerald-300" />
            </div>
            <h3 className="text-white font-bold tracking-tight text-sm md:text-base leading-none">Wallet Summary</h3>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Conversion Rate */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full border border-white/5">
              <TrendingUp className="w-3 h-3 text-emerald-400/70" />
              <span className="text-[10px] font-bold text-emerald-200/60 uppercase tracking-tight">
                1 Credit = ₹{wallet.creditConst}
              </span>
            </div>

            {/* Sync Button: Icon only, Counter-Clockwise rotation */}
            <button
              onClick={() => setForm((pre: QueryType) => ({ ...pre, refresh: true }))}
              className="p-2.5 bg-emerald-950/60 rounded-full border border-emerald-800/30 cursor-pointer active:opacity-70 transition-opacity"
              title="Sync Wallet"
            >
              <RefreshCcw
                className={`w-4 h-4 text-emerald-200 ${
                  loading ? "animate-[spin_1s_linear_infinite_reverse]" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Symmetry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
          
          {/* Purchase Wallet */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <HandCoins className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/10 font-black uppercase tracking-tighter">Locked</span>
            </div>
            
            <p className="text-emerald-200/50 text-[9px] font-bold uppercase tracking-widest mb-1">Purchase Balance</p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <h2 className="text-3xl md:text-4xl font-black text-white leading-none">{wallet.creditBalance}</h2>
                <span className="text-emerald-400 font-bold text-xs uppercase">Credits</span>
              </div>
              <p className="text-xl font-black text-emerald-100/90 whitespace-nowrap">₹{wallet.creditValue}</p>
            </div>
          </div>

          {/* Course Earnings */}
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                <BookMarked className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/10 font-black uppercase tracking-tighter">Earned</span>
            </div>
            
            <p className="text-emerald-200/50 text-[9px] font-bold uppercase tracking-widest mb-1">Withdrawable balance</p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <h2 className="text-3xl md:text-4xl font-black text-white leading-none">{wallet.earnedCreditBalance}</h2>
                <span className="text-emerald-400 font-bold text-xs uppercase">Credits</span>
              </div>
              <p className="text-xl font-black text-emerald-100/90 whitespace-nowrap">₹{wallet.earnedCreditValue}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}