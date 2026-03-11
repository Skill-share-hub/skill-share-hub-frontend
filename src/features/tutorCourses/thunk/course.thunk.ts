import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { createCourseApi, updateCourseApi, getTutorCoursesApi, publishCourseApi, getCourseByIdApi } from "../api/courses.api";
import toast from "react-hot-toast";

export const submitCourse = createAsyncThunk(
    "course/submit",
    async ({ statusOverride, thumbnailFile }:
        { statusOverride: "draft" | "pending" | "published" | undefined, thumbnailFile: File | null }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as RootState;
            const course = state.courseBuilder;

            const formData = new FormData();

            // Append all text fields
            formData.append("title", course.title);
            formData.append("description", course.description);
            formData.append("category", course.category);
            formData.append("courseType", course.courseType);
            formData.append("status", statusOverride ?? course.status);
            formData.append("courseLevel", course.courseLevel);
            formData.append("price", String(course.price));
            formData.append("creditCost", String(course.creditCost));

            // Append skills array
            course.courseSkills.forEach((skill) => {
                formData.append("courseSkills", skill);
            });

            // Append the actual file if it exists
            if (thumbnailFile) {
                formData.append("thumbnailUrl", thumbnailFile);
            }

            let data;
            if (course.id) {
                data = await updateCourseApi(course.id, formData);
                toast.success("Course updated successfully");
            } else {
                data = await createCourseApi(formData);
                toast.success("Course created successfully");
            }
            return data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to submit course";
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
);

export const fetchTutorCourses = createAsyncThunk(
    "course/fetch",
    async ({ page, limit }: { page?: number, limit?: number } = {}, { rejectWithValue }) => {
        try {
            const data = await getTutorCoursesApi(page, limit);
            return data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch courses";
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
)

export const publishCourse = createAsyncThunk(
    "course/publish",
    async (courseId: string, { rejectWithValue }) => {
        try {
            const data = await publishCourseApi(courseId);
            toast.success("Course published successfully");
            return data;
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "Failed to publish course";
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
)



export const fetchCourseById = createAsyncThunk(
    "course/fetchById",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await getCourseByIdApi(id);
            if (response.success) {
                return response.data;
            }
            const errorMsg = response.message || "Failed to fetch course details";
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred";
            toast.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
    }
)
