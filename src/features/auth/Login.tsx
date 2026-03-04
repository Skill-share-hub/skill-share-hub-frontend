import { useState } from "react";
import Input from "../../shared/components/Input";
import { useNavigate } from "react-router";
import api from "../../shared/services/axios";
import axios from "axios";
import { useAppDispatch } from "../../shared/hooks/redux";
import { checkAuth } from "../profile/userSlice";
import ButtonSpinner from "../../shared/components/ButtonSpinner";
import type {LoginInput} from './types'
import { type LogFormData, logSchema } from "./validations";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { handleOauth } from "./service";
import {z} from 'zod'
import Forgot from "./components/Forget";
import Template from "./components/Template";

export default function Login() {

  const [form, setForm] = useState<LogFormData>({
    email: "",
    password: ""
  });
  const [error, setError] = useState<Partial<LogFormData>>({});
  const [loading,setLoading] = useState(false);
  const [open,setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setError(pre => ({...pre,[e.target.name]:null}));
  };

  const handleSubmit = async (e:React.SubmitEvent) => {
    e.preventDefault();

    const result = logSchema.safeParse(form);

    if(!result.success){
      const errorObj:Partial<LogFormData> = {}

      result.error.issues.forEach(err=>{
        const field = err.path[0] as keyof LogFormData
        errorObj[field] = err.message
      });
      setError(errorObj);
      return;
    }
    
    try{
      setLoading(true);
      await api.post("/auth/login",form);
      dispatch(checkAuth());
      navigate('/profile');
      
    }catch(error){
      if(axios.isAxiosError(error)){  
        if(error.response?.status === 401){
          setError({email:"Invalid email or password!"});
        }
      }
    }finally{
      setLoading(false);
    }
  }

  const handleForget = async () => {
    const emailSchema = z.string().min(1,"Email Required!").email("Enter a valid email!");
    const result = emailSchema.safeParse(form.email);
    if(!result.success){
      setError({email : result.error.issues[0].message});
      return;
    }
    try{
      const {data} = await api.post("/auth/forgot-password",form);
      if(data.success){
        setOpen(true);
      }
    }catch(error){
      if(axios.isAxiosError(error)){
        switch(error.response?.status){
          case 404 :
            setError({email:"User Not Exist!"});
            break;
          case 400 :
            setError({email : "Enter a valid Email!"});
            break;
          default :
            setError({email : "Something Went Wrong!"});
        }
      }
    }
  }

  const onSuccess = (credentialResponse:CredentialResponse) => {
    handleOauth(credentialResponse,dispatch,navigate);
  }

  const inputArray: LoginInput[] = [
    { name: "email", label: "Email Address", type: "email" },
    { name: "password", label: "Password", type: "password" }
  ];

  return (
    <div className="flex h-[520px] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {
          open ? (<Forgot setOpen={setOpen} sendOtp={handleForget} form={form}/>) :
          (
            <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
              <div className="mb-6 md:hidden">
                <h1 className="text-2xl font-bold text-gray-800">Login Now</h1>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {inputArray.map((v, i) => (
                  <Input
                    key={i}
                    error={error[v.name] || null}
                    label={v.label}
                    name={v.name}
                    onChange={handleChange}
                    value={form[v.name]}
                    type={v.type}
                  />
                ))}

                <div className="flex items-center justify-between text-sm px-1">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 accent-[#145537] cursor-pointer" 
                    />
                    <span>Remember me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={handleForget}
                    className="font-medium text-[#145537] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-[#145537] py-3 font-semibold text-white transition hover:bg-[#0d3e27] cursor-pointer active:scale-95"
                >
                  {loading?(<ButtonSpinner/>):"Sign in"}
                </button>
              </form>

              <div className="relative my-6 text-center">
                <hr className="border-gray-200" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-medium text-gray-400">
                  OR
                </span>
              </div>

              <GoogleLogin shape="pill" onSuccess={onSuccess} onError={()=>console.log("Login failed")} />

              <div className="mt-6 text-sm text-gray-500 flex justify-center items-center gap-1">
                <div>Don't have an account?</div>
                <button onClick={()=>navigate('/register')} className="font-bold cursor-pointer text-[#145537] hover:underline">Sign up</button>
              </div>
            </div>
          )
        }

        {
          open ? (
            <Template h1="SkillShare Hub" h2="Reset Password" p="Reset Password and continue your learning journey." />
          ) : (
            <Template h1="SkillShare Hub" h2="Welcome Back" p="Sign in to continue your learning journey." />
          )
        }

      </div>
  );
}