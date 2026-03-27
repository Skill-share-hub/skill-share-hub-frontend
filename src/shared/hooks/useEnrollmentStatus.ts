import { useAppSelector } from "./redux";
import { useMemo } from "react";

/**
 * useEnrollmentStatus
 * 
 * A unified hook to check if the current user is enrolled in a specific course.
 * Uses the global user state (populated in authSlice) as the single source of truth.
 * 
 * @param courseId - The ID of the course to check enrollment for.
 * @returns { isEnrolled: boolean, isLoading: boolean }
 */
export const useEnrollmentStatus = (courseId: string | undefined) => {
  const { user, loading } = useAppSelector((state) => state.user);

  const isEnrolled = useMemo(() => {
    if (!user || !courseId) return false;
    
    const enrollments = user.enrolledCourses || [];
    
    return enrollments.some((e: any) => {
      // Handle both populated objects and plain ID strings
      const eCourseId = e.courseId?._id || e.courseId;
      return (
        e.status === "active" && 
        String(eCourseId) === String(courseId)
      );
    });
  }, [user, courseId]);

  return {
    isEnrolled,
    isLoading: loading,
    user
  };
};
