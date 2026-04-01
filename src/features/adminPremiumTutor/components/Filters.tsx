import React, { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import {
    setSearch,
    setStatusFilter,
    setSortFilter,
} from "../slice/application.slice";
import type { ApplicationFilters } from "../types/application.types";

const Filters: React.FC = () => {
    const dispatch = useAppDispatch();
    const { search, status, sort } = useAppSelector(
        (s) => s.applications.filters
    );
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => dispatch(setSearch(val)), 350);
        },
        [dispatch]
    );

    const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch(setStatusFilter(e.target.value as ApplicationFilters["status"]));

    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) =>
        dispatch(setSortFilter(e.target.value as ApplicationFilters["sort"]));

    return (
        <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search */}
            <div className="relative flex-[1_1_200px] min-w-[180px] max-w-[280px]">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <circle cx="9" cy="9" r="6" stroke="#4b5563" strokeWidth="1.5" />
                    <path d="M14 14l3 3" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                    type="text"
                    placeholder="Search by name..."
                    defaultValue={search}
                    onChange={handleSearch}
                    className="w-full pl-9 pr-3 py-2.5 bg-dark-card border border-dark-border rounded-lg text-dark-textSecondary text-xs outline-none focus:border-dark-accentBlue transition-colors"
                />
            </div>

            {/* Status */}
            <select
                value={status}
                onChange={handleStatus}
                className="px-3 pr-8 py-2.5 bg-dark-card border border-dark-border rounded-lg text-dark-textSecondary text-xs outline-none cursor-pointer appearance-none bg-no-repeat bg-[right_10px_center] transition-colors"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")` }}
            >
                <option value="all">All status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

            {/* Sort */}
            <select
                value={sort}
                onChange={handleSort}
                className="px-3 pr-8 py-2.5 bg-dark-card border border-dark-border rounded-lg text-dark-textSecondary text-xs outline-none cursor-pointer appearance-none bg-no-repeat bg-[right_10px_center] transition-colors"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E")` }}
            >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
            </select>
        </div>
    );
};

export default Filters;