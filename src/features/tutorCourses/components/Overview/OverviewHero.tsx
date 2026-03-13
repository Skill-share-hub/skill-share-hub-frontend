import { Edit3, Layout, Trash2, CheckCircle, Power, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import type { Course } from "../../types/course.types"
import { useState } from "react"
import { useAppDispatch } from "../../../../shared/hooks/redux"
import { deleteCourse, updateCourseStatus } from "../../thunk/course.thunk"
import toast from "react-hot-toast"

interface OverviewHeroProps {
    course: Course
}

const OverviewHero = ({ course }: OverviewHeroProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [expanded, setExpanded] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this entire course? This action cannot be undone.")) return
        setIsDeleting(true)
        try {
            await dispatch(deleteCourse(course._id)).unwrap()
            navigate("/my-courses")
        } catch (error: any) {
            toast.error(error || "Failed to delete course")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleStatusToggle = async () => {
        const nextStatus = course.status === "published" ? "draft" : "published"
        setIsChangingStatus(true)
        try {
            await dispatch(updateCourseStatus({ id: course._id, status: nextStatus })).unwrap()
        } catch (error: any) {
            toast.error(error || "Failed to update status")
        } finally {
            setIsChangingStatus(false)
        }
    }

    const isPublished = course.status === "published"

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_24px_rgba(0,0,0,0.06)] mb-8 flex flex-col md:flex-row"
        >
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300" />

            {/* Thumbnail */}
            <div className="md:w-[38%] min-h-[260px] md:min-h-0 relative bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-8">
                {course.thumbnailUrl ? (
                    <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                ) : (
                    <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm">
                            <Layout size={30} className="text-emerald-500" />
                        </div>
                        <span className="text-xs font-medium text-emerald-600/60 tracking-wide uppercase">No Thumbnail</span>
                    </div>
                )}

                {/* Status badge overlaid on image */}
                <div className={`absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm border ${
                    isPublished
                        ? "bg-emerald-50/90 text-emerald-700 border-emerald-200"
                        : "bg-amber-50/90 text-amber-700 border-amber-200"
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-400"}`} />
                    {isPublished ? "Published" : "Draft"}
                </div>
            </div>

            {/* Content */}
            <div className="md:w-[62%] p-8 md:p-10 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                    {/* Label */}
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        Course Overview
                    </span>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug tracking-tight">
                        {course.title}
                    </h1>

                    {/* Description */}
                    <div>
                        <p className={`text-gray-500 text-[15px] leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
                            {course.description}
                        </p>
                        {course.description.length > 100 && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-1.5 text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-2"
                            >
                                {expanded ? "Read Less" : "Read More"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100" />

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Edit */}
                    <button
                        onClick={() => navigate(`/edit-course/${course._id}`)}
                        className="group flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-sm"
                    >
                        <Edit3 size={15} className="group-hover:rotate-6 transition-transform" />
                        Edit Course
                    </button>

                    {/* Publish / Unpublish */}
                    <button
                        onClick={handleStatusToggle}
                        disabled={isChangingStatus}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all active:scale-95 disabled:opacity-50 ${
                            isPublished
                                ? "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                    >
                        {isChangingStatus ? (
                            <Loader2 size={15} className="animate-spin" />
                        ) : isPublished ? (
                            <Power size={15} />
                        ) : (
                            <CheckCircle size={15} />
                        )}
                        {isPublished ? "Unpublish" : "Publish"}
                    </button>

                    {/* Delete */}
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all active:scale-95 disabled:opacity-50 ml-auto"
                    >
                        {isDeleting ? (
                            <Loader2 size={15} className="animate-spin" />
                        ) : (
                            <Trash2 size={15} />
                        )}
                        Delete
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default OverviewHero