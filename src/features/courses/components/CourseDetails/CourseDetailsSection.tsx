import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../../types/course.types';
import { Tag, BookOpen, Layers, Loader2 } from 'lucide-react';
import { useEnrollmentStatus } from '../../../../shared/hooks/useEnrollmentStatus';

interface CourseDetailsSectionProps {
  course: Course;
}

const CourseDetailsSection: React.FC<CourseDetailsSectionProps> = ({ course }) => {
  const navigate = useNavigate();

  const { isEnrolled, isLoading } = useEnrollmentStatus(course._id);

  const handleAction = () => {
    if (isEnrolled) {
      navigate(`/my-activity/${course._id}`);
    } else {
      navigate(`/courses/${course._id}/purchase`);
    }
  };

  return (
    <section className="relative w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
        
        {/* Description */}
        <div className="w-full lg:w-2/3 xl:w-8/12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            About this course
          </h2>

          <div className="prose prose-sm sm:prose-base prose-emerald max-w-none text-gray-700 leading-relaxed font-normal">
            <p className="whitespace-pre-line tracking-wide">
              {course.description || "No description provided for this course yet."}
            </p>
          </div>
        </div>

        {/* Course Meta Panel */}
        <div className="w-full lg:w-1/3 xl:w-4/12">
          
          <div className="bg-white border border-gray-100/80 rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-6">
            
            <h3 className="text-lg font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100">
              Course Information
            </h3>

            <div className="space-y-5 text-sm">
              
              {/* Category */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5 text-gray-500 group-hover:text-emerald-700 transition-colors">
                  <div className="bg-gray-50 group-hover:bg-emerald-50 p-1.5 rounded-md transition-colors">
                    <Layers className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Category</span>
                </div>
                <span className="font-semibold text-gray-900 text-right">
                  {course.category}
                </span>
              </div>

              {/* Level */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-2.5 text-gray-500 group-hover:text-emerald-700 transition-colors">
                  <div className="bg-gray-50 group-hover:bg-emerald-50 p-1.5 rounded-md transition-colors">
                    <BookOpen className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Level</span>
                </div>
                <span className="font-semibold text-gray-900 capitalize text-right">
                  {course.courseLevel || 'All Levels'}
                </span>
              </div>

              {/* Skills */}
              <div className="pt-2">
                <div className="flex items-center gap-2.5 text-gray-500 mb-3">
                  <div className="bg-gray-50 p-1.5 rounded-md">
                    <Tag className="w-4 h-4"/>
                  </div>
                  <span className="font-medium">Skills you will gain</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-1">
                  {course.courseSkills && course.courseSkills.length > 0 ? (
                    course.courseSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-[11px] font-semibold px-2.5 py-1.5 bg-emerald-50/80 border border-emerald-100/50 text-emerald-700 rounded-lg shadow-sm"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-xs">
                      None specified
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Enroll Button Mobile Fallback */}
            <div className="mt-8 pt-6 border-t border-gray-100 lg:hidden">
              <button 
                onClick={handleAction}
                disabled={isLoading}
                className={`w-full py-3.5 text-white font-semibold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isEnrolled 
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" 
                  : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-[0_4px_14px_0_rgba(4,120,87,0.39)]"
                } ${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  isEnrolled ? "Open Course" : `Enroll for ${course.courseType === 'credit' ? `${course.creditCost} Credits` : (course.price === 0 || !course.price ? 'Free' : `$${course.price}`)}`
                )}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CourseDetailsSection;