import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

import { courseService } from '../services/courseService';
import type { Course } from '../types/course.types';

import CourseHero from '../components/CourseDetails/CourseHero';
import CourseDetailsSection from '../components/CourseDetails/CourseDetailsSection';
import CurriculumSection from '../components/CourseDetails/CurriculumSection';
import TutorInfoCard from '../components/CourseDetails/TutorInfoCard';
import RecommendedCourses from '../components/CourseDetails/RecommendedCourses';
import ReviewList from '../components/Reviews/ReviewList';

const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when visiting a new course
    window.scrollTo(0, 0);
    
    const fetchCourseDetails = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        
        const response = await courseService.fetchCourseById(id);
        const fetchedCourse = response.data;
        if (!fetchedCourse) {
          toast.error("Course not found");
          navigate('/courses');
          return;
        }

        setCourse(fetchedCourse);
      } catch (error) {
        console.error("Failed to load course details", error);
        toast.error("Failed to load course details");
        setCourse(getMockCourse(id || '1')); // Ensure UI doesn't break if API fails on dev
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-white via-emerald-50/40 to-white">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-emerald-800">Loading course...</h2>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/40 to-white py-6 sm:py-8 lg:py-10 selection:bg-emerald-100 selection:text-emerald-900">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        
        {/* Top Navigation */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800/70 hover:text-emerald-700 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-100/50 hover:border-emerald-200 shadow-sm hover:shadow transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Courses
          </button>
        </div>

        {/* Hero Section */}
        <div className="mb-10 lg:mb-12">
          {course && <CourseHero course={course} />}
        </div>

        {/* Course Details Middle Section */}
        <div className="mb-10 lg:mb-12">
          {course && <CourseDetailsSection course={course} />}
        </div>

        {/* Main Grid: Curriculum (Left 70%) & Tutor Info (Right 30%) */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mb-16 lg:mb-20">
          
          <div className="w-full lg:w-2/3 xl:w-8/12">
            {course && <CurriculumSection course={course} />}
          </div>

          <div className="w-full lg:w-1/3 xl:w-4/12">
            {course && <TutorInfoCard course={course} />}
          </div>
          
        </div>

        {/* Reviews Section */}
        <div className="mb-16 lg:mb-20">
          <ReviewList courseId={course._id} />
        </div>

        {/* Global/Full Width Sections */}
        {course && <RecommendedCourses currentCourseId={course._id} />}

      </div>
    </div>
  );
};


export default CourseDetailsPage;
