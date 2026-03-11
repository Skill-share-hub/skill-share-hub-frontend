import api from '../../../shared/services/axios';
import type { FetchCoursesParams, PaginatedResponse, Course } from '../types/course.types';

export const courseService = {

  fetchCourses: async (params: FetchCoursesParams): Promise<PaginatedResponse<Course>> => {

    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== undefined && v !== null)
    );

    const response = await api.get('/courses', { params: cleanParams });

    const backend = response.data.data;

    return {
      success: true,
      count: backend.totalCount,
      pagination: {
        page: backend.page,
        limit: backend.limit,
        totalPages: backend.totalPages
      },
      data: backend.courses
    };
  },

  fetchCourseById: async (id: string): Promise<{ success: boolean; data: Course }> => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  }

};