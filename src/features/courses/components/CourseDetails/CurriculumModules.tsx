import React, { useState } from 'react';
import { PlayCircle, Lock, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import type { Course } from '../../types/course.types';

interface CurriculumModulesProps {
  course: Course;
}

const CurriculumModules: React.FC<CurriculumModulesProps> = ({ course }) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  // Fallback modules if none provided by API
  const dynamicModules = Array.isArray(course.contentModules) && course.contentModules.length > 0 
    ? course.contentModules 
    : [
    { _id: '1', title: 'Introduction and Setup', summary: 'Getting started with the course materials and required tools.', duration: '45m', isLocked: false },
    { _id: '2', title: 'Core Fundamentals', summary: 'Deep dive into the essential concepts and theories.', duration: '2h 15m', isLocked: true },
    { _id: '3', title: 'Advanced Techniques', summary: 'Applying complex patterns and mastering the workflow.', duration: '3h 30m', isLocked: true },
    { _id: '4', title: 'Real World Project', summary: 'Building a complete application from scratch.', duration: '4h 0m', isLocked: true }
  ];

  const totalDuration = dynamicModules.reduce((acc, mod) => {
    if (!mod.duration) return acc;
    const hoursMatch = mod.duration.match(/(\d+)h/);
    const minsMatch = mod.duration.match(/(\d+)m/);
    const h = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const m = minsMatch ? parseInt(minsMatch[1], 10) : 0;
    return acc + (h * 60) + m;
  }, 0);
  const hrs = Math.floor(totalDuration / 60);
  const mins = totalDuration % 60;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Curriculum</h2>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{dynamicModules.length} Modules</span>
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
          <span>{hrs}h {mins}m total length</span>
        </div>
      </div>

      <div className="space-y-3">
        {dynamicModules.map((module, index) => (
          <div 
            key={module._id} 
            className={`border rounded-xl overflow-hidden transition-all duration-200 ${expandedModule === module._id ? 'border-indigo-200 dark:border-indigo-800 shadow-md ring-1 ring-indigo-50 dark:ring-indigo-900/50' : 'border-gray-100 dark:border-gray-700 hover:border-indigo-100 dark:hover:border-gray-600'}`}
          >
            <button 
              onClick={() => setExpandedModule(expandedModule === module._id ? null : module._id)}
              className={`w-full text-left p-4 md:p-5 flex items-center justify-between transition-colors ${expandedModule === module._id ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${expandedModule === module._id ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base md:text-lg">
                    {module.title || 'Untitled Module'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block mt-0.5">
                    {module.summary || 'No summary available.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-500">
                <span className="text-sm font-medium hidden sm:inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                  {module.duration || 'N/A'}
                </span>
                {expandedModule === module._id ? <ChevronUp className="w-5 h-5 text-indigo-500" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {expandedModule === module._id && (
              <div className="p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3">
                      {module.isLocked ? (
                        <Lock className="w-5 h-5 text-gray-400" />
                      ) : (
                        <PlayCircle className="w-5 h-5 text-indigo-500" />
                      )}
                      <span className={`font-medium ${module.isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        1. Introduction Video
                      </span>
                    </div>
                    {module.isLocked ? (
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">Locked</span>
                    ) : (
                      <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">Preview</button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm opacity-80">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-500 dark:text-gray-400">
                        2. Reading Materials
                      </span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">Locked</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumModules;
