import { createSlice } from "@reduxjs/toolkit";
import api from "../../shared/services/axios";
import type { AppDispatch } from "../../store/store";
import handleError from "../../shared/services/handleError";
import type { User } from "../../shared/types/user.Type";
import { switchRole, logoutUser } from "./authThunk";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login : boolean | null ;
}

const initialState: UserState = {
  user: null,
  loading: false,
  login : null,
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
      if(action.payload){
        state.login = true ;
      }
    },
    fetchFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setUserLogout(state) {
      state.user = null;
      state.login = null ;
    },
  },
  extraReducers: (builder) => {
  builder

    .addCase(switchRole.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(switchRole.fulfilled, (state, action) => {
      state.loading = false;

      if (state.user) {
        state.user = action.payload.data;
      }
    })

    .addCase(switchRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Role update failed";
    })
    
    .addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.login = null;
    })
    .addCase(logoutUser.rejected, (state) => {
      state.user = null;
      state.login = null;
    });
}
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
} = authSlice.actions;

export default authSlice.reducer;