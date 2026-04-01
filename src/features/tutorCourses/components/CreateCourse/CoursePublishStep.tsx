import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { RootState, AppDispatch } from "../../../../store/store"
import { updateFields, prevStep, resetCourse } from "../../slice/courseCreationSlice"
import { submitCourse } from "../../thunk/course.thunk"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import ConfirmDialog from "../../../../shared/components/ConfirmDialog"

const publishSchema = z.object({
    thumbnailUrl: z.string().optional(),
    status: z.enum(["draft", "pending", "published"]),
})

type PublishFormValues = z.infer<typeof publishSchema>

export default function CoursePublishStep() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const course = useSelector((state: RootState) => state.courseBuilder)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previewImage, setPreviewImage] = useState<string | null>(course.thumbnailUrl || null)
    const { formState: { isDirty } } = useForm<PublishFormValues>();
    const {
        handleSubmit,
        setValue,
        watch,
    } = useForm<PublishFormValues>({
        resolver: zodResolver(publishSchema),
        defaultValues: {
            thumbnailUrl: course.thumbnailUrl || "",
            status: (course.status as "draft" | "pending" | "published") || "published",
        },
    })

    useEffect(() => {
        setValue("thumbnailUrl", course.thumbnailUrl || "")
        setPreviewImage(course.thumbnailUrl || null)
    }, [course, setValue])

    const [isSavingDraft, setIsSavingDraft] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const onPublishClick = () => {
        setIsConfirmOpen(true);
    };

    const handleConfirmPublish = () => {
        handleSubmit(onSubmit)();
    };

    const onSubmit = async (data: PublishFormValues) => {
        try {
            setIsPublishing(true)
            dispatch(updateFields({ ...data, status: "pending" }))
            if (!isDirty&&!selectedFile) {
                toast.success("No changes made")
                return
            }
            await dispatch(submitCourse({ statusOverride: "pending", thumbnailFile: selectedFile })).unwrap()

            toast.success(course.id ? "Course updated successfully!" : "Course submitted for review!")
            navigate("/my-courses")
            dispatch(resetCourse())
        } catch (error) {
            console.error("Course publish failed", error)
            toast.error("Course publish failed")

        } finally {
            setIsPublishing(false)
        }
    }

    const handleBack = () => {
        const currentValues = watch()
        dispatch(updateFields(currentValues))
        dispatch(prevStep())
    }

    const handleSaveDraft = async () => {
        try {
            setIsSavingDraft(true)
            const currentValues = watch()
            dispatch(updateFields({ ...currentValues, status: "draft" }))
            if (!isDirty&&!selectedFile) {
                toast.success("No changes made")
                return
            }
            await dispatch(submitCourse({ statusOverride: "draft", thumbnailFile: selectedFile })).unwrap()

            toast.success(course.id ? "Course update saved as draft!" : "Course saved as draft!")
            navigate("/tutor/courses")
            dispatch(resetCourse())
        } catch (error) {
            console.error("Save draft failed", error)
            toast.error("Save draft failed")
        } finally {
            setIsSavingDraft(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Make your course stand out</h2>
                <p className="text-gray-500">Upload a high-quality thumbnail and review your final details before launching your content to the community.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <ConfirmDialog
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={handleConfirmPublish}
                    title="Publish Course"
                    description="Are you sure you want to submit this course for review? Once approved, it will be visible to all students on the platform."
                    confirmText="Publish Now"
                    variant="primary"
                />
                {/* Thumbnails Section */}
                <div className="mb-10">
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                        Course Thumbnail
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Upload Area */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-green-200 bg-[#f8fbf9] rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-colors h-64 relative overflow-hidden"
                        >
                            <input
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                                accept="image/png, image/jpeg, image/svg+xml, image/gif"
                                onChange={handleFileChange}
                            />
                            {previewImage ? (
                                <img src={previewImage} alt="Thumbnail preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                            ) : null}
                            <div className="bg-white p-3 rounded-full shadow-sm mb-4 relative z-10">
                                <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </div>
                            <p className="font-semibold text-gray-900 mb-1 relative z-10">{previewImage ? "Click to change image" : "Click to upload or drag and drop"}</p>
                            <p className="text-xs text-gray-500 relative z-10">SVG, PNG, JPG or GIF (max. 1280×720px)</p>
                        </div>

                        {/* Preview Area */}
                        <div>
                            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center border border-gray-200 shadow-inner overflow-hidden relative">
                                {previewImage ? (
                                    <img src={previewImage} alt="Final Thumbnail view" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center opacity-50">
                                        <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-500">Image Preview</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 flex items-start text-xs text-gray-500">
                                <svg className="w-4 h-4 mr-1 shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p>Thumbnails should be high resolution and represent your course content clearly.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Previous Step
                    </button>

                    <div className="flex space-x-4 items-center">
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            disabled={isSavingDraft || isPublishing}
                            className="text-sm font-medium text-green-700 hover:text-green-800 bg-green-50 px-4 py-2.5 rounded-lg border border-green-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSavingDraft && (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            )}
                            {isSavingDraft ? "Saving..." : "Save as Draft"}
                        </button>
                        <button
                            type="button"
                            disabled={isPublishing || isSavingDraft}
                            onClick={onPublishClick}
                            className="flex items-center px-6 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed gap-2"
                        >
                            {isPublishing && (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            )}
                            {isPublishing ? (course.id ? "Updating..." : "Publishing...") : (course.id ? "Update Course" : "Publish Course")}
                            {!isPublishing && (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
