import { createSlice } from "@reduxjs/toolkit"
import { fetchTutorCourses, publishCourse } from "../thunk/course.thunk"
import type { Course } from "../types/course.types"
interface CourseState {
    courses: Course[]
    loading: boolean
    error: string | null
    totalCount: number
    page: number
    limit: number
    totalPages: number
}
const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null,
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 0
}

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTutorCourses.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTutorCourses.fulfilled, (state, action) => {
                state.loading = false
                const { courses, totalCount, page, limit, totalPages } = action.payload;
                state.courses = courses;
                state.totalCount = totalCount;
                state.page = page;
                state.limit = limit;
                state.totalPages = totalPages;
            })
            .addCase(fetchTutorCourses.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch courses"
            })
            .addCase(publishCourse.fulfilled, (state, action) => {
                const { _id, status } = action.payload;

                const course = state.courses.find(c => c._id === _id);

                if (course) {
                    course.status = status;
                }
            });
    }
})

export default courseSlice.reducer