import React from "react";
import type { Course } from "../../courses/types/course.types";
import { PlayCircle } from "lucide-react";

interface CourseSummaryCardProps {
  course: Course;
}

const CourseSummaryCard: React.FC<CourseSummaryCardProps> = ({ course }) => {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-6 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <h2 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">Course Summary</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
        {/* Thumbnail */}
        <div className="w-full sm:w-[240px] relative group rounded-xl overflow-hidden aspect-video bg-gray-100 flex-shrink-0 shadow-sm border border-black/5">
          <img
            src={
              course.thumbnailUrl ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
            }
            alt={course.title || "Course Thumbnail"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm text-emerald-700 rounded-full p-2.5 shadow-lg">
              <PlayCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col pt-1 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-emerald-50 text-emerald-700 rounded shadow-sm border border-emerald-100/50">
              {course.category}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2">
            {course.title || "Untitled Course"}
          </h3>
          
          <p className="text-sm text-gray-500 line-clamp-2">
            {course.description || "No description provided for this course."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseSummaryCard;
