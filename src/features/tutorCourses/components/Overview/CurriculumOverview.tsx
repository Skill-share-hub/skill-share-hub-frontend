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

interface CurriculumOverviewProps {
    course: Course
}

const CurriculumOverview = ({ course }: CurriculumOverviewProps) => {
    const navigate = useNavigate()
    const [expandedModule, setExpandedModule] = useState<number | null>(0)

    return (
        <div className="mb-12">
            <div className="flex justify-between items-end mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-[#166534] text-white p-2 rounded-lg">
                        <Layout size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Curriculum Overview</h2>
                </div>
                <p className="text-sm font-medium text-gray-400">
                    {course.contentModules?.length || 0} Modules • 0 Lessons
                </p>
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
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {module.summary || "No description available for this module."}
                                        </p>
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
        </div>
    )
}

export default CurriculumOverview
