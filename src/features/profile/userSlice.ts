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

const userSlice = createSlice({
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
  },
});

export const checkAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchStart());
    const { data } = await api.get("/users/profile");
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchFail(handleError(error)));
  }
};

export const {
  setUserLogout,
  fetchFail,
  fetchSuccess,
  fetchStart,
} = userSlice.actions;

export default userSlice.reducer;