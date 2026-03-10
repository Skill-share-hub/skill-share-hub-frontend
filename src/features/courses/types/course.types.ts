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
    priceType?: 'paid' | 'credit' | '';
    creditRange?: string; // e.g. "0-20"
    priceRange?: string; // e.g. "0-500"
    rating?: string; // e.g. "4"
}

export interface FetchCoursesParams extends CourseFilters {
    q?: string;
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
