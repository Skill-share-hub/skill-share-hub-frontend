import { createSlice } from "@reduxjs/toolkit"
import { fetchTutorCourses } from "../thunk/course.thunk"
import type { Course } from "../types/course.types"
interface CourseState {
  courses: Course[]
  loading: boolean
  error: string | null
}
const initialState:CourseState = {
    courses:[],
    loading:false,
    error:null
}

const getCourseSlice = createSlice({
    name:"getCourse",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTutorCourses.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchTutorCourses.fulfilled,(state,action)=>{
            state.loading=false
            state.courses=action.payload
        })
        .addCase(fetchTutorCourses.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message || "Failed to fetch courses"
        })
    }
})

export default getCourseSlice.reducer