import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import { fetchCourses, setPage } from "../slice/courseSlice";
import CourseCard from "../components/CourseCard";
import CourseSearch from "../components/CourseSearch";
import FilterSidebar from "../components/FilterSidebar";
import CourseSkeleton from "../components/CourseSkeleton";
import Pagination from "../components/Pagination";
import { BookOpen, SlidersHorizontal } from "lucide-react";

export default function CoursesPage() {
  const dispatch = useAppDispatch();
  const { list: courses, loading, error, filters, search, page, totalPages } =
    useAppSelector((state) => state.courses);

  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch, filters, search, page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">

      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-blue-50 opacity-70" />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Discover New Skills
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            Learn professional skills from experienced tutors and accelerate your career growth.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <CourseSearch />
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        {/* Mobile Filters */}
        <div className="lg:hidden flex justify-between items-center mb-6">

          <p className="text-sm text-gray-500">
            {loading ? "Loading..." : `${courses?.length || 0} courses`}
          </p>

          <button
            onClick={() => setMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

        </div>

        <div className="flex gap-12">

          {/* SIDEBAR */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar />
          </aside>

          {/* MAIN */}
          <main className="flex-1">

            {/* RESULT HEADER */}
            <div className="flex items-center justify-between mb-8">

              <p className="text-gray-500 text-sm">
                {loading
                  ? "Loading courses..."
                  : `${courses?.length || 0} courses available`}
              </p>

              <select className="text-sm bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500">
                <option>Sort: Newest</option>
                <option>Highest Rated</option>
                <option>Most Popular</option>
                <option>Lowest Price</option>
              </select>

            </div>

            {/* ERROR */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg mb-6">
                Failed to load courses: {error}
              </div>
            )}

            {/* COURSE GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">

              {loading ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <CourseSkeleton key={i} />
                ))
              ) : (courses?.length || 0) > 0 ? (
                (courses || []).map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center py-24 text-center">

                  <div className="bg-gray-100 p-5 rounded-full mb-6">
                    <BookOpen className="w-10 h-10 text-gray-500" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    No courses found
                  </h3>

                  <p className="text-gray-500 max-w-md">
                    Try adjusting your search or filters to discover more courses.
                  </p>

                </div>
              )}

            </div>

            {/* PAGINATION */}
            {!loading && (courses?.length || 0) > 0 && (
              <div className="mt-14">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={(newPage) => dispatch(setPage(newPage))}
                />
              </div>
            )}

          </main>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">

          <div className="bg-white w-80 p-6 overflow-y-auto shadow-xl">

            <div className="flex justify-between mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>

              <button
                onClick={() => setMobileFilters(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                Close
              </button>
            </div>

            <FilterSidebar />

          </div>

          <div
            className="flex-1"
            onClick={() => setMobileFilters(false)}
          />

        </div>
      )}
    </div>
  );
}