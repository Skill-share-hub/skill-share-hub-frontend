import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { createCourseApi, updateCourseApi, getTutorCoursesApi, publishCourseApi, getCourseByIdApi, addCourseContentApi, updateCourseContentApi, deleteCourseContentApi, deleteCourseApi, updateCourseStatusApi } from "../api/courses.api";
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
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || error.message || "Failed to submit course";
            return rejectWithValue(errorMsg);
        }
    }
);

export const fetchTutorCourses = createAsyncThunk(
    "course/fetch",
    async ({ page, limit, search, category, type }: { page?: number, limit?: number, search?: string, category?: string, type?: string } = {}, { rejectWithValue }) => {
        try {
            const data = await getTutorCoursesApi(page, limit, search, category, type);
            return data;
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || error.message || "Failed to fetch courses";
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
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || error.message || "Failed to publish course";
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
            return rejectWithValue(errorMsg);
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            const errorMsg = error.response?.data?.message || error.message || "An unexpected error occurred";
            return rejectWithValue(errorMsg);
        }
    }
)

export const addCourseContent = createAsyncThunk(
    "course/addContent",
    async ({ id, formData }: { id: string, formData: FormData }, { rejectWithValue }) => {
        try {
            const response = await addCourseContentApi(id, formData);
            if (response.success) {
                toast.success("Content added successfully");
                return response.data;
            }
            return rejectWithValue(response.message || "Failed to add content");
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || "Failed to add content");
        }
    }
)

export const updateCourseContent = createAsyncThunk(
    "course/updateContent",
    async ({ contentId, formData }: { contentId: string, formData: FormData }, { rejectWithValue }) => {
        try {
            const response = await updateCourseContentApi(contentId, formData);
            if (response.success) {
                toast.success("Content updated successfully");
                return response.data;
            }
            return rejectWithValue(response.message || "Failed to update content");
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || "Failed to update content");
        }
    }
)

export const deleteCourseContent = createAsyncThunk(
    "course/deleteContent",
    async ({ courseId, contentId }: { courseId: string, contentId: string }, { rejectWithValue }) => {
        try {
            const response = await deleteCourseContentApi(courseId, contentId);
            if (response.success) {
                toast.success("Content deleted successfully");
                return { courseId, contentId };
            }
            return rejectWithValue(response.message || "Failed to delete content");
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || "Failed to delete content");
        }
    }
)

export const deleteCourse = createAsyncThunk(
    "course/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await deleteCourseApi(id);
            if (response.success) {
                toast.success("Course deleted successfully");
                return id;
            }
            return rejectWithValue(response.message || "Failed to delete course");
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || "Failed to delete course");
        }
    }
)

export const updateCourseStatus = createAsyncThunk(
    "course/updateStatus",
    async ({ id, status }: { id: string, status: string }, { rejectWithValue }) => {
        try {
            const response = await updateCourseStatusApi(id, status);
            if (response.success) {
                toast.success(`Course status updated to ${status}`);
                return response.data;
            }
            return rejectWithValue(response.message || "Failed to update status");
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } };
            return rejectWithValue(error.response?.data?.message || "Failed to update status");
        }
    }
)
