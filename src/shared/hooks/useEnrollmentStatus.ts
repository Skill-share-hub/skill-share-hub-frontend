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

  const enrollment = useMemo(() => {
    if (!user || !courseId) return null;
    
    const enrollments = user.enrolledCourses || [];
    
    return enrollments.find((e: any) => {
      const eCourseId = e.courseId?._id || e.courseId;
      return String(eCourseId) === String(courseId);
    });
  }, [user, courseId]);

  return {
    isEnrolled: enrollment?.status === "active",
    isCompleted: enrollment?.status === "completed",
    isLoading: loading,
    user
  };
};
