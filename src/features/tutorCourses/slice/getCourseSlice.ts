import { createSlice } from "@reduxjs/toolkit"
import { fetchTutorCourses, publishCourse, fetchCourseById, addCourseContent, updateCourseContent, deleteCourseContent, updateCourseStatus, deleteCourse } from "../thunk/course.thunk"
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
            })
            .addCase(updateCourseStatus.fulfilled, (state, action) => {
                const { _id, status } = action.payload;
                const course = state.courses.find(c => c._id === _id);
                if (course) {
                    course.status = status;
                }
                if (state.currentCourse && state.currentCourse._id === _id) {
                    state.currentCourse.status = status;
                }
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter(c => c._id !== action.payload);
                if (state.currentCourse && state.currentCourse._id === action.payload) {
                    state.currentCourse = null;
                }
            })
            .addCase(addCourseContent.fulfilled, (state, action) => {
                if (state.currentCourse) {
                    // Assuming the payload is the updated course or just the new content item
                    // If payload is the full course:
                    state.currentCourse = action.payload;
                }
            })
            .addCase(updateCourseContent.fulfilled, (state, action) => {
                if (state.currentCourse) {
                    state.currentCourse = action.payload;
                }
            })
            .addCase(deleteCourseContent.fulfilled, (state, action) => {
                const { contentId } = action.payload;
                if (state.currentCourse && state.currentCourse.contentModules) {
                    state.currentCourse.contentModules = state.currentCourse.contentModules.filter(m => m._id !== contentId);
                }
            });
    }
})

export const { clearCurrentCourse } = courseSlice.actions
export default courseSlice.reducer