import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { updateFields, nextStep, prevStep } from "../../slice/courseCreationSlice"
import type { RootState } from "../../../../store/store"

const categorySchema = z.object({
    category: z.string().min(1, "Please select a category"),
    courseType: z.enum(["paid", "credit"]),
})

type CategoryFormValues = z.infer<typeof categorySchema>

export default function CourseCategoryStep() {
    const dispatch = useDispatch()
    const course = useSelector((state: RootState) => state.courseBuilder)
    const user = useSelector((state: RootState) => state.user.user)
    const isPremiumTutor = user?.role === "premiumTutor"

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            category: course.category || "",
            courseType: (course.courseType as "paid" | "credit") || "credit", // Default to credit since it's the free tier
        },
    })

    // Keep form in sync with Redux if needed, or just initialize from it
    useEffect(() => {
        setValue("category", course.category || "")
        // Overwrite to credit if not premium tutor and paid was selected somehow
        if (!isPremiumTutor && course.courseType === "paid") {
            setValue("courseType", "credit")
        } else if (course.courseType === "paid" || course.courseType === "credit") {
            setValue("courseType", course.courseType)
        }
    }, [course, setValue, isPremiumTutor])

    const onSubmit = (data: CategoryFormValues) => {
        dispatch(updateFields(data))
        dispatch(nextStep())
    }

    const handleBack = () => {
        const currentValues = watch()
        dispatch(updateFields(currentValues)) // Save progress before going back
        dispatch(prevStep())
    }

    const selectedType = watch("courseType")

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Course Classification</h2>
                <p className="text-gray-500">Help students find your course by choosing the right category and pricing model.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Course Type */}
                <div className="mb-10">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Course Type
                    </label>
                    <p className="text-sm text-gray-500 mb-4">
                        Choose how you want to monetize your content and reward your students.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Paid Access Card */}
                        <div className="group relative w-full">
                            <div
                                className={`relative flex rounded-xl border-2 p-5 h-full ${!isPremiumTutor ? "border-gray-100 bg-gray-50 cursor-not-allowed opacity-70" :
                                    selectedType === "paid"
                                        ? "border-green-700 bg-green-50/30 cursor-pointer"
                                        : "border-gray-100 hover:border-green-200 bg-white cursor-pointer"
                                    } transition-all duration-200`}
                                onClick={() => isPremiumTutor && setValue("courseType", "paid")}
                            >
                                <div className="flex w-full items-start justify-between">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <div className="flex items-center space-x-2">
                                                <svg className={`h-5 w-5 ${!isPremiumTutor ? "text-gray-400" : "text-green-700"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <p className="font-semibold text-gray-900">Paid Access {!isPremiumTutor && "🔒"}</p>
                                            </div>
                                            <p className="mt-2 text-gray-500 line-clamp-2">
                                                Standard one-time purchase or subscription model for learners.
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`mt-1 shrink-0 flex h-5 w-5 items-center justify-center rounded-full border ${selectedType === "paid" ? "border-green-700" : "border-gray-300"}`}>
                                        {selectedType === "paid" && <div className="h-2.5 w-2.5 rounded-full bg-green-700" />}
                                    </div>
                                </div>
                            </div>

                            {!isPremiumTutor && (
                                <div className="absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-4 py-2 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                                    Available after you become a Pro Tutor.
                                    <div className="absolute top-full left-1/2 -mt-1 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                            )}
                        </div>

                        {/* Credit-based Card */}
                        <div
                            className={`relative flex cursor-pointer rounded-xl border-2 p-5 ${selectedType === "credit"
                                ? "border-green-700 bg-green-50/30"
                                : "border-gray-100 hover:border-green-200 bg-white"
                                } transition-all duration-200`}
                            onClick={() => setValue("courseType", "credit")}
                        >
                            <div className="flex w-full items-start justify-between">
                                <div className="flex items-center">
                                    <div className="text-sm">
                                        <div className="flex items-center space-x-2">
                                            <svg className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                            <p className="font-semibold text-gray-900">Credit-based</p>
                                        </div>
                                        <p className="mt-2 text-gray-500 line-clamp-2">
                                            Allow students to unlock content using earned platform credits.
                                        </p>
                                    </div>
                                </div>
                                <div className={`mt-1 shrink-0 flex h-5 w-5 items-center justify-center rounded-full border ${selectedType === "credit" ? "border-green-700" : "border-gray-300"}`}>
                                    {selectedType === "credit" && <div className="h-2.5 w-2.5 rounded-full bg-green-700" />}
                                </div>
                            </div>
                        </div>
                    </div>
                    {errors.courseType && <p className="mt-1 text-sm text-red-500">{errors.courseType.message}</p>}
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Basics
                    </button>

                    <button
                        type="submit"
                        className="flex items-center px-6 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-lg text-sm font-medium transition-colors"
                    >
                        Save & Continue
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}