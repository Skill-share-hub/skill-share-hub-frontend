import { ArrowUpRight, ArrowDownLeft, CreditCard, Calendar, ChevronDown, Filter, Coins } from "lucide-react";
import type { QueryType, STATUS, Transaction, Transaction as TransactionType } from "../wallet.types";
import { useState } from "react";
import { formatDate } from "../../../shared/utils/dateFormatter";
import TransactionModal from "../../../shared/components/TransactionModal";

const STATUS_OPTIONS: { label: string; value: STATUS }[] = [
  { label: "All", value: "" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" }
];

const statusStyles = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  initialized: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  "": ""
};

export function WalletTransaction(
  {setForm , transaction , loading , form}:
  {setForm : (pre:any)=>void , transaction :TransactionType[] , loading : boolean , form:QueryType }
) {
  const handleStatusChange = (newStatus: STATUS) => {
    setForm((pre:QueryType) => ({...pre , status : newStatus}));
  };

  const handleShowMore = () => {
    setForm((pre:QueryType) => ({ ...pre, limit: pre.limit + 1 }));
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
        {transaction?.length > 0 ? (
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
  const [open, setOpen] = useState(false);
  const isDebit = data.type === "course_purchase" || data.type === "credit_withdraw";
  const date = formatDate(data.createdAt);

  const displayLabel = data.type === "course_purchase" 
    ? `Purchased ${data.courseSnapshot?.title || "Course"}`
    : data.type === "credit_purchase" ? "Credits Added" : 
      data.type === "tutor_earning" ? `Earning from ${data.courseSnapshot?.title || "Course"}` : "Transaction Details";
    
  const displayThumbnail = data.courseSnapshot?.thumbnail;

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div onClick={handleClick} className={`w-full flex cursor-pointer items-center justify-between p-4 bg-white border border-gray-100 border-l-4 ${isDebit ? "border-l-red-500" : "border-l-green-500"} rounded-xl shadow-sm hover:shadow-xl transition-shadow`}>
        <div className="flex items-center gap-4">
          <div className={`p-0.5 rounded-full overflow-hidden ${isDebit ? "bg-red-50" : "bg-green-50"} w-11 h-11 flex items-center justify-center shrink-0`}>
            {displayThumbnail ? (
              <img src={displayThumbnail} alt={displayLabel} className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className={`p-2.5 rounded-full ${isDebit ? "text-red-600" : "text-green-600"}`}>
                {isDebit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
              </div>
            )}
          </div>
          <div>
            <div className={`font-bold text-gray-900 line-clamp-1 max-w-[200px] sm:max-w-md ${isDebit ? "" : "text-green-900"}`}>
              {displayLabel}
            </div>
            <div className="flex items-center gap-3 mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <span className="flex items-center gap-1">
                <CreditCard className="w-3 h-3" /> {data.method.replace("_", " ")}
              </span>
              <span className="flex items-center gap-1 border-l border-gray-200 pl-3">
                <Calendar className="w-3 h-3" /> {date}
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={`flex items-center justify-end gap-1.5 text-lg font-black tracking-tight ${isDebit ? "text-gray-900" : "text-emerald-600"}`}>
            <span className="text-xl leading-none">
              {isDebit ? "-" : "+"}
            </span>
            <div className={`flex items-center px-2 py-1 rounded-lg border shadow-sm ${isDebit ? "bg-gray-50 border-gray-100" : "bg-emerald-50 border-emerald-100"}`}>
              <Coins className={`w-4 h-4 mr-1 ${isDebit ? "text-gray-400" : "text-emerald-600"}`} />
              <span>{data.amount}</span>
            </div>
          </div>
          <div className="mt-1">
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest ${statusStyles[data.status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-600'}`}>
              {data.status || "All"}
            </span>
          </div>
        </div>
      </div>
      <TransactionModal isOpen={open} onClose={() => setOpen(false)} transaction={data} />
    </>
  );
}
