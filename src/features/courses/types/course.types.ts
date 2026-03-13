export interface Course {
  _id: string;

  title: string;
  description: string;

  category: string;

  courseLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

  courseType: 'paid' | 'credit';

  price?: number;
  creditCost?: number;

  thumbnailUrl: string;

  ratingsAverage: number;
  totalEnrollments: number;

  status: 'draft' | 'published';

  courseSkills?: string[];

  tutorId:
    | string
    | {
        _id?: string;
        name: string;
        avatarUrl?: string;
        email?: string;
        bio?: string;
      };

  contentModules?: CourseModule[];
}

export interface CourseModule {
  _id: string;
  title: string;
  summary?: string;
  duration?: string;
  isLocked?: boolean;
}

export interface CourseReview {
  _id: string;
  studentName: string;
  rating: number;
  reviewText: string;
}

export interface CourseFilters {
  category?: string;

  type?: 'paid' | 'credit';

  minPrice?: number;
  maxPrice?: number;

  rating?: number;

  sort?: 'latest' | 'popular';

  recommended?: boolean;
}

export interface FetchCoursesParams {
  q?: string;              // search
  c?: string;              // category

  type?: 'paid' | 'credit';

  minPrice?: number;
  maxPrice?: number;

  rating?: number;

  sort?: 'latest' | 'popular';

  recommended?: boolean;

  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  success: boolean;

  count: number;

  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };

  data: T[];
}
