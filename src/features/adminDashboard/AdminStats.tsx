import { Users, BookOpen, UserCheck, Clock, ArrowUpRight } from 'lucide-react';

const THEME = {
  "users": {
    icon: Users,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    bar: 'bg-blue-500',
    glow: 'bg-blue-500',
  },
  "courses": {
    icon: BookOpen,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    bar: 'bg-purple-500',
    glow: 'bg-purple-500',
  },
  "enrollments": {
    icon: UserCheck,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    bar: 'bg-emerald-500',
    glow: 'bg-emerald-500',
  },
  "watch time": {
    icon: Clock,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    bar: 'bg-amber-500',
    glow: 'bg-amber-500',
  },
};

export default function AdminStats({ data }: { data: { stats: any[] } }) {
  const stats = data?.stats;
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} stat={stat} />
      ))}
    </div>
  );
}

function StatCard({ stat }: { stat: any }) {
  const config = THEME[stat.title.toLowerCase() as keyof typeof THEME] || THEME["users"];

  const formatValue = (val: number) => {
    if (stat.unit === "min") return `${val}m`;
    return val.toLocaleString();
  };

  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-800 bg-[#13161b] p-5 overflow-hidden transition-all duration-200 hover:border-gray-700">

      {/* Subtle glow on hover */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${config.glow}`} />

      {/* Header: icon + LIVE badge */}
      <div className="flex items-start justify-between mb-5">
        <div className={`p-2.5 rounded-lg ${config.iconBg} ${config.iconColor}`}>
          <config.icon size={20} strokeWidth={1.8} />
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-800 text-gray-500 text-[10px] font-medium tracking-widest">
          <ArrowUpRight size={10} />
          LIVE
        </div>
      </div>

      {/* Count + Title */}
      <div className="mb-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500 mb-1">
          {stat.title}
        </p>
        <h3 className="text-3xl font-bold text-white tracking-tight font-mono">
          {formatValue(stat.count)}
        </h3>
      </div>

      {/* Detail Bars */}
      {stat.details && stat.details.length > 0 && (
        <div className="space-y-3 mt-auto">
          {stat.details.map((detail: any, i: number) => {
            const percentage = stat.count > 0 ? (detail.value / stat.count) * 100 : 0;
            const isZero = detail.value === 0;

            return (
              <div key={i} className={`transition-opacity ${isZero ? 'opacity-30' : 'opacity-100'}`}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">{detail.label}</span>
                  <span className="text-gray-300 font-medium font-mono">
                    {formatValue(detail.value)}
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-gray-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${config.bar}`}
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