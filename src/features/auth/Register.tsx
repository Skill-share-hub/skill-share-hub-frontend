import { useState } from "react";
import Input from "./components/Input";
import { useNavigate } from "react-router";
import api from "../../shared/services/axios";
import axios from "axios";
import { useAppDispatch } from "../../shared/hooks/redux";
import { checkAuth } from "../profile/userSlice";
import ButtonSpinner from "../../shared/components/ButtonSpinner";
import type {RegisterError,RegisterInput} from './types/authTypes'

export default function Register() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    confPassword: "",
  });
  const [error, setError] = useState<RegisterError>({});
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validate = () => {
    const errorObj: RegisterError = {};
    const { email, password, confPassword } = form;

    if (!email) {
      errorObj.email = "Email is required.";
    } else if (!email.includes("@")) {
      errorObj.email = "Enter a valid email.";
    }

    if (!password) {
      errorObj.password = "Password is required.";
    } else if (password.trim().length < 8) {
      errorObj.password = "At least 8 characters.";
    }

    if (!confPassword) {
      errorObj.confPassword = "Confirm your password.";
    } else if (confPassword !== password) {
      errorObj.confPassword = "Passwords do not match.";
    }

    setError(errorObj);
    return Object.keys(errorObj).length !== 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setError(pre => ({...pre,[e.target.name]:null}));
  };

  const handleSubmit = async (e:React.SubmitEvent) => {
    e.preventDefault();
    if(validate())return;
    try{
      setLoading(true);
      await api.post("/auth/register",form);
      dispatch(checkAuth());
      navigate('/login');
    }catch(error){
      if(axios.isAxiosError(error)){
        const errorObj:RegisterError = {}
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

  const inputArray: RegisterInput[] = [
    { name: "email", label: "Email Address", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confPassword", label: "Confirm Password", type: "text" },
  ];

  return (
    <div className="flex h-[520px] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        <div className="hidden w-1/2 flex-col justify-center bg-[#145537] p-12 text-white md:flex">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-xl font-bold text-[#145537]">
              S
            </div>
            <div className="text-2xl font-bold">SkillShare Hub</div>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight">
            Create Account
          </h1>
          <p className="text-lg text-blue-100">
            Start your learning journey today with our global community.
          </p>
        </div>

        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 lg:p-12">
          <div className="mb-6 md:hidden">
            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
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
            
            <button
              type="submit"
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

          <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 active:scale-95">
            <img src="/googleLogo.png" className="h-5 w-5" alt="G" />
            Continue with Google
          </button>

          <div className="mt-6 text-sm text-gray-500 flex justify-center items-center gap-1">
            <div>Already have an account?</div>
            <button onClick={()=>navigate('/login')} className="font-bold cursor-pointer text-[#145537] hover:underline">Sign in</button>
          </div>
        </div>
      </div>
  );
}