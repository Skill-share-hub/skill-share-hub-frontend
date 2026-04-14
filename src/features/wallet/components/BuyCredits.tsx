import { useState } from 'react';
import { Plus, Sparkles, ArrowRight, AlertCircle, Coins, Receipt } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../../../shared/services/axios';
import { loadRazorpayScript } from '../../../shared/utils/razorpay';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { fetchWalletBalance } from '../walletSlice';

export function BuyCredits(
  { creditConst, fetchWallet, purchaseCommision }:
    { creditConst: number, fetchWallet: () => void, purchaseCommision: number }
) {
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useAppDispatch();

  // Calculations
  const platformFee = amount * purchaseCommision;
  const creditsInAccount = amount - platformFee

  const presets = [
    { credits: 10, price: 10 * creditConst },
    { credits: 100, price: 100 * creditConst },
    { credits: 500, price: 500 * creditConst },
    { credits: 1000, price: 1000 * creditConst }
  ];

  const handlePayment = async () => {
    if (!amount || amount < 0) return;
    try {
      const { data: orderRes } = await api.post("/wallet/credits", { amount });
      const order = orderRes.data;

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay SDK. Please check your connection.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Skill share hub",
        description: "Buy Credits",
        order_id: order.id,
        handler: async function (response: any) {
          await api.post("/wallet/credits/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
          await fetchWallet();
          await dispatch(fetchWalletBalance());
          toast.success("Payment successful 🎉");
        },
        prefill: {
          name: "User Name",
          email: "user@email.com",
          contact: "9999999999"
        },
        theme: { color: "#164e33" }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
      <div className="flex items-center justify-between px-6 py-5 bg-[#164e33]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-white/10 rounded-lg">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Buy Credits</h2>
            <p className="text-[10px] text-white/60 font-medium">Top up your wallet instantly</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-yellow-400/80 animate-pulse" />
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
          {presets.map((pkg) => (
            <button
              key={pkg.credits}
              onClick={() => setAmount(pkg.credits)}
              className={`flex flex-col cursor-pointer items-center justify-center py-4 px-2 transition-all border-2 rounded-2xl active:scale-95 ${
                amount === pkg.credits
                  ? "border-[#164e33] bg-[#f0f7f4] shadow-sm"
                  : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
              }`}
            >
              <span className={`text-[10px] font-bold uppercase mb-1 ${amount === pkg.credits ? "text-[#164e33]" : "text-gray-400"}`}>
                ₹{pkg.price}
              </span>
              <div className="flex items-center gap-1">
                <span className={`text-lg font-black ${amount === pkg.credits ? "text-[#164e33]" : "text-gray-900"}`}>
                  {pkg.credits}
                </span>
                <Coins className={`w-3 h-3 ${amount === pkg.credits ? "text-[#164e33]" : "text-gray-400"}`} />
              </div>
            </button>
          ))}
        </div>

        <div className="relative flex flex-col gap-4 pt-4 border-t border-gray-50">
          <div className="relative flex items-center">
            <input
              type="number"
              value={amount || ''}
              min={1}
              onChange={(e) => {
                const value = Number(e.target.value)
                setAmount(value < 1 ? 0 : value > 10000000 ? 10000000 : value)
              }}
              placeholder="Enter custom amount..."
              className="w-full pl-4 pr-10 py-3 text-sm font-medium border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#164e33]/5 focus:border-[#164e33] transition-all"
            />
            <div className="absolute right-3">
                <Coins className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Pricing Summary */}
          {amount > 0 && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-2 mb-2 border-b border-gray-200 pb-2">
                    <Receipt className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Payment Summary</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>Credits in Account :</span>
                    <span className='flex gap-0.5'>
                      <Coins className="w-3 h-3 text-gray-400" />
                      {creditsInAccount.toFixed(0)}
                    </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <span>Platform Fee ({(purchaseCommision * 100).toFixed(0)}%)</span>
                    <span className='flex gap-0.5'>
                      <Coins className="w-3 h-3 text-gray-400" />
                      {platformFee.toFixed(0)}
                    </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#164e33] pt-1">
                    <span>Total Payable</span>
                    <span>₹{(amount * creditConst).toFixed(2)}</span>
                </div>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={amount <= 0}
            className={`w-full py-3.5 font-bold text-white bg-[#164e33] rounded-xl transition-all flex items-center justify-center cursor-pointer gap-2 text-sm shadow-xl shadow-[#164e33]/10 
              ${amount > 0
                ? "hover:bg-[#1a5d3d] active:scale-[0.99]"
                : "opacity-40 cursor-not-allowed"
              }`}
          >
            Confirm Purchase
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-start gap-2 mt-6 p-3 bg-amber-50/50 rounded-xl border border-amber-100/50">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-amber-800 font-medium">
            <span className="font-bold">Important:</span> Credits are non-refundable and subject to platform terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}