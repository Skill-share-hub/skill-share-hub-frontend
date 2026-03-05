import api from "../../shared/services/axios";
import type { CredentialResponse } from "@react-oauth/google";
import { checkAuth } from "./authSlice";
import type { AppDispatch } from "../../store/store";
import type { NavigateFunction } from "react-router-dom";

export const handleOauth = async(
  credentialResponse:CredentialResponse,
  dispatch:AppDispatch,
  navigate:NavigateFunction
) =>{
  const credential = credentialResponse.credential;
  await api.post("/auth/google",{credential});
  await dispatch(checkAuth(()=>navigate('/profile')));
}