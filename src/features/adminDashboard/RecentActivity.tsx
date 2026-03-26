import { useState } from 'react';
import { User, BookOpen, GraduationCap, ChevronDown, Activity, IndianRupee } from 'lucide-react';
import type { ActivityType, ActivityItem, RecentActivityProps } from './dashboard.types';

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
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        }).format(date);
    };

    const renderActivityIcon = (type: ActivityType) => {
        switch (type) {
            case 'course_enrollment':
                return (
                    <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                        <GraduationCap size={18} strokeWidth={2.5} />
                    </div>
                );
            case 'course_creation':
                return (
                    <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
                        <BookOpen size={18} strokeWidth={2.5} />
                    </div>
                );
            case 'user_creation':
                return (
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                        <User size={18} strokeWidth={2.5} />
                    </div>
                );
            case 'withdrawal_request':
                return (
                    <div className="p-2.5 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl">
                        <IndianRupee size={18} strokeWidth={2.5} />
                    </div>
                );
            default:
                return (
                    <div className="p-2.5 bg-slate-500/10 text-slate-600 dark:text-slate-400 rounded-xl">
                        <Activity size={18} strokeWidth={2.5} />
                    </div>
                );
        }
    };

    const renderActivityContent = (item: ActivityItem) => {
        switch (item.type) {
            case 'course_enrollment':
                return (
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span className="font-bold text-slate-900 dark:text-white capitalize">{item.userName}</span> enrolled in <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-100 dark:border-blue-900/30 shadow-sm">{item.status}</span>
                            <span className="text-xs font-medium text-slate-500">{formatTime(item.createdAt)}</span>
                        </div>
                    </div>
                );
            case 'course_creation':
                return (
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span className="font-bold text-slate-900 dark:text-white capitalize">{item.tutorName}</span> created course: <span className="font-bold text-slate-900 dark:text-white">{item.title}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[10px] font-bold tracking-wider text-purple-600 dark:text-purple-400 uppercase bg-purple-50 dark:bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-100 dark:border-purple-900/30 shadow-sm">{item.courseType}</span>
                            <span className="text-xs font-medium text-slate-500">{formatTime(item.createdAt)}</span>
                        </div>
                    </div>
                );
            case 'user_creation':
                return (
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            New user registered: <span className="font-bold text-slate-900 dark:text-white capitalize">{item.name}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-xs font-medium text-slate-500">{formatTime(item.createdAt)}</span>
                        </div>
                    </div>
                );
            case 'withdrawal_request':
                return (
                    <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span className="font-bold text-slate-900 dark:text-white capitalize">{item.userName}</span> requested a withdrawal of <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{item.amount}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border shadow-sm ${item.status === 'pending' ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-900/30' : 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-900/30'}`}>
                                {item.status}
                            </span>
                            <span className="text-xs font-medium text-slate-500">{formatTime(item.createdAt)}</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm w-full h-full flex flex-col">
            <div className="mb-6 shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Latest actions across the platform.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {filterOptions.map(opt => (
                        <button key={opt.value} onClick={() => handleFilter(opt.value)} className={`px-2.5 py-1 text-xs font-medium rounded-lg cursor-pointer transition-colors border ${activeFilter === opt.value ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800/50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                <div className="space-y-4">
                    {data.length === 0 ? (
                        <div className="text-center text-slate-500 dark:text-slate-400 py-10 font-medium">No recent activity found.</div>
                    ) : (
                        data.map((item, index) => (
                            <div key={index} className="flex gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors group cursor-default">
                                <div className="shrink-0 mt-0.5">
                                    {renderActivityIcon(item.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    {renderActivityContent(item)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {hasMore && (
                    <div className="mt-8 mb-2 flex justify-center">
                        <button
                            onClick={onLoadMore}
                            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded-xl transition-all hover:shadow-sm cursor-pointer"
                        >
                            Show More <ChevronDown size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
