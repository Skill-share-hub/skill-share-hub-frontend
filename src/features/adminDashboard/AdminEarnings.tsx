import { IndianRupee, ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Percent } from 'lucide-react';

export default function AdminEarnings({ earnings }: { earnings: any }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const earningsData = [
    {
      id: 1,
      label: 'Course Enrollments',
      amount: formatCurrency(earnings.enrollmentEarnings),
      percentage: '+12.5%',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      id: 2,
      label: 'Platform Fees',
      amount: formatCurrency(earnings?.feeEarnings),
      percentage: '+5.2%',
      isPositive: true,
      icon: Percent,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      id: 3,
      label: 'Withdrawal Fees',
      amount: formatCurrency(earnings.withdrawalEarnings),
      percentage: '0.0%',
      isPositive: true,
      icon: Wallet,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="bg-[#13161b] p-5 rounded-xl border border-gray-800 w-full h-full flex flex-col">
      {/* Header */}
      <div className="mb-5 shrink-0">
        <h2 className="text-sm font-semibold text-white tracking-tight">Revenue Breakdown</h2>
        <p className="text-xs text-gray-500 mt-0.5">Platform earnings distribution.</p>
      </div>

      {/* Main Total Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-xl p-6 mb-8 relative overflow-hidden shrink-0 shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-gray-800 rounded-md">
              <IndianRupee size={13} className="text-gray-400" />
            </div>
            <span className="text-[10px] font-medium tracking-[0.2em] text-gray-500 uppercase">
              Total Revenue
            </span>
          </div>
          <p className="text-4xl font-extrabold text-white tracking-tight">
            {formatCurrency(earnings?.totalEarnings)}
          </p>
          <div className="flex items-center gap-1.5 mt-4 text-sm bg-white/10 w-fit px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/5">
            <span className="text-emerald-400 flex items-center font-bold">
              <ArrowUpRight size={16} strokeWidth={3} />
              +14.2%
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-5 scrollbar-thin">
        {earningsData?.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                  <Icon size={15} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {item.isPositive ? (
                      <ArrowUpRight size={14} className="text-emerald-500" strokeWidth={3} />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" strokeWidth={3} />
                    )}
                    <span
                      className={`text-xs font-bold ${
                        item.isPositive ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    >
                      {item.percentage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-slate-900 dark:text-white group-hover:scale-105 transition-transform origin-right">
                  {item.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
