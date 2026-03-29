import { User, Calendar, ShieldCheck } from "lucide-react";
import type{ UseFormRegister, FieldErrors } from "react-hook-form";
import type{ ApplicationFormData } from "../validations/applicationSchema";
import { motion } from "framer-motion";

interface StepProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
}

const Step1PersonalInfo = ({ register, errors }: StepProps) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1">Full Legal Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              {...register("fullName")}
              placeholder="Mark Anthony"
              className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-400' : 'border-gray-200'} rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800`}
            />
          </div>
          {errors.fullName && <p className="text-xs text-red-500 ml-1">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="date"
              {...register("dateOfBirth")}
              className={`w-full bg-gray-50 border ${errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'} rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800`}
            />
          </div>
          {errors.dateOfBirth && <p className="text-xs text-red-500 ml-1">{errors.dateOfBirth.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 block ml-1">National ID Number (Optional)</label>
        <div className="relative">
          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            {...register("nationalIdNumber")}
            placeholder="e.g. A12345678"
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Step1PersonalInfo;
