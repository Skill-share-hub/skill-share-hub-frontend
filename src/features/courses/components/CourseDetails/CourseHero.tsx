import React from 'react';
import type { Course } from '../../types/course.types';
import { Star, Users, PlayCircle, BookmarkPlus, Share2 } from 'lucide-react';

interface CourseHeroProps {
  course: Course;
}

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  const tutorObj = typeof course.tutorId === 'object' ? course.tutorId : null;
  const tutorName = tutorObj?.name || 'Instructor';
  const tutorAvatar =
    tutorObj?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      tutorName
    )}&background=047857&color=fff`;

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

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4 lg:mb-5">
              {course.title || 'Untitled Course'}
            </h1>

            {/* Tutor + Rating */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600 mb-6 lg:mb-8">

              <div className="flex items-center gap-2.5">
                <img
                  src={tutorAvatar}
                  alt={tutorName}
                  className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-white"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">Instructor</span>
                  <span className="font-semibold text-gray-900 text-xs">
                    {tutorName}
                  </span>
                </div>
              </div>

              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

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
                {course.courseType === 'credit' ? (
                  <span className="flex items-center gap-1.5 text-yellow-600">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
                    {course.creditCost}
                  </span>
                ) : (
                  course.price === 0 || !course.price
                  ? <span className="text-emerald-600">Free</span>
                  : <span className="text-gray-900">${course.price}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 sm:ml-auto w-full sm:w-auto">

                <button className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-semibold rounded-lg shadow-[0_4px_14px_0_rgba(4,120,87,0.39)] hover:shadow-[0_6px_20px_rgba(4,120,87,0.23)] transition-all duration-300 transform hover:-translate-y-0.5">
                  Enroll Now
                </button>

                <button className="p-3 text-gray-500 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-lg shadow-sm transition-colors duration-300">
                  <BookmarkPlus className="w-5 h-5" />
                </button>

                <button className="p-3 text-gray-500 hover:text-emerald-700 bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-lg shadow-sm transition-colors duration-300">
                  <Share2 className="w-5 h-5" />
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;