import { createSlice } from "@reduxjs/toolkit";
import api from "../../shared/services/axios";
import type { AppDispatch } from "../../store/store";
import handleError from "../../shared/services/handleError";

const userSlice = createSlice({
  name : "user",
  initialState : {
    login : false,
    role : "",
    avatarUrl:"",
    studentProfile:null,
    tutorProfile:null,
    loading : false,
    error : null
  },
  reducers : {
    fetchStart(state){
      state.loading = true
    },
    fetchSuccess(state,action){
      const {role,avatarUrl,studentProfile,tutorProfile} = action.payload
      state.loading = false
      state.login = true;
      state.role = role
      state.avatarUrl = avatarUrl;
      state.studentProfile = studentProfile;
      state.tutorProfile = tutorProfile
    },
    fetchFail(state,action){
      state.error = action.payload;
      state.loading = false;
    },
    setUserLogout(state){
      state.login = false;
      state.role = "";
    }
  }
});

export const checkAuth = () => async(dispatch:AppDispatch)=>{
  try{
    dispatch(fetchStart());
    const {data} = await api.get("/users/profile");
    console.log(data);
    dispatch(fetchSuccess(data));
  }catch(error){
    dispatch(fetchFail(handleError(error)));
  }
}

export const {setUserLogout,fetchFail,fetchSuccess,fetchStart} = userSlice.actions ;
export default userSlice.reducer ;