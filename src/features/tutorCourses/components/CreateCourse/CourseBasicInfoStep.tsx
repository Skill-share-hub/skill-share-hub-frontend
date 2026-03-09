import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { RootState } from "../../../../store/store"
import { updateFields, nextStep } from "../../slice/courseCreationSlice"

const basicInfoSchema = z.object({
    title: z.string()
        .min(5, "Title must be at least 5 characters")
        .max(80, "Title cannot exceed 80 characters"),
    description: z.string()
        .min(20, "Description must be at least 20 characters")
        .max(500, "Description cannot exceed 500 characters"),
    category: z.string().min(1, "Please select a category"),
    courseLevel: z.enum(["beginner", "intermediate", "expert"]),
    courseSkills: z.array(z.string()).min(1, "At least one skill is required").max(10, "Maximum 10 skills allowed"),
})

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>

export default function CourseBasicInfoStep() {
    const dispatch = useDispatch()
    const course = useSelector((state: RootState) => state.courseBuilder)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<BasicInfoFormValues>({
        resolver: zodResolver(basicInfoSchema),
        defaultValues: {
            title: course.title || "",
            description: course.description || "",
            category: course.category || "",
            courseLevel: (course.courseLevel as any) || "beginner",
            courseSkills: course.courseSkills || [],
        },
    })

    useEffect(() => {
        setValue("title", course.title || "")
        setValue("description", course.description || "")
        setValue("category", course.category || "Development")
        if (["beginner", "intermediate", "expert"].includes(course.courseLevel)) {
            setValue("courseLevel", course.courseLevel as any)
        }
        setValue("courseSkills", course.courseSkills || [])
    }, [course, setValue])

    const onSubmit = (data: BasicInfoFormValues) => {
        dispatch(updateFields(data))
        dispatch(nextStep())
    }

    const titleValue = watch("title") || ""
    const descriptionValue = watch("description") || ""
    const courseLevelValue = watch("courseLevel")
    const courseSkillsValue = watch("courseSkills") || []

    const [skillInput, setSkillInput] = useState("")

    const addSkill = () => {
        if (skillInput.trim() && courseSkillsValue.length < 10 && !courseSkillsValue.includes(skillInput.trim())) {
            setValue("courseSkills", [...courseSkillsValue, skillInput.trim()], { shouldValidate: true })
            setSkillInput("")
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setValue("courseSkills", courseSkillsValue.filter(s => s !== skillToRemove), { shouldValidate: true })
    }

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Basic Course Information</h2>
                <p className="text-gray-500 text-sm text-center">Let's start with the fundamentals. This information will appear on your course landing page.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Course Title</label>
                        <span className="text-xs text-gray-400 font-medium">{titleValue.length} / 80</span>
                    </div>
                    <input
                        {...register("title")}
                        placeholder="e.g. Mastering Modern UI Design Systems"
                        className={`w-full border ${errors.title ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow`}
                        maxLength={80}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                    <p className="mt-2 text-xs text-gray-500 italic">A catchy title helps your course stand out in the marketplace.</p>
                </div>

                {/* Description */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900">Course Description</label>
                        <span className="text-xs text-gray-400 font-medium">{descriptionValue.length} / 500</span>
                    </div>
                    <textarea
                        {...register("description")}
                        rows={4}
                        placeholder="Describe what students will learn in this course..."
                        className={`w-full border ${errors.description ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-shadow resize-none`}
                        maxLength={500}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                </div>

                {/* Course Skills */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Key Skills Taught</label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                            placeholder="Add a skill (e.g. React, UX Writing)..."
                            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                        <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {courseSkillsValue.map((skill) => (
                            <span key={skill} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-900 focus:outline-none"
                                >
                                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                    {errors.courseSkills && <p className="mt-2 text-sm text-red-500">{errors.courseSkills.message}</p>}
                </div>

                {/* Category & Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                        <div className="relative">
                            <select
                                {...register("category")}
                                className={`w-full appearance-none border ${errors.category ? "border-red-500" : "border-gray-200"} rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent cursor-pointer`}
                            >
                                <option value="" disabled>Select category</option>
                                <option value="Design & Creative">Design & Creative</option>
                                <option value="Development">Development</option>
                                <option value="Business">Business</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Course Level</label>
                        <div className="flex space-x-2">
                            {["beginner", "intermediate", "expert"].map((level) => (
                                <button
                                    key={level}
                                    type="button"
                                    onClick={() => setValue("courseLevel", level as any, { shouldValidate: true })}
                                    className={`flex-1 py-3 text-sm font-medium rounded-lg border focus:outline-none transition-colors capitalize ${courseLevelValue === level
                                        ? "bg-green-50 border-green-600 text-green-700"
                                        : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                        {errors.courseLevel && <p className="mt-1 text-sm text-red-500">{errors.courseLevel.message}</p>}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Cancel
                    </button>

                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="flex items-center px-6 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            Next Step
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}