import { ArrowUpRight, ArrowDownLeft, ShoppingBag, CreditCard, Calendar, ChevronDown, Filter, Coins } from "lucide-react";
import type { STATUS, Transaction as TransactionType } from "../wallet.types";
import { useEffect, useState } from "react";
import handleError from "../../../shared/services/handleError";
import api from "../../../shared/services/axios";
import { formatDate } from "../../../shared/utils/dateFormatter";

const STATUS_OPTIONS: { label: string; value: STATUS }[] = [
  { label: "All", value: "" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" }
];

export function WalletTransaction() {
  const [transaction, setTransaction] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{ limit: number; status: STATUS }>({
    limit: 1,
    status: "",
  });

  const fetchTransaction = async (isNewFilter: boolean = false) => {
    setLoading(true);
    try {
      const currentLimit = isNewFilter ? 1 : form.limit;
      const { data: walletData } = await api.get(
        `/wallet?limit=${3 * currentLimit}&status=${form.status}`
      );
      setTransaction(walletData.data.transactions);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [form.status, form.limit]);

  const handleStatusChange = (newStatus: STATUS) => {
    setForm({ limit: 1, status: newStatus });
  };

  const handleShowMore = () => {
    setForm((prev) => ({ ...prev, limit: prev.limit + 1 }));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          <Filter className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleStatusChange(opt.value)}
              className={`px-4 py-1.5 cursor-pointer rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${
                form.status === opt.value
                  ? "bg-[#164e33] text-white border-[#164e33]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#164e33]/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`space-y-4 transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}>
        {transaction.length > 0 ? (
          transaction.map((v) => <Transaction key={v._id} data={v} />)
        ) : (
          <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
            No transactions found.
          </div>
        )}
      </div>

      {transaction.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-[#164e33] transition-all border border-[#164e33]/20 rounded-full hover:bg-[#164e33] hover:text-white disabled:opacity-50 active:scale-95 group"
          >
            {loading ? "Loading..." : "Show More"}
            {!loading && <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />}
          </button>
        </div>
      )}
    </div>
  );
}

function Transaction({ data }: { data: TransactionType }) {
  const config = {
    credit_purchase: {
      borderColor: "border-l-emerald-500",
      icon: <ArrowDownLeft className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      label: "Credit Added",
    },
    course_purchase: {
      borderColor: "border-l-blue-500",
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
      label: "Course Purchase",
    },
    credit_withdraw: {
      borderColor: "border-l-amber-500",
      icon: <ArrowUpRight className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
      label: "Withdrawal",
    },
  };

  const statusStyles = {
    completed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    initialized: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    "": ""
  };

  const style = config[data.type as keyof typeof config] || config.credit_purchase;
  const date = formatDate(data.createdAt);

  return (
    <div className={`w-full flex items-center justify-between p-4 bg-white border border-gray-100 border-l-4 ${style.borderColor} rounded-xl shadow-sm hover:shadow-md transition-shadow`}>
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
              <CreditCard className="w-3 h-3" /> {data.method.replace("_", " ")}
            </span>
            <span className="flex items-center gap-1 border-l pl-3">
              <Calendar className="w-3 h-3" /> {date}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className={`flex items-center justify-end gap-1.5 text-lg font-black tracking-tight ${data.type === "credit_purchase" ? "text-emerald-600" : "text-gray-900"}`}>
          <span className="text-xl leading-none">
            {data.type === "credit_purchase" ? "+" : "-"}
          </span>
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
            <Coins className="w-4 h-4 text-[#164e33] mr-1" />
            <span>{data.amount}</span>
          </div>
        </div>
        <div className="mt-1">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${statusStyles[data.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-600'}`}>
            {data.status || "All"}
          </span>
        </div>
      </div>
    </div>
  );
}