import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import courseCreationReducer from '../features/courses/slice/courseCreationSlice'
import getTutorCourseReducer from '../features/tutorCourses/slice/getCourseSlice'
const store = configureStore({
  reducer: {
    user: authReducer,
    courseBuilder: courseCreationReducer, 
    tutorCourses:getTutorCourseReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;