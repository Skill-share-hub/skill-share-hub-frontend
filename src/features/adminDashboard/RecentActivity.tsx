import { useState } from 'react';
import { User, BookOpen, GraduationCap, ChevronDown, Activity, IndianRupee } from 'lucide-react';
import type {  ActivityItem, RecentActivityProps } from './dashboard.types';

export default function RecentActivity({ data = [], onFilterChange, onLoadMore, hasMore = false }: RecentActivityProps) {
  const [activeFilter, setActiveFilter] = useState('');

  const filterOptions = [
    { label: 'All', value: '' },
    { label: 'Enrollments', value: 'course_enrollment' },
    { label: 'Courses', value: 'course_creation' },
    { label: 'Users', value: 'user_creation' },
    { label: 'Withdrawals', value: 'withdrawal_request' },
  ];

  const handleFilter = (val: string) => {
    setActiveFilter(val);
    if (onFilterChange) onFilterChange(val);
  };

  const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateString));
  };

  const iconMap: Record<string, { bg: string; color: string; Icon: any }> = {
    course_enrollment: { bg: 'bg-blue-500/10', color: 'text-blue-400', Icon: GraduationCap },
    course_creation:  { bg: 'bg-purple-500/10', color: 'text-purple-400', Icon: BookOpen },
    user_creation:    { bg: 'bg-emerald-500/10', color: 'text-emerald-400', Icon: User },
    withdrawal_request: { bg: 'bg-amber-500/10', color: 'text-amber-400', Icon: IndianRupee },
  };

  const badgeMap: Record<string, string> = {
    course_enrollment: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    course_creation:   'text-purple-400 bg-purple-500/10 border-purple-500/20',
    pending:           'text-amber-400 bg-amber-500/10 border-amber-500/20',
    completed:         'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };

  const renderContent = (item: ActivityItem) => {
    switch (item.type) {
      case 'course_enrollment':
        return (
          <>
            <p className="text-xs text-gray-400">
              <span className="text-gray-200 font-medium capitalize">{item.userName}</span>
              {' '}enrolled in{' '}
              <span className="text-gray-200 font-medium">{item.title}</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border tracking-wide ${badgeMap.course_enrollment}`}>{item.status}</span>
              <span className="text-[10px] text-gray-600">{formatTime(item.createdAt)}</span>
            </div>
          </>
        );
      case 'course_creation':
        return (
          <>
            <p className="text-xs text-gray-400">
              <span className="text-gray-200 font-medium capitalize">{item.tutorName}</span>
              {' '}created{' '}
              <span className="text-gray-200 font-medium">{item.title}</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border tracking-wide ${badgeMap.course_creation}`}>{item.courseType}</span>
              <span className="text-[10px] text-gray-600">{formatTime(item.createdAt)}</span>
            </div>
          </>
        );
      case 'user_creation':
        return (
          <>
            <p className="text-xs text-gray-400">
              New user registered:{' '}
              <span className="text-gray-200 font-medium capitalize">{item.name}</span>
            </p>
            <span className="text-[10px] text-gray-600 mt-1 block">{formatTime(item.createdAt)}</span>
          </>
        );
      case 'withdrawal_request':
        return (
          <>
            <p className="text-xs text-gray-400">
              <span className="text-gray-200 font-medium capitalize">{item.userName}</span>
              {' '}requested withdrawal of{' '}
              <span className="text-emerald-400 font-medium">₹{item.amount}</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border tracking-wide ${badgeMap[item.status] || badgeMap.pending}`}>{item.status}</span>
              <span className="text-[10px] text-gray-600">{formatTime(item.createdAt)}</span>
            </div>
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-[#13161b] p-5 rounded-xl border border-gray-800 w-full h-full flex flex-col">

      {/* Header */}
      <div className="mb-5 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
          <p className="text-xs text-gray-500 mt-0.5">Latest actions across the platform.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleFilter(opt.value)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md cursor-pointer transition-colors border ${
                activeFilter === opt.value
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-transparent border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
        <div className="space-y-1">
          {data.length === 0 ? (
            <div className="text-center text-gray-600 py-10 text-xs">No recent activity found.</div>
          ) : (
            data.map((item, index) => {
              const cfg = iconMap[item.type] || { bg: 'bg-gray-800', color: 'text-gray-500', Icon: Activity };
              return (
                <div key={index} className="flex gap-3 p-3 hover:bg-gray-800/50 rounded-lg transition-colors cursor-default">
                  <div className={`shrink-0 p-2 rounded-lg mt-0.5 ${cfg.bg} ${cfg.color}`}>
                    <cfg.Icon size={15} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {renderContent(item)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {hasMore && (
          <div className="mt-5 mb-1 flex justify-center">
            <button
              onClick={onLoadMore}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-colors cursor-pointer"
            >
              Show More <ChevronDown size={13} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}