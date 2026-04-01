import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartFilter, EnrollmentChartProps } from './dashboard.types';

const filterOptions: { label: string; value: ChartFilter }[] = [
  { label: 'Days', value: 'days' },
  { label: 'Weeks', value: 'weeks' },
  { label: 'Months', value: 'months' },
  { label: 'Years', value: 'years' },
];

export default function EnrollmentChart({ data = [], onFilterChange, isLoading = false }: EnrollmentChartProps) {
  const [activeFilter, setActiveFilter] = useState<ChartFilter>('days');

  const handleFilterChange = (filter: ChartFilter) => {
    setActiveFilter(filter);
    if (onFilterChange) onFilterChange(filter);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#13161b] border border-gray-700 rounded-lg p-3 shadow-xl min-w-[130px]">
          <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase mb-2">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xl font-bold text-white font-mono">{payload[0].value}</span>
            <span className="text-xs text-gray-500">enrolled</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#13161b] p-5 rounded-xl border border-gray-800 w-full h-full flex flex-col">

      {/* Header */}
      <div className="flex items-start sm:items-center justify-between mb-6 gap-4 shrink-0">
        <div>
          <h2 className="text-sm font-semibold text-white tracking-tight">Enrollment Analytics</h2>
          <p className="text-xs text-gray-500 mt-0.5">Platform growth over time.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex bg-[#0d0f12] border border-gray-800 rounded-lg p-0.5">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                activeFilter === option.value
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[280px] w-full relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#13161b]/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {data.length === 0 && !isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-600">
            <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-xs font-medium">No data for this timeframe</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.slice(-7)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 500 }}
                dy={10}
                minTickGap={20}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 500 }}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#374151', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#enrollGradient)"
                activeDot={{ r: 5, strokeWidth: 0, fill: '#3b82f6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}