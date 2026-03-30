import{ Controller, type Control, type FieldErrors, type UseFormRegister, type UseFormWatch } from "react-hook-form";
import type{ ApplicationFormData } from "../validations/applicationSchema";
import { motion } from "framer-motion";
import TagInput from "./TagInput";

interface StepProps {
  control: Control<ApplicationFormData>;
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
}

const Step3Experience = ({ control, register, errors, watch }: StepProps) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="subjectsTaught"
          control={control}
          render={({ field }) => (
            <TagInput
              label="Subjects to Teach"
              placeholder="e.g. React, Math..."
              values={field.value}
              onChange={field.onChange}
              error={errors.subjectsTaught?.message}
            />
          )}
        />
        <Controller
          name="teachingLanguages"
          control={control}
          render={({ field }) => (
            <TagInput
              label="Languages"
              placeholder="e.g. English, French..."
              values={field.value}
              onChange={field.onChange}
              error={errors.teachingLanguages?.message}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 block ml-1">Total Years of Experience</label>
        <input
          type="number"
          {...register("yearsOfExperience")}
          className="w-32 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800"
        />
        {errors.yearsOfExperience && <p className="text-xs text-red-500 ml-1">{errors.yearsOfExperience.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 block ml-1">Your Teaching Journey</label>
        <textarea
          {...register("experience")}
          rows={4}
          placeholder="Tell us about your background, previous students, achievements, and why you want to be a premium tutor..."
          className={`w-full bg-gray-50 border ${errors.experience ? 'border-red-400' : 'border-gray-200'} rounded-2xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all text-gray-800 resize-none`}
        />
        <div className="flex justify-between items-center px-1">
          {errors.experience ? <p className="text-xs text-red-500">{errors.experience.message}</p> : <div />}
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            Min 100 chars • {watch("experience")?.length || 0}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Step3Experience;
