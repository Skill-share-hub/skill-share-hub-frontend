import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../store/store";
import { createCourse, updateCourse, getTutorCourses } from "../api/courses.api";

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
            formData.append("courseSkills[]", skill);
        });

        // Append the actual file if it exists
        if (thumbnailFile) {
            formData.append("thumbnailUrl", thumbnailFile);
        }

        let data;
        if (course.id) {
            data = await updateCourse(course.id, formData);
        } else {
            data = await createCourse(formData);
        }
        return data;
    }
);

export const fetchTutorCourses = createAsyncThunk(
    "course/fetch",
    async () => {
        const data = await getTutorCourses();
        return data;
    }
)