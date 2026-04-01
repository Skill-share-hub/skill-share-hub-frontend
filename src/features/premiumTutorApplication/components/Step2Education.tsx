import   type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { ApplicationFormData } from "../validations/applicationSchema";
import { motion } from "framer-motion";

interface StepProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
}

const Step2Education = ({ register, errors }: StepProps) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1">Highest Degree</label>
          <select
            {...register("highestDegree")}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800 appearance-none"
          >
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">Ph.D. / Doctorate</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1">Graduation Year</label>
          <input
            type="number"
            {...register("graduationYear")}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1">Field of Study</label>
          <input
            {...register("fieldOfStudy")}
            placeholder="e.g. Computer Science"
            className={`w-full bg-gray-50 border ${errors.fieldOfStudy ? 'border-red-400' : 'border-gray-200'} rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800`}
          />
          {errors.fieldOfStudy && <p className="text-xs text-red-500 ml-1">{errors.fieldOfStudy.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 block ml-1">Institution</label>
          <input
            {...register("institution")}
            placeholder="e.g. Oxford University"
            className={`w-full bg-gray-50 border ${errors.institution ? 'border-red-400' : 'border-gray-200'} rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800`}
          />
          {errors.institution && <p className="text-xs text-red-500 ml-1">{errors.institution.message}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default Step2Education;
