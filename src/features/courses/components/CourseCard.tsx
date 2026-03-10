import { Link } from "react-router-dom";
import type { Course } from "../types/course.types";
import { Star, Users } from "lucide-react";
import { memo } from "react";

interface CourseCardProps {
  course: Course;
}

const CourseCard = memo(function CourseCard({ course }: CourseCardProps) {
  const isCredit = course.courseType === "credit";

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={course.thumbnailUrl || "/placeholder-course.jpg"}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category */}
        <span className="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm text-gray-800">
          {course.category}
        </span>

        {/* Course Type */}
        <span
          className={`absolute top-3 right-3 text-[11px] font-semibold px-2 py-1 rounded-md shadow-sm ${
            isCredit
              ? "bg-purple-600 text-white"
              : "bg-green-600 text-white"
          }`}
        >
          {isCredit ? "Credit" : "Paid"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">

        {/* Level */}
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit mb-2">
          {course.courseLevel ?? "All Levels"}
        </span>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors">
          {course.title}
        </h3>

        {/* Tutor */}
        <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-3">
          {course.tutor?.name || "Instructor"}
        </p>

        {/* Rating + Students */}
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1 text-gray-700 font-medium">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {course.ratingsAverage?.toFixed(1) || "0.0"}
          </div>

          <div className="flex items-center text-gray-500 gap-1">
            <Users className="w-4 h-4" />
            {course.totalEnrollments || 0}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t pt-3">

          {/* Price */}
          <div className="font-semibold text-gray-900 text-sm sm:text-base">
            {isCredit ? (
              <span className="text-purple-700">
                {course.creditCost ?? 0} credits
              </span>
            ) : (
              <span className="text-green-700">
                ${course.price ?? 0}
              </span>
            )}
          </div>

          {/* CTA */}
          <span className="text-xs sm:text-sm px-3 py-1.5 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition">
            View
          </span>

        </div>
      </div>
    </Link>
  );
});

export default CourseCard;