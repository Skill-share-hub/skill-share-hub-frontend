import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import SavedCourseCard from "../components/savedCourses/savedCourseCard";
import CourseSkeleton from "../components/CourseSkeleton";
import { BookmarkX } from "lucide-react";
import { fetchSavedCourses, unsaveCourse } from "../slice/savedCourseSlice";

export default function SavedCoursesPage() {
  const dispatch = useAppDispatch();
  const { list: courses, loading, error } =
    useAppSelector((state) => state.savedCourses);

  useEffect(() => {
    dispatch(fetchSavedCourses());
  }, [dispatch]);

  const handleUnsave = useCallback(
    async (courseId: string) => {
      await dispatch(unsaveCourse(courseId)).unwrap();
    },
    [dispatch]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex gap-12">

          {/* MAIN */}
          <main className="flex-1">

            {/* RESULT HEADER */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-500 text-sm">
                {loading
                  ? "Loading saved courses..."
                  : `${courses?.length || 0} saved course${(courses?.length || 0) !== 1 ? "s" : ""}`}
              </p>
            </div>

            {/* ERROR */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg mb-6">
                Failed to load saved courses: {error}
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
                  <SavedCourseCard
                    key={course._id}
                    course={course}
                    onUnsave={handleUnsave}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center py-24 text-center">
                  <div className="bg-gray-100 p-5 rounded-full mb-6">
                    <BookmarkX className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    No saved courses
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Courses you save will appear here. Browse the catalog to find something you love!
                  </p>
                </div>
              )}
            </div>

          </main>
        </div>
      </section>
    </div>
  );
}