import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Film, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contentSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  summary: z.string().min(20, "Summary must be at least 20 characters").max(500, "Summary is too long"),
  duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
});

type ContentFormValues = z.infer<typeof contentSchema>;

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: any;
  isSubmitting: boolean;
}

export default function ContentModal({ isOpen, onClose, onSubmit, initialData, isSubmitting }: ContentModalProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnail || null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      summary: initialData?.summary || "",
      duration: initialData?.duration || 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        summary: initialData.summary,
        duration: initialData.duration,
      });
      setThumbnailPreview(initialData.thumbnail);
    } else {
      reset({ title: "", summary: "", duration: 0 });
      setVideoFile(null);
      setThumbnailFile(null);
      setVideoPreview(null);
      setThumbnailPreview(null);
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = (data: ContentFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("duration", String(data.duration));
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-flex items-center gap-2">
                    <Clock size={16} /> Duration (minutes)
                  </label>
                  <input
                    type="number"
                    {...register("duration")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.duration ? "border-red-500" : "border-gray-200"} focus:ring-2 focus:ring-[#166534] outline-none transition-all`}
                  />
                  {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
                </div>

                {/* Video Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-flex items-center gap-2">
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

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image</label>
                <div className="flex gap-4 items-center">
                  <div className="w-32 h-20 rounded-xl bg-gray-100 border border-gray-100 overflow-hidden flex-shrink-0 relative">
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
