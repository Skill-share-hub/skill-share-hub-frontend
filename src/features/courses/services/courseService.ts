import api from '../../../shared/services/axios';
import type { FetchCoursesParams, PaginatedResponse, Course } from '../types/course.types';

const logCourseApi = (label: string, payload: unknown) => {
  if (!import.meta.env.DEV) return;
  console.groupCollapsed(`[Course API] ${label}`);
  console.log(payload);
  console.groupEnd();
};

export const courseService = {

  fetchCourses: async (params: FetchCoursesParams): Promise<PaginatedResponse<Course>> => {

    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== undefined && v !== null)
    );

    const response = await api.get('/courses', { params: cleanParams });
    logCourseApi('GET /courses response', response.data);

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
    logCourseApi(`GET /courses/${id} response`, response.data);
    return response.data;
  },

  fetchSavedCourses: async (): Promise<PaginatedResponse<Course>> => {
    const response = await api.get('/users/saved');
    return response.data;
  },

  toggleSaveCourse: async (courseId: string): Promise<{ success: boolean; data: string[] }> => {
    const response = await api.post(`/users/saved`, { courseId });
    return response.data;
  },

};

export const blockCourse = async (courseId: string) => {
  const res = await api.patch(`/admin/courses/${courseId}/block`);
  return res.data;
};
