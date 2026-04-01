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
      course.title?.length > 15
        ? course.title.substring(0, 15) + '...'
        : course.title || 'Unknown',
    score: 100 - index * 15,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-[#13161b] border border-gray-700 rounded-lg p-3 shadow-xl max-w-[180px]">
          <p className="text-xs font-semibold text-white mb-1.5 leading-tight">{d.title}</p>
          <div className="border-t border-gray-800 pt-1.5 flex justify-between items-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Tutor</span>
            <span className="text-[11px] font-medium text-blue-400 truncate ml-2">
              {d.tutorName || 'Unknown'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#13161b] p-5 rounded-xl border border-gray-800 w-full overflow-visible">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white">Top Courses</h2>
          <p className="text-[11px] text-gray-500 mt-0.5">Best performers</p>
        </div>
        <div className="flex bg-[#0d0f12] border border-gray-800 rounded-lg p-0.5">
          {['', 'credit', 'paid'].map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {f === '' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[220px]">
        {chartData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-600 text-xs">
            No courses available
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
                tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 500 }}
                width={110}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                content={<CustomTooltip />}
                wrapperStyle={{ zIndex: 100 }}
                allowEscapeViewBox={{ x: true, y: true }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={14}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    opacity={0.85}
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
