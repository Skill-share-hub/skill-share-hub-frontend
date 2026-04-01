import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import type { RootState } from "../../../store/store"
import { resetCourse, setCourse } from "../slice/courseCreationSlice"
import { getCourseByIdApi } from "../api/courses.api"

import CourseStepper from "../components/CreateCourse/CourseStepper"
import CourseBasicInfoStep from "../components/CreateCourse/CourseBasicInfoStep"
import CourseCategoryStep from "../components/CreateCourse/CourseCategoryStep"
import CoursePricingStep from "../components/CreateCourse/CoursePricingStep"
import CoursePublishStep from "../components/CreateCourse/CoursePublishStep"
import { toast } from "react-hot-toast"
import FullScreenLoader from "../../../shared/components/FullScreenLoader"
import { ChevronRight, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

const stepMeta = [
    { label: "Basic Info",    desc: "Title & description" },
    { label: "Category",      desc: "Topic & tags"        },
    { label: "Pricing",       desc: "Free or paid"        },
    { label: "Publish",       desc: "Go live"             },
]

export default function EditCoursePage() {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    const step = useSelector(
        (state: RootState) => state.courseBuilder.step
    )

    useEffect(() => {
        const fetchCourse = async () => {
            if (!id) return
            try {
                setIsLoading(true)
                const response = await getCourseByIdApi(id)
                if (response.success) {
                    const courseData = response.data

                    dispatch(setCourse({
                        id: courseData._id,
                        step: 1,
                        title: courseData.title,
                        description: courseData.description,
                        category: courseData.category,
                        courseLevel: courseData.courseLevel,
                        courseSkills: courseData.courseSkills || [],
                        courseType: courseData.courseType,
                        price: courseData.price,
                        creditCost: courseData.creditCost,
                        thumbnailUrl: courseData.thumbnailUrl,
                        status: courseData.status,
                        isSubmitting: false
                    }))
                }
            } catch (error) {
                console.error("Failed to fetch course data", error)
                toast.error("Failed to load course details")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCourse()


        return () => {
            dispatch(resetCourse())
        }
    }, [id, dispatch])

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <div className="min-h-screen bg-[#f5f6f8] pb-24 pt-10 px-4 flex flex-col items-center">

            {/* ── Page wrapper ───────────────────────────────── */}
            <div className="w-full max-w-3xl flex flex-col gap-6">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-[13px] text-gray-400 font-medium">
                    <Link
                        to="/my-courses"
                        className="hover:text-emerald-700 transition-colors"
                    >
                        My Courses
                    </Link>
                    <ChevronRight size={13} className="text-gray-300" />
                    <span className="text-gray-700">Edit Course</span>
                </nav>

                {/* ── Main card ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_32px_rgba(0,0,0,0.07)] overflow-hidden"
                >
                    {/* Card header */}
                    <div className="flex items-center gap-3 px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50/60 to-white">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm shrink-0">
                            <BookOpen size={17} className="text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-[15px] font-bold text-gray-900 leading-none">
                                    Edit Course
                                </h1>
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">ID: {id}</span>
                            </div>
                            <p className="text-[12px] text-gray-400 mt-1">
                                Step {step} of {stepMeta.length} — {stepMeta[step - 1]?.label}
                            </p>
                        </div>

                        {/* Step pills — right side */}
                        <div className="ml-auto flex items-center gap-1.5">
                            {stepMeta.map((_, i) => {
                                const idx = i + 1
                                const done    = idx < step
                                const current = idx === step
                                return (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            done    ? "w-6 bg-emerald-500"      :
                                            current ? "w-8 bg-emerald-600"      :
                                                      "w-4 bg-gray-200"
                                        }`}
                                    />
                                )
                            })}
                        </div>
                    </div>

                    {/* Stepper row */}
                    <div className="px-8 pt-6">
                        <CourseStepper step={step} />
                    </div>

                    {/* Divider */}
                    <div className="mx-8 mt-5 h-px bg-gray-100" />

                    {/* Step content */}
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="px-8 py-7"
                    >
                        {step === 1 && <CourseBasicInfoStep />}
                        {step === 2 && <CourseCategoryStep />}
                        {step === 3 && <CoursePricingStep />}
                        {step === 4 && <CoursePublishStep />}
                    </motion.div>
                </motion.div>

                {/* Footer hint */}
                <p className="text-center text-[12px] text-gray-400">
                    Your progress is auto-saved. You can return anytime to finish.
                </p>
            </div>
        </div>
    )
}
