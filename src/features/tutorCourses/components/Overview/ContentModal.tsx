import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, type SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Film, Clock, Plus, Trash2, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import type { ContentModules } from "../../../content/content.types";

// ─── Schema ──────────────────────────────────────────────────────────────────
const quizQuestionSchema = z.object({
  question: z.string().min(4, "Question must be at least 4 characters").max(200),
  options: z
    .array(z.object({ value: z.string().min(1, "Option cannot be empty") }))
    .min(2, "At least 2 options required")
    .max(4, "Maximum 4 options"),
  answer: z.string().min(1, "Please select the correct answer"),
});

const contentSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  summary: z.string().min(20, "Summary must be at least 20 characters").max(500, "Summary is too long"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  quizData: z.array(quizQuestionSchema),
});

type ContentFormValues = z.infer<typeof contentSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const makeDefaultQuestion = () => ({
  question: "",
  options: [{ value: "" }, { value: "" }],
  answer: "",
});

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: Partial<ContentModules> | null;
  isSubmitting: boolean;
}

// ─── Single Question Card ─────────────────────────────────────────────────────
function QuestionCard({
  qIndex,
  control,
  register,
  errors,
  remove,
  totalQuestions,
}: {
  qIndex: number;
  control: any;
  register: any;
  errors: any;
  remove: (i: number) => void;
  totalQuestions: number;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const { fields: optFields, append: appendOpt, remove: removeOpt } = useFieldArray({
    control,
    name: `quizData.${qIndex}.options`,
  });

  const watchedOptions = useWatch({ control, name: `quizData.${qIndex}.options` }) as { value: string }[] | undefined;
  const qErrors = errors?.quizData?.[qIndex];

  return (
    <div className="rounded-2xl border border-green-100 bg-white overflow-hidden shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#166534]/5">
        <span className="text-sm font-bold text-[#166534]">Question {qIndex + 1}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="p-1 rounded-lg hover:bg-[#166534]/10 transition-colors text-[#166534]"
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          {totalQuestions > 1 && (
            <button
              type="button"
              onClick={() => remove(qIndex)}
              className="p-1 rounded-lg hover:bg-red-50 transition-colors text-red-500"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Card Body */}
      {!collapsed && (
        <div className="p-4 space-y-4">
          {/* Question Text */}
          <div>
            <label className="block text-xs font-bold text-[#166534] mb-1.5 uppercase tracking-wider">
              Question
            </label>
            <textarea
              {...register(`quizData.${qIndex}.question`)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-green-100 focus:ring-2 focus:ring-[#166534] outline-none transition-all resize-none bg-white font-medium text-sm"
              placeholder="Enter the quiz question..."
            />
            {qErrors?.question && (
              <p className="mt-1 text-xs text-red-500">{qErrors.question.message}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#166534] uppercase tracking-wider">
                Answer Options
              </label>
              {optFields.length < 4 && (
                <button
                  type="button"
                  onClick={() => appendOpt({ value: "" })}
                  className="text-[10px] font-bold bg-[#166534] text-white px-2 py-1 rounded-lg hover:bg-[#14532D] transition-colors flex items-center gap-1"
                >
                  <Plus size={10} /> Add Option
                </button>
              )}
            </div>

            {optFields.map((optField, oIdx) => (
              <div key={optField.id} className="flex gap-2">
                <input
                  {...register(`quizData.${qIndex}.options.${oIdx}.value`)}
                  className="flex-1 px-4 py-2 rounded-lg border border-green-100 focus:ring-2 focus:ring-[#166534] outline-none transition-all bg-white text-sm"
                  placeholder={`Option ${oIdx + 1}`}
                />
                {optFields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOpt(oIdx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            {qErrors?.options && (
              <p className="mt-1 text-xs text-red-500">
                {typeof qErrors.options.message === "string"
                  ? qErrors.options.message
                  : "Please fill in all options"}
              </p>
            )}
          </div>

          {/* Correct Answer */}
          <div>
            <label className="block text-xs font-bold text-[#166534] mb-1.5 uppercase tracking-wider">
              Correct Answer
            </label>
            <select
              {...register(`quizData.${qIndex}.answer`)}
              className="w-full px-4 py-3 rounded-xl border border-green-100 focus:ring-2 focus:ring-[#166534] outline-none transition-all bg-white font-medium text-sm"
            >
              <option value="">Select the correct option</option>
              {watchedOptions?.map((opt, idx) =>
                opt.value ? (
                  <option key={idx} value={opt.value}>
                    {opt.value}
                  </option>
                ) : null
              )}
            </select>
            {qErrors?.answer && (
              <p className="mt-1 text-xs text-red-500">{qErrors.answer.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function ContentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: ContentModalProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    initialData?.thumbnailUrl || null
  );

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
      duration: initialData?.duration || 0,
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
        duration: initialData.duration || 0,
        quizData: existingQuiz,
      });
      setThumbnailPreview(initialData.thumbnailUrl || null);
    } else {
      reset({ title: "", summary: "", duration: 0, quizData: [] });
      setVideoFile(null);
      setThumbnailFile(null);
      setVideoPreview(null);
      setThumbnailPreview(null);
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
    formData.append("duration", String(data.duration));

    if (hasQuiz) {
      const quizPayload = data.quizData.map((q) => ({
        question: q.question,
        options: q.options.map((o) => o.value),
        answer: q.answer,
      }));
      formData.append("quizData", JSON.stringify(quizPayload));
    }

    if (videoFile) formData.append("contentUrl", videoFile);
    if (thumbnailFile) formData.append("thumbnailUrl", thumbnailFile);
    onSubmit(formData);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(file.name);
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
                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Clock size={16} /> Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...register("duration", { valueAsNumber: true })}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.duration ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#166534] outline-none transition-all`}
                  />
                  {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Film size={16} /> Video Content
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
                  className="flex-[2] py-3 px-4 rounded-xl bg-[#166534] text-white text-sm font-bold hover:bg-[#14532D] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-green-900/10"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    initialData ? "Update Content" : "Add Content"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
