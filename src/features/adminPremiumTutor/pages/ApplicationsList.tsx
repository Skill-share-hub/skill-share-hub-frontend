import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import {
  fetchApplications,
  fetchApplicationStats,
} from "../slice/application.slice";
import StatsCard from "../components/StatsCard";
import Filters from "../components/Filters";
import ApplicationTable from "../components/applicationTable";
import Pagination from "../components/Pagination";

const PremiumTutorApplicationsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters, stats, statsLoading } = useAppSelector(
    (s) => s.applications
  );

  // Fetch stats once on mount
  useEffect(() => {
    dispatch(fetchApplicationStats());
  }, [dispatch]);

  // Re-fetch list whenever filters change
  useEffect(() => {
    dispatch(fetchApplications(filters));
  }, [dispatch, filters]);

  return (
    <div className="min-h-screen bg-dark-bg p-7 md:p-8 font-['Inter',_sans-serif] text-dark-textSecondary flex flex-col gap-6 box-border">
      {/* Page Title + Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="m-0 text-[22px] font-bold text-dark-textPrimary tracking-tight whitespace-nowrap">
          Premium Applications
        </h1>
        <Filters />
      </div>

      {/* Stats Cards */}
      <div className="flex gap-3.5 flex-wrap">
        <StatsCard label="Total" count={stats.total} loading={statsLoading} />
        <StatsCard
          label="Pending"
          count={stats.pending}
          accent="yellow"
          loading={statsLoading}
        />
        <StatsCard
          label="Approved"
          count={stats.approved}
          accent="green"
          loading={statsLoading}
        />
        <StatsCard
          label="Rejected"
          count={stats.rejected}
          accent="red"
          loading={statsLoading}
        />
      </div>

      {/* Table + Pagination */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <ApplicationTable />
        <Pagination />
      </div>
    </div>
  );
};

export default PremiumTutorApplicationsList;