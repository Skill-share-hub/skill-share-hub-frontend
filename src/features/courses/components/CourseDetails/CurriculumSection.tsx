import React from 'react';
import { PlayCircle, Lock, Clock } from 'lucide-react';
import type { Course } from '../../types/course.types';

interface CurriculumSectionProps {
  course: Course;
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ course }) => {
  const modules = Array.isArray(course.contentModules) ? course.contentModules : [];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Course Curriculum</h2>
          <p className="text-sm text-gray-500 mt-1">Explore the modules included in this program</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md shadow-sm border border-emerald-100/50">
            {modules.length} Modules
          </span>
        </div>
      </div>

      {modules.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed shadow-sm">
          <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium text-sm">No modules added yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {modules.map((module, index) => (
            <div 
              key={module._id || index} 
              className={`group flex flex-row items-center gap-4 p-3 sm:p-4 bg-white rounded-xl border transition-all duration-300 ${
                module.isLocked 
                  ? 'border-gray-100 opacity-75 grayscale-[0.2]' 
                  : 'border-gray-200 shadow-sm hover:shadow-md hover:border-emerald-200'
              }`}
            >
              {/* Module Thumbnail / Icon Area */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors shadow-sm ${
                module.isLocked 
                  ? 'bg-gray-50 text-gray-400 border border-gray-100' 
                  : 'bg-emerald-50 text-emerald-600 border border-emerald-100/50 group-hover:bg-emerald-600 group-hover:text-white'
              }`}>
                {module.isLocked ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <PlayCircle className="w-5 h-5" />
                )}
              </div>

              {/* Module Info */}
              <div className="flex-1 min-w-0 pr-2">
                <h3 className={`font-bold text-sm sm:text-[15px] truncate transition-colors ${
                  module.isLocked ? 'text-gray-500' : 'text-gray-900 group-hover:text-emerald-700'
                }`}>
                  {module.title || 'Untitled Module'}
                </h3>
                {module.summary && (
                  <p className="text-[13px] text-gray-500 truncate mt-0.5">
                    {module.summary}
                  </p>
                )}
              </div>

              {/* Module Duration */}
              {module.duration && (
                <div className="flex-shrink-0">
                  <span className={`flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-md shadow-sm ${
                    module.isLocked 
                      ? 'bg-gray-50 text-gray-500 border border-gray-100' 
                      : 'bg-white border border-gray-200 text-gray-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-100/50'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    {module.duration}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurriculumSection;
