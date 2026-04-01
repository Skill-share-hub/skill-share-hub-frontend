import React from 'react';
import type { Course } from '../../types/course.types';
import { Mail } from 'lucide-react';

interface TutorInfoCardProps {
  course: Course;
}

const TutorInfoCard: React.FC<TutorInfoCardProps> = ({ course }) => {
  const tutorId = course.tutorId;
  const tutor = typeof tutorId === 'object' ? tutorId : null;

  if (!tutor) return null;

  return (
    <div className="bg-white border border-gray-100/80 rounded-2xl p-6 sm:p-8 flex flex-col sticky top-24 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      
      <div className="flex flex-col items-center text-center">
        
        <div className="relative mb-5">
          <div className="absolute inset-0 bg-emerald-100 rounded-full blur-md opacity-50 transform scale-110"></div>
          <img 
            src={tutor.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || 'Tutor')}&size=150&background=10b981&color=fff`}
            alt={tutor.name || 'Instructor'}
            className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-md z-10"
          />
        </div>

        <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-600/80 mb-1.5">
          Instructor
        </span>
        
        <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {tutor.name || 'Instructor'}
        </h4>
        
        {tutor.email && (
          <div className="flex items-center text-[13px] text-emerald-700 font-medium mb-5 bg-emerald-50/80 px-4 py-1.5 rounded-full border border-emerald-100/50 shadow-sm transition-colors hover:bg-emerald-100/80">
            <Mail className="w-3.5 h-3.5 mr-2" />
            <a href={`mailto:${tutor.email}`} className="hover:text-emerald-800 transition-colors">{tutor.email}</a>
          </div>
        )}
        
        {tutor.bio ? (
          <p className="text-[15px] text-gray-600 leading-relaxed text-center sm:text-left w-full mt-2 pb-6 border-b border-gray-100/80">
            {tutor.bio}
          </p>
        ) : (
          <p className="text-sm text-gray-400 italic mt-2 text-center w-full pb-6 border-b border-gray-100/80">
            Instructor information is limited.
          </p>
        )}
      </div>

      <button className="w-full mt-6 py-2.5 bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 text-sm font-semibold rounded-xl transition-all shadow-sm">
        View Profile
      </button>

    </div>
  );
};

export default TutorInfoCard;
