import { useEffect, useState } from "react";
import { logSchema, type LogFormData } from "../validations";
import OtpInput from "./OtpInput";
import Input from "../../../shared/components/Input";
import { z } from "zod";
import api from "../../../shared/services/axios";
import ButtonSpinner from "../../../shared/components/ButtonSpinner";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const forgotSchema = logSchema.extend({
  otp: z
    .string()
    .length(6, "Enter a valid OTP")
    .regex(/[0-9]/)
})

export default function Forgot({
  form,
  sendOtp,
  setOpen,
}: {
  form: LogFormData;
  sendOtp: () => void;
  setOpen: (e: boolean) => void;
}) {
  const [time, setTime] = useState(30);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [password, setPasswrd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForget = async () => {
    const payload = { otp: otp.join(""), password , email:form.email };

    const result = forgotSchema.safeParse(payload);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      const { data } = await api.post("/auth/reset-password", payload);
      if (data.success) {
        setOpen(false);
      }
    } catch (err) {
      if(axios.isAxiosError(err)){
        switch(err.response?.status){
          case 401 : 
           setError("Invalid OTP");
           break;
          case 404 :
           setError("OTP Expired!");
           break;
          
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!time) return;
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="flex flex-col gap-5 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
      <button
        onClick={() => setOpen(false)}
        className="flex items-center cursor-pointer gap-1 text-gray-400 hover:text-[#145537]"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Sign in</span>
      </button>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Enter the code sent to <span className="font-semibold text-gray-700">{form.email}</span> to reset your password.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <label className="text-sm font-medium text-gray-700 mb-2">Verification Code</label>
        <OtpInput otp={otp} setOtp={setOtp} />
        
        <div>
          {time ? (
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 rounded">
              Resend in 00:{time.toString().padStart(2, "0")}
            </span>
          ) : (
            <button
              onClick={() => {
                sendOtp();
                setTime(30);
              }}
              className="text-xs font-bold text-[#145537] cursor-pointer hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

      </div>

      <div className="space-y-3">
        <Input
          error={error}
          label="New Password"
          name="password"
          onChange={(e) => setPasswrd(e.target.value)}
          type="password"
          value={password}
        />

        <button
          onClick={handleForget}
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-[#145537] py-3.5 font-bold text-white transition-all hover:bg-[#0d3e27] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-green-900/10"
        >
          {loading ? <ButtonSpinner /> : "Reset Password"}
        </button>
      </div>

    </div>
  );
}