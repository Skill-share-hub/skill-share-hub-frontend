import { Edit3, Layout, Trash2, CheckCircle, Power, Loader2, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import type { Course } from "../../types/course.types"
import { useState } from "react"
import { useAppDispatch } from "../../../../shared/hooks/redux"
import { deleteCourse, updateCourseStatus } from "../../thunk/course.thunk"
import toast from "react-hot-toast"
import ConfirmDialog from "../../../../shared/components/ConfirmDialog"

interface OverviewHeroProps {
    course: Course
}

const OverviewHero = ({ course }: OverviewHeroProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [expanded, setExpanded] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isChangingStatus, setIsChangingStatus] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState<{isOpen: boolean}>({ isOpen: false,});

   
    const handleConfirmDelete = async () => {
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8"
        >
            {/* Outer wrapper with sharp editorial border */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                {/* Top meta bar */}
                <div className="flex items-center justify-between px-7 py-3 border-b border-gray-100 bg-gray-50/60">
                    <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-400">
                        <BookOpen size={12} strokeWidth={2.5} />
                        Course Overview
                    </div>
                    {/* Status pill */}
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
                        isPublished
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-orange-50 text-orange-500 border-orange-200"
                    }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-orange-400"}`} />
                        {isPublished ? "Published" : "Draft"}
                    </div>
                </div>

                {/* Main body */}
                <div className="flex flex-col md:flex-row">

                    {/* Thumbnail column */}
                    <div className="md:w-[340px] shrink-0 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50 flex items-center justify-center p-6 min-h-[240px]">
                        {course.thumbnailUrl ? (
                            <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                className="w-full h-full max-h-[220px] object-cover rounded-xl"
                            />
                        ) : (
                            <div className="w-full h-[200px] rounded-xl bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                                    <Layout size={20} className="text-gray-400" />
                                </div>
                                <span className="text-xs font-medium text-gray-400 tracking-wide">No thumbnail added</span>
                            </div>
                        )}
                    </div>

                    {/* Content column */}
                    <div className="flex-1 flex flex-col justify-between p-7 md:p-9 gap-7">

                        {/* Title + description */}
                        <div className="flex flex-col gap-3">
                            <h1 className="text-[1.6rem] font-extrabold text-gray-900 leading-tight tracking-tight">
                                {course.title}
                            </h1>
                            <div>
                                <p className={`text-gray-500 text-sm leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
                                    {course.description}
                                </p>
                                {course.description.length > 100 && (
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className="mt-2 text-[12px] font-semibold text-gray-400 hover:text-gray-600 transition-colors tracking-wide"
                                    >
                                        {expanded ? "↑ Show less" : "↓ Show more"}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-100" />

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-2.5">

                            {/* Edit — primary */}
                            <button
                                onClick={() => navigate(`/edit-course/${course._id}`)}
                                className="group inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors duration-150 active:scale-[0.97]"
                            >
                                <Edit3 size={14} strokeWidth={2.5} className="group-hover:rotate-6 transition-transform duration-200" />
                                Edit Course
                            </button>

                            {/* Publish / Unpublish */}
                            <button
                                onClick={handleStatusToggle}
                                disabled={isChangingStatus}
                                className={`inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-xl border transition-colors duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isPublished
                                        ? "border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100"
                                        : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                }`}
                            >
                                {isChangingStatus ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : isPublished ? (
                                    <Power size={14} strokeWidth={2.5} />
                                ) : (
                                    <CheckCircle size={14} strokeWidth={2.5} />
                                )}
                                {isPublished ? "Unpublish" : "Publish"}
                            </button>

                            {/* Delete — far right, ghost style */}
                            <button
                                onClick={() => setConfirmDelete({ isOpen: true })}
                                disabled={isDeleting}
                                className="ml-auto inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all duration-150 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <Trash2 size={14} strokeWidth={2.5} />
                                )}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                  <ConfirmDialog
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete({ ...confirmDelete, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title="Delete Course"
                description={`Are you sure you want to delete this course? This action cannot be undone.`}
                confirmText={`Delete`}
                variant="danger"
            />
            </div>
        </motion.div>
    )
}

export default OverviewHero