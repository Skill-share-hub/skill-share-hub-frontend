import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";

interface StudentProfileStatsProps {
  enrolledCourses?: number;
  completedCourses?: number;
  hoursLearned?: number;
  streak?: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
  accent: string;
}

function StatCard({ icon, label, value, iconBg, iconColor, accent }: StatCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 relative overflow-hidden`}>
      {/* Accent dot */}
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full opacity-5 -translate-y-6 translate-x-6 ${accent}`} />
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs font-semibold text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function StudentProfileStats({
  enrolledCourses = 0,
  completedCourses = 0,
  hoursLearned = 0,
  streak = 0,
}: StudentProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        icon={<BookOpen className="w-5 h-5" />}
        label="Enrolled Courses"
        value={enrolledCourses}
        iconBg="bg-green-50"
        iconColor="text-green-600"
        accent="bg-green-600"
      />
      <StatCard
        icon={<Award className="w-5 h-5" />}
        label="Completed"
        value={completedCourses}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-500"
        accent="bg-emerald-500"
      />
      <StatCard
        icon={<Clock className="w-5 h-5" />}
        label="Hours Learned"
        value={`${hoursLearned}h`}
        iconBg="bg-amber-50"
        iconColor="text-amber-500"
        accent="bg-amber-500"
      />
      <StatCard
        icon={<TrendingUp className="w-5 h-5" />}
        label="Day Streak"
        value={`${streak} 🔥`}
        iconBg="bg-rose-50"
        iconColor="text-rose-500"
        accent="bg-rose-500"
      />
    </div>
  );
}