import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';
import type { CourseChartProps } from './dashboard.types';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

export default function CourseChart({ data = [], onFilterChange }: CourseChartProps) {
    const [activeFilter, setActiveFilter] = useState('');

    const handleFilter = (val: string) => {
        setActiveFilter(val);
        if (onFilterChange) onFilterChange(val);
    };

    const chartData = data.map((course, index) => ({
        ...course,
        shortTitle:
            course.title?.length > 15 // Reduced length for smaller size
                ? course.title.substring(0, 15) + '...'
                : course.title || 'Unknown',
        score: 100 - index * 15,
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const courseData = payload[0].payload;
            return (
                // Reduced padding (p-2.5) and max-width to prevent overflow
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2.5 border border-slate-200 dark:border-slate-800 shadow-xl rounded-lg max-w-[200px] pointer-events-none">
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white mb-1.5 leading-tight">
                        {courseData.title}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-1.5">
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase">
                            Tutor
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 truncate ml-2">
                            {courseData.tutorName || 'Unknown'}
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        // Reduced outer padding (p-4)
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full overflow-visible">
            
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        Top Courses
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Best performers
                    </p>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-md">
                    {['', 'credit', 'paid'].map((f) => (
                        <button
                            key={f}
                            onClick={() => handleFilter(f)}
                            className={`px-2 py-0.5 text-[10px] font-semibold rounded transition ${
                                activeFilter === f
                                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {f === '' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reduced height from 320px to 220px */}
            <div className="w-full h-[220px]">
                {chartData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                        <p>No courses available</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                            layout="vertical"
                        >
                            <XAxis type="number" domain={[0, 100]} hide />

                            <YAxis
                                type="category"
                                dataKey="shortTitle"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                                width={120} // Reduced width for labels
                            />

                            {/* Added usePointerEvents to help with overflow issues */}
                            <Tooltip 
                                cursor={{ fill: 'rgba(0,0,0,0.04)' }} 
                                content={<CustomTooltip />} 
                                wrapperStyle={{ zIndex: 100 }}
                                allowEscapeViewBox={{ x: true, y: true }}
                            />

                            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                                {chartData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="hover:opacity-80 transition duration-200 cursor-pointer"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}