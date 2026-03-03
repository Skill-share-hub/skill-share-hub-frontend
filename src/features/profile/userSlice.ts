import { createSlice } from "@reduxjs/toolkit";
import api from "../../shared/services/axios";
import type { AppDispatch } from "../../store/store";
import handleError from "../../shared/services/handleError";
import type { UserRole } from "../../shared/types/user.Type";

interface UserState {
  login: boolean;
  role: UserRole | null;
  loading: boolean;
  error: string | null;
}
const initialState: UserState = {
  login: false,
  role: null,
  loading: true,
  error: null,
};
const userSlice = createSlice({
  name : "user",
  initialState ,
  reducers : {
    fetchStart(state){
      state.loading = true
    },
    fetchSuccess(state, action: { payload: { role: UserRole } }){
      state.loading = false
      state.login = true;
      state.role = action.payload.role
    },
    fetchFail(state,action){
      state.error = action.payload;
      state.loading = false;
    },
    setUserLogout(state){
      state.login = false;
      state.role = null;
    }
  }
});

export const checkAuth = () => async(dispatch:AppDispatch)=>{
  try{
    dispatch(fetchStart());
    const {data} = await api.get("/users/profile");
    dispatch(fetchSuccess(data));
  }catch(error){
    dispatch(fetchFail(handleError(error)));
  }
}

export const {setUserLogout,fetchFail,fetchSuccess,fetchStart} = userSlice.actions ;
export default userSlice.reducer ;