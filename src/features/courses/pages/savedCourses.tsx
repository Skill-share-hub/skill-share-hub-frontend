import { useEffect, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks/redux";
import SavedCourseCard from "../components/savedCourses/savedCourseCard";
import CourseSkeleton from "../components/CourseSkeleton";
import { BookmarkX } from "lucide-react";
import { fetchSavedCourses, toggleSaveCourse } from "../slice/savedCourseSlice";
import api from "../../../shared/services/axios";

export default function SavedCoursesPage() {
  const dispatch = useAppDispatch();
  const [recommendedCourse, setRecommendedCourse] = useState<any[]>([]);

  const { list: courses, loading, error } =
    useAppSelector((state) => state.savedCourses);

  useEffect(() => {
    dispatch(fetchSavedCourses());
  }, [dispatch]);

  const handleUnsave = useCallback(
    async (courseId: string) => {
      await dispatch(toggleSaveCourse(courseId)).unwrap();
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get("/dashboard/student");
        const data = res.data;
        setRecommendedCourse(data.recommendedCourses || []);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f7f4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Saved Courses</h1>
          <p className="text-sm text-gray-500 mt-1">Your bookmarked courses, ready when you are</p>
        </div>

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-4 rounded-xl mb-6">
            Failed to load saved courses: {error}
          </div>
        )}

        {/* Saved Courses Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-900">My Saved Courses</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">
              {loading
                ? "Loading..."
                : `${courses?.length || 0} course${(courses?.length || 0) !== 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
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
              <div className="col-span-full flex flex-col items-center py-20 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
                  <BookmarkX className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  No saved courses yet
                </h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Courses you save will appear here. Browse the catalog to find something you love!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Courses Section */}
        {recommendedCourse.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-gray-900">Recommended for You</h2>
                <p className="text-xs text-gray-400 mt-0.5">Based on your interests</p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-medium">
                {recommendedCourse.length} course{recommendedCourse.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {recommendedCourse.map((course) => (
                <SavedCourseCard
                  key={course._id}
                  course={course}
                  onUnsave={handleUnsave}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}