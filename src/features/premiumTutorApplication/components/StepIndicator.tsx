import { User, GraduationCap, Briefcase, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center justify-between mb-8 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-green-500 -translate-y-1/2 z-0 transition-all duration-500" 
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      />
      
      {[1, 2, 3, 4].map((step) => {
        const Icon = [User, GraduationCap, Briefcase, FileCheck][step - 1];
        const isActive = step <= currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <motion.div
              animate={{
                scale: isCurrent ? 1.2 : 1,
                backgroundColor: isActive ? "#22c55e" : "#fff",
                color: isActive ? "#fff" : "#9ca3af",
                borderColor: isActive ? "#22c55e" : "#e5e7eb",
              }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-sm transition-colors duration-300`}
            >
              <Icon size={18} />
            </motion.div>
            <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${isActive ? "text-green-600" : "text-gray-400"}`}>
              Step {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
