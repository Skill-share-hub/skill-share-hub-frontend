import React from 'react';
import type { Course } from '../../types/course.types';
import { Mail, Briefcase, Star, Award, ChevronRight } from 'lucide-react';

interface InstructorPreviewProps {
  course: Course;
}

const InstructorPreview: React.FC<InstructorPreviewProps> = ({ course }) => {
  const tutorObj = typeof course.tutorId === 'object' ? course.tutorId : null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About the Instructor</h2>
      
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        <div className="flex-shrink-0 flex flex-col items-center">
          <img 
            src={tutorObj?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutorObj?.name || 'Tutor')}&size=150`}
            alt={tutorObj?.name}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg mb-4"
          />
          <div className="flex gap-4 mb-2 text-sm">
            <div className="flex items-center text-amber-500 font-medium">
              <Star className="w-4 h-4 fill-current mr-1 text-amber-500" />
              4.8 Rating
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
              <Award className="w-4 h-4 mr-1" />
              12 Courses
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {tutorObj?.name}
          </h3>
          
          <div className="flex items-center text-indigo-600 dark:text-indigo-400 mb-4 font-medium flex-wrap gap-x-4">
            <span className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1.5" />
              Senior Software Engineer & Educator
            </span>
            {tutorObj?.email && (
              <span className="flex items-center text-gray-500 dark:text-gray-400">
                <Mail className="w-4 h-4 mr-1.5" />
                {tutorObj.email}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {tutorObj?.bio || 
              "An experienced professional developer and passionate educator committed to making complex topics understandable. I have spent over a decade building scalable applications for top-tier companies and am eager to share my knowledge with you."
            }
          </p>

          <button className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group">
            View full profile 
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorPreview;
