import { ArrowLeft } from "lucide-react";
import type { RegFormData } from "../validations";
import { useEffect, useState } from "react";
import { z } from 'zod';
import ButtonSpinner from "../../../shared/components/ButtonSpinner";
import api from "../../../shared/services/axios";
import { checkAuth } from "../../profile/userSlice";
import { useAppDispatch } from "../../../shared/hooks/redux";
import axios from "axios";
import OtpInput from "./OtpInput";
import { useNavigate } from "react-router-dom";

export default function OtpForm(
  { setOpen, form , handleOtp }: 
  { setOpen: (open: boolean) => void, form: RegFormData , handleOtp:()=>void }
) {
  const [time, setTime] = useState(30);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState<string | null>(null);

  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();

  const handleRegister = async () => {
    const otpSchema = z.string().length(6).regex(/[0-9]/);
    const result = otpSchema.safeParse(otp.join(''));
    if(!result.success){
      setError("Enter a valid OTP!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", { ...form, otp: otp.join("") });
      dispatch(checkAuth(()=>{navigate('/profile')}));
    } catch (error) {
      if(axios.isAxiosError(error)){
        switch(error.response?.status){
          case 401 :
            setError("Invalid OTP!");
            break;
          case 404 :
            setError("OTP Expired!");
            break;
          case 409 :
            setError("User Already Exist!");
            break;
          case 400 :
            setError("Wrong Inputs");
            break;
          default :
            setError("Something Went Wrong!");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!time) return;
    const timer = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="w-full max-w-lg md:max-w-1/2 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
      
      <div className="p-6 pb-0">
        <button 
          onClick={() => setOpen(false)}
          className="flex gap-1 cursor-pointer items-center text-gray-500 hover:text-[#134e4a]"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="px-10 py-12 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify Email</h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          We've sent a 6-digit code to <span className="font-semibold text-gray-700">{form.email}</span>. 
          Enter it below to complete your registration.
        </p>

        <OtpInput otp={otp} setOtp={setOtp} />

        {
          error ? (
            <div className="flex mb-4 items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-md w-fit animate-in fade-in zoom-in duration-200">
              <span className="text-xs font-semibold">{error}</span>
            </div>
          ):null
        }

        <div className="w-full space-y-4">
          <button
            onClick={handleRegister}
            disabled={loading || otp.includes("")}
            className="w-full py-3 cursor-pointer bg-[#134e4a] hover:bg-[#0f3d3a] text-white rounded-lg font-bold text-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-md"
          >
            {loading ? <ButtonSpinner /> : "Create Account"}
          </button>

          <div className="text-center">
            <span className="text-gray-500 text-sm">Didn't receive the code? </span>
            <button
              type="button"
              onClick={()=>{
                handleOtp()
                setTime(30);
              }}
              disabled={time > 0}
              className={`text-sm font-bold transition-colors cursor-pointer ${
                  time > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#134e4a] hover:underline'
              }`}
            >
              Resend Code 
            </button>
            {
              time ? (
                  <div className={`text-gray-500 text-sm`}>
                    (00:{time.toString().padStart(2, '0')})
                  </div>
               )  : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}