import React from 'react';
import type { Course } from '../../types/course.types';

interface CourseOverviewProps {
  course: Course;
}

const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Course Overview</h2>
      
      <div className="prose prose-indigo dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
          {course.description || "No description provided for this course yet. Check back later for comprehensive details about the curriculum and what you'll learn."}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What you'll learn</h3>
            <ul className="space-y-2">
              {[
                "Understand the core fundamentals and advanced concepts",
                "Build practical, real-world projects from scratch",
                "Apply best practices and industry standards",
                "Prepare for professional roles with hands-on exercises"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-600 dark:text-indigo-400 mr-2 font-bold">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Requirements</h3>
            <ul className="space-y-2">
              {[
                "A computer with internet access",
                "Basic understanding of related concepts",
                "Willingness to learn and practice"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2 font-bold">•</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
