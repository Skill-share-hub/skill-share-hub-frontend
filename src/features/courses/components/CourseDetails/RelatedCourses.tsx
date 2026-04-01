import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, ArrowRight } from 'lucide-react';
import { courseService } from '../../services/courseService';
import type { Course } from '../../types/course.types';
import toast from 'react-hot-toast';

interface RelatedCoursesProps {
  currentCourseId?: string;
  category?: string;
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ currentCourseId, category }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      try {
        setIsLoading(true);
        // Using recommended=true to get related courses. 
        // We could also filter by category if the API supports it.
        const response = await courseService.fetchCourses({ recommended: true, limit: 4 });
        
        let related = response.data;
        // Filter out the current course if it's in the list
        if (currentCourseId) {
          related = related.filter(c => c._id !== currentCourseId);
        }
        
        // Ensure we don't show more than 4 on desktop (matches grid layout)
        setCourses(related.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch related courses", error);
        toast.error("Failed to load related courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedCourses();
  }, [currentCourseId, category]);

  if (isLoading) {
    return (
      <div className="mb-12 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(skeleton => (
            <div key={skeleton} className="bg-gray-100 dark:bg-gray-800 h-72 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (courses.length === 0) return null;

  return (
    <div className="mb-16">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Students Also Bought</h2>
        <button 
          onClick={() => navigate('/courses')}
          className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 group"
        >
          Browse all
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <div 
            key={course._id} 
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full cursor-pointer hover:-translate-y-1"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
              <img 
                src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold font-mono shadow-sm">
                {course.courseType === 'credit' ? `${course.creditCost}c` : (course.price === 0 ? 'Free' : `$${course.price}`)}
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1.5 line-clamp-1">
                {course.category}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {course.title}
              </h3>
              
              <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1 font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded">
                  <Star className="w-3 h-3 fill-current" />
                  {course.ratingsAverage?.toFixed(1) || '0.0'}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.totalEnrollments?.toLocaleString() || 0}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;
