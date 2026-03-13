import { useState } from "react";
import {
  FaPlay,
  FaCheckCircle,
  FaBookmark,
  FaStar,
  FaUserTie,
} from "react-icons/fa";
import { FiClock, FiAward } from "react-icons/fi";
type CourseStatus = "in-progress" | "completed" | "saved" | "recommended";

type Course = {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  status: CourseStatus;
  duration?: string;
  rating?: number;
};

const courses: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    instructor: "John Doe",
    thumbnail: "/course.jpg",
    progress: 65,
    status: "in-progress",
    duration: "8h 30m",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    instructor: "Jane Smith",
    thumbnail: "/course.jpg",
    progress: 100,
    status: "completed",
    duration: "12h 15m",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Node.js Fundamentals",
    instructor: "Alex Brown",
    thumbnail: "/course.jpg",
    progress: 0,
    status: "saved",
    duration: "6h 45m",
    rating: 4.7,
  },
];

const statusConfig: Record<
  CourseStatus,
  { icon: React.ReactNode; color: string; label: string }
> = {
  "in-progress": {
    icon: <FaPlay className="text-xs" />,
    color: "bg-blue-100 text-blue-700",
    label: "In Progress",
  },
  completed: {
    icon: <FaCheckCircle className="text-xs" />,
    color: "bg-emerald-100 text-emerald-700",
    label: "Completed",
  },
  saved: {
    icon: <FaBookmark className="text-xs" />,
    color: "bg-amber-100 text-amber-700",
    label: "Saved",
  },
  recommended: {
    icon: <FaStar className="text-xs" />,
    color: "bg-purple-100 text-purple-700",
    label: "Recommended",
  },
};

const filters: { label: string; value: CourseStatus; icon: React.ReactNode }[] =
  [
    {
      label: "In Progress",
      value: "in-progress",
      icon: <FaPlay className="text-xs" />,
    },
    {
      label: "Completed",
      value: "completed",
      icon: <FaCheckCircle className="text-xs" />,
    },
    {
      label: "Saved",
      value: "saved",
      icon: <FaBookmark className="text-xs" />,
    },
    {
      label: "Recommended",
      value: "recommended",
      icon: <FaStar className="text-xs" />,
    },
  ];

export default function MyActivity() {
  const [filter, setFilter] = useState<CourseStatus>("in-progress");
  const filteredCourses = courses.filter((c) => c.status === filter);

  const stats = [
    {
      label: "Enrolled",
      value: courses.length,
      icon: <FiAward className="text-emerald-600" />,
    },
    {
      label: "Completed",
      value: courses.filter((c) => c.status === "completed").length,
      icon: <FaCheckCircle className="text-emerald-600" />,
    },
    {
      label: "In Progress",
      value: courses.filter((c) => c.status === "in-progress").length,
      icon: <FaPlay className="text-emerald-600" />,
    },
    {
      label: "Saved",
      value: courses.filter((c) => c.status === "saved").length,
      icon: <FaBookmark className="text-emerald-600" />,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src="/avatar.png"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500 ring-offset-2"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Welcome back 👋
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Continue your learning journey
                </p>
              </div>
            </div>

            <button className="self-start sm:self-auto flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200">
              <FiAward />
              View Certificates
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-lg">
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === f.value
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>

          {/* Courses */}
          {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-2xl text-gray-300">
                <FaBookmark />
              </div>
              <p className="text-gray-500 font-medium">No courses found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different filter or explore new courses.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CourseCard({ course }: { course: Course }) {
  const badge = statusConfig[course.status];

  const actionLabel =
    course.status === "completed"
      ? "View Certificate"
      : course.status === "saved"
      ? "Start Learning"
      : "Continue Learning";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative">
        <img src={course.thumbnail} className="w-full h-44 object-cover" />
        <span
          className={`absolute top-3 left-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${badge.color}`}
        >
          {badge.icon}
          {badge.label}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">
          {course.title}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <FaUserTie className="text-gray-400 text-xs" />
            {course.instructor}
          </div>

          {course.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <FiClock />
              {course.duration}
            </div>
          )}
        </div>

        {course.rating && (
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-xs ${
                  i < Math.floor(course.rating!)
                    ? "text-amber-400"
                    : "text-gray-200"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              {course.rating}
            </span>
          </div>
        )}

        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Progress</span>
            <span className="font-medium text-gray-700">
              {course.progress}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        <button className="mt-5 w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200">
          {actionLabel}
        </button>
      </div>
    </div>
  );
}