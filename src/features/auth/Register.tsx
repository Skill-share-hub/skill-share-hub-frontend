import { useState } from "react";
import { useNavigate } from "react-router";
import ButtonSpinner from "../../shared/components/ButtonSpinner";
import Input from "../../shared/components/Input";
import type {RegisterInput} from './types'
import { regSchema, type RegFormData } from "./validations";
import api from "../../shared/services/axios";
import axios from "axios";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { handleOauth } from "./service";
import OtpForm from "./components/OtpForm";
import Template from "./components/Template";
import { useAppDispatch } from "../../shared/hooks/redux";

export default function Register() {

  const [form, setForm] = useState<RegFormData>({
    name : "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<Partial <RegFormData>>({});
  const [loading,setLoading] = useState(false);
  const [open,setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setError(pre => ({...pre,[e.target.name]:null}));
  };

  const handleOtp = async () => {

    const result = regSchema.safeParse(form)
    if (!result.success) {
      const errorObj:Partial<RegFormData> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof RegFormData;
        errorObj[field] = err.message;
      });

      setError(errorObj);
      return;
    }

    try{
      setLoading(true);
      const {data} = await api.post("/auth/send-otp",form);
      if(data.success){
        setOpen(true);
      }
    }catch(error){
      if(axios.isAxiosError(error)){
        const errorObj:Partial<RegFormData> = {}
        switch(error.response?.status){
          case 400 : 
           errorObj.email = "Required!"
           errorObj.password = "Required!"
           break;
          case 409 :
            errorObj.email = "User already Exist!"
            break;
        }
        setError(errorObj);
      }
    }finally{
      setLoading(false);
    }
  }

  const onSuccess = (credentialResponse:CredentialResponse) => {
    handleOauth(credentialResponse,dispatch,navigate);
  }

  const inputArray: RegisterInput[] = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "text" },
  ];

  return (
    <div className="flex h-[520px] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {
          open ? (
            <Template h1="SkillShare Hub" h2="Verify Account" p="Start your learning journey today with our global community." />
          ) : (
            <Template h1="SkillShare Hub" h2="Create Account" p="Start your learning journey today with our global community." />
          )
        }

        {
          open ? (
            <OtpForm handleOtp={handleOtp} form={form} setOpen={setOpen}/>
          ) : 
          (
            <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
              <div className="mb-6 md:hidden">
                <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
              </div>

              <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col gap-4">
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
                
                <button
                  type="submit"
                  onClick={handleOtp}
                  className="mt-2 w-full rounded-lg bg-[#145537] py-3 font-semibold text-white transition hover:bg-[#0d3e27] cursor-pointer active:scale-95"
                >
                  {loading?(<ButtonSpinner/>):"Create Account"}
                </button>
              </form>

              <div className="relative my-6 text-center">
                <hr className="border-gray-200" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs font-medium text-gray-400">
                  OR
                </span>
              </div>

              <GoogleLogin shape="pill" onSuccess={onSuccess} onError={()=>console.log("Login failed!")}/>

              <div className="mt-6 text-sm text-gray-500 flex justify-center items-center gap-1">
                <div>Already have an account?</div>
                <button onClick={()=>navigate('/login')} className="font-bold cursor-pointer text-[#145537] hover:underline">Sign in</button>
              </div>
            </div>
          )
        }
    </div>
  );
}