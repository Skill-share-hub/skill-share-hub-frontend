import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Search, Plus, BookOpen } from "lucide-react"

import CourseCard from "../components/CourseCard"
import CourseFilter from "../components/CourseFilter"
import type { AppDispatch, RootState } from "../../../store/store"
import { fetchTutorCourses } from "../thunk/course.thunk"
import Pagination from "../../courses/components/Pagination"
import FullScreenLoader from "../../../shared/components/FullScreenLoader"

const MyCoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { courses, loading, page, totalPages } = useSelector((state: RootState) => state.tutorCourses)

  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "paid">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [debouncedSearch] = useDebounce(searchQuery, 500)

  useEffect(() => {
    dispatch(fetchTutorCourses({
      page: 1,
      limit: 8,
      search: debouncedSearch || undefined,
      category: categoryFilter !== "all" ? categoryFilter : undefined,
      type: typeFilter !== "all" ? typeFilter : undefined,
    }))
  }, [dispatch, debouncedSearch, categoryFilter, typeFilter])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchTutorCourses({
        page: newPage,
        limit: 8,
        search: debouncedSearch || undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
        type: typeFilter !== "all" ? typeFilter : undefined
      }))
    }
  }

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mb-8 w-full">
          <CourseFilter
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
        </div>

        {/* Courses Grid */}
        {courses?.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-24 text-center px-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Create Your First Course</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
              You haven't created any courses yet. Share your knowledge and start teaching students today!
            </p>
            <button
              onClick={() => navigate("/create-course")}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <Plus size={18} strokeWidth={3} />
              Create Course
            </button>
          </div>
        ) : courses?.length === 0 && (searchQuery || categoryFilter !== "all" || typeFilter !== "all") ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-24 text-center px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
              We couldn't find any courses matching your criteria. Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setCategoryFilter("all");
                setTypeFilter("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-gray-900 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {courses?.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
        {/* Pagination */}
        {courses?.length > 0 && (
          <div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

      </div>
    </>
  )
}

export default MyCoursesPage