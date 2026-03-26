import { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
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
        if (onFilterChange) {
            onFilterChange(filter);
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl min-w-[150px]">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                        {label}
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            {payload[0].value} <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Enrollments</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full flex flex-col">
            <div className="flex items-start sm:items-center justify-between mb-8 gap-4 shrink-0">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Enrollment Analytics</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Platform growth over time.</p>
                </div>

                <div className="p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl inline-flex shadow-inner">
                    {filterOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleFilterChange(option.value)}
                            className={`px-4 cursor-pointer mx-1 py-1.5 text-sm font-medium transition-all duration-300 rounded-lg ${activeFilter === option.value
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 min-h-[300px] w-full relative">
                {isLoading && (
                    <div className="absolute inset-0 z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center rounded-xl">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {data.length === 0 && !isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400 dark:text-slate-500">
                        <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="font-medium">No enrollment data available for this timeframe</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.slice(-7)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800/80" />
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }}
                                dy={12}
                                minTickGap={20}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }}
                                tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorEnrollments)"
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6', className: 'shadow-[0_0_15px_rgba(59,130,246,0.8)]' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
