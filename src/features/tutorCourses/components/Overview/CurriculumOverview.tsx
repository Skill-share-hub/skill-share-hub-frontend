import { useState } from "react"
import {
    PlayCircle,
    Clock,
    FileText,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    Layout
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

    return (
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-[#166534] text-white p-2 rounded-lg">
                        <Layout size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Curriculum Overview</h2>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { setEditingContent(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-[#166534] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#14532D] transition-all"
                    >
                        <Plus size={16} />
                        Add Content
                    </button>
                    <p className="text-sm font-medium text-gray-400">
                        {course.contentModules?.length || 0} Modules • 0 Lessons
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {course.contentModules && course.contentModules.length > 0 ? (
                    course.contentModules.map((module, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-2xl border transition-all overflow-hidden ${expandedModule === idx ? 'border-[#166534] ring-1 ring-[#166534]/20 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <button
                                onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                                className="w-full flex items-center gap-4 p-5 text-left"
                            >
                                <div className={`p-3 rounded-xl transition-colors ${expandedModule === idx ? 'bg-[#166534] text-white' : 'bg-gray-50 text-gray-400'}`}>
                                    <PlayCircle size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 mb-1">{module.title || `Module ${idx + 1}`}</h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                                        <span className="flex items-center gap-1">
                                            <FileText size={12} />
                                            0 Lessons
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {Math.floor((module.duration || 0) / 60)}m {(module.duration || 0) % 60}s
                                        </span>
                                    </div>
                                </div>
                                {expandedModule === idx ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                            </button>

                            <AnimatePresence>
                                {expandedModule === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-gray-50 bg-gray-50/30 p-5"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <p className="text-sm text-gray-600 leading-relaxed flex-1">
                                                {module.summary || "No description available for this module."}
                                            </p>
                                            <div className="flex gap-2 shrink-0">
                                                <button
                                                    onClick={(e) => openEditModal(module, e)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Content"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteContent(module._id); }}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    disabled={isDeleting === module._id}
                                                    title="Delete Content"
                                                >
                                                    {isDeleting === module._id ? (
                                                        <div className="w-4 h-4 border-2 border-red-200 border-t-red-600 rounded-full animate-spin" />
                                                    ) : (
                                                        <Trash2 size={16} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400">
                        <HelpCircle size={40} className="mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No modules added yet.</p>
                        <button
                            onClick={() => navigate(`/edit-course/${course._id}`)}
                            className="mt-4 text-[#166534] font-bold hover:underline"
                        >
                            Start adding content
                        </button>
                    </div>
                )}
            </div>

            <ContentModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingContent(null); }}
                onSubmit={editingContent ? handleUpdateContent : handleAddContent}
                initialData={editingContent}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default CurriculumOverview
