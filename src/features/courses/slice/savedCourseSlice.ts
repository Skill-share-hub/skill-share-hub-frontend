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
export const saveCourse = createAsyncThunk(
  'savedCourses/saveCourse',
  async (courseId: string, { rejectWithValue }) => {
    try {
      await courseService.saveCourse(courseId);
      return courseId;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);


// Remove from saved
export const unsaveCourse = createAsyncThunk(
  'savedCourses/unsaveCourse',
  async (courseId: string, { rejectWithValue }) => {
    try {
      await courseService.unsaveCourse(courseId);
      return courseId;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);


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


      //  Save course (optimistic update)
      .addCase(saveCourse.fulfilled, (state, action) => {
        // optional: you can refetch instead
      })


      //  Unsave course (remove locally)
      .addCase(unsaveCourse.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (course) => course._id !== action.payload
        );
      });
  },
});

export default savedCoursesSlice.reducer;