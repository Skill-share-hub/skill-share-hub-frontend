import { useState } from "react"
import {
    PlayCircle,
    Clock,
    FileText,
    ChevronDown,
    HelpCircle,
    Layers
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import type { Course } from "../../types/course.types"
import { useAppDispatch } from "../../../../shared/hooks/redux"
import { addCourseContent, deleteCourseContent, updateCourseContent } from "../../thunk/course.thunk"
import ContentModal from "./ContentModal"
import { Plus, Edit2, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

interface CurriculumOverviewProps {
    course: Course
}

const CurriculumOverview = ({ course }: CurriculumOverviewProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [expandedModule, setExpandedModule] = useState<number | null>(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingContent, setEditingContent] = useState<any>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDeleting, setIsDeleting] = useState<string | null>(null)

    const handleAddContent = async (formData: FormData) => {
        setIsSubmitting(true)
        try {
            await dispatch(addCourseContent({ id: course._id, formData })).unwrap()
            setIsModalOpen(false)
        } catch (error: any) {
            toast.error(error || "Failed to add content")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleUpdateContent = async (formData: FormData) => {
        if (!editingContent) return
        setIsSubmitting(true)
        try {
            await dispatch(updateCourseContent({ contentId: editingContent._id, formData })).unwrap()
            setIsModalOpen(false)
            setEditingContent(null)
        } catch (error: any) {
            toast.error(error || "Failed to update content")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteContent = async (contentId: string) => {
        if (!window.confirm("Are you sure you want to delete this content?")) return
        setIsDeleting(contentId)
        try {
            await dispatch(deleteCourseContent({ courseId: course._id, contentId })).unwrap()
        } catch (error: any) {
            toast.error(error || "Failed to delete content")
        } finally {
            setIsDeleting(null)
        }
    }

    const openEditModal = (content: any, e: React.MouseEvent) => {
        e.stopPropagation()
        setEditingContent(content)
        setIsModalOpen(true)
    }

    const moduleCount = course.contentModules?.length || 0

    return (
        <div className="mb-12">
            {/* Section card — mirrors OverviewHero structure */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

                {/* Top meta bar */}
                <div className="flex items-center justify-between px-7 py-3 border-b border-gray-100 bg-gray-50/60">
                    <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-400">
                        <Layers size={12} strokeWidth={2.5} />
                        Curriculum
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400 tracking-wide">
                        {moduleCount} {moduleCount === 1 ? "Module" : "Modules"}
                    </span>
                </div>

                {/* Header row */}
                <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
                    <h2 className="text-[1.25rem] font-extrabold text-gray-900 tracking-tight">
                        Curriculum Overview
                    </h2>
                    <button
                        onClick={() => { setEditingContent(null); setIsModalOpen(true) }}
                        className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150 active:scale-[0.97]"
                    >
                        <Plus size={14} strokeWidth={2.5} />
                        Add Module
                    </button>
                </div>

                {/* Module list */}
                <div className="divide-y divide-gray-100">
                    {moduleCount > 0 ? (
                        course?.contentModules?.map((module, idx) => {
                            const isOpen = expandedModule === idx
                            const duration = module.duration || 0
                            const mins = Math.floor(duration / 60)
                            const secs = duration % 60

                            return (
                                <div key={idx} className={`transition-colors ${isOpen ? "bg-gray-50/50" : "bg-white hover:bg-gray-50/40"}`}>
                                    {/* Module header */}
                                    <button
                                        onClick={() => setExpandedModule(isOpen ? null : idx)}
                                        className="w-full flex items-center gap-4 px-7 py-4 text-left group"
                                    >
                                        {/* Index */}
                                        <span className="w-6 text-[12px] font-bold text-gray-300 tabular-nums shrink-0">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>

                                        {/* Icon */}
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                            isOpen ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                        }`}>
                                            <PlayCircle size={15} strokeWidth={2} />
                                        </div>

                                        {/* Title + meta */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[14px] font-bold text-gray-900 truncate">
                                                {module.title || `Module ${idx + 1}`}
                                            </p>
                                            <div className="flex items-center gap-3 mt-0.5 text-[11px] text-gray-400 font-medium">
                                                <span className="flex items-center gap-1">
                                                    <FileText size={10} strokeWidth={2.5} />
                                                    0 Lessons
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={10} strokeWidth={2.5} />
                                                    {mins}m {secs}s
                                                </span>
                                            </div>
                                        </div>

                                        {/* Chevron */}
                                        <ChevronDown
                                            size={15}
                                            strokeWidth={2.5}
                                            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {/* Expanded panel */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="panel"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex items-start justify-between gap-4 px-7 pb-5 pt-1 ml-[3.75rem]">
                                                    <p className="text-[13px] text-gray-500 leading-relaxed flex-1">
                                                        {module.summary || "No description provided for this module."}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <button
                                                            onClick={(e) => openEditModal(module, e)}
                                                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="Edit module"
                                                        >
                                                            <Edit2 size={14} strokeWidth={2} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteContent(module._id) }}
                                                            disabled={isDeleting === module._id}
                                                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                                                            title="Delete module"
                                                        >
                                                            {isDeleting === module._id ? (
                                                                <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-red-400 rounded-full animate-spin" />
                                                            ) : (
                                                                <Trash2 size={14} strokeWidth={2} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })
                    ) : (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center mb-4">
                                <HelpCircle size={20} className="text-gray-300" />
                            </div>
                            <p className="text-[14px] font-semibold text-gray-400">No modules added yet</p>
                            <p className="text-[13px] text-gray-400 mt-1">
                                Start building your curriculum by adding the first module.
                            </p>
                            <button
                                onClick={() => navigate(`/edit-course/${course._id}`)}
                                className="mt-5 text-[13px] font-semibold text-gray-900 underline underline-offset-2 hover:text-emerald-700 transition-colors"
                            >
                                Go to course editor →
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ContentModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingContent(null) }}
                onSubmit={editingContent ? handleUpdateContent : handleAddContent}
                initialData={editingContent}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default CurriculumOverview