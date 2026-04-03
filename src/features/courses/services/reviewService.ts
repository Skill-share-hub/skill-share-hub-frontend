import api from '../../../shared/services/axios';

export interface CreateReviewData {
  courseId: string;
  rating: number;
  reviewText: string;
}

export interface ReviewResponse {
  _id: string;
  courseId: string;
  userId: string | { _id: string; name: string };
  rating: number;
  reviewText: string;
  createdAt: string;
}

export const reviewService = {
  createReview: async (data: CreateReviewData): Promise<ReviewResponse> => {
    const response = await api.post('/courses/review', data);
    return response.data.data;
  },

  getUserReview: async (courseId: string): Promise<ReviewResponse | null> => {
    const response = await api.get(`/courses/my-review/${courseId}`);
    return response.data.data;
  },

  updateReview: async (courseId: string, data: { rating: number; reviewText: string }): Promise<ReviewResponse> => {
    const response = await api.put(`/courses/review/${courseId}`, data);
    return response.data.data;
  },

  deleteReview: async (courseId: string): Promise<void> => {
    await api.delete(`/courses/review/${courseId}`);
  },

  getCourseReviews: async (courseId: string): Promise<ReviewResponse[]> => {
    const response = await api.get(`/courses/${courseId}/reviews`);
    return response.data.data;
  }
};
