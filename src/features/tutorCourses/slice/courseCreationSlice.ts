import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CourseBuilderState } from "../types/course.types"
import { submitCourse } from "../thunk/course.thunk";

const initialState: CourseBuilderState = {
    step: 1,
    title: "",
    description: "",
    category: "",
    courseLevel: "",
    courseType: "paid",
    price: 0,
    creditCost: 0,
    thumbnailUrl: "",
    courseSkills: [],
    status: "draft",
    isSubmitting: false
}



const courseBuilderSlice = createSlice({
    name: "courseBuilder",
    initialState,

    reducers: {

        updateField(
            state,
            action: PayloadAction<{ field: keyof CourseBuilderState; value: unknown }>
        ) {
            (state as Record<string, unknown>)[action.payload.field] = action.payload.value
        },

        updateFields(state, action: PayloadAction<Partial<CourseBuilderState>>) {
            Object.assign(state, action.payload)
        },

        nextStep(state) {
            state.step += 1
        },

        prevStep(state) {
            state.step -= 1
        },

        setCourse(_state, action: PayloadAction<CourseBuilderState>) {
            return { ...action.payload }
        },

        resetCourse() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitCourse.pending, (state) => {
                state.isSubmitting = true;
            })
            .addCase(submitCourse.fulfilled, (state) => {
                state.isSubmitting = false;
            })
            .addCase(submitCourse.rejected, (state) => {
                state.isSubmitting = false;
            });
    }
})

export const { updateField, updateFields, nextStep, prevStep, resetCourse, setCourse } =
    courseBuilderSlice.actions

export default courseBuilderSlice.reducer