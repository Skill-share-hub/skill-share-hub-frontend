import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, ArrowRight } from 'lucide-react';
import { courseService } from '../../services/courseService';
import type { Course } from '../../types/course.types';
import toast from 'react-hot-toast';

interface RecommendedCoursesProps {
  currentCourseId?: string;
}

const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ currentCourseId }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        setIsLoading(true);

        const response = await courseService.fetchCourses({
          recommended: true,
          limit: 4
        });

        console.log("Recommended courses response:", response);

        // Use response.data directly, as courseService already extracts it
        let related = response.data || [];



        if (Array.isArray(related)) {
          if (currentCourseId) {
            related = related.filter((course: Course) => course._id !== currentCourseId);
          }
          setCourses(related.slice(0, 4));
        } else {
          setCourses([]);
        }

      } catch (error) {
        toast.error("Failed to load recommended courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedCourses();
  }, [currentCourseId]);

  if (isLoading) {
    return (
      <section className="mt-6 pt-12 pb-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 animate-pulse">

          <div className="h-7 bg-gray-200 rounded w-48 mb-6"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-100 h-64 rounded-xl border border-gray-100/50"></div>
            ))}
          </div>

        </div>
      </section>
    );
  }



  return (
    <section className="mt-8 pt-12 pb-16 border-t border-gray-100/80">

      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* header */}
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            More courses you might like
          </h2>

          <button
            onClick={() => navigate('/courses')}
            className="text-emerald-700 text-sm font-semibold flex items-center gap-1.5 hover:text-emerald-800 transition-colors bg-emerald-50/50 hover:bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100/50"
          >
            Browse all
            <ArrowRight className="w-4 h-4"/>
          </button>

        </div>

        {/* grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-gray-100 border-dashed">
            <p className="text-gray-500 font-medium text-sm">No related courses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">

            {courses.map(course => {
            const isCredit = course.courseType === "credit";

            return (
              <div
                key={course._id}
                onClick={() => navigate(`/courses/${course._id}`)}
                className="
                group cursor-pointer flex flex-col
                bg-white rounded-xl
                border border-gray-100
                shadow-sm
                transition-all duration-300
                hover:-translate-y-[3px]
                hover:shadow-lg
                hover:border-emerald-200
                "
              >

                {/* thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-t-xl bg-gray-100 border-b border-gray-100">

                  <img
                    src={
                      course.thumbnailUrl ||
                      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
                    }
                    alt={course.title || 'Course'}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>

                  <span
                    className="
                    absolute top-2 left-2
                    text-[10px] font-semibold text-gray-900
                    px-2 py-0.5 rounded-md
                    bg-white/80 backdrop-blur-md
                    border border-white/40
                    shadow-sm
                    "
                  >
                    {course.category || 'General'}
                  </span>

                  {/* Type Glass Label */}
                  <span
                    className={`
                    absolute top-2 right-2
                    text-[10px] font-semibold text-white
                    px-2 py-0.5 rounded-md
                    backdrop-blur-md
                    border border-white/20
                    shadow-sm
                    ${
                      isCredit
                        ? "bg-purple-600/85"
                        : "bg-emerald-600/85"
                    }
                    `}
                  >
                    {isCredit ? "Credit" : "Paid"}
                  </span>

                </div>

                {/* content */}
                <div className="p-3.5 flex flex-col flex-1">

                  <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-bold mb-1.5">
                    {course.courseLevel || "All Levels"}
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors mb-2">
                    {course.title || 'Untitled Course'}
                  </h3>

                  <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-50">

                    <div className="flex items-center gap-1 font-medium">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500"/>
                      <span className="text-gray-700">{course.ratingsAverage?.toFixed(1) || '0.0'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5"/>
                      {course.totalEnrollments || 0}
                    </div>

                  </div>

                </div>

              </div>
            );
          })}

          </div>
        )}

      </div>

    </section>
  );
};

export default RecommendedCourses;