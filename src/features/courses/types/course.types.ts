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

  tutor: {
    _id: string;
    name: string;
    avatarUrl?: string;
  };
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