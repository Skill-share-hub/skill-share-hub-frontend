import { createSlice } from "@reduxjs/toolkit";
import api from "../../shared/services/axios";
import type { AppDispatch } from "../../store/store";
import handleError from "../../shared/services/handleError";
import type { User } from "../../shared/types/user.Type";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: { payload: User }) {
      state.loading = false;
      state.user = action.payload;
    },
    fetchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setUserLogout(state) {
      state.user = null;
    },
    switchRole(state, action: { payload: User['role'] }) {
      if (state.user) {
        state.user.role = action.payload;
        
        // If switching to tutor and no tutor profile exists, mark as incomplete
        if ((action.payload === 'tutor' || action.payload === 'premiumTutor') && 
            (!state.user.tutorProfile || !state.user.tutorProfile.bio)) {
          state.user.isProfileCompleted = false;
        }
        
        // If switching back to student and bio is missing, mark as incomplete
        if (action.payload === 'student' && !state.user.studentProfile?.bio) {
          state.user.isProfileCompleted = false;
        }
      }
    },
  },
});

export const checkAuth = (navigate?: (role: User['role']) => void) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchStart());
    const { data } = await api.get("/users/profile");

    dispatch(fetchSuccess(data.data));

    if (data.success && navigate) {
      navigate(data.data.role);
    }
  } catch (error) {
    dispatch(fetchFail(handleError(error)));
  }
};

export const {
  setUserLogout,
  fetchFail,
  fetchSuccess,
  fetchStart,
  switchRole,
} = authSlice.actions;

export default authSlice.reducer;