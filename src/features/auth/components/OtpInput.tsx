import { useEffect, useRef } from "react";
import {z} from 'zod'

export default function OtpInput(
  {otp,setOtp}:
  {otp:string[],setOtp:(otp:string[])=>void}
){

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  
  const handleChange = (value: string, index: number) => {
    const otpSchema = z.string().min(1).max(1).regex(/[0-9]/);
    const result = otpSchema.safeParse(value);
    
    if (!result.success) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleBack = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRef.current[index - 1]?.focus();
        newOtp[index-1] = ""
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasteData = e.clipboardData.getData("text");
    const digits = pasteData.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 0) return;

    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    const lastIndex = digits.length;
    inputRef.current[lastIndex]?.focus();
  };

  useEffect(()=>{
    inputRef.current[0]?.focus();
  },[]);

  return (
    <div className="flex gap-2 sm:gap-3 mb-6">
      {otp.map((v, i) => (
        <input
          key={i}
          ref={(e) => { inputRef.current[i] = e; }}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleBack(e, i)}
          onPaste={handlePaste}
          value={v}
          type="text"
          maxLength={1}
          className="w-10 h-12 sm:w-12 sm:h-14 text-xl font-bold text-center border border-gray-300 rounded-lg focus:border-[#134e4a] focus:ring-1 focus:ring-[#134e4a] focus:outline-none transition-all text-gray-800"
        />
      ))}
    </div>
  )
}