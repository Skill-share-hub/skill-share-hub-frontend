import { ArrowUpRight, ArrowDownLeft, ShoppingBag, CreditCard, Calendar, ChevronDown } from "lucide-react";
import type { Transaction as TransactionType } from "../wallet.types";

export function WalletTransaction() {
  const arr: TransactionType[] = [
    { amount: 500, type: "credit_purchase", method: "razor_pay", date: "12 Mar 2026", status: "completed" },
    { amount: 1200, type: "course_purchase", method: "wallet", date: "10 Mar 2026", status: "completed" },
    { amount: 300, type: "credit_withdraw", method: "razor_pay", date: "08 Mar 2026", status: "pending" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
        <button className="text-sm font-medium text-[#164e33] hover:underline">View All</button>
      </div>
      
      <div className="space-y-4">
        {arr.map((v, index) => (
          <Transaction key={index} data={v} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-[#164e33] transition-all border border-[#164e33]/20 rounded-full hover:bg-[#164e33] hover:text-white hover:border-[#164e33] active:scale-95 group">
          Show More
          <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

function Transaction({ data }: { data: TransactionType }) {

  const config = {
    credit_purchase: {
      borderColor: "border-l-emerald-500",
      icon: <ArrowDownLeft className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      label: "Credit Added"
    },
    course_purchase: {
      borderColor: "border-l-blue-500",
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
      label: "Course Purchase"
    },
    credit_withdraw: {
      borderColor: "border-l-amber-500",
      icon: <ArrowUpRight className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
      label: "Withdrawal"
    }
  };

  const style = config[data.type as keyof typeof config] || config.credit_purchase;

  return (
    <div className={`w-full flex items-center justify-between p-4 bg-white border border-gray-100 border-l-4 ${style.borderColor} rounded-xl shadow-sm transition-hover hover:shadow-md`}>
      <div className="flex items-center gap-4">

        <div className={`p-3 rounded-full ${style.bg}`}>
          {style.icon}
        </div>

        <div>
          <div className="font-semibold text-gray-900 capitalize">
            {style.label}
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <CreditCard className="w-3 h-3" /> {data.method.replace('_', ' ')}
            </span>
            <span className="flex items-center gap-1 border-l pl-3">
              <Calendar className="w-3 h-3" /> {data.date}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className={`text-lg font-bold ${data.type === 'credit_purchase' ? 'text-emerald-600' : 'text-gray-900'}`}>
          {data.type === 'credit_purchase' ? '+' : '-'} ₹{data.amount}
        </div>
        <div className="mt-1">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
            data.status === 'completed' ? 'bg-gray-100 text-gray-600' : 'bg-amber-100 text-amber-700'
          }`}>
            {data.status}
          </span>
        </div>
      </div>
    </div>
  );
}