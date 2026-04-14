import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Course } from '../../types/course.types';
import { Star, Users, PlayCircle, BookmarkPlus, BookmarkCheck, Share2, Loader2, Coins } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { toggleSaveCourse } from '../../slice/savedCourseSlice';
import { useEnrollmentStatus } from '../../../../shared/hooks/useEnrollmentStatus';

interface CourseHeroProps {
  course: Course;
}

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  // Derive isSaved directly from user.savedCourses array
  const isSaved = user?.savedCourses?.includes(course._id) ?? false;
  const tutorId = typeof course.tutorId === "object" ? course.tutorId._id : course.tutorId;
  const isCourseOwner=user?._id==tutorId
  const [saving, setSaving] = useState(false);

  const tutorObj = typeof course.tutorId === 'object' ? course.tutorId : null;
  const tutorName = tutorObj?.name || 'Instructor';
  const tutorAvatar =
    tutorObj?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      tutorName
    )}&background=047857&color=fff`;

  const handleToggleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await dispatch(toggleSaveCourse(course._id)).unwrap();
      toast.success(isSaved ? 'Course removed from saved' : 'Course saved successfully');
    } catch {
      toast.error('Failed to update saved course');
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Course link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const { isEnrolled, isCompleted, isLoading } = useEnrollmentStatus(course._id);

  const handleEnrollClick = () => {
    if (isEnrolled || isCompleted) {
      navigate(`/my-activity/${course._id}`);
    } else {
      navigate(`/courses/${course._id}/purchase`);
    }
  };

  return (
    <section className="relative w-full overflow-hidden mb-6 filter drop-shadow-sm">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start bg-white/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Thumbnail */}
          <div className="w-full md:w-[400px] lg:w-[480px] relative group rounded-xl overflow-hidden aspect-video bg-gray-100 flex-shrink-0 shadow-sm border border-black/5">
            <img
              src={
                course.thumbnailUrl ||
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
              }
              alt={course.title || 'Course Thumbnail'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 backdrop-blur-sm text-emerald-700 rounded-full p-4 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <PlayCircle className="w-10 h-10" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col pt-2 w-full">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold px-2.5 py-1 bg-white border border-gray-100 text-gray-700 rounded-md shadow-sm">
                {course.category}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-50 border border-emerald-100/50 text-emerald-700 rounded-md shadow-sm">
                {course.courseLevel || 'All Levels'}
              </span>
            </div>

            {/* Title & Top Actions Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 lg:mb-5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                {course.title || 'Untitled Course'}
              </h1>
              
              <div className="flex items-center gap-2 shrink-0 sm:pt-1 ml-auto sm:ml-0">
                {/* Save / Unsave toggle */}
                <button
                  onClick={handleToggleSave}
                  disabled={saving}
                  title={isSaved ? 'Remove from saved' : 'Save course'}
                  className={`
                    p-2.5 rounded-lg cursor-pointer border shadow-sm transition-all duration-300
                    disabled:opacity-60 disabled:cursor-not-allowed
                    ${isSaved
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                      : 'text-gray-500 bg-white border-gray-200 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-200'
                    }
                  `}
                >
                  {isSaved
                    ? <BookmarkCheck className="w-5 h-5" />
                    : <BookmarkPlus className="w-5 h-5" />
                  }
                </button>

                <button 
                  onClick={handleShare}
                  title="Share course"
                  className="p-2.5 cursor-pointer text-gray-500 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-lg shadow-sm transition-colors duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tutor + Rating */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600 mb-6 lg:mb-8">
              <div className="flex items-center gap-2.5">
                <img
                  src={tutorAvatar}
                  alt={tutorName}
                  className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-white"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
                    Instructor
                  </span>
                  <span className="font-semibold text-gray-900 text-xs">{tutorName}</span>
                </div>
              </div>
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-amber-50 px-2 py-1 rounded border border-amber-100/50 text-amber-700 font-semibold shadow-sm text-xs">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  {course.ratingsAverage?.toFixed(1) || '0.0'}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                  <Users className="w-4 h-4 text-gray-400" />
                  {course.totalEnrollments || 0} enrolled
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 pt-6 border-t border-gray-100/80">
              {/* Price */}
              <div className="text-2xl font-bold text-gray-900 flex items-center gap-1.5">
               {isCourseOwner ? (
  "This is your course"
                ) : (
                  isEnrolled ? (
                    <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      You already enrolled
                    </span>
                  ) : isCompleted ? (
                    <span className="text-green-800 text-sm font-medium bg-green-100 px-3 py-1 rounded-full border border-gray-200">
                      You completed this course
                    </span>
                  ) : course.courseType === 'credit' ? (
                    <span className="flex items-center gap-1.5 text-yellow-600">
                      <Coins />
                      {course.creditCost}
                    </span>
                  ) : course.price === 0 || !course.price ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    <span className="text-gray-900">₹{course.price}</span>
                  )
                )}
                
              </div>

              {/* Actions */}
              {!isCourseOwner&&
              (
                <div className="flex items-center gap-3 sm:ml-auto w-full sm:w-auto">
                    <button
                      onClick={handleEnrollClick}
                      disabled={isLoading}
                      className={`flex-1 cursor-pointer sm:flex-none px-8 py-3 text-white text-sm font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                        isEnrolled || isCompleted
                        ? "bg-blue-400 hover:bg-blue-500 text-white shadow-md" 
                        : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/20"
                      } ${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        isCompleted ? "View" : 
                        isEnrolled ? "Open Course" : "Enroll Now"
                      )}
                    </button>
                </div>
              )}
              

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;