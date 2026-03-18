import { Link } from "react-router-dom";
import type { Course } from "../types/course.types";
import { Star, Users, Coins } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { toggleSaveCourse } from "../services/courseService";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface CourseCardProps {
  course: Course;
}

const CourseCard = memo(function CourseCard({ course }: CourseCardProps) {
  const isCredit = course.courseType === "credit";
  const [isSaved, setIsSaved] = useState(course.isSaved ?? false);

  const tutor =
    typeof course.tutorId === "object"
      ? course.tutorId
      : (course as any).tutor;

  const tutorName = tutor?.name ?? "Instructor";

  const tutorAvatar =
    tutor?.avatarUrl ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      tutorName
    )}&background=047857&color=fff`;

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleSaveCourse(course._id);
      setIsSaved((prev) => !prev); // ✅ fix: use proper state instead of mutating prop
    } catch (err) {
      console.error("Failed to toggle saved course", err);
    }
    useEffect(() => {
  setIsSaved(course.isSaved ?? false);
}, [course.isSaved]);
  };

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white/80 backdrop-blur border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:border-emerald-200"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={course.thumbnailUrl || "/placeholder-course.jpg"}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70" />

        {/* Category label */}
        <span className="absolute top-2 left-2 text-[10px] font-semibold text-gray-900 px-2 py-0.5 rounded-md bg-white/70 backdrop-blur-md border border-white/40 shadow-md">
          {course.category}
        </span>

        {/* Course type label */}
        <span
          className={`absolute top-2 right-2 text-[10px] font-semibold text-white px-2 py-0.5 rounded-md backdrop-blur-md border border-white/20 shadow-md ${
            isCredit ? "bg-purple-600/85" : "bg-emerald-600/85"
          }`}
        >
          {isCredit ? "Credit" : "Paid"}
        </span>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur border border-white/40 shadow-md hover:bg-emerald-50 transition-colors duration-200"
        >
          {isSaved ? (
            <FaBookmark className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <FaRegBookmark className="w-3.5 h-3.5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">

        {/* Level */}
        <span className="text-[11px] text-gray-500 mb-1">
          {course.courseLevel ?? "All Levels"}
        </span>

        {/* Title */}
        <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {course.title}
        </h3>

        {/* Tutor */}
        <div className="flex items-center gap-2 mt-2 mb-2">
          <img
            src={tutorAvatar}
            alt={tutorName}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-gray-200"
          />
          <span className="text-xs text-gray-600 truncate">{tutorName}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-1 text-gray-700 font-medium">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            {course.ratingsAverage?.toFixed(1) || "0.0"}
          </div>
          <div className="flex items-center text-gray-500 gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.totalEnrollments || 0}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">

          {/* Price / Credits */}
          <div className="font-semibold text-sm flex items-center gap-1">
            {isCredit ? (
              <span className="flex items-center gap-1 text-yellow-500">
                <Coins className="w-4 h-4" />
                {course.creditCost ?? 0}
              </span>
            ) : (
              <span className="text-emerald-700">${course.price ?? 0}</span>
            )}
          </div>

          {/* CTA */}
          <span className="text-[11px] px-3 py-1.5 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium shadow-sm group-hover:shadow-md transition">
            View
          </span>

        </div>
      </div>
    </Link>
  );
});

export default CourseCard;