import { IndianRupee, ArrowUpRight, ArrowDownRight, TrendingUp, CreditCard, Wallet, Percent } from 'lucide-react';

export default function AdminEarnings() {
  const earningsData = [
    {
      id: 1,
      label: 'Course Enrollments',
      amount: '₹84,250.00',
      percentage: '+12.5%',
      isPositive: true,
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      id: 2,
      label: 'Platform Fees',
      amount: '₹15,420.00',
      percentage: '+5.2%',
      isPositive: true,
      icon: Percent,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      id: 3,
      label: 'Withdrawal Comm.',
      amount: '₹3,180.00',
      percentage: '-2.4%',
      isPositive: false,
      icon: Wallet,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-500/10'
    },
    {
      id: 4,
      label: 'Subscriptions',
      amount: '₹21,650.00',
      percentage: '+18.1%',
      isPositive: true,
      icon: CreditCard,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-500/10'
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full flex flex-col">
      <div className="mb-6 shrink-0">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Breakdown</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Platform earnings distribution.</p>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-xl p-6 mb-8 relative overflow-hidden shrink-0 shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
              <IndianRupee size={16} className="text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-slate-300 tracking-wide uppercase">Total Revenue</span>
          </div>
          <p className="text-4xl font-extrabold text-white tracking-tight">₹124,500.00</p>
          <div className="flex items-center gap-1.5 mt-4 text-sm bg-white/10 w-fit px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/5">
            <span className="text-emerald-400 flex items-center font-bold">
              <ArrowUpRight size={16} strokeWidth={3} />
              +14.2%
            </span>
            <span className="text-slate-300 font-medium ml-1">vs last month</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {earningsData.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-xl transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 group-hover:shadow-sm transition-all duration-300`}>
                  <Icon size={20} className="shrink-0" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {item.isPositive ? (
                      <ArrowUpRight size={14} className="text-emerald-500" strokeWidth={3} />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500" strokeWidth={3} />
                    )}
                    <span className={`text-xs font-bold ${item.isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {item.percentage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-slate-900 dark:text-white group-hover:scale-105 transition-transform origin-right">{item.amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
