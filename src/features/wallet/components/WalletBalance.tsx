import { RefreshCcw, Wallet, TrendingUp } from 'lucide-react';
import type { QueryType, Wallet as WalletType } from '../wallet.types';

export function WalletBalance(
  {loading , wallet , setForm }:
  {loading :boolean , wallet : WalletType , setForm:(pre:any)=>void}
) {

  return (
    <div className="relative overflow-hidden bg-[#164e33] rounded-3xl p-8 shadow-2xl shadow-[#164e33]/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-emerald-200/70 text-xs font-bold uppercase tracking-widest">Total Balance</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-black text-white">{wallet.creditBalance}</h2>
              <span className="text-emerald-300 font-bold text-lg">Credits</span>
            </div>
          </div>
        </div>

        <div className="h-12 w-[1px] bg-white/10 hidden md:block" />

        <div>
          <p className="text-emerald-200/70 text-xs font-bold uppercase tracking-widest">Current Value</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-white">₹{wallet.creditValue}</h2>
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-400/20 rounded-lg text-emerald-300 text-[10px] font-bold">
              <TrendingUp className="w-3 h-3" />
              1:{wallet.creditConst}
            </div>
          </div>
        </div>

        <button onClick={() => setForm((pre:QueryType)=> ({...pre,refresh : true}))} className="p-3 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/10 cursor-pointer">
          <RefreshCcw className={`w-5 h-5 text-white ${loading ? "animate-[spin_1s_linear_infinite_reverse]" : ""} transition-transform duration-500`} />
        </button>
      </div>
    </div>
  );
}