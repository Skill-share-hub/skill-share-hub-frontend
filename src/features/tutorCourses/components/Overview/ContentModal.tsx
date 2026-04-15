import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Film, Plus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import type { ContentModules } from "../../../content/content.types";
import { QuestionCard } from "./QuestionCard";
import { contentSchema, makeDefaultQuestion, type ContentFormValues } from "./contentModal.schema";

 

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: Partial<ContentModules> | null;
  isSubmitting: boolean;
  uploadProgress?: number;
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function ContentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
  uploadProgress,
}: ContentModalProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnailUrl || (initialData as any)?.thumbnail || null
  );
  const [videoDuration, setVideoDuration] = useState<number>(initialData?.duration || 0);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: initialData?.title || "",
      summary: initialData?.summary || "",
      quizData: [],
    },
  });


  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: "quizData",
  });

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      const existingQuiz = Array.isArray((initialData as any).quizData)
        ? (initialData as any).quizData.map((q: any) => ({
            question: q.question || "",
            options: Array.isArray(q.options)
              ? q.options.map((o: string) => ({ value: o }))
              : [{ value: "" }, { value: "" }],
            answer: q.answer || "",
          }))
        : [];

      reset({
        title: initialData.title || "",
        summary: initialData.summary || "",
        quizData: existingQuiz,
      });
      setThumbnailPreview(initialData.thumbnailUrl || (initialData as any)?.thumbnail || null);
      setVideoDuration(initialData.duration || 0);
    } else {
      reset({ title: "", summary: "", quizData: [] });
      setVideoFile(null);
      setThumbnailFile(null);
      setVideoPreview(null);
      setThumbnailPreview(null);
      setVideoDuration(0);
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit: SubmitHandler<ContentFormValues> = (data) => {
    const hasQuiz = data.quizData.length > 0;

    if (!initialData && !videoFile && !hasQuiz) {
      toast.error("Please upload a video file or add at least one quiz question");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("duration", String(videoDuration));

    if (hasQuiz) {
      const quizPayload = data.quizData.map((q) => ({
        question: q.question,
        options: q.options.map((o) => o.value),
        answer: q.answer,
      }));
      formData.append("quizData", JSON.stringify(quizPayload));
    }

    if (videoFile) {
      formData.append("contentUrl", videoFile);
    } else if (initialData) {
      const storedUrl = (initialData as any).url || initialData.contentUrl;
      if (storedUrl) formData.append("contentUrl", storedUrl);
    }

    if (thumbnailFile) formData.append("thumbnailUrl", thumbnailFile);
    onSubmit(formData);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(file.name);

      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const durationInMinutes = Math.ceil(video.duration / 60);
        setVideoDuration(durationInMinutes > 0 ? durationInMinutes : 1);
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {initialData ? "Edit Content" : "Add New Content"}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content Title</label>
                <input
                  {...register("title")}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.title ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#166534] outline-none transition-all`}
                  placeholder="e.g. Introduction to React Basics"
                />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Summary</label>
                <textarea
                  {...register("summary")}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.summary ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#166534] outline-none transition-all resize-none`}
                  placeholder="What will students learn in this module?"
                />
                {errors.summary && <p className="mt-1 text-xs text-red-500">{errors.summary.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video Upload */}
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Film size={16} /> Video Content {videoDuration > 0 && <span className="text-xs font-normal text-gray-400">({videoDuration} min)</span>}
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 flex items-center justify-center gap-3 bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Upload size={18} className="text-[#166534]" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 truncate max-w-[150px]">
                        {videoPreview || "Upload Video"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image</label>
                <div className="flex gap-4 items-center">
                  <div className="w-32 h-20 rounded-xl bg-gray-100 border border-gray-100 overflow-hidden flex-shrink-0">
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <Film size={24} className="text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      <p className="text-xs font-bold text-gray-900">Click to upload thumbnail</p>
                      <p className="text-[10px] text-gray-400 mt-1">Aspect ratio 16:9 recommended</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Quiz Section ── */}
              <div className="p-5 bg-[#166534]/5 rounded-3xl border border-green-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#166534]">
                    <HelpCircle size={20} />
                    <h3 className="font-bold">
                      Quiz Questions{" "}
                      {questionFields.length > 0 && (
                        <span className="ml-1 text-xs bg-[#166534] text-white px-2 py-0.5 rounded-full">
                          {questionFields.length}
                        </span>
                      )}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendQuestion(makeDefaultQuestion())}
                    className="text-xs font-bold bg-[#166534] text-white px-3 py-1.5 rounded-xl hover:bg-[#14532D] transition-colors flex items-center gap-1.5"
                  >
                    <Plus size={12} /> Add Question
                  </button>
                </div>

                {questionFields.length === 0 ? (
                  <div className="text-center py-6 text-gray-400">
                    <HelpCircle size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No quiz questions added yet.</p>
                    <p className="text-xs mt-1">Click "Add Question" to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {questionFields.map((field, qIndex) => (
                      <QuestionCard
                        key={field.id}
                        qIndex={qIndex}
                        control={control}
                        register={register}
                        errors={errors}
                        remove={removeQuestion}
                        totalQuestions={questionFields.length}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden flex-[2] py-3 px-4 rounded-xl bg-[#166534] text-white text-sm font-bold hover:bg-[#14532D] transition-all disabled:opacity-80 flex items-center justify-center gap-2 shadow-lg shadow-green-900/10"
                >
                  {isSubmitting && uploadProgress !== undefined && uploadProgress > 0 && uploadProgress < 100 && (
                    <div 
                      className="absolute inset-0 bg-[#064e3b] transition-all duration-300 ease-out" 
                      style={{ width: `${uploadProgress}%` }} 
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        {uploadProgress === 100 ? "Processing..." : (uploadProgress && uploadProgress > 0) ? `Uploading ${Math.round(uploadProgress)}%` : (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                          </>
                        )}
                      </>
                    ) : (
                      initialData ? "Update Content" : "Add Content"
                    )}
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
