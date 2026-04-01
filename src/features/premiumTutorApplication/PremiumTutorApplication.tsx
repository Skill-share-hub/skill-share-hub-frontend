import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Send, Award, Globe } from "lucide-react";
import FullScreenLoader from "../../shared/components/FullScreenLoader";
import StepIndicator from "./components/StepIndicator";
import Step1PersonalInfo from "./components/Step1PersonalInfo";
import Step2Education from "./components/Step2Education";
import Step3Experience from "./components/Step3Experience";
import Step4Documents from "./components/Step4Documents";
import ApplicationStatusView from "./components/ApplicationStatusView";
import { usePremiumApplication } from "./hooks/usePremiumApplication";
import TutorConfirmDialog from "../../shared/components/TutorConfirmDialog";
import { useState } from "react";
import { type SubmitHandler } from "react-hook-form";
import { type ApplicationFormData } from "./validations/applicationSchema";

const Lock = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

const PremiumTutorApplication = () => {
  const {
    form,
    currentStep,
    loading,
    isSubmitting,
    status,
    degreeCert, setDegreeCert,
    idProof, setIdProof,
    expLetter, setExpLetter,
    otherDocs, setOtherDocs,
    fileErrors,
    handleNext,
    handleBack,
    onSubmit,
    handleDeleteAndRestart
  } = usePremiumApplication();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { register, control, handleSubmit, watch, formState: { errors } } = form;

  if (loading) return <FullScreenLoader />;

  if (status) {
    return (
      <>
        <ApplicationStatusView 
          status={status} 
          handleDeleteAndRestart={() => setIsConfirmOpen(true)} 
        />
        <TutorConfirmDialog
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeleteAndRestart}
          title="Restart Application?"
          description="This will permanently delete your previous application and all uploaded documents. You will need to fill out the form again."
          confirmText="Yes, Restart"
          variant="danger"
        />
      </>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 bg-gray-50 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest mb-4">
            <Award size={14} /> Premium Instructor Program
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Elevate Your Teaching
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Apply to become a premium tutor and unlock powerful tools, monetization, and priority support.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />
          
          <div className="relative z-10">
            <StepIndicator currentStep={currentStep} totalSteps={4} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1PersonalInfo key="step1" register={register} errors={errors} />
                )}

                {currentStep === 2 && (
                  <Step2Education key="step2" register={register} errors={errors} />
                )}

                {currentStep === 3 && (
                  <Step3Experience 
                    key="step3" 
                    control={control} 
                    register={register} 
                    errors={errors} 
                    watch={watch} 
                  />
                )}

                {currentStep === 4 && (
                  <Step4Documents 
                    key="step4" 
                    degreeCert={degreeCert}
                    setDegreeCert={setDegreeCert}
                    idProof={idProof}
                    setIdProof={setIdProof}
                    expLetter={expLetter}
                    setExpLetter={setExpLetter}
                    otherDocs={otherDocs}
                    setOtherDocs={setOtherDocs}
                    fileErrors={fileErrors}
                  />
                )}
              </AnimatePresence>

              <div className="flex justify-between gap-4 pt-6 border-t border-gray-100">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all active:scale-95"
                  >
                    <ChevronLeft size={20} /> Back
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto flex items-center gap-2 px-8 py-3 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`ml-auto flex items-center gap-2 px-10 py-3 rounded-2xl ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-black'} text-white font-bold transition-all shadow-xl active:scale-95`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"} <Send size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2"><Lock size={14} /> Secure Submission</div>
          <div className="flex items-center gap-2"><Globe size={14} /> Global Accreditation</div>
          <div className="flex items-center gap-2"><Award size={14} /> Certified Instructor</div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumTutorApplication;
