import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import courseCreationReducer from '../features/tutorCourses/slice/courseCreationSlice'
import getTutorCourseReducer from '../features/tutorCourses/slice/getCourseSlice'
import courseReducer from '../features/courses/slice/courseSlice'

const store = configureStore({
  reducer: {
    user: authReducer,
    courseBuilder: courseCreationReducer,
    tutorCourses: getTutorCourseReducer,
    courses: courseReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;