import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { createCourseApi, updateCourseApi, getTutorCoursesApi, publishCourseApi } from "../api/courses.api";

export const submitCourse = createAsyncThunk(
    "course/submit",
    async ({ statusOverride, thumbnailFile }:
        { statusOverride: "draft" | "pending" | "published" | undefined, thumbnailFile: File | null }, { getState }) => {
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
        } else {
            data = await createCourseApi(formData);
        }
        return data;
    }
);

export const fetchTutorCourses = createAsyncThunk(
    "course/fetch",
    async ({ page, limit }: { page?: number, limit?: number } = {}) => {
        const data = await getTutorCoursesApi(page, limit);
        return data;
    }
)

export const publishCourse = createAsyncThunk(
    "course/publish",
    async (courseId: string) => {
        const data = await publishCourseApi(courseId);
        return data;
    }
)