import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseService } from '../services/courseService';
import type { Course } from '../types/course.types';
import handleError from '../../../shared/services/handleError';

interface SavedCoursesState {
  list: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: SavedCoursesState = {
  list: [],
  loading: false,
  error: null,
};


// Fetch saved courses
export const fetchSavedCourses = createAsyncThunk(
  'savedCourses/fetchSavedCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await courseService.fetchSavedCourses();
      return response;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);


// Add to saved
export const toggleSaveCourse = createAsyncThunk(
  'savedCourses/toggleSaveCourse',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await courseService.toggleSaveCourse(courseId);
      const savedCoursesList = response.data || [];
      const isSaved = savedCoursesList.includes(courseId);
      return { courseId, isSaved, savedCoursesList };
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);


// Remove from saved



const savedCoursesSlice = createSlice({
  name: 'savedCourses',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      //  Fetch
      .addCase(fetchSavedCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchSavedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


   
    .addCase(toggleSaveCourse.fulfilled, (state, action) => {
  const { courseId, isSaved } = action.payload;
  if (!isSaved) {
    // Only remove from list when unsaving
    state.list = state.list.filter((course) => course._id !== courseId);
  }
});
  },
});

export default savedCoursesSlice.reducer;