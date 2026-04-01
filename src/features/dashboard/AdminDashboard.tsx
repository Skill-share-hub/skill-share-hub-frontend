import { useState, useEffect } from 'react';
import AdminStats from '../adminDashboard/AdminStats';
import EnrollmentChart from '../adminDashboard/EnrollmentChart';
import AdminEarnings from '../adminDashboard/AdminEarnings';
import CourseChart from '../adminDashboard/CourseChart';
import RecentActivity from '../adminDashboard/RecentActivity';
import api from '../../shared/services/axios';
import type { ChartFilter } from '../adminDashboard/dashboard.types';
import FullScreenLoader from '../../shared/components/FullScreenLoader';

export default function AdminDashboard() {
  const [eGroupBy, setEGroupBy] = useState<ChartFilter>('days');
  const [tCourseType, setTCourseType] = useState<string>('');
  const [activityType, setActivityType] = useState<string>('');
  const [activityLimit, setActivityLimit] = useState<number>(5);

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setIsLoading(true);
        const params: any = {
          eGroupBy,
          limit: activityLimit
        };
        if (tCourseType) params.tCourseType = tCourseType;
        if (activityType) params.type = activityType;

        const {data} = await api.get('/dashboard/admin',{params});
        if (data?.success) {
          setDashboardData(data.data);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, [eGroupBy, tCourseType, activityType, activityLimit]);

  if(!dashboardData)return <FullScreenLoader />

  const { stats, enrollmentChart, topCourses, recentActivity , earnings } = dashboardData;
  const hasMoreActivity = recentActivity?.length === activityLimit;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 dark:bg-slate-950/50 p-6 md:p-8 font-sans">
      <main className="max-w-7xl mx-auto space-y-8">
        <AdminStats data={{ stats }} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 lg:col-start-1 h-full">
            <EnrollmentChart
              data={enrollmentChart || []}
              onFilterChange={(newFilter) => setEGroupBy(newFilter as any)}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-1 h-full">
            <AdminEarnings earnings={earnings} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <RecentActivity
              data={recentActivity || []}
              onFilterChange={(newType) => { setActivityType(newType); setActivityLimit(5); }}
              onLoadMore={() => setActivityLimit(prev => prev + 5)}
              hasMore={hasMoreActivity}
            />
          </div>

          <div className="lg:col-span-1">
            <CourseChart
              data={topCourses || []}
              onFilterChange={(newType) => setTCourseType(newType)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}