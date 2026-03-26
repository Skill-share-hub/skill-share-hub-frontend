import { Users, BookOpen, UserCheck, Clock, ArrowUpRight } from 'lucide-react';

const THEME = {
  "users": { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', darkText: 'dark:text-blue-400', darkBg: 'dark:bg-blue-900/20', bar: 'bg-blue-500' },
  "courses": { icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50', darkText: 'dark:text-purple-400', darkBg: 'dark:bg-purple-900/20', bar: 'bg-purple-500' },
  "enrollments": { icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', darkText: 'dark:text-emerald-400', darkBg: 'dark:bg-emerald-900/20', bar: 'bg-emerald-500' },
  "watch time": { icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50', darkText: 'dark:text-orange-400', darkBg: 'dark:bg-orange-900/20', bar: 'bg-orange-500' },
};

export default function AdminStats({ data }: { data: { stats: any[] } }) {
  const stats = data?.stats;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          stat={stat}
        />
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: any }) {
  const config = THEME[stat.title.toLowerCase() as keyof typeof THEME] || THEME.users;
  
  const formatValue = (val: number) => {
    if (stat.unit === "min") return `${val}m`;
    return val.toLocaleString();
  };

  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-5 transition-all hover:border-transparent hover:shadow-2xl hover:shadow-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
      <div className={`absolute -right-2 -top-2 h-24 w-24 rounded-full blur-3xl opacity-0 transition-opacity group-hover:opacity-20 ${config.bg}`} />

      <div className="flex items-start justify-between">
        <div className={`rounded-2xl p-3 ${config.bg} ${config.color} ${config.darkBg} ${config.darkText}`}>
          <config.icon size={24} strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-400 dark:bg-slate-800">
          <ArrowUpRight size={12} />
          LIVE
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          {stat.title}
        </p>
        <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {formatValue(stat.count)}
        </h3>
      </div>

      {stat.details && stat.details.length > 0 && (
        <div className="mt-6 grid gap-3">
          {stat.details.map((detail: any, i: number) => {
            const isZero = detail.value === 0;
            const percentage = stat.count > 0 ? (detail.value / stat.count) * 100 : 0;

            return (
              <div key={i} className={`group/item ${isZero ? 'opacity-40' : 'opacity-100'}`}>
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">{detail.label}</span>
                  <span className="text-slate-900 dark:text-slate-300">
                    {formatValue(detail.value)}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full transition-all duration-700 ease-out ${config.bar}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}