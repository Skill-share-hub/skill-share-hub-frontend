import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { courseService } from '../services/courseService';
import type { Course, CourseFilters, FetchCoursesParams } from '../types/course.types';
import handleError from '../../../shared/services/handleError';
import type { RootState } from '../../../store/store';

interface CourseState {
    list: Course[];
    loading: boolean;
    error: string | null;
    page: number;
    totalPages: number;
    filters: CourseFilters;
    search: string;
}

const initialState: CourseState = {
    list: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    filters: {},
    search: '',
};

export const fetchCourses = createAsyncThunk(
    'courses/fetchCourses',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const { search, filters, page } = state.courses;

            const params: FetchCoursesParams = {
                page,
                limit: 12,

                ...(search && { q: search }),

                ...(filters.category && { c: filters.category }),
                ...(filters.type && { type: filters.type }),

                ...(filters.minPrice !== undefined && { minPrice: filters.minPrice }),
                ...(filters.maxPrice !== undefined && { maxPrice: filters.maxPrice }),

                ...(filters.rating && { rating: filters.rating }),

                ...(filters.sort && { sort: filters.sort }),

                ...(filters.recommended && { recommended: filters.recommended }),
            };

            const response = await courseService.fetchCourses(params);
            return response;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
            state.page = 1; // Reset to first page on search
        },
        setFilters: (state, action: PayloadAction<Partial<CourseFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
            state.page = 1; // Reset to first page on filter change
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {};
            state.search = '';
            state.page = 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
                state.totalPages = (action.payload as any)?.pagination?.totalPages || (action.payload as any)?.totalPages || 1;
                state.page = (action.payload as any)?.pagination?.page || (action.payload as any)?.page || 1;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setSearch, setFilters, setPage, clearFilters } = courseSlice.actions;

export default courseSlice.reducer;
