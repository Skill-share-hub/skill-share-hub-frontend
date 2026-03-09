import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Search, Plus, Filter, LayoutGrid, CheckCircle2, Star, TrendingUp, Users } from "lucide-react"

import CourseCard from "../components/CourseCard"
import type { AppDispatch, RootState } from "../../../store/store"
import { fetchTutorCourses } from "../thunk/course.thunk"
import DashboardLayout from "../../../layouts/DashboardLayout"

const MyCoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { courses, loading } = useSelector((state: RootState) => state.tutorCourses)

  const [filter, setFilter] = useState<"all" | "published" | "draft" | "pending">("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    dispatch(fetchTutorCourses())
  }, [dispatch])

  // Simple filtering logic
  const filteredCourses = courses.filter((course) => {
    const matchesFilter = filter === "all" || course.status === filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Calculate quick stats
  const totalEnrollments = courses.reduce((acc, curr) => acc + (curr.totalEnrollments || 0), 0)
  const averageRating = courses.length > 0
    ? (courses.reduce((acc, curr) => acc + (curr.ratingsAverage || 0), 0) / courses.length).toFixed(1)
    : "0.0"
  const activeCourses = courses.filter(c => c.status === 'published').length

  return (
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Courses</h1>
            <p className="text-gray-500 mt-1.5 font-medium">Manage and monitor your educational content</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all shadow-sm"
              />
            </div>
            <button
              onClick={() => navigate("/create-course")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95 flex-shrink-0"
            >
              <Plus size={18} strokeWidth={3} />
              Create Course
            </button>
          </div>
        </div>

        {/* Filters and View Options */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex p-1 bg-white border border-gray-200 rounded-xl shadow-sm">
            {(["all", "published", "pending", "draft"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${filter === tab
                    ? "bg-green-50 text-green-700 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {tab === 'all' ? 'All Courses' : tab === 'pending' ? 'Pending Review' : `${tab}s`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
              <Filter size={18} />
            </button>
            <button className="p-2.5 text-green-700 bg-green-50 border border-green-100 rounded-xl shadow-sm transition-all">
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-24 text-center px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <LayoutGrid className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
              We couldn't find any courses matching your criteria. Try adjusting your search or create a new one.
            </p>
            <button
              onClick={() => navigate("/create-course")}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-700 text-white rounded-xl text-sm font-bold shadow-lg"
            >
              <Plus size={18} />
              Start New Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* Stats Summary Bar at bottom */}
        {!loading && courses.length > 0 && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-700 flex-shrink-0">
                <Users size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Enrollments</p>
                <p className="text-2xl font-black text-gray-900">{totalEnrollments.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0">
                <Star size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Average Rating</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-2xl font-black text-gray-900">{averageRating}</p>
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Monthly Revenue</p>
                <p className="text-2xl font-black text-gray-900">$2,450.00</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Courses</p>
                <p className="text-2xl font-black text-gray-900">{activeCourses}</p>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}

export default MyCoursesPage