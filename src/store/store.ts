import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import courseCreationReducer from '../features/tutorCourses/slice/courseCreationSlice'
import getTutorCourseReducer from '../features/tutorCourses/slice/getCourseSlice'
import courseReducer from '../features/courses/slice/courseSlice'
import profileReducer from '../features/profile/slice/profile.slice'
import purchaseReducer from '../features/coursePurchase/redux/purchaseSlice'
import walletReducer from '../features/wallet/walletSlice'
import savedCoursesReducer from '../features/courses/slice/savedCourseSlice'
import applicationReducer from '../features/adminPremiumTutor/slice/application.slice'

const store = configureStore({
  reducer: {
    user: authReducer,
    profile: profileReducer,
    courseBuilder: courseCreationReducer,
    tutorCourses: getTutorCourseReducer,
    courses: courseReducer,
    purchase: purchaseReducer,
    wallet: walletReducer,
    savedCourses: savedCoursesReducer,
    applications: applicationReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;