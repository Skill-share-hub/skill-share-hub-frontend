import { createSlice } from "@reduxjs/toolkit"
import { fetchTutorCourses, publishCourse, fetchCourseById } from "../thunk/course.thunk"
import type { Course } from "../types/course.types"
interface CourseState {
    courses: Course[]
    currentCourse: Course | null
    loading: boolean
    error: string | null
    totalCount: number
    page: number
    limit: number
    totalPages: number
}
const initialState: CourseState = {
    courses: [],
    currentCourse: null,
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
    reducers: {
        clearCurrentCourse: (state) => {
            state.currentCourse = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTutorCourses.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTutorCourses.fulfilled, (state, action) => {
                state.loading = false
                const { courses, page,totalPages } = action.payload;
                state.courses = courses;
                state.page = page;
                state.totalPages = totalPages;
            })
            .addCase(fetchTutorCourses.rejected, (state, action) => {
                state.loading = false
                state.error = (action.payload as string) || action.error.message || "Failed to fetch courses"
            })
            .addCase(fetchCourseById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCourseById.fulfilled, (state, action) => {
                state.loading = false
                state.currentCourse = action.payload
            })
            .addCase(fetchCourseById.rejected, (state, action) => {
                state.loading = false
                state.error = (action.payload as string) || action.error.message || "Failed to fetch course"
            })
            .addCase(publishCourse.fulfilled, (state, action) => {
                const { _id, status } = action.payload;

                const course = state.courses.find(c => c._id === _id);

                if (course) {
                    course.status = status;
                }

                if (state.currentCourse && state.currentCourse._id === _id) {
                    state.currentCourse.status = status;
                }
            });
    }
})

export const { clearCurrentCourse } = courseSlice.actions
export default courseSlice.reducer