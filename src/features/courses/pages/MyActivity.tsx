import { useEffect, useState } from "react";
import { FaPlay, FaCheckCircle, FaBookmark } from "react-icons/fa";
import { FiAward, FiClock, FiTrendingUp } from "react-icons/fi";
import { LuBookOpen } from "react-icons/lu";
import api from "../../../shared/services/axios";

type CourseStatus = "in-progress" | "completed" | "saved";

export default function MyActivity() {
  const [filter, setFilter] = useState<CourseStatus>("in-progress");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/enrollments?status=active");
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-gray-400">No activity found.</p>
      </div>
    );

  const courses = data.courses || [];

  const mappedCourses = courses.map((c: any) => ({
    id: c._id,
    title: c.courseId?.title || c.courseSnapshot?.title || "No Title",
    instructor:
      c.courseId?.tutorId?.name ||
      c.courseSnapshot?.tutorId?.name ||
      "Unknown",
    thumbnail:
      c.courseId?.thumbnailUrl ||
      c.courseSnapshot?.thumbnailUrl ||
      "/course.jpg",
    progress: c.progress || 0,
    status:
      c.progress === 100
        ? "completed"
        : c.progress > 0
        ? "in-progress"
        : "saved",
  }));

  const filtered = mappedCourses.filter((c: any) => c.status === filter);
  const inProgress = mappedCourses.filter(
    (c: any) => c.status === "in-progress"
  );

  const stats = [
    {
      label: "Enrolled Courses",
      value: data.totalEnrollment ?? 0,
      icon: <LuBookOpen className="w-5 h-5 text-emerald-700" />,
    },
    {
      label: "Certificates",
      value: data.completed ?? 0,
      icon: <FiAward className="w-5 h-5 text-emerald-700" />,
    },
    {
      label: "Hours Learned",
      value: data.hoursLearned ?? 24,
      icon: <FiClock className="w-5 h-5 text-emerald-700" />,
    },
    {
      label: "Avg Progress",
      value: `${data.avgProgress ?? 45}%`,
      icon: <FiTrendingUp className="w-5 h-5 text-emerald-700" />,
    },
  ];

  const filters: { label: string; value: CourseStatus; icon: React.ReactNode }[] = [
    { label: "In Progress", value: "in-progress", icon: <FaPlay className="w-2.5 h-2.5" /> },
    { label: "Completed", value: "completed", icon: <FaCheckCircle className="w-2.5 h-2.5" /> },
    { label: "Saved", value: "saved", icon: <FaBookmark className="w-2.5 h-2.5" /> },
  ];

  const recentActivity = [
    { icon: <LuBookOpen className="w-4 h-4 text-emerald-700" />, title: "Completed lesson", sub: "JavaScript Fundamentals · Lesson 3", time: "2 hours ago" },
    { icon: <FiTrendingUp className="w-4 h-4 text-emerald-700" />, title: "Enrolled in course", sub: "Data Science with Python", time: "1 day ago" },
    { icon: <FiAward className="w-4 h-4 text-emerald-700" />, title: "Certificate earned", sub: "UI/UX Design Fundamentals", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f7f4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Activity</h1>
          <p className="text-sm text-gray-500 mt-1">Track your learning progress and achievements</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl px-5 py-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
                {s.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Left — Recent Activity + Filtered Courses */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-5">Recent Activity</h2>
              <div className="flex flex-col gap-3">
                {recentActivity.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition-colors duration-150"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      {a.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.sub}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter + Course Grid */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">My Courses</h2>
                <div className="flex gap-1.5">
                  {filters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFilter(f.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        filter === f.value
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {f.icon}
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No courses found.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filtered.map((item: any) => (
                    <CourseCard key={item.id} course={item} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — In Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
              <h2 className="text-base font-bold text-gray-900 mb-5">In Progress</h2>

              {inProgress.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-10">
                  No courses in progress.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {inProgress.map((item: any) => (
                    <div key={item.id} className="group cursor-pointer">
                      <div className="rounded-xl overflow-hidden border border-gray-100 mb-2.5">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1.5 mb-1.5">
                        <span>Progress</span>
                        <span className="font-semibold text-emerald-700">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: any }) {
  const actionLabel =
    course.status === "completed"
      ? "View Certificate"
      : course.status === "saved"
      ? "Start Learning"
      : "Continue";

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative h-36 bg-gray-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-0.5">
          {course.title}
        </h3>
        <p className="text-xs text-gray-400 mb-3">{course.instructor}</p>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-500">Progress</span>
          <span className="font-semibold text-emerald-700">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden mb-3">
          <div
            className="h-full bg-emerald-600 rounded-full"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <button className="w-full py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors duration-200">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}