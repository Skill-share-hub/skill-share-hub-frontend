import { useState, useEffect } from "react";
import { useForm, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../../../shared/hooks/redux";
import { 
  formSchema, type ApplicationFormData 
} from "../validations/applicationSchema";
import { 
  getPremiumApplicationStatus, 
  submitPremiumApplication, 
  deleteRejectedApplication 
} from "../premiumApplicationService";
import type { ApplicationStatusResponse } from "../types";

export const usePremiumApplication = () => {
  const user = useAppSelector(state => state.user.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ApplicationStatusResponse | null>(null);
  
  // Document Files
  const [degreeCert, setDegreeCert] = useState<File | null>(null);
  const [idProof, setIdProof] = useState<File | null>(null);
  const [expLetter, setExpLetter] = useState<File | null>(null);
  const [otherDocs, setOtherDocs] = useState<File | null>(null);
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      fullName: user?.name || "",
      dateOfBirth: "",
      nationalIdNumber: "",
      highestDegree: "bachelor",
      fieldOfStudy: "",
      institution: "",
      graduationYear: new Date().getFullYear(),
      subjectsTaught: [],
      teachingLanguages: ["English"],
      yearsOfExperience: 0,
      experience: "",
    }
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getPremiumApplicationStatus();
        if (res.success && res.data) {
          setStatus(res.data);
        }
      } catch (err) {
        console.error("Error fetching application status", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleNext = async () => {
    const fieldsMap: Record<number, (keyof ApplicationFormData)[]> = {
      1: ["fullName", "dateOfBirth", "nationalIdNumber"],
      2: ["highestDegree", "fieldOfStudy", "institution", "graduationYear"],
      3: ["subjectsTaught", "teachingLanguages", "yearsOfExperience", "experience"],
    };

    const fields = fieldsMap[currentStep as keyof typeof fieldsMap] || [];
    const isValid = await form.trigger(fields);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => setCurrentStep(prev => prev - 1);

  const onSubmit: SubmitHandler<ApplicationFormData> = async (data) => {
    const errors: Record<string, string> = {};
    if (!degreeCert) errors.degreeCert = "Degree certificate is required";
    if (!idProof) errors.idProof = "National ID proof is required";
    
    if (Object.keys(errors).length > 0) {
      setFileErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v));
      } else {
        formData.append(key, String(value));
      }
    });

    formData.append("documents", degreeCert as File);
    formData.append("fileTypes", "degree_certificate");
    formData.append("documents", idProof as File);
    formData.append("fileTypes", "id_proof");

    if (expLetter) {
        formData.append("documents", expLetter as File);
        formData.append("fileTypes", "experience_letter");
    }
    if (otherDocs) {
        formData.append("documents", otherDocs as File);
        formData.append("fileTypes", "other");
    }

    try {
      const res = await submitPremiumApplication(formData);
      if (res.success) {
        toast.success("Application submitted successfully!");
        setStatus(res.data);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAndRestart = async () => {
    if (!status) return;

    try {
      await deleteRejectedApplication(status._id);
      setStatus(null);
      setCurrentStep(1);
    } catch (err) {
      toast.error("Failed to delete application");
    }
  };

  return {
    form: form as UseFormReturn<ApplicationFormData>,
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
    onSubmit: onSubmit as SubmitHandler<ApplicationFormData>,
    handleDeleteAndRestart
  };
};

