import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users } from 'lucide-react';
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
        const response = await courseService.fetchCourses({ recommended: true, limit: 4 });
        let related = response.data || [];
        if (Array.isArray(related)) {
          if (currentCourseId) {
            related = related.filter((c: Course) => c._id !== currentCourseId);
          }
          setCourses(related.slice(0, 4));
        } else {
          setCourses([]);
        }
      } catch {
        toast.error("Failed to load recommended courses");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRelatedCourses();
  }, [currentCourseId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-100 h-56 rounded-xl" />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-sm text-gray-400 font-medium">No related courses found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {courses.map((course) => {
        const isCredit = course.courseType === "credit";
        return (
          <div
            key={course._id}
            onClick={() => navigate(`/courses/${course._id}`)}
            className="group cursor-pointer flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:border-emerald-200"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden rounded-t-xl bg-gray-100">
              <img
                src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'}
                alt={course.title || 'Course'}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 text-[10px] font-semibold text-gray-900 px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-md border border-white/40 shadow-sm">
                {course.category || 'General'}
              </span>
              <span className={`absolute top-2 right-2 text-[10px] font-semibold text-white px-2 py-0.5 rounded-md backdrop-blur-md border border-white/20 shadow-sm ${isCredit ? "bg-purple-600/85" : "bg-emerald-600/85"}`}>
                {isCredit ? "Credit" : "Paid"}
              </span>
            </div>

            {/* Content */}
            <div className="p-3.5 flex flex-col flex-1">
              <div className="text-[11px] uppercase tracking-wide text-emerald-700 font-bold mb-1">
                {course.courseLevel || "All Levels"}
              </div>
              <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                {course.title || 'Untitled Course'}
              </h3>
              <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100 mt-3">
                <div className="flex items-center gap-1 font-medium">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-700">{course.ratingsAverage?.toFixed(1) || '0.0'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {course.totalEnrollments || 0}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecommendedCourses;