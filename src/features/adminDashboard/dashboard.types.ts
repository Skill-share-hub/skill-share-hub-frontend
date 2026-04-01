import type { LucideIcon } from 'lucide-react';

export interface StatItem {
  label: string;
  value: number | string;
}

export interface StatCardProps {
  title: string;
  items: StatItem[];
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'rose';
}

export interface StatsData {
  users?: { totalUsers: number; students: number; tutors: number; premiumTutors: number; };
  courses?: { totalCourses: number; creditCourses: number; paidCourses: number; };
  enrollments?: { totalEnrollments: number; creditEnrollments: number; paidEnrollments: number; totalTimeSpend: number; creditTimeSpend: number; paidTimeSpend: number; };
  timeSpend?: { totalTimeSpend: number; creditTimeSpend: number; paidTimeSpend: number; };
}

export interface AdminStatsProps {
  data: any;
}


// --- EnrollmentChart Types ---
export type ChartFilter = 'days' | 'weeks' | 'months' | 'years';

export interface EnrollmentData {
  label: string;
  count: number;
}

export interface EnrollmentChartProps {
  data?: EnrollmentData[];
  onFilterChange?: (filter: ChartFilter) => void;
  isLoading?: boolean;
}


export interface TopCourseData {
  title: string;
  tutorName: string;
}

export interface CourseChartProps {
  data?: TopCourseData[];
  onFilterChange?: (filter: string) => void;
}


// --- RecentActivity Types ---
export type ActivityType = 'course_enrollment' | 'course_creation' | 'user_creation' | 'withdrawal_request';

export interface BaseActivity {
  type: ActivityType;
  createdAt: string;
}

export interface CourseEnrollment extends BaseActivity {
  type: 'course_enrollment';
  title: string;
  userName: string;
  status: string;
}

export interface CourseCreation extends BaseActivity {
  type: 'course_creation';
  title: string;
  tutorName: string;
  courseType: string;
}

export interface UserCreation extends BaseActivity {
  type: 'user_creation';
  name: string;
  avatar?: string;
}

export interface WithdrawalRequest extends BaseActivity {
  type: 'withdrawal_request';
  amount: number;
  userName: string;
  status: string;
}

export type ActivityItem = CourseEnrollment | CourseCreation | UserCreation | WithdrawalRequest | any;

export interface RecentActivityProps {
  data?: ActivityItem[];
  onFilterChange?: (filter: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}
